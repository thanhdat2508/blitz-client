import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import LolIcon from "@/components/icon/lol";
import { Input } from "@/components/ui/input";
import {
  Search,
  Globe,
  Loader2,
  Swords,
  Trophy,
  User,
  Newspaper,
  ArrowRight,
  X,
  Flame,
} from "lucide-react";
import { PlayerProfileModal } from "@/features/player/components/player-profile-modal";
import { NewsModal } from "@/features/news/components/news-modal";
import { getPostBySlug } from "@/features/news/api/get-posts";
import { mapPostToNewsArticle } from "@/lib/news";
import type { NewsArticle } from "@/types/news";
import { Button } from "@/components/ui/button";
import { useGlobalSearch } from "@/hooks/use-global-search";
import type {
  ChampionSearchResult,
  ProPlayerSearchResult,
  PostSearchResult,
} from "@/lib/search";

const REGION_OPTIONS = [
  { id: "vn2", label: "VN" },
  { id: "kr", label: "KR" },
  { id: "na1", label: "NA" },
  { id: "euw1", label: "EUW" },
];

const SUGGESTED_PLAYERS = [
  { riotId: "Faker#KR1", region: "kr" },
  { riotId: "Chovy#GEN", region: "kr" },
  { riotId: "Only Prime#duybt", region: "vn2" },
  { riotId: "Uzumacchiato#ngohi", region: "vn2" },
];

