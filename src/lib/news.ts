import { MOCK_NEWS_ARTICLES } from "@/features/news/data/mock-news";
import type { GetNewsParams, NewsArticle, NewsCategory } from "@/types/news";
import { getPosts } from "@/features/news/api/get-posts";

export async function getNews({
  category = "all",
  search = "",
}: GetNewsParams = {}): Promise<NewsArticle[]> {
  try {
    // 1. Fetch real blog posts directly from backend API
    const res = await getPosts({
      search: search.trim() || undefined,
      tag: category && category !== "all" ? category : undefined,
      limit: 50,
    });

    if (res && Array.isArray(res.items)) {
      return res.items.map((post) => {
        // Tag could be direct { slug } or nested { tag: { slug } }
        const tagSlugs = (post.tags || [])
          .map(
            (t: any) =>
              t?.slug ||
              t?.tag?.slug ||
              t?.name?.toLowerCase().replace(/\s+/g, "-") ||
              "",
          )
          .filter(Boolean);

        // Map tag to known NewsCategory
        let matchedCategory: NewsCategory = "community";
        for (const t of tagSlugs) {
          if (["patch-notes", "esports", "gameplay", "community"].includes(t)) {
            matchedCategory = t as NewsCategory;
            break;
          }
        }

        // Extract patch version if present (e.g. "15.5", "15.4")
        const patchMatch = post.title.match(/(\d+\.\d+)/);
        const patchVersion =
          matchedCategory === "patch-notes" && patchMatch
            ? patchMatch[1]
            : undefined;

        // Generate summary from markdown content
        const cleanContent = (post.content || "")
          .replace(/[#*`_~[\]]/g, "")
          .replace(/\n+/g, " ")
          .trim();
        const summary =
          cleanContent.length > 160
            ? cleanContent.slice(0, 160).trim() + "..."
            : cleanContent || post.title;

        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          summary,
          category: matchedCategory,
          patchVersion,
          bannerUrl:
            post.coverImageUrl ||
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
          publishedAt: post.createdAt,
          readTimeMinutes:
            post.readingTime ||
            Math.max(2, Math.round((post.content?.length || 500) / 400)),
          author: post.author?.name || post.author?.username || "Riot Games",
          content: post.content,
        };
      });
    }
  } catch (err) {
    console.warn("Backend /api/posts fetch error, falling back to local dataset:", err);
  }

  // 2. Offline fallback to local mock data
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
