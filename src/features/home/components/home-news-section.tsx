import { ChevronRight, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { usePosts } from "@/features/news/api/get-posts";

interface NewsItem {
  id?: string;
  version: string;
  description: string;
  image: string;
  category?: string;
  slug?: string;
}

const FALLBACK_NEWS_ITEMS: NewsItem[] = [
  {
    id: "patch-26.19",
    version: "26.19",
    description: "Patch 26.19 adjusts champions balance, top lane buffs...",
    image:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/janna/skins/skin67/images/janna_splash_centered_67.skins_janna_skin67.jpg",
    category: "Patch Notes",
  },
  {
    id: "patch-26.18",
    version: "26.18",
    description:
      "Patch 26.18 brings champion balance changes, five returning classic champions,...",
    image:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/mel/skins/skin12/images/mel_splash_centered_12.skins_mel_skin12.jpg",
    category: "Patch Notes",
  },
  {
    id: "patch-26.17",
    version: "26.17",
    description:
      "Patch 26.17 adjusts champions and items balance, expands classic progression...",
    image:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/anivia/skins/skin56/images/anivia_splash_centered_56.skins_anivia_skin56.jpg",
    category: "Patch Notes",
  },
];

export function HomeNewsSection() {
  const { data, isLoading } = usePosts({ limit: 3 });

  const newsItems: NewsItem[] =
    data && data.items && data.items.length > 0
      ? data.items.map((post) => {
          const rawTag = post.tags?.[0];
          const tagLabel =
            rawTag?.name ||
            rawTag?.tag?.name ||
            rawTag?.slug ||
            "Patch Notes";

          const patchMatch = post.title.match(/Patch\s+([\d.]+)/i);
          const versionDisplay = patchMatch ? patchMatch[1] : post.title.slice(0, 24);

          return {
            id: post.id,
            version: versionDisplay,
            description: post.content
              ? post.content.slice(0, 85) + (post.content.length > 85 ? "..." : "")
              : post.title,
            image:
              post.coverImageUrl ||
              "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/janna/skins/skin67/images/janna_splash_centered_67.skins_janna_skin67.jpg",
            category: tagLabel,
            slug: post.slug,
          };
        })
      : FALLBACK_NEWS_ITEMS;

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
        {newsItems.map((item) => (
          <Link
            key={item.id || item.version}
            to="/news"
            hash={item.slug || ""}
            className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800 hover:scale-[1.02] transition-transform duration-300 block"
            style={{
              backgroundImage: `url('${item.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-300" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-col z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
              <p className="text-xs font-black uppercase text-yellow-500 tracking-wider mb-1">
                {item.category || "Patch Notes"}
              </p>
              <p className="text-3xl sm:text-4xl font-black text-white line-clamp-1">
                {item.version}
              </p>
              <p className="text-xs font-medium text-gray-200 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
