import { createFileRoute } from "@tanstack/react-router";
import { LeaderboardPage } from "@/features/leaderboard";
import { leaderboardQueryKeys } from "@/features/leaderboard/api/get-leaderboard";
import { getTierListResponse } from "@/lib/tier-list";

const DEFAULT_LEADERBOARD_PARAMS = {
  role: "all" as const,
  tier: undefined,
  rank: "emerald" as const,
  search: undefined,
  sortBy: "winRate" as const,
  order: "desc" as const,
  page: 1,
  limit: 20,
};

export const Route = createFileRoute("/leaderboard")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: leaderboardQueryKeys.list(DEFAULT_LEADERBOARD_PARAMS),
      queryFn: () => getTierListResponse(DEFAULT_LEADERBOARD_PARAMS),
    });
  },
  component: LeaderboardRouteComponent,
});

function LeaderboardRouteComponent() {
  return <LeaderboardPage />;
}
