import { MOCK_NEWS_ARTICLES } from "@/features/news/data/mock-news";
import type { GetNewsParams, NewsArticle } from "@/types/news";

export async function getNews({
  category = "all",
  search = "",
}: GetNewsParams = {}): Promise<NewsArticle[]> {
  let filtered = [...MOCK_NEWS_ARTICLES];

  if (category && category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        (item.patchVersion && item.patchVersion.toLowerCase().includes(query)),
    );
  }

  return filtered;
}
