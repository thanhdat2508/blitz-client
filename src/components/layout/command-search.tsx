import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Search,
  X,
  Newspaper,
  Compass,
  ArrowRight,
  TrendingUp,
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

interface SearchChampion {
  name: string;
  role: string;
  avatarUrl: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "outline";
}

interface SearchNews {
  version: string;
  title: string;
  slug: string;
}

const CHAMPIONS: SearchChampion[] = [
  {
    name: "Ahri",
    role: "Mid",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png",
    badge: "Tier S",
  },
  {
    name: "Locke",
    role: "New Champion",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Locke_0.jpg",
    badge: "Mới ra mắt",
  },
  {
    name: "Zaahen",
    role: "New Champion",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zaahen_0.jpg",
    badge: "Mới ra mắt",
  },
  {
    name: "Yunara",
    role: "New Champion",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yunara_0.jpg",
    badge: "Mới ra mắt",
  },
  {
    name: "Lucian",
    role: "ADC",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Lucian.png",
    badge: "Pro Meta",
  },
  {
    name: "Sylas",
    role: "Mid",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Sylas.png",
    badge: "Pro Meta",
  },
  {
    name: "Tristana",
    role: "ADC",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Tristana.png",
    badge: "Tier S+",
  },
  {
    name: "Syndra",
    role: "Mid",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Syndra.png",
    badge: "Tier S+",
  },
  {
    name: "Lee Sin",
    role: "Jungle",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/LeeSin.png",
    badge: "Tier A",
  },
  {
    name: "Rammus",
    role: "Jungle",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Rammus.png",
    badge: "Tier S",
  },
  {
    name: "Sejuani",
    role: "Jungle",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Sejuani.png",
    badge: "Tier S",
  },
  {
    name: "Hwei",
    role: "Mid Lane",
    avatarUrl:
      "https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Hwei.png",
    badge: "Tier S",
  },
];

const NEWS_LIST: SearchNews[] = [
  {
    version: "26.19",
    title: "Chi tiết bản cập nhật 26.19: Cân bằng tướng và buff đường trên",
    slug: "patch-notes-26-19",
  },
  {
    version: "26.18",
    title: "Chi tiết bản cập nhật 26.18: 5 vị tướng cổ điển quay trở lại",
    slug: "patch-notes-26-18",
  },
  {
    version: "26.17",
    title: "Chi tiết bản cập nhật 26.17: Tinh chỉnh trang bị và cân bằng meta",
    slug: "patch-notes-26-17",
  },
];

const QUICK_LINKS = [
  {
    name: "Trang chủ",
    href: "/",
    icon: Compass,
    desc: "Trang thông tin tổng hợp",
  },
  {
    name: "Tin tức & Bản cập nhật",
    href: "/news",
    icon: Newspaper,
    desc: "Cập nhật thay đổi meta và tướng",
  },
  {
    name: "Cấu trúc dự án",
    href: "/about",
    icon: Compass,
    desc: "Tài liệu kỹ thuật và kiến trúc",
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

  const normalizedQuery = query.trim().toLowerCase();

  const filteredChampions = useMemo(() => {
    if (!normalizedQuery) return CHAMPIONS.slice(0, 6);
    return CHAMPIONS.filter(
      (c) =>
        c.name.toLowerCase().includes(normalizedQuery) ||
        c.role.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const filteredNews = useMemo(() => {
    if (!normalizedQuery) return NEWS_LIST;
    return NEWS_LIST.filter(
      (n) =>
        n.version.toLowerCase().includes(normalizedQuery) ||
        n.title.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const filteredLinks = useMemo(() => {
    if (!normalizedQuery) return QUICK_LINKS;
    return QUICK_LINKS.filter(
      (l) =>
        l.name.toLowerCase().includes(normalizedQuery) ||
        l.desc.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const hasResults =
    filteredChampions.length > 0 ||
    filteredNews.length > 0 ||
    filteredLinks.length > 0;

  const handleSelectLink = (href: string) => {
    setIsOpen(false);
    setQuery("");
    navigate({ to: href as any });
  };

  return (
    <>
      {/* Search Trigger Button in Header */}
      <Button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2.5 h-9 w-44 sm:w-60 md:w-72 px-3 rounded-xl bg-[#141622] hover:bg-[#1a1d2e] border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-xs font-medium transition-all shadow-inner cursor-pointer"
        aria-label="Tìm kiếm tướng, bài viết..."
      >
        <Search className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-400 transition-colors shrink-0" />
        <p className="truncate flex-1 text-left">Tìm kiếm tướng, bài viết...</p>
      </Button>

      {/* Command Palette Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="bg-[#0e1017] border-neutral-800 text-neutral-100 sm:max-w-xl p-0 rounded-2xl shadow-2xl overflow-hidden gap-0"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Tìm kiếm nhanh</DialogTitle>
          <DialogDescription className="sr-only">
            Gõ tên tướng, phiên bản patch hoặc mục điều hướng cần tìm
          </DialogDescription>

          {/* Search Header Input */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-800/80 bg-[#12141f]">
            <Search className="w-5 h-5 text-amber-400 shrink-0" />
            <Input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Gõ tên tướng (Faker, Ahri), bản patch (26.19)..."
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
                  Không tìm thấy kết quả nào
                </p>
                <p className="text-xs text-neutral-500">
                  Thử tìm kiếm với từ khóa khác như "Ahri", "26.19", hoặc "News"
                </p>
              </div>
            ) : (
              <>
                {/* 1. Champions Category */}
                {filteredChampions.length && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
                      {filteredChampions.map((champ) => (
                        <Button
                          key={champ.name}
                          type="button"
                          onClick={() => handleSelectLink("/")}
                          variant="ghost"
                          className="flex items-center gap-3 py-8 rounded-xl hover:bg-[#181a26] border border-transparent hover:border-neutral-800 transition-all text-left group cursor-pointer"
                        >
                          <img
                            src={champ.avatarUrl}
                            alt={champ.name}
                            className="w-9 h-9 rounded-lg object-cover border border-neutral-700 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                              {champ.name}
                            </p>
                            <p className="text-[11px] text-neutral-400 truncate">
                              {champ.role}
                            </p>
                          </div>
                          {champ.badge && (
                            <Badge
                              variant="outline"
                              className="text-xs font-medium px-1.5 py-0"
                            >
                              {champ.badge}
                            </Badge>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. News / Patch Notes Category */}
                {filteredNews.length && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-bold uppercase tracking-wider">
                      <Newspaper className="w-3 h-3" /> Update and news
                    </div>
                    <div className="space-y-1 mt-1">
                      {filteredNews.map((news) => (
                        <Button
                          key={news.version}
                          type="button"
                          onClick={() => handleSelectLink("/news")}
                          variant="ghost"
                          className="flex w-full items-center justify-between gap-3 py-8 rounded-xl hover:bg-[#181a26] border border-transparent hover:border-neutral-800 transition-all text-left group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <p className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md shrink-0">
                              v{news.version}
                            </p>
                            <p className="text-xs text-neutral-200 group-hover:text-white truncate">
                              {news.title}
                            </p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Quick Links Navigation */}
                {filteredLinks.length && (
                  <div>
                    <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      <TrendingUp className="w-3 h-3" /> Điều hướng nhanh
                    </div>
                    <div className="space-y-1 mt-1">
                      {filteredLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => handleSelectLink(link.href)}
                            className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#181a26] border border-transparent hover:border-neutral-800 transition-all text-left group cursor-pointer"
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
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {link.href}
                            </span>
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
