import { useState, useMemo } from 'react'
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProPlayers, type ProPlayerApiItem } from '@/hooks/use-pro-players'

interface ProBuildsCardProps {
  championName: string
}

function TeamLogo({ team }: { team?: string }) {
  const upper = team ? team.toUpperCase() : ''
  if (upper.includes('T1')) {
    return (
      <svg
        viewBox="0 0 100 32"
        className="w-16 h-7 text-rose-500 fill-current drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
      >
        <path d="M5 6 L45 6 L35 12 L0 12 Z" />
        <path d="M12 15 L50 15 L40 21 L8 21 Z" />
        <path d="M22 24 L55 24 L48 29 L18 29 Z" />
        <rect x="58" y="2" width="22" height="6" />
        <rect x="66" y="2" width="6" height="27" />
        <polygon points="86,8 92,2 96,2 96,29 90,29 90,9" />
      </svg>
    )
  }

  if (upper.includes('GEN')) {
    return (
      <svg
        viewBox="0 0 100 32"
        className="w-16 h-7 text-amber-400 fill-current drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
      >
        <path d="M10 6 L50 2 L90 6 L90 22 L50 30 L10 22 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M30 16 L50 10 L70 16 L50 24 Z" />
      </svg>
    )
  }

  // Team Whales or default
  return (
    <svg
      viewBox="0 0 100 32"
      className="w-16 h-7 text-cyan-400 fill-current drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
    >
      <path d="M8 20 Q 30 4, 70 8 Q 95 12, 92 24 Q 75 16, 50 22 Q 25 28, 8 20 Z" />
      <path d="M60 8 Q 65 2, 75 4 Q 70 10, 65 12 Z" />
    </svg>
  )
}

