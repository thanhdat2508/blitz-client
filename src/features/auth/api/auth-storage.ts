import type { AuthTokens, AuthUser } from "../types/auth";

const ACCESS_TOKEN_KEY = "blitz_access_token";
const REFRESH_TOKEN_KEY = "blitz_refresh_token";
const SESSION_ID_KEY = "blitz_session_id";
const USER_KEY = "app_auth_user";

export const authStorage = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  getSessionId(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(SESSION_ID_KEY);
  },

  getTokens(): AuthTokens | null {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    const sessionId = this.getSessionId();

    if (!accessToken || !refreshToken || !sessionId) return null;
    return { accessToken, refreshToken, sessionId };
  },

  setTokens(tokens: Partial<AuthTokens>): void {
    if (typeof window === "undefined") return;
    if (tokens.accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    if (tokens.refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    if (tokens.sessionId) localStorage.setItem(SESSION_ID_KEY, tokens.sessionId);
  },

  getUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setUser(user: AuthUser | null): void {
    if (typeof window === "undefined") return;
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  },

  clearAuth(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
