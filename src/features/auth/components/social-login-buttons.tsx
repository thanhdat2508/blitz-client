import * as React from 'react'
import { DiscordIcon, GoogleIcon } from './social-icons'
import { Loader2 } from 'lucide-react'

interface SocialLoginButtonsProps {
  isLoading?: boolean
  onLogin: (provider: 'discord' | 'google') => void
}

export function SocialLoginButtons({ isLoading, onLogin }: SocialLoginButtonsProps) {
  const [activeProvider, setActiveProvider] = React.useState<'discord' | 'google' | null>(null)

  const handleSocialClick = (provider: 'discord' | 'google') => {
    if (isLoading) return
    setActiveProvider(provider)
    onLogin(provider)
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {/* Discord Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={() => handleSocialClick('discord')}
        className="h-12 flex items-center justify-center rounded-2xl bg-[#5865F2] hover:bg-[#4752c4] active:scale-[0.98] transition-all text-white shadow-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2]/50"
        aria-label="Continue with Discord"
      >
        {isLoading && activeProvider === 'discord' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <DiscordIcon className="w-6 h-6 transition-transform group-hover:scale-105" />
        )}
      </button>

      {/* Google Button */}
      <button
        type="button"
        disabled={isLoading}
        onClick={() => handleSocialClick('google')}
        className="h-12 flex items-center justify-center rounded-2xl bg-white hover:bg-neutral-100 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Continue with Google"
      >
        {isLoading && activeProvider === 'google' ? (
          <Loader2 className="w-5 h-5 animate-spin text-neutral-800" />
        ) : (
          <GoogleIcon className="w-5 h-5 transition-transform group-hover:scale-105" />
        )}
      </button>
    </div>
  )
}
