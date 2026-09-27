import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginPayload, type RegisterPayload, type VerifyOtpPayload } from "./auth-api";

export const AUTH_KEYS = {
  all: ["auth"] as const,
  me: () => [...AUTH_KEYS.all, "me"] as const,
  validate: () => [...AUTH_KEYS.all, "validate"] as const,
  sessions: () => [...AUTH_KEYS.all, "sessions"] as const,
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.all });
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
  });
};

export const useVerifyOtpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: VerifyOtpPayload) => authApi.verifyOtp(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.all });
    },
  });
};

export const useResendOtpMutation = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) => authApi.resendOtp(payload),
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload?: { isLogoutAll?: boolean; sessionId?: string }) =>
      authApi.logout(payload),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useSessionsQuery = (enabled = true) => {
  return useQuery({
    queryKey: AUTH_KEYS.sessions(),
    queryFn: () => authApi.listSessions(),
    enabled,
    staleTime: 30 * 1000,
  });
};

export const useRevokeSessionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => authApi.revokeSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.sessions() });
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: { email: string }) => authApi.resetPassword(payload),
  });
};

export const useVerifyResetPasswordOtpMutation = () => {
  return useMutation({
    mutationFn: (payload: { email: string; otpCode: string; recoveryCode?: string }) =>
      authApi.verifyResetPasswordOtp(payload),
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: (payload: { email: string; newPassword: string; recoveryCode?: string }) =>
      authApi.updatePassword(payload),
  });
};
