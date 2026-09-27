export type LeaderboardRole = "all" | "top" | "jungle" | "mid" | "ad" | "sp";

export type LeaderboardTier = "all" | "S" | "A" | "B" | "C" | "D";

export type LeaderboardRank =
  | "all"
  | "emerald"
  | "diamond"
  | "master"
  | "grandmaster"
  | "challenger";

export type LeaderboardSortBy =
  | "winRate"
  | "pickRate"
  | "banRate"
  | "matches"
  | "rank";

export type LeaderboardViewMode = "table" | "grouped";

export interface LeaderboardFilterState {
  role: LeaderboardRole;
  tier: LeaderboardTier;
  rank: LeaderboardRank;
  search: string;
  sortBy: LeaderboardSortBy;
  order: "asc" | "desc";
  page: number;
  limit: number;
  viewMode: LeaderboardViewMode;
}
