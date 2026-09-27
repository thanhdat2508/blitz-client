import { ENV } from "@/config/env";

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
  runes?: {
    primary?: ProPlayerItemSpell;
    secondary?: ProPlayerItemSpell;
  };
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

export async function getProPlayers(): Promise<ProPlayerApiItem[]> {
  const endpoint = "/api/pro-players";
  const url =
    typeof window !== "undefined" ? endpoint : `${ENV.BACKEND_URL}${endpoint}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch pro players: ${res.status} ${res.statusText}`,
    );
  }

  const json: ProPlayersApiResponse = await res.json();
  return json.data || [];
}
