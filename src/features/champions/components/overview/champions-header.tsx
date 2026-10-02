import { Link2, RefreshCw } from "lucide-react";

interface ChampionsHeaderProps {
  totalChampions: number;
  sPlusCount: number;
  isFetching: boolean;
  onRefresh: () => void;
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
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-xl md:text-2xl lg:text-[26px] font-black text-white tracking-tight leading-tight">
              LoL Champion Tier List & Meta Stats{" "}
              <em className="font-normal text-zinc-400 not-italic">
                for Emerald+ Patch 26.19
              </em>
            </h1>
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
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin text-amber-400" : ""}`}
            />
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
  );
}
