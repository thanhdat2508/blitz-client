import type { TierChampionApiItem } from "@/lib/tier-list";
import { TierBadge } from "./tier-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Crown } from "lucide-react";

interface LeaderboardTableProps {
  items: TierChampionApiItem[];
}

export function LeaderboardTable({ items }: LeaderboardTableProps) {
  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-neutral-400 bg-[#12141e] rounded-2xl border border-neutral-800">
        <p className="text-sm font-medium">No champions found matching the current filters.</p>
        <p className="text-xs text-neutral-500 mt-1">Try adjusting your role, tier, or search keyword.</p>
      </div>
    );
  }

  const formatMatches = (num: number) => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center gap-1 font-black text-amber-400 font-mono">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>1</span>
        </div>
      );
    }
    if (rank === 2) {
      return <span className="font-black text-slate-300 font-mono">2</span>;
    }
    if (rank === 3) {
      return <span className="font-black text-amber-700 font-mono">3</span>;
    }
    return <span className="text-neutral-500 font-mono text-xs">{rank}</span>;
  };

  return (
    <div className="rounded-2xl border border-neutral-800 bg-[#10121a] shadow-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-[#141622] border-b border-neutral-800/80">
          <TableRow className="border-neutral-800/80 hover:bg-transparent">
            <TableHead className="py-3.5 pl-4 pr-2 text-center w-12 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              #
            </TableHead>
            <TableHead className="py-3.5 px-3 min-w-48 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Champion
            </TableHead>
            <TableHead className="py-3.5 px-3 text-center w-20 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Tier
            </TableHead>
            <TableHead className="py-3.5 px-3 min-w-36 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Win Rate
            </TableHead>
            <TableHead className="py-3.5 px-3 text-right text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Pick Rate
            </TableHead>
            <TableHead className="py-3.5 px-3 text-right text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Ban Rate
            </TableHead>
            <TableHead className="py-3.5 px-3 text-right text-[11px] font-bold text-neutral-400 uppercase tracking-wider hidden sm:table-cell">
              Matches
            </TableHead>
            <TableHead className="py-3.5 pr-4 pl-3 text-right text-[11px] font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">
              Trend
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-neutral-800/60">
          {items.map((champ) => {
            const winRate = Number(champ.winRate) || 50;
            const pickRate = Number(champ.pickRate) || 0;
            const banRate = Number(champ.banRate) || 0;
            const change = Number(champ.patchWrChange) || 0;

            // Bar fill width mapped between 46% - 54%
            const barWidth = Math.min(
              100,
              Math.max(15, Math.round(((winRate - 46) / 8) * 100)),
            );

            const isHighWr = winRate >= 52;
            const isLowWr = winRate < 49;

            return (
              <TableRow
                key={`${champ.championId}-${champ.role}`}
                className="border-neutral-800/60 hover:bg-[#161825] transition-colors cursor-pointer group"
              >
                {/* Rank # */}
                <TableCell className="py-3 pl-4 pr-2 text-center font-semibold">
                  {getRankBadge(champ.rank)}
                </TableCell>

                {/* Champion Info */}
                <TableCell className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={champ.avatarUrl}
                        alt={champ.name}
                        loading="lazy"
                        className="w-9 h-9 rounded-xl object-cover bg-neutral-900 border border-neutral-700/60 group-hover:border-rose-500/50 transition-colors"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute -bottom-1 -right-1 text-[9px] font-black uppercase px-1 py-0 h-4 rounded bg-neutral-950 border border-neutral-700 text-neutral-300"
                      >
                        {champ.role}
                      </Badge>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors truncate">
                        {champ.name}
                      </span>
                      <span className="text-[11px] text-neutral-500 capitalize">
                        {champ.role === "ad"
                          ? "ADC / Bot"
                          : champ.role === "sp"
                            ? "Support"
                            : champ.role}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Tier Badge */}
                <TableCell className="py-3 px-3 text-center">
                  <TierBadge tier={champ.tier} size="md" />
                </TableCell>

                {/* Win Rate with progress bar */}
                <TableCell className="py-3 px-3">
                  <div className="flex flex-col gap-1 max-w-36">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-black font-mono ${
                          isHighWr
                            ? "text-emerald-400"
                            : isLowWr
                              ? "text-rose-400"
                              : "text-neutral-200"
                        }`}
                      >
                        {winRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isHighWr
                            ? "bg-emerald-500"
                            : isLowWr
                              ? "bg-rose-500"
                              : "bg-blue-500"
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                </TableCell>

                {/* Pick Rate */}
                <TableCell className="py-3 px-3 text-right font-mono font-medium text-neutral-300">
                  {pickRate.toFixed(1)}%
                </TableCell>

                {/* Ban Rate */}
                <TableCell className="py-3 px-3 text-right font-mono font-medium text-neutral-300">
                  {banRate.toFixed(1)}%
                </TableCell>

                {/* Matches Count */}
                <TableCell className="py-3 px-3 text-right font-mono text-neutral-400 hidden sm:table-cell">
                  {formatMatches(champ.matches || 0)}
                </TableCell>

                {/* Patch Trend Change */}
                <TableCell className="py-3 pr-4 pl-3 text-right hidden md:table-cell font-mono">
                  {change > 0 ? (
                    <span className="text-emerald-400 flex items-center justify-end gap-0.5">
                      <TrendingUp className="w-3 h-3" />
                      +{change.toFixed(1)}%
                    </span>
                  ) : change < 0 ? (
                    <span className="text-rose-400 flex items-center justify-end gap-0.5">
                      <TrendingDown className="w-3 h-3" />
                      {change.toFixed(1)}%
                    </span>
                  ) : (
                    <span className="text-neutral-500 flex items-center justify-end gap-0.5">
                      <Minus className="w-3 h-3" />
                      0.0%
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