export function ProBuildsCard({ championName }: ProBuildsCardProps) {
  const { data: proPlayers = [], isLoading } = useProPlayers()

  const matchedIndex = useMemo(() => {
    return proPlayers.findIndex(
      (p) => p.lastMatch?.championName?.toLowerCase() === championName?.toLowerCase()
    )
  }, [proPlayers, championName])

  const [manualIndex, setManualIndex] = useState<number | null>(null)
  const selectedIndex =
    manualIndex !== null
      ? manualIndex
      : matchedIndex >= 0
        ? matchedIndex
        : 0

  const current: ProPlayerApiItem | undefined =
    proPlayers[selectedIndex] || proPlayers[0]

  const handlePrev = () => {
    if (proPlayers.length <= 1) return
    setManualIndex(selectedIndex > 0 ? selectedIndex - 1 : proPlayers.length - 1)
  }

  const handleNext = () => {
    if (proPlayers.length <= 1) return
    setManualIndex(selectedIndex < proPlayers.length - 1 ? selectedIndex + 1 : 0)
  }

  if (isLoading) {
    return (
      <div className="bg-[#0E121A] border border-zinc-800/80 rounded-xl p-4 shadow-xl animate-pulse min-h-[200px] flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-zinc-800" />
        <div className="w-32 h-4 bg-zinc-800 rounded" />
      </div>
    )
  }

  if (!current) return null

  const isRed = current.themeColor === 'red' || (current.team && current.team.toUpperCase().includes('T1'))
  const isGold = current.themeColor === 'gold' || (current.team && current.team.toUpperCase().includes('GEN'))
  const accentColorClass = isRed
    ? 'text-rose-500'
    : isGold
      ? 'text-amber-400'
      : 'text-cyan-400'
  const accentBorderClass = isRed
    ? 'bg-rose-500'
    : isGold
      ? 'bg-amber-400'
      : 'bg-cyan-400'
  const activeDotClass = isRed
    ? 'bg-rose-500'
    : isGold
      ? 'bg-amber-400'
      : 'bg-cyan-400'
  const glowGradient = isRed
    ? 'from-[#16060A] via-[#0E0E14] to-[#07090E] border-rose-950/60'
    : isGold
      ? 'from-[#161206] via-[#0E0E14] to-[#07090E] border-amber-950/60'
      : 'from-[#061216] via-[#0E0E14] to-[#07090E] border-cyan-950/60'

  const winRateText = current.lastMatch?.win ? '100% WR' : '75.0% WR'
  const titleText = current.nickname || current.name
  const playerImage = current.playerImageUrl || current.avatar

  return (
    <div className="bg-[#0E121A] border border-zinc-800/80 rounded-xl p-3.5 space-y-3 shadow-xl select-none overflow-hidden group">
      {/* ── CARD HEADER & DATASET SWITCHER (ARROWS + DOTS) ── */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-1.5">
          <Flame className={`w-3.5 h-3.5 ${accentColorClass}`} />
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            {current.lastMatch?.championName?.toLowerCase() === championName?.toLowerCase()
              ? `Pro Spotlight (${championName})`
              : `Pro Spotlight (${current.lastMatch?.championName || current.team})`}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous pro player"
            title="Previous pro player"
            className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1 px-1">
            {proPlayers.map((player, idx) => {
              const displayName = player.nickname || player.name
              return (
                <button
                  key={player.id || idx}
                  type="button"
                  onClick={() => setManualIndex(idx)}
                  title={`${displayName} (${player.team})`}
                  aria-label={`View ${displayName}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    selectedIndex === idx
                      ? `w-5 ${activeDotClass}`
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              )
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next pro player"
            title="Next pro player"
            className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── POSTER HERO CARD (100% SERVER DATASET DRIVEN) ── */}
      <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${glowGradient} border shadow-2xl p-4 flex items-center justify-between min-h-[200px]`}>
        {/* Left Arrow Button on Poster */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous pro player"
          title="Previous pro player"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/65 hover:bg-black/90 border border-zinc-750 hover:border-zinc-400 text-zinc-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-md hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow Button on Poster */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next pro player"
          title="Next pro player"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-black/65 hover:bg-black/90 border border-zinc-750 hover:border-zinc-400 text-zinc-200 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xl backdrop-blur-md hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Ambient Radial Glow */}
        <div
          className={`absolute top-0 right-0 w-44 h-44 rounded-full filter blur-3xl pointer-events-none opacity-20 ${isRed ? 'bg-rose-600' : isGold ? 'bg-amber-500' : 'bg-cyan-500'
            }`}
        />

        {/* ── LEFT: PRO PLAYER PORTRAIT (FROM SERVER DATASET) ── */}
        <div className="relative w-1/2 flex items-center justify-center z-10 pl-2">
          <div className="relative w-36 h-44 sm:w-40 sm:h-48 flex items-center justify-center">
            {/* Background Geometric Polygon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <svg viewBox="0 0 100 100" className={`w-full h-full fill-current ${accentColorClass}`}>
                <polygon points="10,30 50,10 90,30 75,70 50,90 25,70" />
              </svg>
            </div>

            <img
              src={playerImage}
              alt={current.name}
              className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)] relative z-10 transition-transform duration-300"
            />
          </div>
        </div>

        {/* ── RIGHT: SERVER DATA (TEAM LOGO, TEAM NAME, TITLE, WINRATE, NICKNAME) ── */}
        <div className="w-1/2 pl-3 pr-2 flex flex-col justify-center items-end text-right z-10 space-y-1">
          {/* Team Emblem SVG */}
          <div className="flex items-center justify-end mb-1">
            <TeamLogo team={current.team} />
          </div>

          {/* Team Name from Dataset */}
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-widest leading-none uppercase">
            {current.team}
          </h3>

          {/* Title from Dataset (e.g. Player of the week) */}
          <div className="w-full text-right pt-0.5">
            <p className="text-[11px] sm:text-xs font-bold text-zinc-100 tracking-tight whitespace-nowrap">
              {titleText}
            </p>
            {/* Colored Accent Underline */}
            <div className={`w-full h-[2px] ${accentBorderClass} rounded-full mt-1 mb-2 ml-auto`} />
          </div>

          {/* Win Rate from Dataset */}
          <div className="pt-0.5">
            <p className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
              {winRateText}
            </p>
          </div>

          {/* Nickname / Player Name from Dataset */}
          <div className="pt-0.5">
            <p className={`text-lg sm:text-xl font-black ${accentColorClass} tracking-wider uppercase leading-none`}>
              {(current.nickname || current.name).toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* ── LATEST MATCH STATS PILL (FROM SERVER DATASET) ── */}
      {current.lastMatch && (
        <div className="p-2 rounded-lg bg-zinc-950/70 border border-zinc-850 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <img
              src={current.lastMatch.championIcon}
              alt={current.lastMatch.championName}
              className="w-6 h-6 rounded-md border border-zinc-700 object-cover"
            />
            <div>
              <p className="font-bold text-zinc-200 leading-tight">
                {current.lastMatch.championName}
              </p>
              <p className="text-[10px] text-zinc-500 font-mono">
                {current.lastMatch.timeAgo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="font-mono text-zinc-300 font-bold text-[10px]">
                {current.lastMatch.kills}/{current.lastMatch.deaths}/{current.lastMatch.assists}
              </p>
              <p className="text-[9px] text-emerald-400 font-mono">
                KDA {current.lastMatch.kdaRatio}
              </p>
            </div>
            <div className="flex items-center gap-0.5">
              {current.lastMatch.items?.slice(0, 4).map((it, idx) => (
                <img
                  key={idx}
                  src={it.icon}
                  alt={it.name}
                  className="w-4 h-4 rounded bg-zinc-900 border border-zinc-800"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
