import LolIcon from "@/components/icon/lol";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function HeroSection() {
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

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center text-center">
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <div className="flex items-center justify-center gap-4">
            <div className="bg-amber-300 text-black p-2 rounded-md">
              <LolIcon />
            </div>
            <h1 className="text-5xl md:text-6xl uppercase font-black tracking-tight drop-shadow-2xl">
              league of legends
            </h1>
          </div>
          <p className="text-gray-300 font-medium mb-8">
            Elevate your gameplay with Build & Meta data.
          </p>
        </div>
        <div className="relative w-full group">
          <Search
            className="absolute left-5 top-6 text-gray-400 transition-colors"
            size={22}
          />
          <Input
            type="text"
            placeholder="Search Players (e.g. Faker#KR1)..."
            className="w-full bg-cyan-900/80 text-white text-lg font-medium py-6 px-14 rounded-2xl border border-gray-700 hover:border-gray-500 focus:outline-none transition-all shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
