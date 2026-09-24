import { useQuery } from '@tanstack/react-query'
import { MOCK_NEWS_ARTICLES } from '../data/mock-news'
import type { NewsArticle, NewsCategory } from '../types/news'

export interface GetNewsParams {
  category?: NewsCategory
  search?: string
}

export const newsKeys = {
  all: ['news'] as const,
  lists: () => [...newsKeys.all, 'list'] as const,
  list: (params: GetNewsParams) => [...newsKeys.lists(), params] as const,
  details: () => [...newsKeys.all, 'detail'] as const,
  detail: (id: string) => [...newsKeys.details(), id] as const,
}

/**
 * Giả lập API gọi dữ liệu tin tức với độ trễ mạng thực tế
 * Sau này khi có Backend API thật, chỉ cần đổi hàm này:
 *   const { data } = await apiClient.get<NewsArticle[]>('/api/news', { params })
 *   return data
 */
export async function getNews({ category = 'all', search = '' }: GetNewsParams = {}): Promise<NewsArticle[]> {
  // Giả lập network delay 300ms
  await new Promise((resolve) => setTimeout(resolve, 300))

  let filtered = [...MOCK_NEWS_ARTICLES]

  if (category && category !== 'all') {
    filtered = filtered.filter((item) => item.category === category)
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase()
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        (item.patchVersion && item.patchVersion.toLowerCase().includes(query)),
    )
  }

  return filtered
}

export function useNews(params: GetNewsParams = {}) {
  return useQuery({
    queryKey: newsKeys.list(params),
    queryFn: () => getNews(params),
    staleTime: 1000 * 60 * 5, // 5 phút cache
  })
}
