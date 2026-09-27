export interface GetNewsParams {
  category?: NewsCategory;
  search?: string;
}

export type NewsCategory =
  "all" | "patch-notes" | "esports" | "gameplay" | "community";

export interface ChampionChange {
  champion: string;
  avatarUrl: string;
  type: "buff" | "nerf" | "rework" | "adjust";
  summary: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  patchVersion?: string;
  bannerUrl: string;
  publishedAt: string;
  readTimeMinutes: number;
  author: string;
  isFeatured?: boolean;
  changes?: ChampionChange[];
  content?: string;
}
