import { ENV } from "@/config/env";

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

/**
 * Custom fetch client for making HTTP requests to the backend API.
 */
export async function fetchClient<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, headers: customHeaders, ...restOptions } = options;

  const baseUrl = ENV.API_BASE_URL.replace(/\/$/, "");
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  let url = `${baseUrl}${normalizedEndpoint}`;

  // Append query parameters if provided
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = new Headers(customHeaders);

  // Set default JSON Content-Type if body is not FormData
  if (!headers.has("Content-Type") && !(restOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Attach JWT Bearer token and session if present
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("blitz_access_token") ||
      localStorage.getItem("access_token");
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const sessionId = localStorage.getItem("blitz_session_id");
    if (sessionId && !headers.has("x-session-id")) {
      headers.set("x-session-id", sessionId);
    }
  }

  const response = await fetch(url, {
    ...restOptions,
    headers,
  });

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }

    const errorMessage =
      (typeof errorData === "object" && errorData !== null && "message" in errorData
        ? String((errorData as { message: unknown }).message)
        : null) ||
      (typeof errorData === "object" && errorData !== null && "error" in errorData
        ? String((errorData as { error: unknown }).error)
        : null) ||
      `HTTP Error ${response.status}: ${response.statusText}`;

    throw new ApiError(response.status, errorMessage, errorData);
  }

  // Empty response body (e.g. 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export default fetchClient;
