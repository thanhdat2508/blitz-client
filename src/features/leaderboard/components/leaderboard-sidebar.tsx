import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  X,
  RotateCcw,
  ShieldAlert,
  Flame,
  Swords,
  Crosshair,
  HeartHandshake,
  Compass,
} from "lucide-react";
import type {
  LeaderboardRole,
  LeaderboardTier,
  LeaderboardRank,
  LeaderboardSortBy,
} from "../types/leaderboard.types";

interface LeaderboardSidebarProps {
  role: LeaderboardRole;
  tier: LeaderboardTier;
  rank: LeaderboardRank;
  search: string;
  sortBy: LeaderboardSortBy;
  onRoleChange: (role: LeaderboardRole) => void;
  onTierChange: (tier: LeaderboardTier) => void;
  onRankChange: (rank: LeaderboardRank) => void;
  onSearchChange: (search: string) => void;
  onSortByChange: (sortBy: LeaderboardSortBy) => void;
  onResetFilters: () => void;
  tierCounts?: Record<string, number>;
  className?: string;
}

const ROLES: Array<{
  id: LeaderboardRole;
  label: string;
  icon: typeof Compass;
}> = [
  { id: "all", label: "All Roles", icon: Compass },
  { id: "top", label: "Top Lane", icon: ShieldAlert },
  { id: "jungle", label: "Jungle", icon: Flame },
  { id: "mid", label: "Mid Lane", icon: Swords },
  { id: "ad", label: "ADC / Bot", icon: Crosshair },
  { id: "sp", label: "Support", icon: HeartHandshake },
];

const TIERS: Array<{
  id: LeaderboardTier;
  label: string;
  subLabel: string;
  svgName?: string;
}> = [
  {
    id: "all",
    label: "All Tiers",
    subLabel: "All Ratings",
    svgName: undefined,
  },
  { id: "S", label: "Tier S", subLabel: "God Tier", svgName: "tier_s.svg" },
  { id: "A", label: "Tier A", subLabel: "Strong", svgName: "tier_a.svg" },
  { id: "B", label: "Tier B", subLabel: "Balanced", svgName: "tier_b.svg" },
  { id: "C", label: "Tier C", subLabel: "Situational", svgName: "tier_c.svg" },
  { id: "D", label: "Tier D", subLabel: "Underperforming", svgName: "tier_d.svg" },
];

const RANKS: Array<{ id: LeaderboardRank; label: string }> = [
  { id: "emerald", label: "Emerald+" },
  { id: "diamond", label: "Diamond+" },
  { id: "master", label: "Master+" },
  { id: "grandmaster", label: "Grandmaster" },
  { id: "challenger", label: "Challenger" },
  { id: "all", label: "All Ranks" },
];

export function LeaderboardSidebar({
  role,
  tier,
  rank,
  search,
  sortBy,
  onRoleChange,
  onTierChange,
  onRankChange,
  onSearchChange,
  onSortByChange,
  onResetFilters,
  tierCounts,
  className = "",
}: LeaderboardSidebarProps) {
  const hasActiveFilters =
    role !== "all" || tier !== "all" || rank !== "emerald" || !!search;

  return (
    <div className={`space-y-5 text-neutral-200 ${className}`}>
      {/* 1. Header & Reset Button */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-400">
          Filters
        </h2>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={onResetFilters}
            className="text-[11px] text-neutral-400 hover:text-white h-7 px-2"
          >
            <RotateCcw className="w-3 h-3 mr-1" /> Reset
          </Button>
        )}
      </div>

      {/* 2. Champion Search */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-300">
          Search Champions
        </label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5 pointer-events-none z-10" />
          <Input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search champion (e.g. Ahri, Jinx...)"
            className="h-9 pl-8 pr-7 text-xs bg-[#141622] border-neutral-800 text-white rounded-xl w-full"
          />
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onSearchChange("")}
              className="absolute right-1.5 top-1.5 h-6 w-6 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      <Separator className="bg-neutral-800/80" />

      {/* 3. Role / Lane Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-300">
          Role / Position
        </label>
        <div className="flex flex-col gap-1">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isActive = role === r.id;
            return (
              <Button
                key={r.id}
                type="button"
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleChange(r.id)}
                className={`w-full justify-start h-8 px-2.5 text-xs font-medium rounded-xl transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-rose-600 hover:bg-rose-500 text-white font-semibold shadow-sm shadow-rose-600/20"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 mr-2 shrink-0" />
                <span className="truncate">{r.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-neutral-800/80" />

      {/* 4. Tier List Filter using public/tier_*.svg */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-neutral-300">
            Tier Classification
          </label>
          <span className="text-[10px] text-neutral-500 font-mono">Meta</span>
        </div>

        <div className="flex flex-col gap-1">
          {TIERS.map((t) => {
            const isActive = tier === t.id;
            const totalCount = tierCounts
              ? Object.values(tierCounts).reduce((acc, c) => acc + (c || 0), 0)
              : undefined;
            const count =
              t.id === "all"
                ? totalCount
                : tierCounts
                ? tierCounts[t.id]
                : undefined;

            return (
              <Button
                key={t.id}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onTierChange(t.id)}
                className={`w-full justify-between h-9 px-2.5 rounded-xl border transition-all cursor-pointer select-none ${
                  isActive
                    ? "bg-white text-black border-white hover:bg-neutral-200 shadow-md font-bold"
                    : "border-neutral-800/80 bg-[#12141f] text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {t.svgName ? (
                    <img
                      src={`/${t.svgName}`}
                      alt={t.label}
                      className="w-5 h-5 object-contain shrink-0 drop-shadow"
                    />
                  ) : (
                    <span className="w-5 h-5 rounded-md bg-neutral-800 flex items-center justify-center text-[10px] font-black text-neutral-400 shrink-0">
                      ★
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-xs">{t.label}</span>
                    <span
                      className={`text-[10px] truncate ${
                        isActive ? "text-neutral-600" : "text-neutral-500"
                      }`}
                    >
                      ({t.subLabel})
                    </span>
                  </div>
                </div>

                {count !== undefined && (
                  <Badge
                    variant="secondary"
                    className={`ml-1 text-[10px] px-1.5 py-0 h-4 rounded-md font-mono ${
                      isActive
                        ? "bg-black/15 text-black"
                        : "bg-neutral-800/80 text-neutral-300 border-neutral-700/50"
                    }`}
                  >
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-neutral-800/80" />

      {/* 5. Rank Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-300">
          Rank Tier
        </label>
        <Select
          value={rank}
          onValueChange={(val) => val && onRankChange(val as LeaderboardRank)}
        >
          <SelectTrigger className="h-9 w-full text-xs bg-[#141622] border-neutral-800 text-white rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#141622] border-neutral-800 text-neutral-200">
            {RANKS.map((rk) => (
              <SelectItem key={rk.id} value={rk.id}>
                {rk.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 6. Sort By Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-300">
          Sort By
        </label>
        <Select
          value={sortBy}
          onValueChange={(val) =>
            val && onSortByChange(val as LeaderboardSortBy)
          }
        >
          <SelectTrigger className="h-9 w-full text-xs bg-[#141622] border-neutral-800 text-white rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#141622] border-neutral-800 text-neutral-200">
            <SelectItem value="winRate">Win Rate</SelectItem>
            <SelectItem value="pickRate">Pick Rate</SelectItem>
            <SelectItem value="banRate">Ban Rate</SelectItem>
            <SelectItem value="matches">Matches</SelectItem>
            <SelectItem value="rank">Meta Rank</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
