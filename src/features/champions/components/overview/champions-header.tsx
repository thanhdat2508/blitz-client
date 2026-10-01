import { Link2, RefreshCw } from 'lucide-react'

interface ChampionsHeaderProps {
  totalChampions: number
  sPlusCount: number
  isFetching: boolean
  onRefresh: () => void
}

export function ChampionsHeader({
  totalChampions,
  isFetching,
  onRefresh,
}: ChampionsHeaderProps) {
  return (
    <div className="space-y-4 select-none">
      {/* 1. TOP TITLE BLOCK WITH HEXTECH EMBLEM */}
      <div className="flex items-start justify-between gap-4 pt-2">
        <div className="flex items-center gap-3.5">
          {/* Hextech Blue Ranked Crest Emblem */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-b from-[#1C2638] to-[#0F1622] border border-[#2E3C56] flex items-center justify-center shadow-lg shadow-cyan-950/30 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 rotate-45 border border-cyan-300 flex items-center justify-center shadow-inner">
              <div className="w-4 h-4 bg-zinc-950 -rotate-45 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl md:text-2xl lg:text-[26px] font-black text-white tracking-tight leading-tight">
              LoL Champion Tier List & Meta Stats{' '}
              <em className="font-normal text-zinc-400 not-italic">
                for Emerald+ Patch 26.19
              </em>
            </h1>
            <p className="text-zinc-400 text-xs md:text-sm mt-0.5 font-normal">
              Find the strongest League of Legends champions with win rates, pick rates, and tier rankings.
            </p>
            <div className="flex items-center gap-2 text-zinc-500 text-xs mt-0.5 font-normal">
              <p>Data updated 3 hours ago</p>
              {totalChampions > 0 && (
                <>
                  <p>•</p>
                  <p className="font-mono text-zinc-400">
                    {totalChampions} champions
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons on Right */}
        <div className="flex items-center gap-2 mt-1">
          <button
            type="button"
            onClick={onRefresh}
            aria-label="Refresh Data"
            title="Refresh Data"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin text-amber-400' : ''}`} />
          </button>
          <button
            type="button"
            aria-label="Share link"
            title="Share link"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer shrink-0"
          >
            <Link2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SUB-TABS ROW (Ranked Stats) */}
      <div className="flex items-center gap-1 border-b border-zinc-800/80 overflow-x-auto scrollbar-none text-xs md:text-sm font-semibold pt-1">
        <div className="px-3 py-2 text-white border-b-2 border-amber-400 whitespace-nowrap font-bold">
          <p>Ranked Stats</p>
        </div>
      </div>
    </div>
  )
}
