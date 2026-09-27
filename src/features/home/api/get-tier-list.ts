import { useQuery } from "@tanstack/react-query";
import { fetchClient } from "@/lib/fetch-client";

export interface TierChampionApiItem {
  rank: number;
  championId: string;
  name: string;
  role: string;
  tier: "S" | "A" | "B" | "C" | "D";
  winRate: number;
  patchWrChange?: number;
  banRate?: number;
  pickRate?: number;
  matches?: number;
  avatarUrl: string;
}

export interface TierListApiResponse {
  success: boolean;
  count?: number;
  data: TierChampionApiItem[];
}

export interface GetTierListParams {
  rank?: string;
  role?: string;
  search?: string;
  sortBy?: "winRate" | "pickRate" | "banRate" | "name";
  order?: "asc" | "desc";
  limit?: number;
}

export const tierListKeys = {
  all: ["tier-list"] as const,
  list: (params: GetTierListParams) => [...tierListKeys.all, params] as const,
};

export async function getTierList(
  params: GetTierListParams = {}
): Promise<TierChampionApiItem[]> {
  const response = await fetchClient<TierListApiResponse>(
    "/api/champions/tier-list",
    {
      params: {
        rank: params.rank || "all",
        role: params.role || "all",
        search: params.search,
        sortBy: params.sortBy || "winRate",
        order: params.order || "desc",
      },
    }
  );

  const items = response.data || [];
  if (params.limit && params.limit > 0) {
    return items.slice(0, params.limit);
  }
  return items;
}

export function useTierList(params: GetTierListParams = {}) {
  return useQuery({
    queryKey: tierListKeys.list(params),
    queryFn: () => getTierList(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
