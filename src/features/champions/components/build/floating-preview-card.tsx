import { useEffect, useRef } from 'react'
import { X, Sparkles } from 'lucide-react'

export interface FloatingCardData {
  title: string
  enTitle?: string
  icon: string
  tag?: string
  cost?: string
  tier?: string
  stats?: string[]
  enStats?: string[]
  desc: string
  enDesc?: string
  subDesc?: string
  enSubDesc?: string
  cooldown?: string
  enCooldown?: string
  guide?: string
  enGuide?: string
  winRate: number
  games: string | number
  pickRate: number
  rect?: DOMRect
}

interface FloatingPreviewCardProps {
  data: FloatingCardData | null
  onClose: () => void
  onMouseEnter?: () => void
}

function computeCoords(rect?: DOMRect) {
  if (!rect) return { top: 120, left: 120 }

  const cardWidth = 360
  const cardHeight = 280

  // Position nicely to the right or left of element
  let left = rect.right + 12
  let top = rect.top - 20

  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1440
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 800

  // Clamp horizontally to stay inside viewport
  if (left < 16) {
    left = 16
  } else if (left + cardWidth > winWidth - 16) {
    left = Math.max(16, rect.left - cardWidth - 12)
  }

  // Clamp vertically
  if (top + cardHeight > winHeight - 16) {
    top = Math.max(16, winHeight - cardHeight - 16)
  }

  return { top, left }
}

export function FloatingPreviewCard({ data, onClose, onMouseEnter }: FloatingPreviewCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const coords = computeCoords(data?.rect)

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!data) return null

  const title = data.enTitle ?? data.title
  const desc = data.enDesc ?? data.desc
  const subDesc = data.enSubDesc ?? data.subDesc
  const cooldown = data.enCooldown ?? data.cooldown
  const guide = data.enGuide ?? data.guide
  const stats = data.enStats ?? data.stats

  return (
    <div
      ref={cardRef}
      style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onClose}
      className="fixed z-[9999] w-[350px] sm:w-[370px] rounded-2xl bg-[#0B0E14]/95 border border-zinc-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl p-4 text-zinc-100 select-none animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. HEADER (ICON + TITLE + TAG + CLOSE BUTTON) */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 p-1 flex items-center justify-center shrink-0 shadow-md">
            <img
              src={data.icon}
              alt={title}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm sm:text-base text-white tracking-tight">
                {title}
              </h4>
              {data.tag && (
                <div className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase tracking-wider">
                  {data.tag}
                </div>
              )}
            </div>
            {data.cost && (
              <p className="text-amber-400 font-mono text-xs font-semibold mt-0.5">
                {data.cost} Gold
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Preview"
          className="w-6 h-6 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. STATS CHIPS (IF ANY) */}
      {stats && stats.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-750 text-cyan-300 text-[11px] font-semibold font-mono"
            >
              {stat}
            </div>
          ))}
        </div>
      )}

      {/* 3. BODY DESCRIPTION & SCALING */}
      <div className="mt-3 space-y-1.5 text-xs text-zinc-300 leading-relaxed">
        <p className="font-normal">{desc}</p>
        {subDesc && (
          <p className="text-zinc-400 text-[11px] leading-snug">{subDesc}</p>
        )}
        {cooldown && (
          <p className="text-zinc-400 font-mono text-[11px] pt-1">
            Cooldown: {cooldown}
          </p>
        )}
      </div>

      {/* 4. TACTICAL GUIDE */}
      {guide && (
        <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 text-[11px] leading-snug space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <p>Tactical Guide</p>
          </div>
          <p className="text-zinc-300">{guide}</p>
        </div>
      )}

      {/* 5. FOOTER STATS BAR */}
      <div className="mt-3.5 pt-2.5 border-t border-zinc-800/90 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <p className="text-zinc-400 font-medium">WR:</p>
          <p className="font-black text-cyan-400 text-xs sm:text-sm">
            {data.winRate}%
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <p className="text-zinc-400 font-medium">Games:</p>
          <p className="font-black text-white text-xs sm:text-sm">
            {data.games}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <p className="text-zinc-400 font-medium">PR:</p>
          <p className="font-black text-amber-400 text-xs sm:text-sm">
            {data.pickRate}%
          </p>
        </div>
      </div>
    </div>
  )
}
