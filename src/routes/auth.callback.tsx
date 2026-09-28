import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { authApi } from "@/features/auth/api/auth-api";
import { authStorage } from "@/features/auth/api/auth-storage";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export const Route = createFileRoute('/auth/callback')({
  component: AuthCallbackComponent,
});

function AuthCallbackComponent() {
  const navigate = useNavigate();
  const { openLoginModal } = useAuth();
  const [status, setStatus] = React.useState<"loading" | "success" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;

    const processOAuth = async () => {
      try {
        // Query params
        const urlParams = new URLSearchParams(window.location.search);
        const provider = urlParams.get("provider") || "OAuth";

        // Backend has already set cookies (_at, _rt, _sid). Validate them:
        const res = await authApi.validate();

        if (res && res.user && isMounted) {
          const sessionId = res.sessionId || "";
          authStorage.setTokens({
            accessToken: res.accessToken || "",
            sessionId,
          });

          authStorage.setUser({
            ...res.user,
            sessionId,
            avatar:
              res.user.avatarUrl ||
              res.user.avatar ||
              `https://api.dicebear.com/7.x/bottts/svg?seed=${res.user.name || "user"}`,
            provider: provider as any,
          });

          setStatus("success");

          setTimeout(() => {
            window.location.href = "/";
          }, 800);
        } else {
          throw new Error("Unable to authenticate session");
        }
      } catch (err: any) {
        console.error("OAuth callback error:", err);
        if (isMounted) {
          setStatus("error");
          setErrorMessage(
            err.response?.data?.error ||
              err.message ||
              "Social sign in failed",
          );
          setTimeout(() => {
            navigate({ to: "/" });
            openLoginModal();
          }, 2500);
        }
      }
    };

    processOAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate, openLoginModal]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-8 rounded-3xl bg-[#12141e] border border-neutral-800 shadow-2xl max-w-sm w-full flex flex-col items-center gap-4">
        {status === "loading" && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-white">Processing Sign In</h2>
            <p className="text-xs text-neutral-400">
              Please wait while we verify your account...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Sign In Successful!</h2>
            <p className="text-xs text-neutral-400">
              Redirecting to home...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-white">Sign In Failed</h2>
            <p className="text-xs text-neutral-400">
              {errorMessage || "Unable to complete authentication."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
