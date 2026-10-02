import type { ChampionChange, GetNewsParams, NewsArticle, NewsCategory } from "@/types/news";
import { getPosts } from "@/features/news/api/get-posts";

export function extractChampionChanges(content: string): ChampionChange[] {
  const changes: ChampionChange[] = [];
  if (!content) return changes;

  let currentType: "buff" | "nerf" | "adjust" | "rework" = "adjust";
  const lines = content.split("\n");

  let currentChampion = "";
  let currentSummaryParts: string[] = [];

  const flush = () => {
    if (currentChampion && currentSummaryParts.length > 0) {
      const champClean = currentChampion.replace(/[^a-zA-Z]/g, "");
      changes.push({
        champion: currentChampion,
        avatarUrl: `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${champClean}.png`,
        type: currentType,
        summary: currentSummaryParts.join("; "),
      });
      currentChampion = "";
      currentSummaryParts = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/CHAMPION BUFFS/i.test(line)) {
      flush();
      currentType = "buff";
      continue;
    }
    if (/CHAMPION NERFS/i.test(line)) {
      flush();
      currentType = "nerf";
      continue;
    }
    if (/CHAMPION ADJUSTMENTS/i.test(line) || /CHAMPION REWORKS/i.test(line)) {
      flush();
      currentType = /REWORK/i.test(line) ? "rework" : "adjust";
      continue;
    }

    const champMatch = line.match(/^[•\-*]\s*([A-Za-z\s']+):$/);
    if (champMatch) {
      flush();
      currentChampion = champMatch[1].trim();
      continue;
    }

    if (currentChampion && (line.startsWith("-") || line.startsWith("•") || line.startsWith("*"))) {
      const summaryText = line.replace(/^[•\-*]\s*/, "").trim();
      if (summaryText) {
        currentSummaryParts.push(summaryText);
      }
    }
  }

  flush();
  return changes;
}

export function mapPostToNewsArticle(post: any): NewsArticle {
  const tagSlugs = (post.tags || [])
    .map(
      (t: any) =>
        t?.slug ||
        t?.tag?.slug ||
        t?.name?.toLowerCase().replace(/\s+/g, "-") ||
        "",
    )
    .filter(Boolean);

  let matchedCategory: NewsCategory = "community";
  for (const t of tagSlugs) {
    if (["patch-notes", "esports", "gameplay", "community"].includes(t)) {
      matchedCategory = t as NewsCategory;
      break;
    }
  }

  const patchMatch = post.title?.match(/(?:Patch\s*)?(\d+\.\d+)/i);
  const patchVersion =
    matchedCategory === "patch-notes" && patchMatch
      ? patchMatch[1]
      : undefined;

  const cleanContent = (post.content || "")
    .replace(/[#*`_~[\]]/g, "")
    .replace(/\n+/g, " ")
    .trim();
  const summary =
    cleanContent.length > 160
      ? cleanContent.slice(0, 160).trim() + "..."
      : cleanContent || post.title || "";

  const changes =
    matchedCategory === "patch-notes" && post.content
      ? extractChampionChanges(post.content)
      : undefined;

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
    author: post.author?.name || post.author?.username || "Blitz Editorial Team",
    content: post.content,
    changes: changes && changes.length > 0 ? changes : undefined,
  };
}

export async function getNews({
  category = "all",
  search = "",
}: GetNewsParams = {}): Promise<NewsArticle[]> {
  try {
    const res = await getPosts({
      search: search.trim() || undefined,
      tag: category && category !== "all" ? category : undefined,
      limit: 50,
    });

    if (res && Array.isArray(res.items)) {
      return res.items.map(mapPostToNewsArticle);
    }
  } catch (err) {
    console.warn("[news] Backend /api/posts fetch error:", err);
  }

  return [];
}
