import { useQuery } from "@tanstack/react-query";
import {
  getTierList,
  type GetTierListParams,
  type TierChampionApiItem,
} from "@/lib/tier-list";

export { getTierList, type GetTierListParams, type TierChampionApiItem };

export const tierListKeys = {
  all: ["tier-list"] as const,
  list: (params: GetTierListParams) => [...tierListKeys.all, params] as const,
};

export function useTierList(params: GetTierListParams = {}) {
  return useQuery({
    queryKey: tierListKeys.list(params),
    queryFn: () => getTierList(params),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
}
