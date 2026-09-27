import { useState } from 'react'
import type { ChampionMeta } from '../types/champion'
import { TierBadge } from './tier-badge'
import { RoleIcon } from './role-icons'
import { ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

interface ChampionCardProps {
  champion: ChampionMeta
  onSelect: (champion: ChampionMeta) => void
}

export function ChampionCard({ champion, onSelect }: ChampionCardProps) {
  const [imgError, setImgError] = useState(false)
  const { language } = useLanguage()

  return (
    <section
      onClick={() => onSelect(champion)}
      className="group relative bg-zinc-900/80 hover:bg-zinc-800/80 border border-zinc-800 hover:border-rose-500/50 rounded-xl overflow-hidden p-3.5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-lg hover:shadow-rose-950/20 select-none flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700/80 group-hover:border-rose-500/80 transition-colors shrink-0">
              {!imgError ? (
                <img
                  src={champion.avatarUrl}
                  alt={champion.name}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-xs font-bold text-zinc-400">
                  {champion.name.slice(0, 2)}
                </div>
              )}
            </div>
            <div>
              <p className="font-bold text-sm text-zinc-100 group-hover:text-rose-400 transition-colors">
                {champion.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="p-0.5 rounded bg-zinc-800 text-zinc-400">
                  <RoleIcon role={champion.primaryRole} className="w-3 h-3" />
                </div>
                <p className="text-xs text-zinc-500 line-clamp-1">{champion.title}</p>
              </div>
            </div>
          </div>
          <TierBadge tier={champion.tier} />
        </div>

        <div className="grid grid-cols-3 gap-2 py-2 px-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/60 mb-3 text-center">
          <div>
            <p className="text-[11px] text-zinc-500 font-medium">
              {language === 'en' ? 'Win' : 'Thắng'}
            </p>
            <p
              className={`text-xs font-bold ${
                champion.winRate >= 51.5
                  ? 'text-emerald-400'
                  : champion.winRate <= 48.8
                  ? 'text-rose-400'
                  : 'text-zinc-200'
              }`}
            >
              {champion.winRate.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-medium">
              {language === 'en' ? 'Pick' : 'Chọn'}
            </p>
            <p className="text-xs font-semibold text-zinc-300">{champion.pickRate.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-medium">
              {language === 'en' ? 'Ban' : 'Cấm'}
            </p>
            <p className="text-xs font-semibold text-zinc-400">{champion.banRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/70 text-xs text-zinc-400">
        <p className="font-mono text-[11px]">
          {champion.matches.toLocaleString()} {language === 'en' ? 'matches' : 'trận'}
        </p>
        <button
          type="button"
          className="flex items-center gap-1 text-rose-400 group-hover:text-rose-300 font-medium cursor-pointer"
        >
          <p>{language === 'en' ? 'View Build' : 'Xem Build'}</p>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  )
}
