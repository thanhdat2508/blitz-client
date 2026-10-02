import { useMemo, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePosts } from "@/features/news/api/get-posts";
import { NewsModal } from "@/features/news/components/news-modal";
import { mapPostToNewsArticle } from "@/lib/news";
import type { NewsArticle } from "@/types/news";

const FALLBACK_ARTICLES: NewsArticle[] = [
  {
    id: "patch-26.19",
    slug: "patch-26.19",
    title: "League of Legends Patch 26.19 Notes",
    summary: "Patch 26.19 adjusts champions balance, top lane buffs, and improves matchmaking queue times.",
    category: "patch-notes",
    patchVersion: "26.19",
    bannerUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/janna/skins/skin67/images/janna_splash_centered_67.skins_janna_skin67.jpg",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    readTimeMinutes: 4,
    author: "Riot Games",
    content: `Patch 26.19 brings major updates across Summoner's Rift with a focus on champion balance, top lane sustain adjustments, and quality-of-life matchmaking updates.

CHAMPION BUFFS
• Janna:
- Tailwind (Passive) bonus movement speed increased from 6% to 8%
- Eye of the Storm (E) cooldown reduced by 1s across all ranks

CHAMPION NERFS
• Mel:
- Base armor reduced from 28 to 25
- Ultimate cooldown increased by 10s at early levels`,
    changes: [
      {
        champion: "Janna",
        avatarUrl:
          "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Janna.png",
        type: "buff",
        summary: "Tailwind bonus MS increased; Eye of the Storm cooldown reduced",
      },
      {
        champion: "Mel",
        avatarUrl:
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/mel/skins/skin12/images/mel_splash_centered_12.skins_mel_skin12.jpg",
        type: "nerf",
        summary: "Base armor reduced; Ultimate cooldown increased",
      },
    ],
  },
  {
    id: "patch-26.18",
    slug: "patch-26.18",
    title: "League of Legends Patch 26.18 Notes",
    summary:
      "Patch 26.18 brings champion balance changes, five returning classic champions, and system updates.",
    category: "patch-notes",
    patchVersion: "26.18",
    bannerUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/mel/skins/skin12/images/mel_splash_centered_12.skins_mel_skin12.jpg",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString(),
    readTimeMinutes: 5,
    author: "Riot Games",
    content: `Patch 26.18 introduces targeted balance tweaks, champion updates, and visual enhancements.

CHAMPION ADJUSTMENTS
• Anivia:
- Glacial Storm mana drain adjusted
- Flash Frost projectile speed tuned for responsiveness`,
    changes: [
      {
        champion: "Anivia",
        avatarUrl:
          "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Anivia.png",
        type: "adjust",
        summary: "Glacial Storm mana drain and Flash Frost projectile speed tuned",
      },
    ],
  },
  {
    id: "patch-26.17",
    slug: "patch-26.17",
    title: "League of Legends Patch 26.17 Notes",
    summary:
      "Patch 26.17 adjusts champions and items balance, expands classic progression, and fixes gameplay bugs.",
    category: "patch-notes",
    patchVersion: "26.17",
    bannerUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/anivia/skins/skin56/images/anivia_splash_centered_56.skins_anivia_skin56.jpg",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    readTimeMinutes: 3,
    author: "Riot Games",
    content:
      "Patch 26.17 focuses on champion durability and classic rune consistency across all tiers.",
  },
];

export function HomeNewsSection() {
  const { data, isLoading } = usePosts({ limit: 3 });
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const items = data?.items;
  const articles: NewsArticle[] = useMemo(() => {
    if (items && items.length > 0) {
      return items.map(mapPostToNewsArticle);
    }
    return FALLBACK_ARTICLES;
  }, [items]);

  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            News
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            What's new in League of Legends
          </p>
        </div>
        <Link
          to="/news"
          className="text-sm font-semibold text-gray-400 hover:text-yellow-400 flex items-center gap-1 transition"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => {
          const patchMatch = article.title.match(/Patch\s+([\d.]+)/i);
          const versionDisplay =
            article.patchVersion || (patchMatch ? patchMatch[1] : article.title.slice(0, 24));
          const categoryLabel =
            article.category === "patch-notes" ? "Patch Notes" : article.category;

          return (
            <button
              key={article.id || article.slug}
              type="button"
              onClick={() => setSelectedArticle(article)}
              className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800 hover:scale-[1.02] transition-transform duration-300 block text-left w-full focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              style={{
                backgroundImage: `url('${article.bannerUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-300" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
                <p className="text-xs font-black uppercase text-yellow-500 tracking-wider mb-1">
                  {categoryLabel}
                </p>
                <p className="text-3xl sm:text-4xl font-black text-white line-clamp-1">
                  {versionDisplay}
                </p>
                <p className="text-xs font-medium text-gray-200 mt-1 line-clamp-2">
                  {article.summary}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}
