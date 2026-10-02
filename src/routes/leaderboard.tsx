import { createFileRoute } from "@tanstack/react-router";
import { LeaderboardPage } from "@/features/leaderboard";
import { leaderboardQueryKeys } from "@/features/leaderboard/api/get-leaderboard";
import { getTierListResponse } from "@/lib/tier-list";
import type {
  LeaderboardRole,
  LeaderboardTier,
  LeaderboardRank,
  LeaderboardSortBy,
  LeaderboardViewMode,
} from "@/features/leaderboard/types/leaderboard.types";

export interface LeaderboardSearchParams {
  role?: LeaderboardRole;
  tier?: LeaderboardTier;
  rank?: LeaderboardRank;
  search?: string;
  sortBy?: LeaderboardSortBy;
  order?: "asc" | "desc";
  page?: number;
  pageSize?: number;
  viewMode?: LeaderboardViewMode;
}

const VALID_ROLES = new Set<string>(["all", "top", "jungle", "mid", "ad", "sp"]);
const VALID_TIERS = new Set<string>(["all", "S", "A", "B", "C", "D"]);
const VALID_RANKS = new Set<string>([
  "all",
  "emerald",
  "diamond",
  "master",
  "grandmaster",
  "challenger",
]);
const VALID_SORT_BY = new Set<string>([
  "winRate",
  "pickRate",
  "banRate",
  "matches",
  "rank",
]);

export const Route = createFileRoute("/leaderboard")({
  validateSearch: (raw: Record<string, unknown>): LeaderboardSearchParams => {
    const rawRole = typeof raw.role === "string" ? raw.role.toLowerCase() : undefined;
    const rawTier = typeof raw.tier === "string" ? raw.tier.toUpperCase() : undefined;
    const rawRank = typeof raw.rank === "string" ? raw.rank.toLowerCase() : undefined;
    const rawSearch =
      typeof raw.search === "string" && raw.search.trim() ? raw.search.trim() : undefined;
    const rawSortBy = typeof raw.sortBy === "string" ? raw.sortBy : undefined;
    const rawOrder = raw.order === "asc" || raw.order === "desc" ? raw.order : undefined;
    const rawPage = raw.page ? Number(raw.page) : undefined;
    const rawPageSize = raw.pageSize ? Number(raw.pageSize) : undefined;
    const rawViewMode =
      raw.viewMode === "table" || raw.viewMode === "grouped" ? raw.viewMode : undefined;

    return {
      role: rawRole && VALID_ROLES.has(rawRole) ? (rawRole as LeaderboardRole) : undefined,
      tier: rawTier && VALID_TIERS.has(rawTier) ? (rawTier as LeaderboardTier) : undefined,
      rank: rawRank && VALID_RANKS.has(rawRank) ? (rawRank as LeaderboardRank) : undefined,
      search: rawSearch,
      sortBy: rawSortBy && VALID_SORT_BY.has(rawSortBy) ? (rawSortBy as LeaderboardSortBy) : undefined,
      order: rawOrder,
      page: rawPage && rawPage > 0 ? rawPage : undefined,
      pageSize: rawPageSize && rawPageSize > 0 ? rawPageSize : undefined,
      viewMode: rawViewMode,
    };
  },
  loaderDeps: ({ search }) => search,
  loader: ({ context: { queryClient }, deps }) => {
    const isGrouped = deps.viewMode === "grouped";
    const params = {
      role: deps.role || "all",
      tier: deps.tier && deps.tier !== "all" ? deps.tier : undefined,
      rank: deps.rank || "emerald",
      search: deps.search,
      sortBy: deps.sortBy || "winRate",
      order: deps.order || "desc",
      page: isGrouped ? undefined : (deps.page || 1),
      limit: isGrouped ? 200 : (deps.pageSize || 20),
    };

    return queryClient.ensureQueryData({
      queryKey: leaderboardQueryKeys.list(params),
      queryFn: () => getTierListResponse(params),
    });
  },
  component: LeaderboardRouteComponent,
});

function LeaderboardRouteComponent() {
  return <LeaderboardPage />;
}
