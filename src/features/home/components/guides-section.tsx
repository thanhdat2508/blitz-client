interface GuideItem {
  id: string;
  title: string;
  splashUrl: string;
  isFeatured?: boolean;
}

const GUIDES: GuideItem[] = [
  {
    id: "ryze",
    title: "Ryze Build Guide",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ryze_0.jpg",
    isFeatured: true,
  },
  {
    id: "thresh",
    title: "Thresh Build Guide",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg",
  },
  {
    id: "jinx",
    title: "Jinx Build Guide",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg",
  },
  {
    id: "yasuo",
    title: "Yasuo Build Guide",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg",
  },
  {
    id: "aatrox",
    title: "Aatrox Build Guide",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg",
  },
];

export function GuidesSection() {
  const featured = GUIDES.find((g) => g.isFeatured);
  const sideGuides = GUIDES.filter((g) => !g.isFeatured);

  return (
    <section className="mb-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">Exclusive Guides</h2>
          <p className="text-sm text-gray-400 mt-1">
            Learn combos and tips from Challengers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:h-100">
        {featured && (
          <div
            className="md:col-span-2 md:row-span-2 rounded-2xl border border-gray-800 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-xl min-h-62.5 hover:scale-[1.02] transition-transform duration-300"
            style={{
              backgroundImage: `url('${featured.splashUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent group-hover:from-black transition-all" />
            <div className="relative z-20 p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
              <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-md text-xs uppercase mb-3 inline-block">
                In-depth
              </span>
              <h3 className="text-3xl font-black mb-2 text-white group-hover:text-yellow-400 transition">
                {featured.title}
              </h3>
            </div>
          </div>
        )}

        {sideGuides.map((guide) => (
          <div
            key={guide.id}
            className="rounded-2xl border border-gray-800 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-lg min-h-45 hover:scale-[1.02] transition-transform duration-300"
            style={{
              backgroundImage: `url('${guide.splashUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent group-hover:from-black" />
            <div className="relative z-20 p-5 transform group-hover:-translate-y-1 transition-transform">
              <h4 className="font-bold text-lg text-white">{guide.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
