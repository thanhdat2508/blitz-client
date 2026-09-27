import * as React from "react";
import { useAuth } from "../hooks/use-auth";
import {
  Loader2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
  RotateCw,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    status,
    flowType,
    error,
    pendingEmail,
    loginWithPassword,
    signupWithPassword,
    resendRegisterOtp,
    verifyOtp,
    forgotPassword,
    verifyForgotPasswordOtp,
    updateNewPassword,
    resetFlow,
  } = useAuth();

  // Mode: "login" | "signup" | "forgot_password" | "reset_new_password"
  const [mode, setMode] = React.useState<
    "login" | "signup" | "forgot_password" | "reset_new_password"
  >("login");

  // Form Inputs
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [otpCode, setOtpCode] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [localError, setLocalError] = React.useState<string | null>(null);

  // Resend Countdown Timer (60s)
  const [countdown, setCountdown] = React.useState(60);
  const [isResending, setIsResending] = React.useState(false);

  React.useEffect(() => {
    if (status !== "otp_required") return;
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [status, countdown]);

  const isValidEmail = React.useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const isSubmitting = status === "submitting";

  // Handle Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || !password || isSubmitting) return;
    setLocalError(null);

    const ok = await loginWithPassword(email.trim(), password);
    if (ok && onSuccess) {
      onSuccess();
    }
  };

  // Handle Sign Up
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setLocalError("Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (!isValidEmail) {
      setLocalError("Email không hợp lệ.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    setLocalError(null);
    setCountdown(60);
    await signupWithPassword(name.trim(), email.trim(), password);
  };

  // Handle Forgot Password Request
  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail || isSubmitting) return;
    setLocalError(null);
    setCountdown(60);
    await forgotPassword(email.trim());
  };

  // Handle OTP Verification
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 6 || isSubmitting) return;
    setLocalError(null);

    if (flowType === "forgot_password") {
      const ok = await verifyForgotPasswordOtp(otpCode.trim());
      if (ok) {
        setMode("reset_new_password");
      }
    } else {
      const ok = await verifyOtp(otpCode.trim());
      if (ok && onSuccess) {
        onSuccess();
      }
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0 || isResending) return;
    setIsResending(true);
    setLocalError(null);
    try {
      const ok = await resendRegisterOtp();
      if (ok) {
        setCountdown(60);
      }
    } finally {
      setIsResending(false);
    }
  };

  // Handle New Password Update
  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setLocalError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    setLocalError(null);
    const ok = await updateNewPassword(newPassword);
    if (ok) {
      setMode("login");
      setLocalError(
        "Mật khẩu đã được cập nhật thành công! Vui lòng đăng nhập lại.",
      );
    }
  };

  // Reset to initial mode
  const handleSwitchMode = (
    targetMode: "login" | "signup" | "forgot_password",
  ) => {
    setMode(targetMode);
    setLocalError(null);
    resetFlow();
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {status === "otp_required"
            ? "Xác thực mã bảo mật"
            : mode === "signup"
              ? "Tạo tài khoản mới"
              : mode === "forgot_password"
                ? "Quên mật khẩu"
                : mode === "reset_new_password"
                  ? "Đặt lại mật khẩu mới"
                  : "Đăng nhập"}
        </h1>
        <p className="text-xs text-neutral-400 mt-1 max-w-70">
          {status === "otp_required"
            ? `Nhập mã 6 chữ số đã gửi qua email tới ${pendingEmail}`
            : mode === "signup"
              ? "Tham gia Blitz để trải nghiệm dữ liệu meta Liên Minh Huyền Thoại tốt nhất"
              : mode === "forgot_password"
                ? "Nhập email của bạn để nhận mã khôi phục mật khẩu qua Resend"
                : mode === "reset_new_password"
                  ? "Nhập mật khẩu mới an toàn cho tài khoản của bạn"
                  : "Chào mừng trở lại! Điền thông tin để tiếp tục."}
        </p>
      </div>

      {/* Error / Notification Feedback */}
      {(error || localError) && (
        <div className="w-full mb-4 px-3.5 py-2.5 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs text-left">
          {error || localError}
        </div>
      )}

      {/* 1. OTP Verification Screen */}
      {status === "otp_required" ? (
        <form onSubmit={handleOtpVerify} className="w-full space-y-4">
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-4 h-4 text-rose-500 shrink-0" />
              <p className="truncate">{pendingEmail}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              onClick={() => {
                resetFlow();
                setMode("login");
              }}
              className="text-neutral-400 hover:text-white text-xs h-7 px-2"
            >
              <ArrowLeft className="w-3 h-3 mr-1" /> Đổi
            </Button>
          </div>

          <Field className="text-left space-y-1.5">
            <FieldLabel
              htmlFor="otp-input"
              className="text-xs text-neutral-400 font-medium"
            >
              Mã xác thực 6 số (gửi qua Resend)
            </FieldLabel>
            <Input
              id="otp-input"
              type="text"
              autoFocus
              maxLength={6}
              placeholder="e.g. 123456"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              className="w-full h-12 px-4 rounded-xl bg-[#141620] border-neutral-700 text-white text-center tracking-widest text-lg font-mono focus-visible:ring-rose-500/20"
            />
          </Field>

          {/* Resend OTP button with 60s countdown */}
          <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
            <span>Chưa nhận được mã?</span>
            <Button
              type="button"
              variant="link"
              size="xs"
              disabled={countdown > 0 || isResending}
              onClick={handleResendOtp}
              className="text-rose-500 hover:text-rose-400 font-semibold p-0 h-auto"
            >
              {isResending ? (
                <>
                  <RotateCw className="w-3 h-3 animate-spin mr-1" />
                  <span>Đang gửi...</span>
                </>
              ) : countdown > 0 ? (
                <span>Gửi lại sau ({countdown}s)</span>
              ) : (
                <span>Gửi lại mã</span>
              )}
            </Button>
          </div>

          <Button
            type="submit"
            disabled={otpCode.length < 6 || isSubmitting}
            className="w-full h-11 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40 shadow-[0_4px_15px_rgba(244,63,94,0.25)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Đang xác thực...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <span>Xác nhận & Hoàn tất</span>
              </>
            )}
          </Button>
        </form>
      ) : mode === "reset_new_password" ? (
        /* 2. Reset New Password Screen */
        <form
          onSubmit={handleNewPasswordSubmit}
          className="w-full space-y-4 text-left"
        >
          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="new-password"
              className="text-xs font-semibold text-neutral-300"
            >
              Mật khẩu mới
            </FieldLabel>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none z-10" />
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#141620] border-neutral-800 text-white text-sm focus-visible:ring-rose-500/20"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3.5 top-3 text-neutral-500 hover:text-white h-5 w-5"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </Field>

          <Button
            type="submit"
            disabled={newPassword.length < 6 || isSubmitting}
            className="w-full h-11 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Đang cập nhật...</span>
              </>
            ) : (
              "Lưu mật khẩu mới"
            )}
          </Button>
        </form>
      ) : mode === "forgot_password" ? (
        /* 3. Forgot Password Screen */
        <form
          onSubmit={handleForgotPasswordSubmit}
          className="w-full space-y-4 text-left"
        >
          <Field className="space-y-1.5">
            <FieldLabel
              htmlFor="forgot-email"
              className="text-xs font-semibold text-neutral-300"
            >
              Email của tài khoản
            </FieldLabel>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none z-10" />
              <Input
                id="forgot-email"
                type="email"
                required
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#141620] border-neutral-800 text-white text-sm focus-visible:ring-rose-500/20"
              />
            </div>
          </Field>

          <Button
            type="submit"
            disabled={!isValidEmail || isSubmitting}
            className="w-full h-11 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span>Đang gửi mã...</span>
              </>
            ) : (
              "Gửi mã xác nhận qua Email"
            )}
          </Button>

          <div className="pt-2 text-center">
            <Button
              type="button"
              variant="link"
              size="xs"
              onClick={() => handleSwitchMode("login")}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Quay lại đăng nhập
            </Button>
          </div>
        </form>
      ) : (
        /* 4. Login or Signup Screen */
        <div className="flex flex-col gap-4 w-full space-y-4">
          {mode === "signup" ? (
            <form
              onSubmit={handleSignupSubmit}
              className="space-y-3.5 text-left"
            >
              <FieldGroup className="gap-3.5">
                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="name"
                    className="text-xs font-semibold text-neutral-300"
                  >
                    Họ và tên
                  </FieldLabel>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#141620] border-neutral-800 text-white text-sm focus-visible:ring-rose-500/20"
                    />
                  </div>
                </Field>

                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="signup-email"
                    className="text-xs font-semibold text-neutral-300"
                  >
                    Email
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                    <Input
                      id="signup-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#141620] border-neutral-800 text-white text-sm focus-visible:ring-rose-500/20"
                    />
                  </div>
                </Field>

                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="signup-password"
                    className="text-xs font-semibold text-neutral-300"
                  >
                    Mật khẩu
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      placeholder="Tối thiểu 6 ký tự"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#141620] border-neutral-800 text-white text-sm focus-visible:ring-rose-500/20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3.5 top-3 text-neutral-500 hover:text-white h-5 w-5"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </Field>
              </FieldGroup>

              <Button
                type="submit"
                disabled={!isValidEmail || password.length < 6 || isSubmitting}
                className="w-full h-11 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40 shadow-[0_4px_15px_rgba(244,63,94,0.25)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>Đang đăng ký...</span>
                  </>
                ) : (
                  "Đăng ký tài khoản"
                )}
              </Button>
            </form>
          ) : (
            /* Sign In Form */
            <form
              onSubmit={handleLoginSubmit}
              className="space-y-3.5 text-left"
            >
              <FieldGroup className="gap-3.5">
                {/* Email */}
                <Field className="space-y-1.5">
                  <FieldLabel
                    htmlFor="login-email"
                    className="text-xs font-semibold text-neutral-300"
                  >
                    Email
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                    <Input
                      id="login-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#141620] border-neutral-800 text-white text-sm focus-visible:ring-rose-500/20"
                    />
                  </div>
                </Field>

                {/* Password */}
                <Field className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="login-password"
                      className="text-xs font-semibold text-neutral-300"
                    >
                      Mật khẩu
                    </FieldLabel>
                    <Button
                      type="button"
                      variant="link"
                      size="xs"
                      onClick={() => handleSwitchMode("forgot_password")}
                      className="text-[11px] text-neutral-400 hover:text-white p-0 h-auto font-normal"
                    >
                      Quên mật khẩu?
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none z-10" />
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#141620] border-neutral-800 text-white text-sm focus-visible:ring-rose-500/20"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3.5 top-3 text-neutral-500 hover:text-white h-5 w-5"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </Field>
              </FieldGroup>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-neutral-400 hover:text-neutral-300">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                    className="data-checked:bg-rose-600 data-checked:border-rose-600"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={!isValidEmail || !password || isSubmitting}
                className="w-full h-11 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40 shadow-[0_4px_15px_rgba(244,63,94,0.25)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </form>
          )}

          {/* Toggle between Login and Signup */}
          <div className="mt-4 text-xs text-neutral-400 pt-2 border-t border-neutral-800/60">
            {mode === "login" ? (
              <div className="flex items-center justify-center gap-1">
                <span>Chưa có tài khoản?</span>
                <Button
                  type="button"
                  variant="link"
                  size="xs"
                  onClick={() => handleSwitchMode("signup")}
                  className="text-rose-500 font-semibold hover:underline p-0 h-auto"
                >
                  Đăng ký ngay
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-1">
                <span>Đã có tài khoản?</span>
                <Button
                  type="button"
                  variant="link"
                  size="xs"
                  onClick={() => handleSwitchMode("login")}
                  className="text-rose-500 font-semibold hover:underline p-0 h-auto"
                >
                  Đăng nhập
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Legal Terms */}
      <p className="text-[11px] text-neutral-500 mt-4 leading-relaxed">
        Khi đăng nhập, bạn đồng ý với{" "}
        <span className="text-neutral-400 hover:text-white underline cursor-pointer">
          Điều khoản dịch vụ
        </span>{" "}
        và{" "}
        <span className="text-neutral-400 hover:text-white underline cursor-pointer">
          Chính sách bảo mật
        </span>
        .
      </p>
    </div>
  );
}

export default LoginForm;
