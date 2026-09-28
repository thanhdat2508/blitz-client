import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { ENV } from "@/config/env";
import { authStorage } from "@/features/auth/api/auth-storage";

export const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Flag and queue to prevent multiple simultaneous refresh calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: attach Bearer token and sessionId if present
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authStorage.getAccessToken();
    const sessionId = authStorage.getSessionId();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (sessionId && config.headers) {
      config.headers["x-session-id"] = sessionId;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response Interceptor: normalize response and auto-refresh token on 401
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Do not attempt refresh on auth endpoints (login, refresh, logout, register, verify)
    const isAuthUrl =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh") ||
      originalRequest.url?.includes("/auth/logout") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/verify");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthUrl) {
      if (isRefreshing) {
        // Queue the request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers && token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const storedRefreshToken = authStorage.getRefreshToken();

        // Call backend refresh endpoint with credentials (cookies) + fallback body
        const res = await axios.post(
          `${ENV.API_BASE_URL}/api/auth/refresh`,
          { refreshToken: storedRefreshToken },
          { withCredentials: true },
        );

        const data = res.data;
        const newAccessToken = data?.accessToken;
        const newRefreshToken = data?.refreshToken;
        const newSessionId = data?.sessionId;

        if (newAccessToken) {
          authStorage.setTokens({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken || storedRefreshToken || "",
            sessionId: newSessionId || authStorage.getSessionId() || "",
          });

          if (data.user) {
            authStorage.setUser(data.user);
          }

          processQueue(null, newAccessToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          if (newSessionId && originalRequest.headers) {
            originalRequest.headers["x-session-id"] = newSessionId;
          }

          return apiClient(originalRequest);
        } else {
          throw new Error("No access token returned from refresh");
        }
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        authStorage.clearAuth();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
