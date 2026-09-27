import { createFileRoute } from "@tanstack/react-router";
import { LeaderboardPage } from "@/features/leaderboard";

export const Route = createFileRoute("/leaderboard")({
  component: LeaderboardRouteComponent,
});

function LeaderboardRouteComponent() {
  return <LeaderboardPage />;
}
