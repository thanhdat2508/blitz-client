import type { TierChampionApiItem } from "@/lib/tier-list";
import { TierBadge } from "./tier-badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LeaderboardGroupedProps {
  items: TierChampionApiItem[];
}

const TIER_CONFIG: Record<
  string,
  {
    title: string;
    description: string;
    accentColor: string;
    borderClass: string;
  }
> = {
  S: {
    title: "Tier S — Meta God Tier",
    description:
      "Những tướng thống trị meta, tỷ lệ thắng và ảnh hưởng trận đấu cao nhất hiện tại.",
    accentColor: "text-amber-300",
    borderClass: "border-amber-500/30 bg-amber-500/5",
  },
  A: {
    title: "Tier A — Strong Meta Picks",
    description:
      "Lựa chọn mạnh mẽ, ổn định và rất phù hợp để leo xếp hạng đơn/đôi.",
    accentColor: "text-blue-300",
    borderClass: "border-blue-500/30 bg-blue-500/5",
  },
  B: {
    title: "Tier B — Balanced & Viable",
    description:
      "Các tướng cân bằng, phát huy sức mạnh tối đa khi rơi vào tay người chơi thuần thục.",
    accentColor: "text-emerald-300",
    borderClass: "border-emerald-500/30 bg-emerald-500/5",
  },
  C: {
    title: "Tier C — Situational Picks",
    description:
      "Tướng mang tính tình huống hoặc counter-pick cụ thể, phụ thuộc vào đội hình.",
    accentColor: "text-neutral-400",
    borderClass: "border-neutral-800 bg-neutral-900/30",
  },
  D: {
    title: "Tier D — Weak / Underperforming",
    description:
      "Cần được Riot Games tăng sức mạnh trong các bản vá tiếp theo.",
    accentColor: "text-rose-400",
    borderClass: "border-rose-500/30 bg-rose-500/5",
  },
};

export function LeaderboardGrouped({ items }: LeaderboardGroupedProps) {
  // Group items by tier
  const tiersOrder = ["S", "A", "B", "C", "D"];
  const grouped: Record<string, TierChampionApiItem[]> = {
    S: [],
    A: [],
    B: [],
    C: [],
    D: [],
  };

  items.forEach((item) => {
    const t = item.tier?.toUpperCase() || "B";
    if (grouped[t]) {
      grouped[t].push(item);
    } else {
      grouped["C"].push(item);
    }
  });

  return (
    <div className="space-y-6">
      {tiersOrder.map((tierKey) => {
        const tierChampions = grouped[tierKey] || [];
        if (tierChampions.length === 0) return null;

        const config = TIER_CONFIG[tierKey] || TIER_CONFIG.B;

        return (
          <Card
            key={tierKey}
            className={`rounded-2xl border transition-all shadow-lg p-0 gap-0 overflow-hidden ${config.borderClass}`}
          >
            {/* Tier Group Header using ShadCN CardHeader */}
            <CardHeader className="p-5 pb-4 border-b border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
              <div className="flex items-center gap-3">
                <TierBadge tier={tierKey} size="lg" />
                <div className="space-y-0.5">
                  <CardTitle
                    className={`text-base font-bold flex items-center gap-2 ${config.accentColor}`}
                  >
                    <span>{config.title}</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-neutral-400">
                    {config.description}
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant="outline"
                className="text-xs font-semibold px-3 py-1 rounded-full bg-neutral-900 border-neutral-800 text-neutral-300 self-start sm:self-auto shrink-0"
              >
                {tierChampions.length} tướng
              </Badge>
            </CardHeader>

            {/* Champions Grid using ShadCN CardContent */}
            <CardContent className="p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {tierChampions.map((champ) => {
                  const winRate = Number(champ.winRate) || 50;
                  const pickRate = Number(champ.pickRate) || 0;
                  const banRate = Number(champ.banRate) || 0;

                  return (
                    <div
                      key={`${champ.championId}-${champ.role}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-[#13151f] hover:bg-[#1a1d2e] border border-neutral-800/80 hover:border-neutral-700 transition-all cursor-pointer group"
                    >
                      <div className="relative shrink-0">
                        <img
                          src={champ.avatarUrl}
                          alt={champ.name}
                          loading="lazy"
                          className="w-11 h-11 rounded-xl object-cover bg-neutral-900 border border-neutral-700/60 group-hover:scale-105 transition-transform"
                        />
                        <Badge
                          variant="secondary"
                          className="absolute -bottom-1 -right-1 text-[9px] font-black uppercase px-1 py-0 h-4 rounded bg-neutral-950 border border-neutral-700 text-neutral-300"
                        >
                          {champ.role}
                        </Badge>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-bold text-white text-xs truncate group-hover:text-rose-400 transition-colors">
                            {champ.name}
                          </span>
                          <span className="text-[11px] font-black font-mono text-emerald-400">
                            {winRate.toFixed(1)}%
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mt-1 text-[10px] text-neutral-500 font-mono">
                          <span>Pick: {pickRate.toFixed(1)}%</span>
                          <span>•</span>
                          <span>Ban: {banRate.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
