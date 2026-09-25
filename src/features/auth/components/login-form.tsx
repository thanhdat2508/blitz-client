import * as React from 'react'
import { SocialLoginButtons } from './social-login-buttons'
import { RiotLoginButton } from './riot-login-button'
import { useAuth } from '../hooks/use-auth'
import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    status,
    error,
    pendingEmail,
    loginWithPassword,
    requestEmailOtp,
    verifyOtp,
    loginWithSocial,
    resetFlow,
  } = useAuth()

  const [authMode, setAuthMode] = React.useState<'password' | 'otp'>('password')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [otpCode, setOtpCode] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(true)
  const [showPassword, setShowPassword] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | null>(null)

  // Pure derived state for validation
  const isValidEmail = React.useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  }, [email])

  const isSubmitting = status === 'submitting'

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail || !password || isSubmitting) return
    setLocalError(null)

    const ok = await loginWithPassword(email.trim(), password)
    if (ok && onSuccess) {
      onSuccess()
    }
  }

  const handleOtpRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail || isSubmitting) return
    setLocalError(null)
    await requestEmailOtp(email.trim())
  }

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCode.length < 4 || isSubmitting) return
    setLocalError(null)
    const ok = await verifyOtp(otpCode.trim())
    if (ok && onSuccess) {
      onSuccess()
    }
  }

  const handleSocialLogin = async (provider: 'discord' | 'google' | 'riot') => {
    await loginWithSocial(provider)
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center">
      {/* Header - No Blitz logo or astronaut illustration */}
      <div className="mb-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {status === 'otp_required' ? 'Xác thực mã bảo mật' : 'Log In'}
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          {status === 'otp_required'
            ? `Nhập mã xác thực đã được gửi tới ${pendingEmail}`
            : 'Welcome back! Enter your details to continue.'}
        </p>
      </div>

      {/* Error Feedback */}
      {(error || localError) && (
        <div className="w-full mb-4 px-3.5 py-2.5 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs text-left">
          {error || localError}
        </div>
      )}

      {/* Normal Mode (Password or Request OTP) */}
      {status !== 'otp_required' ? (
        <div className="w-full space-y-4">
          {/* Riot Games Login Button (Premier Blitz Sign In) */}
          <RiotLoginButton
            isLoading={isSubmitting}
            onClick={() => handleSocialLogin('riot')}
          />

          {/* Social Logins: Discord & Google */}
          <SocialLoginButtons
            isLoading={isSubmitting}
            onLogin={handleSocialLogin}
          />

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="w-full border-t border-neutral-800" />
            <span className="absolute px-3 bg-[#0e1015] text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              OR CONTINUE WITH EMAIL
            </span>
          </div>

          {/* Email & Password Form */}
          {authMode === 'password' ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-3.5 text-left">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-neutral-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (localError) setLocalError(null)
                    }}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#141620] border border-neutral-800 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-neutral-300"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setLocalError('Vui lòng kiểm tra email để đặt lại mật khẩu.')
                    }
                    className="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (localError) setLocalError(null)
                    }}
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#141620] border border-neutral-800 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3.5 top-3 text-neutral-500 hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-neutral-400 hover:text-neutral-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-rose-600 focus:ring-rose-500"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Log In Button */}
              <button
                type="submit"
                disabled={!isValidEmail || !password || isSubmitting}
                className="w-full h-11 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed select-none bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40 shadow-[0_4px_15px_rgba(244,63,94,0.25)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </form>
          ) : (
            /* OTP Request Form */
            <form onSubmit={handleOtpRequest} className="space-y-3.5 text-left">
              <div className="space-y-1.5">
                <label
                  htmlFor="email-otp"
                  className="text-xs font-semibold text-neutral-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    id="email-otp"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (localError) setLocalError(null)
                    }}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#141620] border border-neutral-800 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isValidEmail || isSubmitting}
                className="w-full h-11 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed select-none bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending code...</span>
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </button>
            </form>
          )}

          {/* Toggle between Password and OTP Login */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                setAuthMode((prev) => (prev === 'password' ? 'otp' : 'password'))
                setLocalError(null)
              }}
              className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {authMode === 'password'
                ? 'Sign in with email verification code instead'
                : 'Sign in with password instead'}
            </button>
          </div>
        </div>
      ) : (
        /* OTP Verification Step */
        <form onSubmit={handleOtpVerify} className="w-full space-y-4">
          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
            <div className="flex items-center gap-2 truncate">
              <Mail className="w-4 h-4 text-rose-500 shrink-0" />
              <span className="truncate">{pendingEmail}</span>
            </div>
            <button
              type="button"
              onClick={resetFlow}
              className="text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" /> Change
            </button>
          </div>

          <div className="space-y-1.5 text-left">
            <label htmlFor="otp-input" className="text-xs text-neutral-400 font-medium">
              Verification Code
            </label>
            <input
              id="otp-input"
              type="text"
              autoFocus
              maxLength={6}
              placeholder="e.g. 123456"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
              className="w-full h-12 px-4 rounded-xl bg-[#141620] border border-neutral-700 text-white placeholder:text-neutral-500 text-center tracking-widest text-lg font-mono focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={otpCode.length < 4 || isSubmitting}
            className="w-full h-11 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed select-none bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-40"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Log In</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Don't have an account? Sign Up */}
      <div className="mt-5 text-xs text-neutral-400">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={() => {
            setAuthMode('otp')
            setLocalError('Nhập email của bạn để đăng ký tài khoản mới.')
          }}
          className="text-rose-500 font-semibold hover:underline cursor-pointer"
        >
          Sign Up
        </button>
      </div>

      {/* Footer Legal Terms */}
      <p className="text-[11px] text-neutral-500 mt-4 leading-relaxed">
        By signing in, you agree to our{' '}
        <span className="text-neutral-400 hover:text-white underline cursor-pointer">
          Terms of Service
        </span>{' '}
        and{' '}
        <span className="text-neutral-400 hover:text-white underline cursor-pointer">
          Privacy Policy
        </span>.
      </p>
    </div>
  )
}
