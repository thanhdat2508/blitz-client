import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { LoginForm } from '@/features/auth'
import { useAuth } from '@/features/auth'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated && user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4">
        <div className="w-full max-w-sm p-8 rounded-2xl bg-[#14151b] border border-neutral-800 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">Already Signed In</h2>
            <p className="text-xs text-neutral-400 mt-1">
              You are logged in as <span className="text-white font-medium">{user.name}</span> ({user.email})
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              to="/"
              className="w-full h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              Go to Home <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-full h-11 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-sm transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-8 px-4">
      <div className="w-full max-w-md p-6 sm:p-10 rounded-2xl bg-[#111218] border border-neutral-800 shadow-2xl relative overflow-hidden">
        {/* Subtle top glow highlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
        <LoginForm onSuccess={() => navigate({ to: '/' })} />
      </div>
    </div>
  )
}
