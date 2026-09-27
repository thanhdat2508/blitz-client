import type { Tier } from '../types/champion'

interface TierBadgeProps {
  tier: Tier
  className?: string
}

export function TierBadge({ tier, className = '' }: TierBadgeProps) {
  // Signature pentagon ribbon shield
  const getColors = () => {
    switch (tier) {
      case 'S+':
      case 'S':
        return 'bg-gradient-to-b from-amber-400 to-amber-500 text-zinc-950 shadow-sm shadow-amber-500/20'
      case 'A':
        return 'bg-gradient-to-b from-purple-400 to-purple-500 text-white shadow-sm shadow-purple-500/20'
      case 'B':
        return 'bg-gradient-to-b from-blue-400 to-blue-500 text-white'
      case 'C':
        return 'bg-gradient-to-b from-emerald-400 to-emerald-500 text-white'
      case 'D':
      default:
        return 'bg-gradient-to-b from-zinc-500 to-zinc-600 text-white'
    }
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center w-5 h-6 text-xs font-black select-none ${getColors()} ${className}`}
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)',
      }}
    >
      <div className="text-[11px] font-black tracking-tighter pb-0.5">{tier}</div>
    </div>
  )
}
