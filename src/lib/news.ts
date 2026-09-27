import { MOCK_NEWS_ARTICLES } from "@/features/news/data/mock-news";
import type { GetNewsParams, NewsArticle, NewsCategory } from "@/types/news";
import { fetchClient } from "./fetch-client";
import type { PostsApiResponse } from "@/features/news/api/get-posts";

export async function getNews({
  category = "all",
  search = "",
}: GetNewsParams = {}): Promise<NewsArticle[]> {
  try {
    // Attempt to fetch from backend API
    const res = await fetchClient<PostsApiResponse>("/api/posts", {
      params: {
        search: search.trim() || undefined,
        tag: category !== "all" ? category : undefined,
        limit: 20,
      },
    });

    if (res && Array.isArray(res.items)) {
      return res.items.map((post) => {
        const rawTag = post.tags?.[0];
        const tagSlug =
          rawTag?.slug ||
          rawTag?.tag?.slug ||
          rawTag?.name?.toLowerCase().replace(/\s+/g, "-") ||
          "patch-notes";

        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          summary: post.content
            ? post.content.slice(0, 160) + (post.content.length > 160 ? "..." : "")
            : post.title,
          category: (tagSlug as NewsCategory) || "patch-notes",
          bannerUrl:
            post.coverImageUrl ||
            "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/janna/skins/skin67/images/janna_splash_centered_67.skins_janna_skin67.jpg",
          publishedAt: post.createdAt,
          readTimeMinutes:
            post.readingTime ||
            Math.max(2, Math.round((post.content?.length || 500) / 400)),
          author: post.author?.name || post.author?.username || "Blitz Staff",
          content: post.content,
        };
      });
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
