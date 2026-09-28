import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min cache
      gcTime: 1000 * 60 * 30, // 30 min garbage collection
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
})
