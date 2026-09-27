import { Link } from "@tanstack/react-router";
import LolIcon from "@/components/icon/lol";
import { CommandSearch } from "./command-search";
import { GuestUserMenu } from "@/features/auth";
import { cn } from "@/lib/utils";
import { Home, Newspaper, Flame, Swords } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: typeof Home;
  isNew?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "News", href: "/news", icon: Newspaper, isNew: true },
  { name: "Leaderboard", href: "/leaderboard", icon: Flame },
  { name: "Pro Builds", href: "/builds", icon: Swords },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800/80 bg-[#0b0c10]/95 backdrop-blur-md">
      {/* 1. Top Bar: Logo, Search Command, User Login */}
      <div className="border-b border-neutral-800/50">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between gap-4 lg:px-0 md:px-4 sm:px-6">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="bg-amber-400 text-black p-1.5 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shadow-amber-500/20">
              <LolIcon />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="font-black text-lg tracking-wider text-white">
                  BLITZ
                </h1>
              </div>
              <p className="text-xs text-neutral-400 hidden sm:inline-block font-medium">
                League of Legends Meta & Stats
              </p>
            </div>
          </Link>

          {/* Right Actions: Command Search & Login Menu */}
          <div className="flex items-center gap-3">
            {/* Command Search button trigger */}
            <CommandSearch />

            {/* Login / User Avatar Dropdown */}
            <GuestUserMenu />
          </div>
        </div>
      </div>

      {/* 2. Bottom Bar: Navigation items with active red line */}
      <div className="bg-[#0f1118]/80 border-t border-neutral-800/40">
        <div className="max-w-6xl mx-auto lg:px-0 md:px-4 sm:px-6">
          <nav
            aria-label="Main Navigation"
            className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  activeOptions={{ exact: item.href === "/" }}
                  className={cn(
                    "relative flex items-center gap-2 h-10 px-3.5 text-xs font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors outline-none cursor-pointer border-b-2 border-transparent select-none shrink-0",
                    "[&.active]:text-white [&.active]:font-semibold [&.active]:border-rose-500 [&.active]:bg-transparent",
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                  {item.isNew && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 ml-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
