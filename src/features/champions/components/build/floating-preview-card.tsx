import { useEffect, useRef } from 'react'
import { X, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

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
  games: number | string
  pickRate: number
  rect?: DOMRect
  pinned?: boolean
}

interface FloatingPreviewCardProps {
  data: FloatingCardData | null
  onClose: () => void
  onMouseEnter?: () => void
}

function computeCoords(rect?: DOMRect) {
  if (!rect) return { top: 100, left: 100 }
  const cardWidth = 360
  const cardHeight = 280

  // Center horizontally above element
  let left = rect.left + rect.width / 2 - cardWidth / 2
  let top = rect.top - cardHeight - 12

  // If overflowing top of screen, place below element
  if (top < 16) {
    top = rect.bottom + 12
  }

  const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const winHeight = typeof window !== 'undefined' ? window.innerHeight : 800

  // Clamp horizontally to stay inside viewport
  if (left < 16) {
    left = 16
  } else if (left + cardWidth > winWidth - 16) {
    left = winWidth - cardWidth - 16
  }

  // Clamp vertically
  if (top + cardHeight > winHeight - 16) {
    top = Math.max(16, winHeight - cardHeight - 16)
  }

  return { top, left }
}

export function FloatingPreviewCard({ data, onClose, onMouseEnter }: FloatingPreviewCardProps) {
  const { language } = useLanguage()
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

  const title = language === 'en' ? (data.enTitle ?? data.title) : data.title
  const desc = language === 'en' ? (data.enDesc ?? data.desc) : data.desc
  const subDesc = language === 'en' ? (data.enSubDesc ?? data.subDesc) : data.subDesc
  const cooldown = language === 'en' ? (data.enCooldown ?? data.cooldown) : data.cooldown
  const guide = language === 'en' ? (data.enGuide ?? data.guide) : data.guide
  const stats = language === 'en' ? (data.enStats ?? data.stats) : data.stats

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
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-full border-2 border-amber-400/80 p-0.5 shrink-0 bg-zinc-900 overflow-hidden shadow-lg shadow-amber-500/20">
            <img
              src={data.icon}
              alt={title}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-base font-extrabold text-white tracking-tight truncate">
                {title}
              </p>
              {data.tag && (
                <div className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  {data.tag}
                </div>
              )}
            </div>

            {(data.cost || data.tier) && (
              <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium mt-0.5">
                {data.tier && (
                  <p className="text-amber-400/90 font-semibold">{data.tier}</p>
                )}
                {data.tier && data.cost && <p className="text-zinc-600">•</p>}
                {data.cost && (
                  <p className="text-zinc-300 font-mono font-bold">{data.cost}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-200 p-1 rounded-md hover:bg-zinc-800/60 transition-colors"
          title={language === 'en' ? 'Close' : 'Đóng'}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 2. STATS PILLS (IF ANY) */}
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
            {language === 'en' ? `Cooldown: ${cooldown}` : `Hồi chiêu: ${cooldown}`}
          </p>
        )}
      </div>

      {/* 4. TACTICAL GUIDE / MẸO LÊN ĐỒ (IF ANY) */}
      {guide && (
        <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200/90 text-[11px] leading-snug space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <p>{language === 'en' ? 'Tactical Guide' : 'Mẹo lên đồ'}</p>
          </div>
          <p className="text-zinc-300">{guide}</p>
        </div>
      )}

      {/* 5. FOOTER STATS BAR (MATCHING SCREENSHOT 1) */}
      <div className="mt-3.5 pt-2.5 border-t border-zinc-800/90 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <p className="text-zinc-400 font-medium">
            {language === 'en' ? 'WR:' : 'TL Thắng:'}
          </p>
          <p className="font-black text-cyan-400 text-xs sm:text-sm">
            {data.winRate}%
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <p className="text-zinc-400 font-medium">
            {language === 'en' ? 'Games:' : 'Số trận:'}
          </p>
          <p className="font-black text-white text-xs sm:text-sm">
            {data.games}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <p className="text-zinc-400 font-medium">
            {language === 'en' ? 'PR:' : 'TL Chọn:'}
          </p>
          <p className="font-black text-amber-400 text-xs sm:text-sm">
            {data.pickRate}%
          </p>
        </div>
      </div>
    </div>
  )
}
