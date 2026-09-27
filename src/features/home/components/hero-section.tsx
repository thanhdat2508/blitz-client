import { useState, type FormEvent } from "react";
import LolIcon from "@/components/icon/lol";
import { Input } from "@/components/ui/input";
import { Search, Globe } from "lucide-react";
import { PlayerProfileModal } from "@/features/player/components/player-profile-modal";
import { Button } from "@/components/ui/button";

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
  const [searchInput, setSearchInput] = useState("");
  const [region, setRegion] = useState("vn2");
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

  const handleSearch = (rawInput?: string, targetRegion?: string) => {
    const text = (rawInput ?? searchInput).trim();
    if (!text) return;

    const usedRegion = targetRegion || region;
    let gameName = text;
    let tagLine = usedRegion.toUpperCase();

    if (text.includes("#")) {
      const parts = text.split("#");
      gameName = parts[0].trim();
      tagLine = parts.slice(1).join("#").trim();
    }

    if (!gameName) return;

    setActiveModal({
      isOpen: true,
      gameName,
      tagLine: tagLine || "VN2",
      region: usedRegion,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

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

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center text-center px-4">
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
        {/* Search Bar Form */}
        <form onSubmit={onSubmit} className="relative w-full group">
          <div className="relative flex items-center w-full bg-[#121420]/90 backdrop-blur-md rounded-2xl border hover:border-yellow-500/60 focus-within:border-yellow-500 focus-within:ring-2 focus-within:ring-yellow-500/20 transition-all shadow-2xl overflow-hidden">
            {/* Region Selector */}
            <div className="flex items-center gap-1 pl-4 pr-2 border-r border-gray-700/80 text-xs font-bold text-gray-400">
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
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Player (e.g. Faker#KR1 or Duy#prime)..."
                className="w-full bg-transparent border-none text-white text-base md:text-lg font-semibold py-6 pl-12 pr-4 focus:ring-0"
              />
            </div>

            {/* Search Submit Button */}
            <Button
              type="submit"
              className="mr-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-black text-sm transition-all shadow-lg cursor-pointer"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Quick Suggestions Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          {SUGGESTED_PLAYERS.map((player) => (
            <Button
              key={player.riotId}
              type="button"
              onClick={() => {
                setSearchInput(player.riotId);
                setRegion(player.region);
                handleSearch(player.riotId, player.region);
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
    </div>
  );
}
