import { useState } from 'react'
import type { ChampionMeta } from '../types/champion'
import { TierBadge } from './tier-badge'
import { RoleIcon } from './role-icons'

interface ChampionRowProps {
  champion: ChampionMeta
  index: number
  onSelect: (champion: ChampionMeta) => void
}

export function ChampionRow({ champion, index, onSelect }: ChampionRowProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <tr
      onClick={() => onSelect(champion)}
      className="group hover:bg-[#1A202C]/80 transition-colors border-b border-zinc-800/60 cursor-pointer select-none text-xs md:text-sm"
    >
      {/* 1. RANK */}
      <td className="py-3 px-3 text-center text-zinc-400 font-semibold w-12">
        <div className="font-mono">{champion.rank ?? (index + 1)}</div>
      </td>

      {/* 2. ROLE */}
      <td className="py-3 px-3 text-center w-12">
        <div className="flex items-center justify-center text-zinc-300">
          <RoleIcon role={champion.primaryRole} className="w-4 h-4" />
        </div>
      </td>

      {/* 3. CHAMPION */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-md overflow-hidden bg-zinc-800 border border-zinc-700/80 shrink-0">
            {!imgError ? (
              <img
                src={champion.avatarUrl}
                alt={champion.name}
                loading="lazy"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-[10px] font-bold text-zinc-400">
                {champion.name.slice(0, 2)}
              </div>
            )}
          </div>
          <p className="font-bold text-zinc-200 group-hover:text-white transition-colors">
            {champion.name}
          </p>
        </div>
      </td>

      {/* 4. TIER */}
      <td className="py-3 px-3 text-center w-16">
        <div className="flex items-center justify-center">
          <TierBadge tier={champion.tier} />
        </div>
      </td>

      {/* 5. WIN RATE */}
      <td className="py-3 px-4 text-center">
        <div className="inline-block text-center">
          <p className="font-bold text-emerald-400 text-xs md:text-sm">
            {champion.winRate.toFixed(1)}%
          </p>
          <div className="w-12 h-0.5 bg-emerald-500/40 rounded-full mx-auto mt-1" />
        </div>
      </td>

      {/* 6. PATCH WR CHANGE */}
      <td className="py-3 px-4 text-center">
        <div className="inline-flex items-center justify-center gap-0.5 font-bold text-xs">
          {champion.trend >= 0 ? (
            <p className="text-emerald-400">
              ^ +{champion.trend.toFixed(1)}%
            </p>
          ) : (
            <p className="text-rose-400">
              v {champion.trend.toFixed(1)}%
            </p>
          )}
        </div>
      </td>

      {/* 7. BAN RATE */}
      <td className="py-3 px-4 text-center">
        <div className="inline-block text-center">
          <p className="text-zinc-300 font-medium text-xs">
            {champion.banRate.toFixed(1)}%
          </p>
          <div className="w-12 h-0.5 bg-cyan-500/30 rounded-full mx-auto mt-1">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${Math.min(100, champion.banRate * 5)}%` }}
            />
          </div>
        </div>
      </td>

      {/* 8. PICK RATE */}
      <td className="py-3 px-4 text-center">
        <div className="inline-block text-center">
          <p className="text-zinc-300 font-medium text-xs">
            {champion.pickRate.toFixed(1)}%
          </p>
          <div className="w-12 h-0.5 bg-cyan-500/30 rounded-full mx-auto mt-1">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${Math.min(100, champion.pickRate * 6)}%` }}
            />
          </div>
        </div>
      </td>

      {/* 9. MATCHES */}
      <td className="py-3 px-4 text-center text-zinc-300 font-mono text-xs">
        <p>{champion.matches.toLocaleString()}</p>
      </td>
    </tr>
  )
}
