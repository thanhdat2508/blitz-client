import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface NewsItem {
  version: string;
  description: string;
  image: string;
}

const NEWS_ITEMS: NewsItem[] = [
  {
    version: "26.19",
    description: "Patch 26.19 adjusts champions balance, top lane buffs...",
    image:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/janna/skins/skin67/images/janna_splash_centered_67.skins_janna_skin67.jpg",
  },
  {
    version: "26.18",
    description:
      "Patch 26.18 brings champion balance changes, five returning classic champions,...",
    image:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/mel/skins/skin12/images/mel_splash_centered_12.skins_mel_skin12.jpg",
  },
  {
    version: "26.17",
    description:
      "Patch 26.19 adjusts champions and items balance, expands classic progression...",
    image:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/anivia/skins/skin56/images/anivia_splash_centered_56.skins_anivia_skin56.jpg",
  },
];

export function HomeNewsSection() {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">News</h2>
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
        {NEWS_ITEMS.map((item) => (
          <div
            key={item.version}
            className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800 hover:scale-[1.02] transition-transform duration-300"
            style={{
              backgroundImage: `url('${item.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-300" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-col z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
              <span className="text-xs font-black uppercase text-yellow-500 tracking-wider mb-1">
                Patch Notes
              </span>
              <span className="text-4xl font-black text-white">{item.version}</span>
              <span className="text-xs font-black text-white">
                {item.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
