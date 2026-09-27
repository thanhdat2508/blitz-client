import { apiClient } from "@/lib/api-client";
import { ENV } from "@/config/env";
import type { AuthUser, SessionItem } from "../types/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otpCode: string;
  recoveryCode?: string;
}

export interface AuthResponse {
  message: string;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  user?: AuthUser;
  recoveryCode?: string;
  error?: string;
  isEmailVerified?: boolean;
}

export interface SessionsResponse {
  currentSessionId: string;
  sessions: SessionItem[];
}

export const authApi = {
  // 1. Sign In with email & password
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    return apiClient.post("/api/auth/login", payload);
  },

  // 2. Sign Up with email & password (generates OTP)
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    return apiClient.post("/api/auth/register", payload);
  },

  // 3. Verify OTP
  verifyOtp: async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    return apiClient.post("/api/auth/verify", payload);
  },

  // 4. Resend OTP
  resendOtp: async (payload: { email: string }): Promise<{ message: string; recoveryCode?: string }> => {
    return apiClient.post("/api/auth/resend-otp", payload);
  },

  // 5. Validate current access token and session
  validate: async (accessToken?: string): Promise<{ message: string; accessToken?: string; sessionId: string; user: AuthUser }> => {
    return apiClient.post("/api/auth/validate", { accessToken });
  },

  // 6. Refresh tokens & session
  refresh: async (refreshToken?: string): Promise<AuthResponse> => {
    return apiClient.post("/api/auth/refresh", { refreshToken });
  },

  // 7. Logout current session or all sessions
  logout: async (payload?: { isLogoutAll?: boolean; sessionId?: string }): Promise<{ message: string }> => {
    return apiClient.post("/api/auth/logout", payload || {});
  },

  // 8. Get current authenticated user profile
  getMe: async (): Promise<{ user: AuthUser }> => {
    return apiClient.get("/api/auth/me");
  },

  // 9. Session Management (mirroring requin-client project-auth)
  listSessions: async (): Promise<SessionsResponse> => {
    return apiClient.get("/api/auth/sessions");
  },

  revokeSession: async (sessionId: string): Promise<{ message: string }> => {
    return apiClient.delete(`/api/auth/sessions/${sessionId}`);
  },

  // 10. Forgot & Reset password flow
  resetPassword: async (payload: { email: string }): Promise<{ message: string; recoveryCode?: string }> => {
    return apiClient.post("/api/auth/reset-password", payload);
  },

  verifyResetPasswordOtp: async (payload: { email: string; otpCode: string; recoveryCode?: string }): Promise<{ message: string; verified: boolean; recoveryCode: string }> => {
    return apiClient.post("/api/auth/reset-password/verify", payload);
  },

  resendResetPasswordOtp: async (payload: { email: string }): Promise<{ message: string; recoveryCode?: string }> => {
    return apiClient.post("/api/auth/resend-otp-reset-password", payload);
  },

  updatePassword: async (payload: { email: string; newPassword: string; recoveryCode?: string }): Promise<{ message: string }> => {
    return apiClient.post("/api/auth/update-password", payload);
  },

  // 11. OAuth URLs
  getGoogleAuthUrl: (): string => {
    const base = ENV.BACKEND_URL || "http://localhost:3000";
    return `${base}/api/auth/google`;
  },

  getRiotAuthUrl: (): string => {
    const base = ENV.BACKEND_URL || "http://localhost:3000";
    return `${base}/api/auth/riot`;
  },
};

export default authApi;
