import { RiotIcon } from './social-icons'
import { Loader2 } from 'lucide-react'

interface RiotLoginButtonProps {
  isLoading?: boolean
  onClick: () => void
}

export function RiotLoginButton({ isLoading, onClick }: RiotLoginButtonProps) {
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={onClick}
      className="w-full h-12 px-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed select-none bg-[#e60026] hover:bg-[#cf0022] active:scale-[0.99] text-white shadow-[0_4px_16px_rgba(230,0,38,0.25)] border border-[#ff3355]/30 group"
      aria-label="Đăng nhập bằng Riot Games"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Đang kết nối Riot Games...</span>
        </>
      ) : (
        <>
          <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[#e60026] shrink-0 shadow-sm transition-transform group-hover:scale-105">
            <RiotIcon className="w-3.5 h-3.5 fill-current" />
          </div>
          <span>Đăng nhập bằng Riot Games</span>
        </>
      )}
    </button>
  )
}
