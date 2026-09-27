import { TrendingUp, ArrowRight, Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTierList, type TierChampionApiItem } from "../api/get-tier-list";

// Fallback champions in case backend is offline
const FALLBACK_CHAMPIONS: Array<{
  rank: number;
  name: string;
  role: string;
  avatarUrl: string;
  tier: "S" | "A" | "B";
  winRate: number;
}> = [
  {
    rank: 1,
    name: "Ahri",
    role: "Mid",
    avatarUrl: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png",
    tier: "S",
    winRate: 53.4,
  },
  {
    rank: 2,
    name: "Rammus",
    role: "Jungle",
    avatarUrl: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Rammus.png",
    tier: "S",
    winRate: 53.3,
  },
  {
    rank: 3,
    name: "Sejuani",
    role: "Jungle",
    avatarUrl: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Sejuani.png",
    tier: "S",
    winRate: 52.8,
  },
  {
    rank: 4,
    name: "Hwei",
    role: "Mid",
    avatarUrl: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Hwei.png",
    tier: "S",
    winRate: 53.6,
  },
  {
    rank: 5,
    name: "Lee Sin",
    role: "Jungle",
    avatarUrl: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/LeeSin.png",
    tier: "A",
    winRate: 49.8,
  },
];

export function TierListSection() {
  const { data, isLoading } = useTierList({
    rank: "all",
    role: "all",
    limit: 5,
  });

  const displayList = (data && data.length > 0 ? data : FALLBACK_CHAMPIONS) as Array<
    TierChampionApiItem | (typeof FALLBACK_CHAMPIONS)[0]
  >;

  return (
    <Card className="group bg-[#12131c] border-gray-800 transition-all duration-300 shadow-xl rounded-2xl p-0 gap-0">
      <CardHeader className="p-5 lg:p-6 pb-4 flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            LoL Champion Tier List
            {isLoading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            League of Legends's biggest winners for patch 14.24 for every role.
          </CardDescription>
        </div>

        <Badge
          variant="outline"
          className="hidden sm:inline-flex border-gray-700 bg-[#191a25] text-[10px] font-bold tracking-wider text-gray-400 rounded-full px-3 py-1"
        >
          TOP PICKS
        </Badge>
      </CardHeader>

      <CardContent className="p-5 lg:p-6 pt-0">
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#101119]">
          <div className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3 bg-[#191a25] border-b border-gray-800 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
            <p>Champion</p>
            <p className="text-center">Tier</p>
            <p className="text-right">Win Rate</p>
          </div>

          <div className="divide-y divide-gray-800/70">
            {displayList.map((champ, index) => {
              const tierGrade = champ.tier?.toUpperCase() || "A";
              const isTierS = tierGrade === "S";
              const winRateNumber = Number(champ.winRate) || 50;
              const barPercentage = Math.min(
                100,
                Math.max(25, Math.round(((winRateNumber - 46) / 8) * 100))
              );

              return (
                <div
                  key={`${champ.name}-${index}`}
                  className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3.5 bg-[#12131c] hover:bg-[#1c1d29] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={champ.avatarUrl}
                        alt={champ.name}
                        className="w-11 h-11 rounded-lg border border-gray-700 object-cover shadow-lg"
                        onError={(e) => {
                          // Fallback to placeholder if broken image
                          (e.target as HTMLImageElement).src =
                            "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png";
                        }}
                      />
                      <p className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-[#222331] border border-gray-600 text-[9px] font-black text-gray-300 flex items-center justify-center">
                        {index + 1}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-extrabold text-white text-sm sm:text-base truncate">
                        {champ.name}
                      </p>
                      <p className="text-[10px] uppercase text-gray-500 mt-0.5">
                        {champ.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center">
                    <img
                      src={`/tier_${tierGrade.toLowerCase()}.svg`}
                      alt={`Tier ${tierGrade}`}
                      className="w-7 h-7 object-contain drop-shadow select-none"
                    />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div
                      className={`flex items-center gap-1 font-extrabold text-sm ${
                        isTierS ? "text-green-400" : "text-gray-200"
                      }`}
                    >
                      {isTierS && <TrendingUp size={14} />} {winRateNumber.toFixed(1)}%
                    </div>
                    <div className="w-20 h-1 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        style={{ width: `${barPercentage}%` }}
                        className={`h-full rounded-full transition-all duration-500 ${
                          isTierS ? "bg-green-400/80" : "bg-gray-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 bg-[#1a1b26] hover:text-white hover:bg-[#222432] text-white font-bold h-11 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center justify-center gap-2 group/button cursor-pointer"
        >
          View Full Tier List
          <ArrowRight
            size={18}
            className="group-hover/button:translate-x-1 transition-transform"
          />
        </Button>
      </CardContent>
    </Card>
  );
}
