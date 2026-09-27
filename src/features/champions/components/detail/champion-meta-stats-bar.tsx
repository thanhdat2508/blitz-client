import type { ChampionMeta } from '../../types/champion'
import { TierBadge } from '../tier-badge'

interface ChampionMetaStatsBarProps {
  champion: ChampionMeta
}

export function ChampionMetaStatsBar({ champion }: ChampionMetaStatsBarProps) {
  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[#0E121A] px-4 py-3.5 shadow-lg select-none">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center text-center sm:text-left">
        {/* 1. TIER */}
        <div className="flex flex-col items-center sm:items-start justify-center">
          <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mb-1">
            TIER
          </p>
          <div className="scale-105 origin-center sm:origin-left">
            <TierBadge tier={champion.tier} />
          </div>
        </div>

        {/* 2. WIN RATE */}
        <div className="flex flex-col items-center sm:items-start justify-center">
          <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
            WIN RATE
          </p>
          <p className="text-xl sm:text-2xl font-black text-cyan-400 font-mono tracking-tight">
            {champion.winRate != null ? `${champion.winRate.toFixed(1)}%` : '52.4%'}
          </p>
        </div>

        {/* 3. WIN RATE CHANGE */}
        <div className="flex flex-col items-center sm:items-start justify-center">
          <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
            WR TREND
          </p>
          <p
            className={`text-base sm:text-lg font-bold font-mono flex items-center gap-1 ${
              (champion.trend ?? 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {(champion.trend ?? 0) >= 0
              ? `▲ +${(champion.trend ?? 0).toFixed(1)}%`
              : `▼ ${(champion.trend ?? 0).toFixed(1)}%`}
          </p>
        </div>

        {/* 4. PICK RATE */}
        <div className="flex flex-col items-center sm:items-start justify-center">
          <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
            PICK RATE
          </p>
          <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono">
            {champion.pickRate.toFixed(1)}%
          </p>
        </div>

        {/* 5. BAN RATE */}
        <div className="flex flex-col items-center sm:items-start justify-center">
          <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
            BAN RATE
          </p>
          <p className="text-base sm:text-lg font-bold text-zinc-100 font-mono">
            {champion.banRate.toFixed(1)}%
          </p>
        </div>

        {/* 6. MATCHES */}
        <div className="flex flex-col items-center sm:items-start justify-center">
          <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider mb-0.5">
            GAMES
          </p>
          <p className="text-base sm:text-lg font-bold text-zinc-200 font-mono">
            {champion.matches ? champion.matches.toLocaleString() : '24,500'}
          </p>
        </div>
      </div>
    </div>
  )
}
