import { useQuery } from "@tanstack/react-query";
import {
  getTierListResponse,
  type GetTierListParams,
  type TierListResponse,
} from "@/lib/tier-list";

export const leaderboardQueryKeys = {
  all: ["leaderboard"] as const,
  list: (params: GetTierListParams) =>
    [...leaderboardQueryKeys.all, params] as const,
};

export function useLeaderboardTierList(params: GetTierListParams) {
  return useQuery<TierListResponse>({
    queryKey: leaderboardQueryKeys.list(params),
    queryFn: () => getTierListResponse(params),
    staleTime: 1000 * 60 * 3, // 3 minutes cache
  });
}
