import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  X,
  Newspaper,
  Compass,
  ArrowRight,
  TrendingUp,
  Swords,
  Trophy,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useGlobalSearch } from "@/hooks/use-global-search";

const QUICK_LINKS = [
  {
    name: "Home",
    href: "/",
    icon: Compass,
    desc: "League of Legends statistics & analytics overview",
  },
  {
    name: "Champions & Tier List",
    href: "/champions",
    icon: Swords,
    desc: "Meta tier rankings, builds & win rates",
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    icon: Trophy,
    desc: "Regional top tier challenger rankings",
  },
  {
    name: "News & Patch Notes",
    href: "/news",
    icon: Newspaper,
    desc: "Game balance updates & patch analysis",
  },
  {
    name: "About & Architecture",
    href: "/about",
    icon: Compass,
    desc: "Technical architecture & platform documentation",
  },
];

export function CommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Keyboard shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { data: searchData, isLoading } = useGlobalSearch(query, "vn2");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredLinks = useMemo(() => {
    if (!normalizedQuery) return QUICK_LINKS;
    return QUICK_LINKS.filter(
      (l) =>
        l.name.toLowerCase().includes(normalizedQuery) ||
        l.desc.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const champions = searchData?.champions || [];
  const proPlayers = searchData?.proPlayers || [];
  const posts = searchData?.posts || [];

  const hasResults =
    champions.length > 0 ||
    proPlayers.length > 0 ||
    posts.length > 0 ||
    filteredLinks.length > 0 ||
    !normalizedQuery;

  const handleSelectLink = (href: string) => {
    setIsOpen(false);
    setQuery("");
    navigate({ to: href as any });
  };

  const handleSelectChampion = (championId: string) => {
    setIsOpen(false);
    setQuery("");
    navigate({
      to: "/champions/$championId",
      params: { championId },
    });
  };

  const handleSelectPost = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    navigate({
      to: "/news",
      search: { article: slug } as any,
    });
  };

  return (
    <>
      {/* Search Trigger Button in Header */}
      <Button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2.5 h-9 w-44 sm:w-60 md:w-72 px-3 rounded-xl bg-[#141622] hover:bg-[#1a1d2e] border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-xs font-medium transition-all shadow-inner cursor-pointer"
        aria-label="Search champions, articles..."
      >
        <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors shrink-0" />
        <p className="truncate flex-1 text-left">Search champions, news...</p>
        <kbd className="hidden sm:inline-block text-[10px] font-mono text-neutral-500 bg-neutral-900 border border-neutral-800 rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </Button>

      {/* Command Palette Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="bg-[#0e1017] border-neutral-800 text-neutral-100 sm:max-w-xl p-0 rounded-2xl shadow-2xl overflow-hidden gap-0"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Quick Search</DialogTitle>
          <DialogDescription className="sr-only">
            Type champion name, pro player or news article
          </DialogDescription>

          {/* Search Header Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800/80 bg-[#12141f]">
            {isLoading ? (
              <Loader2 className="w-5 h-5 text-amber-400 animate-spin shrink-0" />
            ) : (
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <Input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search champions (Ahri, Yasuo), pros (Faker), articles..."
              className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none"
            />
            {query && (
              <Button
                type="button"
                onClick={() => setQuery("")}
                className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            <kbd className="text-[10px] font-semibold text-neutral-400 bg-neutral-800/80 border border-neutral-700/60 rounded px-1.5 py-0.5">
              ESC
            </kbd>
          </div>

          {/* Search Results Body */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
            {!hasResults ? (
              <div className="py-12 text-center text-neutral-400 space-y-1">
                <Search className="w-8 h-8 mx-auto text-neutral-600 mb-2" />
                <p className="text-sm font-medium text-white">
                  No results found
                </p>
                <p className="text-xs text-neutral-500">
                  Try searching with keywords like "Ahri", "Faker", or "Top"
                </p>
              </div>
            ) : (
              <>
                {/* 1. Champions Category */}
                {champions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
                      <Swords className="w-3.5 h-3.5" /> CHAMPIONS ({champions.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                      {champions.map((champ) => (
                        <button
                          key={champ.id}
                          type="button"
                          onClick={() => handleSelectChampion(champ.key || champ.id)}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-[#141624]/60 hover:bg-cyan-500/15 border border-neutral-800 hover:border-cyan-500/40 transition-all text-left group cursor-pointer"
                        >
                          <img
                            src={champ.avatarUrl}
                            alt={champ.name}
                            className="w-9 h-9 rounded-lg object-cover border border-neutral-700 group-hover:border-cyan-400 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                              {champ.name}
                            </p>
                            <p className="text-[10px] text-neutral-400 truncate capitalize">
                              {champ.title}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-medium px-1.5 py-0 text-cyan-400 border-cyan-500/30"
                          >
                            BUILD
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Pro Players Category */}
                {proPlayers.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Trophy className="w-3.5 h-3.5" /> PRO PLAYERS ({proPlayers.length})
                    </div>
                    <div className="space-y-1 mt-1">
                      {proPlayers.map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-2 rounded-xl bg-[#141624]/60 border border-neutral-800 text-left"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={player.avatar}
                              alt={player.nickname}
                              className="w-8 h-8 rounded-full object-cover border border-neutral-700"
                            />
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-2">
                                <span>{player.nickname}</span>
                                <span className="text-[10px] text-amber-400 font-normal">({player.team})</span>
                              </div>
                              <p className="text-[10px] text-neutral-400 font-mono">
                                Riot ID: {player.riotId} • Role: {player.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. News / Patch Notes Category */}
                {posts.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <Newspaper className="w-3.5 h-3.5" /> ARTICLES & NEWS ({posts.length})
                    </div>
                    <div className="space-y-1 mt-1">
                      {posts.map((post) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => handleSelectPost(post.slug)}
                          className="flex w-full items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition-all text-left group cursor-pointer"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="text-xs font-semibold text-white group-hover:text-emerald-300 truncate">
                              {post.title}
                            </p>
                            {post.contentSnippet && (
                              <p className="text-[11px] text-neutral-400 truncate">
                                {post.contentSnippet}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Quick Links Navigation */}
                {filteredLinks.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider text-neutral-400">
                      <TrendingUp className="w-3.5 h-3.5" /> QUICK NAVIGATION
                    </div>
                    <div className="space-y-1 mt-1">
                      {filteredLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => handleSelectLink(link.href)}
                            className="flex w-full items-center justify-between gap-3 p-2.5 rounded-xl hover:bg-[#181a26] border border-transparent hover:border-neutral-800 transition-all text-left group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors">
                                <Icon className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                                  {link.name}
                                </p>
                                <p className="text-[11px] text-neutral-400">
                                  {link.desc}
                                </p>
                              </div>
                            </div>
                            <p className="text-[10px] text-neutral-500 font-mono">
                              {link.href}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="px-4 py-2.5 border-t border-neutral-800/80 bg-[#0d0e15] flex items-center justify-between text-[11px] text-neutral-500">
            <p>ESC to close</p>
            <p>Click to navigate directly</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
