import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useProPlayers, type ProPlayerApiItem } from "@/hooks/use-pro-players";

export function ProBuildsSection() {
  const { data, isLoading } = useProPlayers();

  const formattedBuilds =
    data && data.length
      ? data.map((player: ProPlayerApiItem) => {
          const match = player.lastMatch;
          const champName = match?.championName || player.name;
          const champIcon =
            match?.championIcon ||
            player.avatar ||
            "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png";

          const kdaText = match
            ? `${match.kills} / ${match.deaths} / ${match.assists} KDA`
            : "Pro Build";

          const roleInfo = `${player.nickname || player.name} (${player.team}) · ${player.role} · ${kdaText}`;

          const itemIcons =
            match?.items?.map((it) => it.icon).filter(Boolean) || [];

          const borderColors: Record<string, string> = {
            blue: "border-blue-500/60",
            gold: "border-yellow-500/60",
            red: "border-red-500/60",
          };

          return {
            id: player.id,
            name: champName,
            avatarUrl: champIcon,
            borderColor:
              borderColors[player.themeColor] || "border-purple-500/60",
            roleInfo,
            items: itemIcons.length ? itemIcons : [],
          };
        })
      : [];

  return (
    <Card className="group bg-[#12131c] border-gray-800 transition-all duration-300 shadow-xl rounded-2xl p-0 gap-0">
      <CardHeader className="p-5 lg:p-6 pb-4 flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <CardTitle className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Latest Pro Builds
            {isLoading && (
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            )}
          </CardTitle>
          <CardDescription className="text-xs text-gray-400">
            Real matches from professional LoL players and their winning item
            paths.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="p-5 lg:p-6 pt-0">
        <div className="flex flex-col gap-4">
          {formattedBuilds.map((build) => (
            <div
              key={build.id}
              className="bg-[#1a1b26] p-4 rounded-xl flex flex-col flex-wrap gap-4 border border-gray-800 hover:border-gray-600 hover:scale-[1.01] cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={build.avatarUrl}
                  alt={build.name}
                  className={`w-12 h-12 rounded-full border-2 ${build.borderColor} object-cover shadow-md`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png";
                  }}
                />
                <div>
                  <p className="font-bold text-base text-white">{build.name}</p>
                  <p className="text-xs font-semibold text-gray-400 mt-1">
                    {build.roleInfo}
                  </p>
                </div>
              </div>

              <div className="flex gap-1.5 mt-3 sm:mt-0">
                {build.items.slice(0, 6).map((itemUrl, idx) => (
                  <img
                    key={idx}
                    src={itemUrl}
                    className="w-9 h-9 rounded-md border border-gray-700 object-cover"
                    alt={`Item ${idx + 1}`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
