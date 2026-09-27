import { MOCK_NEWS_ARTICLES } from "@/features/news/data/mock-news";
import type { GetNewsParams, NewsArticle, NewsCategory } from "@/types/news";
import { getPosts } from "@/features/news/api/get-posts";

export async function getNews({
  category = "all",
  search = "",
}: GetNewsParams = {}): Promise<NewsArticle[]> {
  try {
    // Attempt to fetch from backend API using simple fetch
    const res = await getPosts({
      search: search.trim() || undefined,
      limit: 20,
    });

    if (res?.items && res.items.length > 0) {
      return res.items.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        summary: post.content ? post.content.slice(0, 150) + "..." : post.title,
        category: (post.tags?.[0]?.tag?.slug as NewsCategory) || "patch-notes",
        bannerUrl:
          post.coverImageUrl ||
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/janna/skins/skin67/images/janna_splash_centered_67.skins_janna_skin67.jpg",
        publishedAt: post.createdAt,
        readTimeMinutes: Math.max(2, Math.round((post.content?.length || 500) / 400)),
        author: post.author?.name || post.author?.username || "Riot Games",
        content: post.content,
      }));
    }
  } catch (err) {
    console.warn("Backend /api/posts fetch error, using local data fallback:", err);
  }

  // Graceful fallback to rich mock data
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
