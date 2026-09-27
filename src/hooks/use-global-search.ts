import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGlobalSearch, type GlobalSearchData } from "@/lib/search";

export function useGlobalSearch(rawQuery: string, region: string = "vn2", debounceMs: number = 250) {
  const [debouncedQuery, setDebouncedQuery] = useState(rawQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(rawQuery.trim());
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [rawQuery, debounceMs]);

  const queryResult = useQuery<GlobalSearchData>({
    queryKey: ["global-search", debouncedQuery, region],
    queryFn: () => fetchGlobalSearch(debouncedQuery, region, 6),
    enabled: debouncedQuery.length >= 1,
    staleTime: 1000 * 30, // 30 seconds
  });

  const isDebouncing = rawQuery.trim() !== debouncedQuery && rawQuery.trim().length > 0;

  return {
    ...queryResult,
    data: queryResult.data,
    isLoading: queryResult.isLoading || isDebouncing,
    debouncedQuery,
  };
}
