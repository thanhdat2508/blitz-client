import { Link } from "@tanstack/react-router";
import LolIcon from "@/components/icon/lol";
import { DiscordIcon, GithubIcon, TwitterIcon } from "../icon/social";

const FOOTER_COLUMNS = [
  {
    title: "Game & Meta",
    links: [
      { name: "Champion Tier List", href: "/" },
      { name: "Pro Player Builds", href: "/builds" },
      { name: "Patch 26.19 Notes", href: "/news" },
      { name: "New Champions (Locke, Zaahen)", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Challenger Guides", href: "/" },
      { name: "News & Articles", href: "/news" },
      { name: "Leaderboard", href: "/leaderboard" },
      { name: "Project Architecture", href: "/about" },
    ],
  },
  {
    title: "About & Legal",
    links: [
      { name: "About Blitz", href: "/about" },
      { name: "Privacy Policy", href: "/about" },
      { name: "Terms of Service", href: "/about" },
      { name: "Community Support", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-800/80 bg-[#090a0e] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 group shrink-0 w-fit"
            >
              <div className="bg-amber-400 text-black p-1.5 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-md shadow-amber-500/20">
                <LolIcon />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-wider text-white">
                  BLITZ
                </span>
                <span className="text-[10px] text-neutral-400 font-medium">
                  League of Legends Meta & Stats
                </span>
              </div>
            </Link>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Nền tảng phân tích meta, dữ liệu tướng, lối lên đồ tuyển thủ và
              cập nhật thông tin chi tiết các bản vá của Liên Minh Huyền Thoại
              theo thời gian thực.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/thanhdat2508/blitz-client"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Discord Community"
              >
                <DiscordIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="space-y-3">
              <p className="text-white font-bold text-xs uppercase tracking-wider">
                {column.title}
              </p>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-400 hover:text-white transition-colors block py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800/60 my-8" />

        {/* Bottom Section: Legal & Disclaimers */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="space-y-1 max-w-3xl">
            <p>
              © {new Date().getFullYear()} BLITZ Build. All rights reserved.
            </p>
            <p className="text-neutral-400 leading-normal">
              BLITZ isn't endorsed by Riot Games and doesn't reflect the views
              or opinions of Riot Games or anyone officially involved in
              producing or managing League of Legends. League of Legends™ and
              Riot Games are trademarks or registered trademarks of Riot Games,
              Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
