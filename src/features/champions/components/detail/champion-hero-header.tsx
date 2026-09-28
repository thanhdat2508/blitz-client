import { useState } from 'react'
import { Link, Check } from 'lucide-react'
import type { ChampionMeta, Role } from '../../types/champion'
import { TierBadge } from '../tier-badge'
import { getChampionAvatarUrl } from '../../data/ddragon-ids'

interface ChampionHeroHeaderProps {
  champion: ChampionMeta
  selectedRole?: Role
}

const ROLE_DISPLAY_NAMES: Record<string, string> = {
  MID: 'Mid',
  TOP: 'Top',
  JUNGLE: 'Jungle',
  ADC: 'ADC',
  SUPPORT: 'Support',
}

export function ChampionHeroHeader({ champion, selectedRole }: ChampionHeroHeaderProps) {
  const [copied, setCopied] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const [avatarFailed, setAvatarFailed] = useState(false)

  const activeRole = selectedRole ?? champion.primaryRole
  const champKey = champion.id || champion.name

  const canonicalAvatarUrl = getChampionAvatarUrl(champKey)
  const avatarSrc = imgErr ? canonicalAvatarUrl : (champion.avatarUrl || canonicalAvatarUrl)
  const roleText = ROLE_DISPLAY_NAMES[activeRole] || activeRole

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-3 select-none">
      {/* 1. BREADCRUMBS */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500">
        <p className="hover:text-zinc-300 transition-colors cursor-pointer">
          League of Legends
        </p>
        <p className="text-zinc-600">/</p>
        <p className="hover:text-zinc-300 transition-colors cursor-pointer">
          Champions
        </p>
        <p className="text-zinc-600">/</p>
        <p className="text-zinc-300 font-medium">
          {champion.name} {roleText} Build
        </p>
      </nav>

      {/* 2. MAIN HERO HEADER BANNER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left: Avatar with Tier badge + Title & Subtitle */}
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-amber-500/80 bg-zinc-900 shadow-xl shadow-amber-500/10 flex items-center justify-center">
              {!avatarFailed ? (
                <img
                  src={avatarSrc}
                  alt={champion.name}
                  loading="eager"
                  fetchPriority="high"
                  width={80}
                  height={80}
                  onError={() => {
                    if (!imgErr) {
                      setImgErr(true)
                    } else {
                      setAvatarFailed(true)
                    }
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-900/60 to-zinc-950 flex items-center justify-center font-black text-amber-400 text-lg">
                  {champion.name.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            {/* Tier Badge Overlay */}
            <div className="absolute -bottom-1 left-1.5 shadow-md">
              <TierBadge tier={champion.tier} />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-lg sm:text-2xl font-black text-white tracking-tight">
              {champion.name} {roleText} Build & Runes - Patch 26.19 (Emerald+)
            </h1>
            <p className="text-xs text-zinc-400 max-w-3xl">
              Optimal runes, items, skill order, and win rate stats for {champion.name} {roleText} in Emerald+ on Patch 26.19.
            </p>
            <p className="text-[11px] text-zinc-500 font-medium">
              Data updated 3 hours ago.
            </p>
          </div>
        </div>

        {/* Right: Share / Copy Link Button */}
        <div className="relative">
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy link"
            title={copied ? "Copied link!" : "Copy link"}
            className={`w-9 h-9 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/20'
                : 'bg-zinc-900 border-zinc-700/80 hover:bg-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
          </button>
          {copied && (
            <div className="absolute -bottom-8 right-0 whitespace-nowrap px-2 py-0.5 rounded bg-emerald-900 border border-emerald-700 text-emerald-200 text-[10px] font-bold shadow-lg animate-fade-in">
              Copied link!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
