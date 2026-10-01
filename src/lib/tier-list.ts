import { ENV } from "@/config/env";

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

export interface GetTierListParams {
  rank?: string;
  role?: string;
  tier?: string;
  search?: string;
  sortBy?:
    | "winRate"
    | "pickRate"
    | "banRate"
    | "matches"
    | "rank"
    | "patchWrChange"
    | "name";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface TierListResponse {
  success: boolean;
  patch: string;
  rank: string;
  role: string;
  tier?: string;
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  tierCounts?: Record<string, number>;
  data: TierChampionApiItem[];
}

/**
 * Fetch LoL Champion Tier List full response (with pagination metadata) using simple native fetch.
 */
export async function getTierListResponse(
  params: GetTierListParams = {},
): Promise<TierListResponse> {
  const searchParams = new URLSearchParams();
  if (params.rank) searchParams.set("rank", params.rank);
  if (params.role) searchParams.set("role", params.role);
  if (params.tier && params.tier !== "all")
    searchParams.set("tier", params.tier);
  if (params.search) searchParams.set("search", params.search);
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.order) searchParams.set("order", params.order);
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));

  const queryString = searchParams.toString();
  const endpoint = `/api/champions/tier-list${queryString ? `?${queryString}` : ""}`;
  const url =
    typeof window !== "undefined" ? endpoint : `${ENV.BACKEND_URL}${endpoint}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch tier list: ${res.status} ${res.statusText}`,
    );
  }

  const json: TierListResponse = await res.json();
  return json;
}

/**
 * Fetch LoL Champion Tier List items (compatible with simpler hooks).
 */
export async function getTierList(
  params: GetTierListParams = {},
): Promise<TierChampionApiItem[]> {
  const json = await getTierListResponse(params);
  const items: TierChampionApiItem[] = json.data || [];
  if (params.limit && params.limit > 0 && !params.page) {
    return items.slice(0, params.limit);
  }
  return items;
}
