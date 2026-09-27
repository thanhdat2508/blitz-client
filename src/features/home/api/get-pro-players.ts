import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/fetch-client";

export interface ProPlayerItemSpell {
  name: string;
  icon: string;
}

export interface ProPlayerItemEquip {
  id: number;
  name: string;
  icon: string;
}

export interface ProPlayerLastMatch {
  championName: string;
  championTitle?: string;
  championIcon: string;
  championSplash?: string;
  win?: boolean;
  kills: number;
  deaths: number;
  assists: number;
  kdaRatio?: string;
  cs?: number;
  csPerMinute?: string;
  gameDuration?: string;
  gameMode?: string;
  timeAgo?: string;
  spells?: ProPlayerItemSpell[];
  items?: ProPlayerItemEquip[];
}

export interface ProPlayerApiItem {
  id: string;
  slug: string;
  gameId: string;
  name: string;
  nickname: string;
  description?: string;
  avatar: string;
  playerImageUrl?: string;
  role: string;
  team: string;
  themeColor: string;
  displayOrder: number;
  lastMatch?: ProPlayerLastMatch;
}

export interface ProPlayersApiResponse {
  success: boolean;
  count: number;
  data: ProPlayerApiItem[];
}

export const proPlayersKeys = {
  all: ["pro-players"] as const,
};

export async function getProPlayers(): Promise<ProPlayerApiItem[]> {
  const response = await fetchClient<ProPlayersApiResponse>("/api/pro-players");
  return response.data || [];
}

export function useProPlayers() {
  return useQuery({
    queryKey: proPlayersKeys.all,
    queryFn: getProPlayers,
    staleTime: 1000 * 60 * 5,
  });
}
