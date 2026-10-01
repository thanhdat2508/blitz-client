import {
  X,
  Trophy,
  Swords,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  usePlayerProfile,
  type CleanRankInfo,
  type CleanMatchSummary,
} from "../../../hooks/use-player-profile";

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  tagLine: string;
  region: string;
}

export function PlayerProfileModal({
  isOpen,
  onClose,
  gameName,
  tagLine,
  region,
}: PlayerProfileModalProps) {
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = usePlayerProfile(
    { gameName, tagLine, region },
    { enabled: isOpen && Boolean(gameName) && Boolean(tagLine) },
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in-0 duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0f1017] border border-gray-800 rounded-3xl shadow-2xl overflow-hidden text-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/80 bg-[#141522]">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
              League of Legends Summoner Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 custom-scrollbar">
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
              <Loader2 className="w-10 h-10 text-yellow-500 animate-spin" />
              <div>
                <p className="text-lg font-bold text-white">
                  Searching Riot Network...
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Fetching stats and recent 10 matches for {gameName}#{tagLine}
                </p>
              </div>
            </div>
          ) : isError || !profile ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-center">
              <AlertCircle className="w-12 h-12 text-red-400" />
              <p className="text-xl font-bold text-white">Player Not Found</p>
              <p className="text-sm text-gray-400 max-w-md">
                {error instanceof Error
                  ? error.message
                  : "Unable to load player profile."}
              </p>
              <Button
                variant="outline"
                onClick={onClose}
                className="mt-4 border-gray-700 bg-gray-900 text-white"
              >
                Close Search
              </Button>
            </div>
          ) : (
            <>
              {/* 1. Profile Header Banner */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-linear-to-r from-[#171827] via-[#1a1b2d] to-[#141524] border border-gray-800/80 shadow-xl overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Summoner Icon with Level */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-yellow-500/60 overflow-hidden shadow-2xl bg-[#090a0f]">
                    <img
                      src={profile.profileIconUrl}
                      alt={profile.gameName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png";
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#090a0f] border border-yellow-500/80 text-yellow-400 text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg">
                    Lv. {profile.summonerLevel}
                  </span>
                </div>

                {/* Profile Details */}
                <div className="flex-1 text-center sm:text-left space-y-2.5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <h2 className="text-3xl font-black tracking-tight text-white">
                      {profile.gameName}
                      <span className="text-gray-500 font-bold ml-1">
                        #{profile.tagLine}
                      </span>
                    </h2>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold uppercase text-[11px] px-2.5 py-0.5">
                      {profile.regionName} ({profile.region.toUpperCase()})
                    </Badge>
                  </div>
                </div>
              </div>

              {/* 2. Ranks Section (Solo & Flex) */}
              <div className="space-y-4">
                <h4 className="text-sm font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" /> Ranked Tier
                  Overview
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Rank Solo */}
                  <RankCard
                    title="Rank Solo / Duo"
                    rankInfo={profile.ranks.solo}
                  />

                  {/* Rank Flex */}
                  <RankCard
                    title="Rank Flex 5v5"
                    rankInfo={profile.ranks.flex}
                  />
                </div>
              </div>

              {/* 3. Champion Performance (Top 4 in last 10 matches) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Swords size={16} className="text-yellow-400" /> Top
                    Champions Performance (Last 10 Matches)
                  </h4>
                  <span className="text-xs text-gray-500 font-semibold">
                    Top 4 Most Played
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {profile.championPerformance.slice(0, 4).map((champ) => {
                    const isHighWr = champ.winRate >= 55;
                    return (
                      <div
                        key={champ.championId}
                        className="bg-[#141522] border border-gray-800 hover:border-gray-700 p-4 rounded-2xl flex flex-col justify-between transition shadow-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={champ.championIconUrl}
                            alt={champ.championName}
                            className="w-12 h-12 rounded-xl border border-gray-700 object-cover shadow-md"
                          />
                          <div className="min-w-0">
                            <p className="font-extrabold text-white text-base truncate">
                              {champ.championName}
                            </p>
                            <p className="text-xs text-gray-400 font-semibold">
                              {champ.kdaRatio}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-800/80 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-400 font-medium">
                              Gameplay:{" "}
                              <strong className="text-white">
                                {champ.gamesPlayed} games
                              </strong>
                            </span>
                            <span className="text-gray-400">
                              <span className="text-green-400 font-bold">
                                {champ.wins}W
                              </span>{" "}
                              -{" "}
                              <span className="text-red-400 font-bold">
                                {champ.losses}L
                              </span>
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-xs font-extrabold">
                            <span className="text-gray-400">Win Rate</span>
                            <span
                              className={
                                isHighWr ? "text-green-400" : "text-yellow-400"
                              }
                            >
                              {champ.winRate}%
                            </span>
                          </div>

                          <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${champ.winRate}%` }}
                              className={`h-full rounded-full ${
                                isHighWr ? "bg-green-400" : "bg-yellow-500"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Recent Matches (10 Match History) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Clock size={16} className="text-yellow-400" /> Recent 10
                    Matches & 10-Player Lobbies
                  </h4>
                  <span className="text-xs text-gray-500 font-semibold">
                    {profile.recentMatches.length} Matches Found
                  </span>
                </div>

                <div className="space-y-3.5">
                  {profile.recentMatches.slice(0, 10).map((match, idx) => (
                    <MatchCard key={match.matchId || idx} match={match} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------- SUB-COMPONENTS -----------------

const RANK_EMBLEMS: Record<string, string> = {
  iron: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-iron.png',
  bronze: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-bronze.png',
  silver: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-silver.png',
  gold: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-gold.png',
  platinum: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-platinum.png',
  emerald: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-emerald.png',
  diamond: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-diamond.png',
  master: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-master.png',
  grandmaster: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-grandmaster.png',
  challenger: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-challenger.png',
  unranked: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-unranked.png',
};

const RANK_FALLBACKS: Record<string, string> = {
  iron: 'https://opgg-static.akamaized.net/images/medals_new/iron.png',
  bronze: 'https://opgg-static.akamaized.net/images/medals_new/bronze.png',
  silver: 'https://opgg-static.akamaized.net/images/medals_new/silver.png',
  gold: 'https://opgg-static.akamaized.net/images/medals_new/gold.png',
  platinum: 'https://opgg-static.akamaized.net/images/medals_new/platinum.png',
  emerald: 'https://opgg-static.akamaized.net/images/medals_new/emerald.png',
  diamond: 'https://opgg-static.akamaized.net/images/medals_new/diamond.png',
  master: 'https://opgg-static.akamaized.net/images/medals_new/master.png',
  grandmaster: 'https://opgg-static.akamaized.net/images/medals_new/grandmaster.png',
  challenger: 'https://opgg-static.akamaized.net/images/medals_new/challenger.png',
  unranked: 'https://opgg-static.akamaized.net/images/medals_new/unranked.png',
};

function getRankKey(tier?: string): string {
  if (!tier) return 'unranked';
  const t = tier.toLowerCase();
  for (const k of [
    'challenger',
    'grandmaster',
    'master',
    'diamond',
    'emerald',
    'platinum',
    'gold',
    'silver',
    'bronze',
    'iron',
  ]) {
    if (t.includes(k)) return k;
  }
  return 'unranked';
}

function RankCard({
  title,
  rankInfo,
}: {
  title: string;
  rankInfo: CleanRankInfo | null;
}) {
  const tierKey = getRankKey(rankInfo?.tier);
  const emblemUrl = RANK_EMBLEMS[tierKey] || RANK_EMBLEMS.unranked;
  const fallbackUrl = RANK_FALLBACKS[tierKey] || RANK_FALLBACKS.unranked;

  if (!rankInfo) {
    return (
      <div className="p-5 rounded-2xl bg-[#141522] border border-gray-800 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#090a0f] border border-gray-800 flex items-center justify-center p-2 overflow-hidden shadow-inner">
            <img
              src={emblemUrl}
              alt="Unranked"
              className="w-full h-full object-contain opacity-40 filter grayscale"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src !== fallbackUrl) {
                  target.src = fallbackUrl;
                }
              }}
            />
          </div>
          <div>
            <p className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
              {title}
            </p>
            <p className="text-lg font-bold text-gray-300 mt-0.5">Unranked</p>
            <p className="text-xs text-gray-500">No ranked matches recorded</p>
          </div>
        </div>
      </div>
    );
  }

  const tierName = rankInfo.tier?.toUpperCase() || "UNRANKED";

  return (
    <div className="p-5 rounded-2xl bg-[#141522] border border-gray-800 flex flex-wrap items-center justify-between gap-4 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#090a0f] border border-gray-700/60 flex items-center justify-center p-1.5 overflow-hidden shadow-inner">
          <img
            src={emblemUrl}
            alt={tierName}
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src !== fallbackUrl) {
                target.src = fallbackUrl;
              }
            }}
          />
        </div>

        <div>
          <p className="text-[11px] uppercase font-black text-gray-400 tracking-wider">
            {title}
          </p>
          <p className="text-xl font-black text-white mt-0.5">
            {tierName} {rankInfo.rank}
          </p>
          <p className="text-xs font-bold text-yellow-400">{rankInfo.lp} LP</p>
        </div>
      </div>

      <div className="text-right">
        <div className="flex items-center justify-end gap-1.5 text-xs font-bold">
          <span className="text-green-400">{rankInfo.wins}W</span>
          <span className="text-gray-500">/</span>
          <span className="text-red-400">{rankInfo.losses}L</span>
        </div>
        <p className="text-sm font-extrabold text-gray-200 mt-1">
          {rankInfo.winRate}% Win Rate
        </p>
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: CleanMatchSummary }) {
  const isWin = match.win;
  const teamBlue = match.participants.slice(0, 5);
  const teamRed = match.participants.slice(5, 10);

  return (
    <div
      className={`rounded-2xl p-4 sm:p-5 border transition-all duration-300 shadow-md ${
        isWin
          ? "bg-[#101923] border-blue-500/40 hover:border-blue-400"
          : "bg-[#1f1319] border-red-500/40 hover:border-red-400"
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
        {/* Match General Status */}
        <div className="flex items-center gap-4 min-w-50">
          <div className="flex flex-col items-start">
            <Badge
              className={`font-black text-xs px-2.5 py-0.5 uppercase tracking-wider mb-1.5 ${
                isWin
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                  : "bg-red-500/20 text-red-400 border border-red-500/40"
              }`}
            >
              {isWin ? "VICTORY" : "DEFEAT"}
            </Badge>
            <span className="text-xs font-extrabold text-gray-300">
              {match.queueType}
            </span>
            <span className="text-[11px] text-gray-400 mt-0.5">
              {match.gameDuration} · {match.timeAgo}
            </span>
          </div>

          {/* Champion Played & Spells */}
          <div className="flex items-center gap-2 pl-2">
            <div className="relative">
              <img
                src={match.champion.iconUrl}
                alt={match.champion.name}
                className="w-13 h-13 rounded-xl border border-gray-700 object-cover shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-1">
              {match.spells.slice(0, 2).map((spell, i) => (
                <img
                  key={i}
                  src={spell.iconUrl}
                  alt="Spell"
                  className="w-5 h-5 rounded-md border border-gray-800 object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Player In-Game Stats */}
        <div className="flex flex-col items-start sm:items-center min-w-37.5">
          <div className="text-base font-black text-white">
            <span>{match.stats.kills}</span> /{" "}
            <span className="text-red-400">{match.stats.deaths}</span> /{" "}
            <span className="text-yellow-400">{match.stats.assists}</span>
          </div>
          <div className="text-xs font-extrabold text-gray-400 mt-0.5">
            {match.stats.kdaRatio}
          </div>
          <div className="text-[11px] text-gray-500">
            {match.stats.cs} CS ({match.stats.csPerMinute})
          </div>
        </div>

        {/* Items Built */}
        <div className="flex flex-wrap gap-1 max-w-42.5">
          {match.items.slice(0, 7).map((item, idx) => (
            <div
              key={idx}
              className="w-7 h-7 rounded-md bg-[#090a0f] border border-gray-800 overflow-hidden shrink-0"
            >
              {item.iconUrl ? (
                <img
                  src={item.iconUrl}
                  alt={`Item ${item.id}`}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          ))}
        </div>

        {/* 10-Player Lobby (5 vs 5) */}
        <div className="w-full lg:w-auto grid grid-cols-2 gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-gray-800/80 text-xs">
          {/* Blue Team (5) */}
          <div className="space-y-1">
            {teamBlue.map((p, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded ${
                  p.isCurrentPlayer
                    ? "bg-blue-500/20 font-bold text-white"
                    : "text-gray-400"
                }`}
              >
                <img
                  src={p.championIconUrl}
                  alt=""
                  className="w-4 h-4 rounded-sm object-cover border border-gray-700"
                />
                <span className="truncate max-w-23.75 text-[11px]">
                  {p.riotId}
                </span>
              </div>
            ))}
          </div>

          {/* Red Team (5) */}
          <div className="space-y-1">
            {teamRed.map((p, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-1.5 px-1.5 py-0.5 rounded ${
                  p.isCurrentPlayer
                    ? "bg-red-500/20 font-bold text-white"
                    : "text-gray-400"
                }`}
              >
                <img
                  src={p.championIconUrl}
                  alt=""
                  className="w-4 h-4 rounded-sm object-cover border border-gray-700"
                />
                <span className="truncate max-w-23.75 text-[11px]">
                  {p.riotId}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
