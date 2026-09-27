import { useQuery } from "@tanstack/react-query";
import { fetchPlayerProfile } from "@/lib/player";

export interface CleanRankInfo {
  queueType: "RANKED_SOLO_5x5" | "RANKED_FLEX_SR";
  queueName: string;
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  winRate: number;
}

export interface CleanChampionPerformance {
  championId: number;
  championName: string;
  championIconUrl: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  kdaRatio: string;
}

export interface CleanParticipantDTO {
  riotId: string;
  championIconUrl: string;
  teamId: number;
  isCurrentPlayer: boolean;
}

export interface CleanMatchItemDTO {
  slot: number;
  id: number;
  iconUrl: string | null;
}

export interface CleanMatchSummary {
  matchId: string;
  win: boolean;
  queueType: string;
  gameDuration: string;
  gameCreation: number;
  timeAgo: string;
  champion: {
    id: number;
    name: string;
    iconUrl: string;
  };
  stats: {
    kdaRatio: string;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    csPerMinute: string;
    gpm: number;
  };
  spells: Array<{ id: number; iconUrl: string }>;
  runes: {
    primaryKeystoneId: number | null;
    secondaryStyleId: number | null;
  };
  items: CleanMatchItemDTO[];
  participants: CleanParticipantDTO[];
}

export interface PlayerProfileResponse {
  puuid: string;
  gameName: string;
  tagLine: string;
  riotId: string;
  region: string;
  regionName: string;
  summonerLevel: number;
  profileIconId: number;
  profileIconUrl: string;
  ranks: {
    solo: CleanRankInfo | null;
    flex: CleanRankInfo | null;
  };
  championPerformance: CleanChampionPerformance[];
  recentMatches: CleanMatchSummary[];
  cachedAt?: string;
  fromCache: boolean;
}

export interface GetPlayerProfileParams {
  gameName: string;
  tagLine: string;
  region?: string;
  refresh?: boolean;
}

export interface PlayerApiResponse {
  success: boolean;
  data: PlayerProfileResponse;
}

export const playerQueryKeys = {
  all: ["player"] as const,
  profile: (params: GetPlayerProfileParams) =>
    [
      ...playerQueryKeys.all,
      params.region || "vn2",
      params.gameName,
      params.tagLine,
    ] as const,
};

export async function getPlayerProfile(
  params: GetPlayerProfileParams,
): Promise<PlayerProfileResponse> {
  return fetchPlayerProfile(params);
}

export function usePlayerProfile(
  params: GetPlayerProfileParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: playerQueryKeys.profile(params),
    queryFn: () => getPlayerProfile(params),
    enabled:
      options?.enabled !== false &&
      Boolean(params.gameName?.trim()) &&
      Boolean(params.tagLine?.trim()),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