export function HeroSection() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [region, setRegion] = useState("vn2");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedNewsArticle, setSelectedNewsArticle] =
    useState<NewsArticle | null>(null);

  const [activeModal, setActiveModal] = useState<{
    isOpen: boolean;
    gameName: string;
    tagLine: string;
    region: string;
  }>({
    isOpen: false,
    gameName: "",
    tagLine: "",
    region: "vn2",
  });

  // Global search hook query
  const { data: searchData, isLoading } = useGlobalSearch(searchInput, region);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle direct summoner search modal
  const openSummonerModal = (
    name: string,
    tag: string,
    targetRegion?: string,
  ) => {
    setIsDropdownOpen(false);
    setActiveModal({
      isOpen: true,
      gameName: name,
      tagLine: tag || region.toUpperCase(),
      region: targetRegion || region,
    });
  };

  // Handle Champion Navigation
  const handleSelectChampion = (champ: ChampionSearchResult) => {
    setIsDropdownOpen(false);
    navigate({
      to: "/champions/$championId",
      params: { championId: champ.key || champ.id },
    });
  };

  // Handle Pro Player Selection
  const handleSelectProPlayer = (player: ProPlayerSearchResult) => {
    setIsDropdownOpen(false);
    const targetRegion =
      player.team === "T1" || player.team === "Gen.G" ? "kr" : region;
    openSummonerModal(player.riotGameName, player.riotTagLine, targetRegion);
  };

  const handleSelectPost = async (post: PostSearchResult) => {
    setIsDropdownOpen(false);
    try {
      const fullPost = await getPostBySlug(post.slug);
      setSelectedNewsArticle(mapPostToNewsArticle(fullPost));
    } catch {
      setSelectedNewsArticle({
        id: post.id,
        slug: post.slug,
        title: post.title,
        summary: post.contentSnippet || post.title,
        category: "patch-notes",
        bannerUrl:
          post.coverImageUrl ||
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
        publishedAt: post.createdAt || new Date().toISOString(),
        readTimeMinutes: 3,
        author: post.authorName || "Riot Games",
      });
    }
  };

  const handleSearchSubmit = (rawInput?: string, targetRegion?: string) => {
    const text = (rawInput ?? searchInput).trim();
    if (!text) return;

    const usedRegion = targetRegion || region;

    // Check if input contains Riot ID separator (#)
    if (text.includes("#")) {
      const parts = text.split("#");
      const gName = parts[0].trim();
      const tLine = parts.slice(1).join("#").trim();
      if (gName) {
        openSummonerModal(gName, tLine || usedRegion.toUpperCase(), usedRegion);
        return;
      }
    }

    // Check if exact champion match exists in current results
    if (searchData?.champions && searchData.champions.length > 0) {
      const exactChamp = searchData.champions.find(
        (c) =>
          c.name.toLowerCase() === text.toLowerCase() ||
          c.key.toLowerCase() === text.toLowerCase(),
      );
      if (exactChamp) {
        handleSelectChampion(exactChamp);
        return;
      }
    }

    // Check if exact pro player match exists
    if (searchData?.proPlayers && searchData.proPlayers.length > 0) {
      const exactPro = searchData.proPlayers.find(
        (p) =>
          p.nickname.toLowerCase() === text.toLowerCase() ||
          p.name.toLowerCase() === text.toLowerCase(),
      );
      if (exactPro) {
        handleSelectProPlayer(exactPro);
        return;
      }
    }

    // Check if exact post match exists
    if (searchData?.posts && searchData.posts.length > 0) {
      const exactPost = searchData.posts.find(
        (p) => p.title.toLowerCase() === text.toLowerCase(),
      );
      if (exactPost) {
        handleSelectPost(exactPost);
        return;
      }
    }

    // Default: lookup as summoner name
    openSummonerModal(text, usedRegion.toUpperCase(), usedRegion);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearchSubmit();
  };

  const hasChampions = (searchData?.champions?.length ?? 0) > 0;
  const hasProPlayers = (searchData?.proPlayers?.length ?? 0) > 0;
  const hasPosts = (searchData?.posts?.length ?? 0) > 0;
  const hasSummoner = !!searchData?.summoner;
  const hasAnyResults = hasChampions || hasProPlayers || hasPosts || hasSummoner;

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-screen object-cover opacity-40 pointer-events-none"
      >
        <source src="/background.webm" type="video/webm" />
      </video>
      <div className="absolute inset-0 bg-linear-to-t from-[#0b0c10] via-transparent to-[#0b0c10] pointer-events-none" />

      <div className="relative z-20 w-full max-w-3xl flex flex-col items-center justify-center text-center px-4">
        {/* Header Title */}
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <div className="flex items-center justify-center gap-4">
            <div className="bg-amber-300 text-black p-2 rounded-md shadow-lg shadow-amber-300/20">
              <LolIcon />
            </div>
            <h1 className="text-5xl md:text-6xl uppercase font-black tracking-tight drop-shadow-2xl">
              league of legends
            </h1>
          </div>
          <p className="text-gray-300 font-medium mb-6">
            Elevate your gameplay with Build, Meta & Summoner Analytics.
          </p>
        </div>

        {/* Search Bar Container */}
        <div ref={containerRef} className="relative w-full">
          <form onSubmit={onSubmit} className="relative w-full group">
            <div className="relative flex items-center w-full bg-[#121420]/95 backdrop-blur-md rounded-2xl border border-neutral-700/80 hover:border-yellow-500/70 focus-within:border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-500/30 transition-all shadow-2xl overflow-hidden">
              {/* Region Selector */}
              <div className="flex items-center gap-1 pl-4 pr-2 border-r border-gray-700/80 text-xs font-bold text-gray-400 shrink-0">
                <Globe size={15} className="text-yellow-400" />
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-transparent text-gray-200 uppercase font-black text-xs focus:outline-none cursor-pointer py-3 pr-1"
                >
                  {REGION_OPTIONS.map((reg) => (
                    <option
                      key={reg.id}
                      value={reg.id}
                      className="bg-[#121420] text-white"
                    >
                      {reg.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input Field */}
              <div className="relative flex-1 flex items-center">
                <Search
                  className="absolute left-4 text-gray-400 group-hover:text-yellow-400 transition-colors"
                  size={20}
                />
                <Input
                  type="text"
                  value={searchInput}
                  onFocus={() => setIsDropdownOpen(true)}
                  onChange={(e) => {
                    setSearchInput(e.target.value);
                    if (!isDropdownOpen) setIsDropdownOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsDropdownOpen(false);
                    }
                  }}
                  placeholder="Search Champions, Pros, Summoners (e.g. Ahri, Faker#KR1, T1)..."
                  className="w-full bg-transparent border-none text-white text-base md:text-lg font-semibold py-6 pl-12 pr-10 focus:ring-0 placeholder:text-gray-500 placeholder:text-sm md:placeholder:text-base"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchInput("");
                      setIsDropdownOpen(false);
                    }}
                    className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-white hover:bg-neutral-800 transition"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Search Submit Button */}
              <Button
                type="submit"
                className="mr-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-sm transition-all shadow-lg cursor-pointer shrink-0"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Unified Global Search Dropdown Results */}
          {isDropdownOpen && searchInput.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0e101a]/95 backdrop-blur-xl border border-yellow-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden text-left animate-in fade-in slide-in-from-top-2 duration-150 max-h-[70vh] flex flex-col">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800/80 bg-[#141624]/80 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5 font-medium">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      <span>Searching database...</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        Results for:{" "}
                        <strong className="text-white">
                          "{searchInput.trim()}"
                        </strong>
                      </span>
                    </>
                  )}
                </span>
                <span className="text-[11px] text-neutral-500">
                  {region.toUpperCase()} • Press Esc to close
                </span>
              </div>

              {/* Scrollable Results Area */}
              <div className="overflow-y-auto divide-y divide-neutral-800/60 p-2 space-y-2">
                {/* 1. Direct Summoner Action */}
                {searchData?.summoner && (
                  <div className="pt-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 flex items-center gap-1.5">
                      <User size={13} className="text-yellow-400" />
                      <span>PLAYER SEARCH (SUMMONER)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        openSummonerModal(
                          searchData.summoner!.gameName,
                          searchData.summoner!.tagLine,
                          searchData.summoner!.region,
                        )
                      }
                      className="w-full mt-1 flex items-center justify-between p-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 transition group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-black text-sm border border-yellow-500/40">
                          {region.toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-yellow-400 transition flex items-center gap-2">
                            <span>{searchData.summoner.gameName}</span>
                            <span className="text-xs px-1.5 py-0.5 rounded bg-neutral-800 text-yellow-400 font-mono">
                              #{searchData.summoner.tagLine}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400">
                            View dossier, ranked tier, win rate & recent match history
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-yellow-400 group-hover:translate-x-1 transition-transform">
                        <span>View Dossier</span>
                        <ArrowRight size={14} />
                      </div>
                    </button>
                  </div>
                )}

                {/* 2. Champions Section */}
                {hasChampions && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 flex items-center gap-1.5">
                      <Swords size={13} className="text-cyan-400" />
                      <span>CHAMPIONS ({searchData?.champions.length})</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                      {searchData?.champions.map((champ) => (
                        <button
                          key={champ.id}
                          type="button"
                          onClick={() => handleSelectChampion(champ)}
                          className="flex items-center gap-3 p-2 rounded-xl bg-neutral-900/60 hover:bg-cyan-500/15 border border-neutral-800/80 hover:border-cyan-500/40 transition group text-left cursor-pointer"
                        >
                          <img
                            src={champ.avatarUrl}
                            alt={champ.name}
                            className="w-10 h-10 rounded-lg object-cover border border-neutral-700 group-hover:border-cyan-400 transition shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition truncate">
                              {champ.name}
                            </div>
                            <div className="text-xs text-neutral-400 truncate capitalize">
                              {champ.title}
                            </div>
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-800 text-cyan-400 border border-neutral-700/60 shrink-0">
                            BUILD
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Pro Players Section */}
                {hasProPlayers && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 flex items-center gap-1.5">
                      <Trophy size={13} className="text-amber-400" />
                      <span>PRO PLAYERS ({searchData?.proPlayers.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {searchData?.proPlayers.map((player) => (
                        <button
                          key={player.id}
                          type="button"
                          onClick={() => handleSelectProPlayer(player)}
                          className="w-full flex items-center justify-between p-2 rounded-xl bg-neutral-900/60 hover:bg-amber-500/15 border border-neutral-800/80 hover:border-amber-500/40 transition group text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={player.avatar}
                              alt={player.nickname}
                              className="w-9 h-9 rounded-full object-cover border border-neutral-700 group-hover:border-amber-400 transition shrink-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display =
                                  "none";
                              }}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white group-hover:text-amber-300 transition">
                                  {player.nickname}
                                </span>
                                <span className="text-xs text-neutral-400">
                                  ({player.name})
                                </span>
                                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  {player.team}
                                </span>
                              </div>
                              <div className="text-xs text-neutral-400 font-mono">
                                Riot ID: {player.riotId} • Role: {player.role}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-amber-400 group-hover:translate-x-1 transition-transform shrink-0">
                            <span>Details</span>
                            <ArrowRight size={13} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Posts / News Section */}
                {hasPosts && (
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-1 flex items-center gap-1.5">
                      <Newspaper size={13} className="text-emerald-400" />
                      <span>ARTICLES & NEWS ({searchData?.posts.length})</span>
                    </div>
                    <div className="space-y-1 mt-1">
                      {searchData?.posts.map((post) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => handleSelectPost(post)}
                          className="w-full flex items-center justify-between p-2 rounded-xl bg-neutral-900/60 hover:bg-emerald-500/15 border border-neutral-800/80 hover:border-emerald-500/40 transition group text-left cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition truncate">
                              {post.title}
                            </div>
                            {post.contentSnippet && (
                              <p className="text-xs text-neutral-400 truncate">
                                {post.contentSnippet}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0">
                            <span className="text-[10px] text-neutral-400 mr-1">{post.authorName}</span>
                            <ArrowRight size={13} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {!isLoading && !hasAnyResults && (
                  <div className="py-8 text-center text-neutral-400 text-sm">
                    No relevant results found for "
                    <span className="text-white font-semibold">
                      {searchInput}
                    </span>
                    "
                  </div>
                )}
              </div>

              {/* Footer Helper */}
              <div className="px-4 py-2 bg-[#121422] border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                <span>
                  💡 Tip: Search champions (Ahri), pros (Faker), or Riot ID with # (Faker#KR1)
                </span>
                <span className="text-neutral-500 hidden sm:inline">
                  Press Enter to quick search
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          {SUGGESTED_PLAYERS.map((player) => (
            <Button
              key={player.riotId}
              type="button"
              onClick={() => {
                setSearchInput(player.riotId);
                setRegion(player.region);
                handleSearchSubmit(player.riotId, player.region);
              }}
              className="px-2.5 py-1 rounded-lg bg-gray-800/80 hover:bg-yellow-500/20 hover:text-yellow-400 border border-gray-700/60 text-gray-300 font-semibold transition cursor-pointer"
            >
              {player.riotId}
            </Button>
          ))}
        </div>
      </div>

      {/* Player Profile Dossier Modal */}
      <PlayerProfileModal
        isOpen={activeModal.isOpen}
        onClose={() => setActiveModal((prev) => ({ ...prev, isOpen: false }))}
        gameName={activeModal.gameName}
        tagLine={activeModal.tagLine}
        region={activeModal.region}
      />

      <NewsModal
        article={selectedNewsArticle}
        onClose={() => setSelectedNewsArticle(null)}
      />
    </div>
  );
}
