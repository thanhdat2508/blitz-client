import { useQuery } from "@tanstack/react-query";
import { getNews } from "@/lib/news";
import type { GetNewsParams } from "@/types/news";

export const newsKeys = {
  all: ["news"] as const,
  lists: () => [...newsKeys.all, "list"] as const,
  list: (params: GetNewsParams) => [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, "detail"] as const,
  detail: (id: string) => [...newsKeys.details(), id] as const,
};

export function useNews(params: GetNewsParams = {}) {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => getNews(params),
    staleTime: 1000 * 60 * 5,
  });
}
