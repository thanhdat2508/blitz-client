import * as React from "react";
import type { AuthState, AuthUser, GameAccount } from "../types/auth";
import { authApi } from "../api/auth-api";
import { authStorage } from "../api/auth-storage";

interface StoreState extends AuthState {
  isModalOpen: boolean;
  flowType?: "register" | "forgot_password" | "login";
}

const initialUser = authStorage.getUser();
const initialTokens = authStorage.getTokens();

let state: StoreState = {
  user: initialUser,
  tokens: initialTokens,
  sessionId: initialTokens?.sessionId || authStorage.getSessionId() || null,
  isAuthenticated: !!initialUser,
  status: initialUser ? "authenticated" : "idle",
  flowType: "login",
  pendingEmail: undefined,
  recoveryCode: undefined,
  error: null,
  isModalOpen: false,
  activeTab: "login",
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function updateStore(updater: (prev: StoreState) => StoreState) {
  state = updater(state);
  notify();
}

let isInitialized = false;

export function useAuth() {
  const store = React.useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange);
      return () => listeners.delete(onStoreChange);
    },
    () => state,
    () => state,
  );

  // Initialize and validate session once on mount
  React.useEffect(() => {
    if (isInitialized) return;
    isInitialized = true;

    const checkSession = async () => {
      const storedToken = authStorage.getAccessToken();
      const storedUser = authStorage.getUser();

      if (!storedToken && !storedUser) {
        return;
      }

      try {
        // Validate with backend (via cookie or token)
        const res = await authApi.validate(storedToken || undefined);
        if (res && res.user) {
          const sessionId = res.sessionId || authStorage.getSessionId() || "";
          const updatedUser: AuthUser = {
            ...res.user,
            sessionId,
            avatar:
              res.user.avatarUrl ||
              res.user.avatar ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${res.user.username || res.user.name}`,
            provider: (res.user.provider || "email") as AuthUser["provider"],
          };

          authStorage.setUser(updatedUser);
          if (res.accessToken) {
            authStorage.setTokens({
              accessToken: res.accessToken,
              sessionId,
            });
          }

          updateStore((prev) => ({
            ...prev,
            user: updatedUser,
            sessionId,
            isAuthenticated: true,
            status: "authenticated",
          }));
        }
      } catch {
        // Validation failed, try refresh token
        try {
          const refreshRes = await authApi.refresh();
          if (refreshRes && refreshRes.accessToken) {
            const sid = refreshRes.sessionId || authStorage.getSessionId() || "";
            authStorage.setTokens({
              accessToken: refreshRes.accessToken,
              refreshToken: refreshRes.refreshToken,
              sessionId: sid,
            });
            if (refreshRes.user) {
              const freshUser: AuthUser = {
                ...refreshRes.user,
                sessionId: sid,
                avatar:
                  refreshRes.user.avatarUrl ||
                  refreshRes.user.avatar ||
                  `https://api.dicebear.com/7.x/bottts/svg?seed=${refreshRes.user.username || refreshRes.user.name}`,
                provider: "email",
              };
              authStorage.setUser(freshUser);
              updateStore((prev) => ({
                ...prev,
                user: freshUser,
                sessionId: sid,
                isAuthenticated: true,
                status: "authenticated",
              }));
            }
          } else {
            throw new Error("Refresh failed");
          }
        } catch {
          // Token and refresh invalid: clear
          authStorage.clearAuth();
          updateStore((prev) => ({
            ...prev,
            user: null,
            tokens: null,
            sessionId: null,
            isAuthenticated: false,
            status: "idle",
          }));
        }
      }
    };

    checkSession();
  }, []);

  const openLoginModal = React.useCallback((tab?: string) => {
    updateStore((prev) => ({
      ...prev,
      isModalOpen: true,
      activeTab: (tab as any) || prev.activeTab || "login",
      error: null,
    }));
  }, []);

  const closeLoginModal = React.useCallback(() => {
    updateStore((prev) => ({
      ...prev,
      isModalOpen: false,
      status: prev.isAuthenticated ? "authenticated" : "idle",
      pendingEmail: undefined,
      error: null,
    }));
  }, []);

  // 1. Sign In with email & password
  const loginWithPassword = React.useCallback(
    async (email: string, password: string): Promise<boolean> => {
      updateStore((prev) => ({ ...prev, status: "submitting", error: null }));

      try {
        const res = await authApi.login({ email, password });

        if (res && res.user) {
          const sessionId = res.sessionId || "";
          const tokens = {
            accessToken: res.accessToken || "",
            refreshToken: res.refreshToken || "",
            sessionId,
          };

          authStorage.setTokens(tokens);

          const user: AuthUser = {
            id: res.user.id,
            email: res.user.email,
            name: res.user.name || res.user.username || email.split("@")[0],
            username: res.user.username,
            avatar:
              res.user.avatarUrl ||
              res.user.avatar ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${res.user.username || email}`,
            provider: "email",
            sessionId,
            isPremium: true,
            createdAt: new Date().toISOString(),
          };

          authStorage.setUser(user);

          updateStore((prev) => ({
            ...prev,
            user,
            tokens,
            sessionId,
            isAuthenticated: true,
            status: "authenticated",
            isModalOpen: false,
            error: null,
          }));

          return true;
        }

        throw new Error(res.message || "Sign in failed");
      } catch (err: any) {
        console.error("Login error:", err);

        // Check if unverified email
        if (err.response?.status === 403 && err.response?.data?.isEmailVerified === false) {
          // Switch to OTP verification
          updateStore((prev) => ({
            ...prev,
            status: "otp_required",
            flowType: "register",
            pendingEmail: email,
            error: "Email not verified. Please check your email for the OTP verification code.",
          }));
          return false;
        }

        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Sign in failed. Please check your email or password.";

        updateStore((prev) => ({
          ...prev,
          status: "idle",
          error: message,
        }));

        return false;
      }
    },
    [],
  );

  // 2. Sign Up with Name, Email & Password (triggers Resend email with OTP template)
  const signupWithPassword = React.useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      updateStore((prev) => ({ ...prev, status: "submitting", error: null }));

      try {
        const res = await authApi.register({
          name: name.trim(),
          email: email.trim(),
          password,
        });

        updateStore((prev) => ({
          ...prev,
          status: "otp_required",
          flowType: "register",
          pendingEmail: email.trim(),
          recoveryCode: res.recoveryCode,
          error: null,
        }));

        return true;
      } catch (err: any) {
        console.error("Signup error:", err);
        const message =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Sign up failed. Please try again.";

        updateStore((prev) => ({
          ...prev,
          status: "idle",
          error: message,
        }));
        return false;
      }
    },
    [],
  );

  // 3. Resend Register OTP (triggers Resend email)
  const resendRegisterOtp = React.useCallback(
    async (targetEmail?: string): Promise<boolean> => {
      const email = targetEmail || state.pendingEmail;
      if (!email) return false;

      try {
        const res = await authApi.resendOtp({ email });
        updateStore((prev) => ({
          ...prev,
          recoveryCode: res.recoveryCode || prev.recoveryCode,
          error: null,
        }));
        return true;
      } catch (err: any) {
        console.error("Resend OTP error:", err);
        return false;
      }
    },
    [],
  );

  // 4. Verify OTP (Verifies in Redis, sends Resend Welcome email, logs in)
  const verifyOtp = React.useCallback(
    async (code: string): Promise<boolean> => {
      updateStore((prev) => ({ ...prev, status: "submitting", error: null }));

      const email = state.pendingEmail;
      if (!email) {
        updateStore((prev) => ({
          ...prev,
          status: "otp_required",
          error: "No email found for verification.",
        }));
        return false;
      }

      try {
        const res = await authApi.verifyOtp({
          email,
          otpCode: code,
          recoveryCode: state.recoveryCode,
        });

        if (res && res.user) {
          const sessionId = res.sessionId || "";
          const tokens = {
            accessToken: res.accessToken || "",
            refreshToken: res.refreshToken || "",
            sessionId,
          };

          authStorage.setTokens(tokens);

          const user: AuthUser = {
            id: res.user.id,
            email: res.user.email,
            name: res.user.name || res.user.username || email.split("@")[0],
            username: res.user.username,
            avatar:
              res.user.avatarUrl ||
              res.user.avatar ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${res.user.username || email}`,
            provider: "email",
            sessionId,
            isPremium: true,
            createdAt: new Date().toISOString(),
          };

          authStorage.setUser(user);

          updateStore((prev) => ({
            ...prev,
            user,
            tokens,
            sessionId,
            isAuthenticated: true,
            status: "authenticated",
            isModalOpen: false,
            pendingEmail: undefined,
            recoveryCode: undefined,
            error: null,
          }));

          return true;
        }

        throw new Error(res.message || "OTP verification failed");
      } catch (err: any) {
        console.error("OTP verification error:", err);
        const msg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Invalid or expired OTP code.";

        updateStore((prev) => ({
          ...prev,
          status: "otp_required",
          error: msg,
        }));

        return false;
      }
    },
    [],
  );

  // 5. Request Password Reset (sends OTP via Resend)
  const forgotPassword = React.useCallback(
    async (email: string): Promise<boolean> => {
      updateStore((prev) => ({ ...prev, status: "submitting", error: null }));

      try {
        const res = await authApi.resetPassword({ email: email.trim() });
        updateStore((prev) => ({
          ...prev,
          status: "otp_required",
          flowType: "forgot_password",
          pendingEmail: email.trim(),
          recoveryCode: res.recoveryCode,
          error: null,
        }));
        return true;
      } catch (err: any) {
        const msg =
          err.response?.data?.error ||
          err.message ||
          "Unable to send password reset request.";
        updateStore((prev) => ({
          ...prev,
          status: "idle",
          error: msg,
        }));
        return false;
      }
    },
    [],
  );

  // 6. Verify Reset Password OTP
  const verifyForgotPasswordOtp = React.useCallback(
    async (code: string): Promise<boolean> => {
      const email = state.pendingEmail;
      if (!email) return false;

      updateStore((prev) => ({ ...prev, status: "submitting", error: null }));

      try {
        const res = await authApi.verifyResetPasswordOtp({
          email,
          otpCode: code,
          recoveryCode: state.recoveryCode,
        });

        if (res.verified) {
          updateStore((prev) => ({
            ...prev,
            status: "idle",
            recoveryCode: res.recoveryCode,
            error: null,
          }));
          return true;
        }
        return false;
      } catch (err: any) {
        const msg =
          err.response?.data?.error ||
          err.message ||
          "Invalid password reset OTP code.";
        updateStore((prev) => ({
          ...prev,
          status: "otp_required",
          error: msg,
        }));
        return false;
      }
    },
    [],
  );

  // 7. Update to new password
  const updateNewPassword = React.useCallback(
    async (newPassword: string): Promise<boolean> => {
      const email = state.pendingEmail;
      if (!email) return false;

      updateStore((prev) => ({ ...prev, status: "submitting", error: null }));

      try {
        await authApi.updatePassword({
          email,
          newPassword,
          recoveryCode: state.recoveryCode,
        });

        updateStore((prev) => ({
          ...prev,
          status: "idle",
          pendingEmail: undefined,
          recoveryCode: undefined,
          error: null,
        }));
        return true;
      } catch (err: any) {
        const msg =
          err.response?.data?.error ||
          err.message ||
          "Unable to update new password.";
        updateStore((prev) => ({
          ...prev,
          status: "idle",
          error: msg,
        }));
        return false;
      }
    },
    [],
  );

  // 8. Social Login (Google & Riot OAuth)
  const loginWithSocial = React.useCallback(
    async (provider: "discord" | "google" | "riot") => {
      if (provider === "google") {
        window.location.href = authApi.getGoogleAuthUrl();
        return;
      }
      if (provider === "riot") {
        window.location.href = authApi.getRiotAuthUrl();
        return;
      }

      updateStore((prev) => ({
        ...prev,
        status: "idle",
        error: "Discord login is currently not supported. Please sign in with Google or Riot Games.",
      }));
    },
    [],
  );

  const loginWithSavedAccount = React.useCallback((account: GameAccount) => {
    updateStore((prev) => ({ ...prev, status: "submitting", error: null }));

    const user: AuthUser = {
      id: `usr_${account.id}`,
      email: `${account.summonerName.toLowerCase()}@riot.games`,
      name: `${account.summonerName} #${account.tagLine}`,
      avatar: account.profileIconUrl,
      provider: "riot",
      isPremium: true,
      createdAt: new Date().toISOString(),
      lolAccount: account,
    };

    authStorage.setUser(user);

    updateStore((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
      status: "authenticated",
      isModalOpen: false,
      error: null,
    }));
  }, []);

  const resetFlow = React.useCallback(() => {
    updateStore((prev) => ({
      ...prev,
      status: prev.isAuthenticated ? "authenticated" : "idle",
      flowType: "login",
      pendingEmail: undefined,
      recoveryCode: undefined,
      error: null,
    }));
  }, []);

  const logout = React.useCallback(async (isLogoutAll = false) => {
    try {
      const currentSessionId = state.sessionId || authStorage.getSessionId() || undefined;
      await authApi.logout({ isLogoutAll, sessionId: currentSessionId });
    } catch (e) {
      console.warn("Logout error:", e);
    } finally {
      authStorage.clearAuth();
      updateStore(() => ({
        user: null,
        tokens: null,
        sessionId: null,
        isAuthenticated: false,
        status: "idle",
        flowType: "login",
        pendingEmail: undefined,
        recoveryCode: undefined,
        error: null,
        isModalOpen: false,
        activeTab: "login",
      }));
    }
  }, []);

  return {
    user: store.user,
    tokens: store.tokens,
    sessionId: store.sessionId,
    isAuthenticated: store.isAuthenticated,
    status: store.status,
    flowType: store.flowType,
    isModalOpen: store.isModalOpen,
    pendingEmail: store.pendingEmail,
    recoveryCode: store.recoveryCode,
    error: store.error,
    openLoginModal,
    closeLoginModal,
    loginWithPassword,
    signupWithPassword,
    resendRegisterOtp,
    verifyOtp,
    forgotPassword,
    verifyForgotPasswordOtp,
    updateNewPassword,
    loginWithSocial,
    loginWithSavedAccount,
    resetFlow,
    logout,
  };
}
