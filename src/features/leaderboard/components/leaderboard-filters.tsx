import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  LayoutGrid,
  Table as TableIcon,
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
  LeaderboardViewMode,
} from "../types/leaderboard.types";

interface LeaderboardFiltersProps {
  role: LeaderboardRole;
  tier: LeaderboardTier;
  rank: LeaderboardRank;
  search: string;
  sortBy: LeaderboardSortBy;
  viewMode: LeaderboardViewMode;
  onRoleChange: (role: LeaderboardRole) => void;
  onTierChange: (tier: LeaderboardTier) => void;
  onRankChange: (rank: LeaderboardRank) => void;
  onSearchChange: (search: string) => void;
  onSortByChange: (sortBy: LeaderboardSortBy) => void;
  onViewModeChange: (mode: LeaderboardViewMode) => void;
  tierCounts?: Record<string, number>;
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
  color: string;
}> = [
  {
    id: "all",
    label: "All Tiers",
    color: "border-neutral-700 text-neutral-300",
  },
  {
    id: "S",
    label: "Tier S",
    color: "border-amber-500/50 text-amber-300 bg-amber-500/10",
  },
  {
    id: "A",
    label: "Tier A",
    color: "border-blue-500/50 text-blue-300 bg-blue-500/10",
  },
  {
    id: "B",
    label: "Tier B",
    color: "border-emerald-500/50 text-emerald-300 bg-emerald-500/10",
  },
  {
    id: "C",
    label: "Tier C",
    color: "border-neutral-600 text-neutral-300 bg-neutral-800/40",
  },
  {
    id: "D",
    label: "Tier D",
    color: "border-rose-500/50 text-rose-400 bg-rose-500/10",
  },
];

const RANKS: Array<{ id: LeaderboardRank; label: string }> = [
  { id: "emerald", label: "Emerald+" },
  { id: "diamond", label: "Diamond+" },
  { id: "master", label: "Master+" },
  { id: "grandmaster", label: "Grandmaster" },
  { id: "challenger", label: "Challenger" },
  { id: "all", label: "All Ranks" },
];

export function LeaderboardFilters({
  role,
  tier,
  rank,
  search,
  sortBy,
  viewMode,
  onRoleChange,
  onTierChange,
  onRankChange,
  onSearchChange,
  onSortByChange,
  onViewModeChange,
  tierCounts,
}: LeaderboardFiltersProps) {
  return (
    <div className="space-y-4">
      {/* 1. Main Role / Lane Selection using ShadCN Tabs */}
      <div className="p-1 rounded-2xl bg-[#10121a] border border-neutral-800/80">
        <Tabs
          value={role}
          onValueChange={(val) => val && onRoleChange(val as LeaderboardRole)}
        >
          <TabsList className="bg-transparent h-auto flex flex-wrap gap-1 p-0.5 w-full justify-start">
            {ROLES.map((r) => {
              const Icon = r.icon;
              return (
                <TabsTrigger
                  key={r.id}
                  value={r.id}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold data-active:bg-rose-600 data-active:text-white data-active:shadow-md data-active:shadow-rose-600/25 hover:text-white cursor-pointer transition-all"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{r.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>

      {/* 2. Secondary Filter Bar: Tiers, Rank, Search, View Mode */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-3 rounded-2xl bg-[#12141e] border border-neutral-800/70">
        {/* Tier Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-xs text-neutral-500 font-medium mr-1 shrink-0">
            Tier:
          </span>
          {TIERS.map((t) => {
            const isActive = tier === t.id;
            const count =
              tierCounts && t.id !== "all" ? tierCounts[t.id] : undefined;

            return (
              <Button
                key={t.id}
                type="button"
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onTierChange(t.id)}
                className={`h-7 px-2.5 text-xs font-semibold border rounded-lg transition-all cursor-pointer select-none shrink-0 ${
                  isActive
                    ? "bg-white text-black border-white hover:bg-neutral-200"
                    : `${t.color} hover:bg-neutral-800/60 bg-transparent`
                }`}
              >
                <span>{t.label}</span>
                {count !== undefined && (
                  <Badge
                    variant="secondary"
                    className={`ml-1 text-[10px] px-1 py-0 h-4 ${
                      isActive
                        ? "bg-black/15 text-black"
                        : "bg-neutral-800 text-neutral-300"
                    }`}
                  >
                    {count}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* Right side controls: Search, Rank Selector, Sort, View Mode */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Quick Champion Search Input using ShadCN Input */}
          <div className="relative min-w-44 flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-2.5 pointer-events-none z-10" />
            <Input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search champions..."
              className="h-8 pl-8 pr-7 text-xs bg-[#171924] border-neutral-800 text-white rounded-xl w-full"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-2 top-2 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Rank Dropdown using ShadCN Select */}
          <Select
            value={rank}
            onValueChange={(val) => val && onRankChange(val as LeaderboardRank)}
          >
            <SelectTrigger
              size="sm"
              className="h-8 min-w-36 text-xs bg-[#171924] border-neutral-800 text-neutral-200 rounded-xl"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#171924] border-neutral-800 text-neutral-200">
              {RANKS.map((rk) => (
                <SelectItem key={rk.id} value={rk.id}>
                  {rk.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort By Dropdown using ShadCN Select */}
          <Select
            value={sortBy}
            onValueChange={(val) =>
              val && onSortByChange(val as LeaderboardSortBy)
            }
          >
            <SelectTrigger
              size="sm"
              className="h-8 min-w-40 text-xs bg-[#171924] border-neutral-800 text-neutral-200 rounded-xl"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#171924] border-neutral-800 text-neutral-200">
              <SelectItem value="winRate">Win Rate</SelectItem>
              <SelectItem value="pickRate">Pick Rate</SelectItem>
              <SelectItem value="banRate">Ban Rate</SelectItem>
              <SelectItem value="matches">Matches</SelectItem>
              <SelectItem value="rank">Meta Rank</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode Toggle: Table vs Grouped */}
          <div className="flex items-center rounded-xl bg-[#171924] border border-neutral-800 p-0.5">
            <Button
              type="button"
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon-xs"
              onClick={() => onViewModeChange("table")}
              className={`h-7 w-7 rounded-lg ${
                viewMode === "table"
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Table view (paginated)"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </Button>
            <Button
              type="button"
              variant={viewMode === "grouped" ? "default" : "ghost"}
              size="icon-xs"
              onClick={() => onViewModeChange("grouped")}
              className={`h-7 w-7 rounded-lg ${
                viewMode === "grouped"
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:text-white"
              }`}
              title="Tier group view (S, A, B, C, D)"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
