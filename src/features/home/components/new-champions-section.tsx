import { ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface ChampionAbility {
  key: string;
  iconUrl: string;
}

interface NewChampion {
  id: string;
  name: string;
  isNew?: boolean;
  description: string;
  splashUrl: string;
  borderColor: string;
  abilities: ChampionAbility[];
}

const NEW_CHAMPIONS: NewChampion[] = [
  {
    id: "Locke",
    name: "Locke",
    isNew: true,
    description: "Check out Locke's abilities, builds, and stats",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Locke_0.jpg",
    borderColor: "border-purple-500",
    abilities: [
      {
        key: "Q",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeQ.png",
      },
      {
        key: "W",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeW.png",
      },
      {
        key: "E",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeE.png",
      },
      {
        key: "R",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeR.png",
      },
    ],
  },
  {
    id: "Zaahen",
    name: "Zaahen",
    description:
      "Get a sneak peek at Zaahen, the newest champion in League of Legends!",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zaahen_0.jpg",
    borderColor: "border-orange-500",
    abilities: [
      {
        key: "Q",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenQ.png",
      },
      {
        key: "W",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenW.png",
      },
      {
        key: "E",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenE.png",
      },
      {
        key: "R",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenR.png",
      },
    ],
  },
  {
    id: "Yunara",
    name: "Yunara",
    description: "Check out Yunara's abilities, builds, and stats",
    splashUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yunara_0.jpg",
    borderColor: "border-purple-500",
    abilities: [
      {
        key: "Q",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraQ.png",
      },
      {
        key: "W",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraW.png",
      },
      {
        key: "E",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraE.png",
      },
      {
        key: "R",
        iconUrl:
          "https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraR.png",
      },
    ],
  },
];

export function NewChampionsSection() {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">New Champions</h2>
          <p className="text-sm text-gray-400 mt-1">
            Discover the latest champions in League of Legends
          </p>
        </div>

        <Link
          to="/champions"
          className="text-sm font-semibold text-gray-400 hover:text-yellow-400 flex items-center gap-1 transition"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEW_CHAMPIONS.map((champ) => (
          <Link
            key={champ.id}
            to="/champions/$championId"
            params={{ championId: champ.id }}
            className="group relative h-108 rounded-2xl overflow-hidden cursor-pointer border border-gray-700 shadow-xl hover:border-gray-500 hover:scale-[1.02] transition-all duration-300 block text-left"
            style={{
              backgroundImage: `url('${champ.splashUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-[#0b0c10] via-black/35 to-black/10" />

            <div className="relative z-10 h-full p-6 flex flex-col">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-2xl font-black text-white">{champ.name}</h3>
                  {champ.isNew && (
                    <div className="bg-green-500 text-black text-xs font-black px-2 py-1 rounded-md">
                      New
                    </div>
                  )}
                </div>

                <p className="text-gray-200 font-semibold text-sm leading-6">
                  {champ.description}
                </p>

                <p className="mt-3 text-sm font-bold text-white group-hover:text-yellow-400 transition">
                  View {champ.name} →
                </p>
              </div>

              {/* Champion abilities */}
              <div className="mt-auto flex justify-center gap-3">
                {champ.abilities.map((ability) => (
                  <img
                    key={ability.key}
                    src={ability.iconUrl}
                    className={`w-12 h-12 rounded-lg border ${champ.borderColor} object-cover`}
                    alt={`${champ.name} ${ability.key}`}
                  />
                ))}
                <img
                  src={champ.splashUrl}
                  className={`w-12 h-12 rounded-lg border ${champ.borderColor} object-cover`}
                  alt={champ.name}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
