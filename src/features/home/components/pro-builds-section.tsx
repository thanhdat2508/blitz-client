import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProBuildItem {
  id: string;
  name: string;
  avatarUrl: string;
  borderColor: string;
  roleInfo: string;
  items: string[];
}

const PRO_BUILDS: ProBuildItem[] = [
  {
    id: "lucian",
    name: "Lucian",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Lucian.png",
    borderColor: "border-yellow-500/50",
    roleInfo: "Lucian · ADC · 10 / 2 / 5 KDA",
    items: [
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/6672.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3072.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3006.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3094.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3031.png",
    ],
  },
  {
    id: "sylas",
    name: "Sylas",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Sylas.png",
    borderColor: "border-blue-500/50",
    roleInfo: "Sylas · Mid · 8 / 1 / 12 KDA",
    items: [
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3152.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3020.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3157.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3089.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3135.png",
    ],
  },
  {
    id: "tristana",
    name: "Tristana",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Tristana.png",
    borderColor: "border-pink-500/50",
    roleInfo: "ADC · 51.51% Win Rate · S+",
    items: [
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3031.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3087.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3006.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3094.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3153.png",
    ],
  },
  {
    id: "syndra",
    name: "Syndra",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Syndra.png",
    borderColor: "border-purple-500/50",
    roleInfo: "Mid · 50.35% Win Rate · S+",
    items: [
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/6655.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3020.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/4645.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3089.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3135.png",
    ],
  },
  {
    id: "annie",
    name: "Annie",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Annie.png",
    borderColor: "border-red-500/50",
    roleInfo: "Mid · 51.91% Win Rate · A",
    items: [
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3118.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3020.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3089.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3157.png",
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/4645.png",
    ],
  },
];

export function ProBuildsSection() {
  return (
    <Card className="group bg-[#12131c] border-gray-800 transition-all duration-300 shadow-xl rounded-2xl p-0 gap-0">
      <CardHeader className="p-5 lg:p-6 pb-4 flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-extrabold tracking-tight text-white">
            Latest Pro Builds
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            The latest pro builds for League of Legends patch 26.19.
          </CardDescription>
        </div>

        <Badge
          variant="outline"
          className="hidden sm:inline-flex text-[10px] font-bold text-green-400 bg-green-500/10 border-green-500/20 px-3 py-1 rounded-full tracking-wider"
        >
          META
        </Badge>
      </CardHeader>

      <CardContent className="p-5 lg:p-6 pt-0">
        <div className="flex flex-col gap-4">
          {PRO_BUILDS.map((build) => (
            <div
              key={build.id}
              className="bg-[#1a1b26] p-4 rounded-xl flex flex-wrap items-center justify-between border border-gray-800 hover:border-gray-600 hover:scale-[1.02] cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={build.avatarUrl}
                  alt={build.name}
                  className={`w-12 h-12 rounded-full border-2 ${build.borderColor}`}
                />

                <div>
                  <p className="font-bold text-base text-white">{build.name}</p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">
                    {build.roleInfo}
                  </p>
                </div>
              </div>

              <div className="flex gap-1.5 mt-3 sm:mt-0">
                {build.items.map((itemUrl, idx) => (
                  <img
                    key={idx}
                    src={itemUrl}
                    className="w-9 h-9 rounded-md border border-gray-700"
                    alt={`Item ${idx + 1}`}
                  />
                ))}
                <div className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
