import { Search, TrendingUp, ArrowRight, ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-100 font-sans pb-20">
      <main className="flex flex-col gap-12">
        {/* 2. Hero Section */}
        <div className="relative flex flex-col items-center justify-center py-24 px-4 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_27.jpg')",
              backgroundPosition: "center 25%",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-[#0b0c10]"></div>

          <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-2xl">
              LEAGUE OF LEGENDS
            </h1>
            <p className="text-gray-300 font-medium mb-8">
              Elevate your gameplay with Build & Meta data.
            </p>

            <div className="relative w-full group">
              <Search
                className="absolute left-5 top-4 text-gray-400 group-focus-within:text-yellow-500 transition-colors"
                size={24}
              />
              <input
                type="text"
                placeholder="Search Champions, Players (e.g. Faker#KR1)..."
                className="w-full bg-[#1e2027]/80 backdrop-blur-sm text-white text-lg font-medium py-4 pl-14 pr-6 rounded-2xl border border-gray-700 hover:border-gray-500 focus:border-yellow-500 focus:bg-[#1e2027] focus:outline-none transition-all shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-14">
          {/* 3. Latest News */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold">News</h2>
                <p className="text-sm text-gray-400 mt-1">
                  What's new in League of Legends
                </p>
              </div>
              <a
                href="#"
                className="text-sm font-semibold text-gray-400 hover:text-yellow-400 flex items-center gap-1 transition"
              >
                View All <ChevronRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800 hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/janna/skins/skin67/images/janna_splash_centered_67.skins_janna_skin67.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-300"></div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-col z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-xs font-black uppercase text-yellow-500 tracking-wider mb-1">
                    Patch Notes
                  </span>
                  <span className="text-4xl font-black text-white">26.19</span>
                  <span className="text-xs font-black text-white">
                    Patch 26.19 adjusts champions balance, top lane buffs...
                  </span>
                </div>
              </div>

              <div
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800 hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/mel/skins/skin12/images/mel_splash_centered_12.skins_mel_skin12.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-300"></div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-col z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-xs font-black uppercase text-yellow-500 tracking-wider mb-1">
                    Patch Notes
                  </span>
                  <span className="text-4xl font-black text-white">26.18</span>
                  <span className="text-xs font-black text-white">
                    {" "}
                    Patch 26.18 brings champion balance changes, five returning
                    classic champions,...
                  </span>
                </div>
              </div>
              <div
                className="group relative h-56 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-gray-800 hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/characters/anivia/skins/skin56/images/anivia_splash_centered_56.skins_anivia_skin56.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black transition-all duration-300"></div>
                <div className="absolute bottom-5 left-5 right-5 flex flex-col z-10 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="text-xs font-black uppercase text-yellow-500 tracking-wider mb-1">
                    PATCH NOTES
                  </span>
                  <span className="text-4xl font-black text-white">26.17</span>
                  <span className="text-xs font-black text-white">
                    Patch 26.19 adjusts champions and items balance, expands
                    classic progression...
                  </span>
                </div>
              </div>
            </div>
          </section>
          {/* 3. New Champions */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">New Champions</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Discover the latest champions in League of Legends
                </p>
              </div>

              <a
                href="#"
                className="text-sm font-semibold text-gray-400 hover:text-yellow-400 flex items-center gap-1 transition"
              >
                View All <ChevronRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ================= LOCKE ================= */}
              <div
                className="group relative h-[430px] rounded-2xl overflow-hidden cursor-pointer border border-gray-700 shadow-xl hover:border-gray-500 hover:scale-[1.02] transition-all duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Locke_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/35 to-black/10"></div>

                <div className="relative z-10 h-full p-6 flex flex-col">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-2xl font-black text-white">Locke</h3>

                      <span className="bg-green-500 text-black text-xs font-black px-2 py-1 rounded-md">
                        New
                      </span>
                    </div>

                    <p className="text-gray-200 font-semibold text-sm leading-6">
                      Check out Locke's abilities, builds, and stats
                    </p>

                    <span className="inline-block mt-3 text-sm font-bold text-white group-hover:text-yellow-400 transition">
                      View Locke →
                    </span>
                  </div>

                  {/* Locke abilities */}
                  <div className="mt-auto flex justify-center gap-3">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeQ.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Locke Q"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeW.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Locke W"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeE.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Locke E"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.13.1/img/spell/LockeR.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Locke R"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Locke_0.jpg"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Locke"
                    />
                  </div>
                </div>
              </div>

              {/* ================= ZAAHEN ================= */}
              <div
                className="group relative h-[430px] rounded-2xl overflow-hidden cursor-pointer border border-gray-700 shadow-xl hover:border-gray-500 hover:scale-[1.02] transition-all duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zaahen_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/35 to-black/10"></div>

                <div className="relative z-10 h-full p-6 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      Zaahen
                    </h3>

                    <p className="text-gray-200 font-semibold text-sm leading-6">
                      Get a sneak peek at Zaahen, the newest champion in League
                      of Legends!
                    </p>

                    <span className="inline-block mt-3 text-sm font-bold text-white group-hover:text-yellow-400 transition">
                      View Zaahen →
                    </span>
                  </div>

                  {/* Zaahen abilities */}
                  <div className="mt-auto flex justify-center gap-3">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenQ.png"
                      className="w-12 h-12 rounded-lg border border-orange-500 object-cover"
                      alt="Zaahen Q"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenW.png"
                      className="w-12 h-12 rounded-lg border border-orange-500 object-cover"
                      alt="Zaahen W"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenE.png"
                      className="w-12 h-12 rounded-lg border border-orange-500 object-cover"
                      alt="Zaahen E"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/ZaahenR.png"
                      className="w-12 h-12 rounded-lg border border-orange-500 object-cover"
                      alt="Zaahen R"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Zaahen_0.jpg"
                      className="w-12 h-12 rounded-lg border border-orange-500 object-cover"
                      alt="Zaahen"
                    />
                  </div>
                </div>
              </div>

              {/* ================= YUNARA ================= */}
              <div
                className="group relative h-[430px] rounded-2xl overflow-hidden cursor-pointer border border-gray-700 shadow-xl hover:border-gray-500 hover:scale-[1.02] transition-all duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yunara_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-black/35 to-black/10"></div>

                <div className="relative z-10 h-full p-6 flex flex-col">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-3">
                      Yunara
                    </h3>

                    <p className="text-gray-200 font-semibold text-sm leading-6">
                      Check out Yunara's abilities, builds, and stats
                    </p>

                    <span className="inline-block mt-3 text-sm font-bold text-white group-hover:text-yellow-400 transition">
                      View Yunara →
                    </span>
                  </div>

                  {/* Yunara abilities */}
                  <div className="mt-auto flex justify-center gap-3">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraQ.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Yunara Q"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraW.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Yunara W"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraE.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Yunara E"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/16.19.1/img/spell/YunaraR.png"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Yunara R"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yunara_0.jpg"
                      className="w-12 h-12 rounded-lg border border-purple-500 object-cover"
                      alt="Yunara"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 4. Tier List & Pro Builds */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tier List */}
            <div className="group bg-[#12131c] rounded-2xl border border-gray-800 p-5 lg:p-6 shadow-xl hover:border-gray-700 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-xl">
                    🔥
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-white">
                      LoL Champion Tier List
                    </h2>
                    <p className="text-xs : text-gray-500 mt-1">
                      League of Legends's biggest winners for patch 26.19 for
                      every role.
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center rounded-full border border-gray-700 bg-[#191a25] px-3 py-1 text-[10px] font-bold tracking-wider text-gray-400">
                  TOP PICKS
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#101119]">
                <div className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3 bg-[#191a25] border-b border-gray-800 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                  <span>Champion</span>
                  <span className="text-center">Tier</span>
                  <span className="text-right">Win Rate</span>
                </div>

                <div className="divide-y divide-gray-800/70">
                  <div className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3.5 bg-[#151621] hover:bg-[#1c1d29] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png"
                          alt="Ahri"
                          className="w-11 h-11 rounded-lg border border-gray-700 object-cover shadow-lg"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-[#222331] border border-gray-600 text-[9px] font-black text-gray-300 flex items-center justify-center">
                          1
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-white text-sm sm:text-base truncate">
                          Ahri
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">Mid</p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="min-w-[42px] text-center text-orange-300 font-black bg-orange-500/10 border border-orange-500/30 px-2.5 py-1.5 rounded-lg">
                        S
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-green-400 font-extrabold text-sm">
                        <TrendingUp size={14} /> 53.4%
                      </div>
                      <div className="w-20 h-1 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full w-[88%] rounded-full bg-green-400/70"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3.5 bg-[#12131c] hover:bg-[#1c1d29] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Rammus.png"
                          alt="Rammus"
                          className="w-11 h-11 rounded-lg border border-gray-700 object-cover shadow-lg"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-[#222331] border border-gray-600 text-[9px] font-black text-gray-300 flex items-center justify-center">
                          2
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-white text-sm sm:text-base truncate">
                          Rammus
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Jungle
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="min-w-[42px] text-center text-orange-300 font-black bg-orange-500/10 border border-orange-500/30 px-2.5 py-1.5 rounded-lg">
                        S
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-green-400 font-extrabold text-sm">
                        <TrendingUp size={14} /> 53.3%
                      </div>
                      <div className="w-20 h-1 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full w-[78%] rounded-full bg-green-400/60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3.5 bg-[#12131c] hover:bg-[#1c1d29] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Sejuani.png"
                          alt="Sejuani"
                          className="w-11 h-11 rounded-lg border border-gray-700 object-cover shadow-lg"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-[#222331] border border-gray-600 text-[9px] font-black text-gray-300 flex items-center justify-center">
                          2
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-white text-sm sm:text-base truncate">
                          Sejuani
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Jungle
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="min-w-[42px] text-center text-orange-300 font-black bg-orange-500/10 border border-orange-500/30 px-2.5 py-1.5 rounded-lg">
                        S
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-green-400 font-extrabold text-sm">
                        <TrendingUp size={14} /> 52.8%
                      </div>
                      <div className="w-20 h-1 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full w-[78%] rounded-full bg-green-400/60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3.5 bg-[#12131c] hover:bg-[#1c1d29] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Hwei.png"
                          alt="Hwei"
                          className="w-11 h-11 rounded-lg border border-gray-700 object-cover shadow-lg"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-[#222331] border border-gray-600 text-[9px] font-black text-gray-300 flex items-center justify-center">
                          2
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-white text-sm sm:text-base truncate">
                          Hwei
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Mid Lane
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="min-w-[42px] text-center text-orange-300 font-black bg-orange-500/10 border border-orange-500/30 px-2.5 py-1.5 rounded-lg">
                        S
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-green-400 font-extrabold text-sm">
                        <TrendingUp size={14} /> 53.6%
                      </div>
                      <div className="w-20 h-1 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full w-[78%] rounded-full bg-green-400/60"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-[1fr_82px_108px] items-center gap-2 px-4 py-3.5 bg-[#151621] hover:bg-[#1c1d29] transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <img
                          src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/LeeSin.png"
                          alt="Lee Sin"
                          className="w-11 h-11 rounded-lg border border-gray-700 object-cover shadow-lg"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-[#222331] border border-gray-600 text-[9px] font-black text-gray-300 flex items-center justify-center">
                          3
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-white text-sm sm:text-base truncate">
                          Lee Sin
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          Jungle
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <span className="min-w-[42px] text-center text-blue-300 font-black bg-blue-500/10 border border-blue-500/30 px-2.5 py-1.5 rounded-lg">
                        A
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-gray-200 font-extrabold text-sm">
                        49.8%
                      </div>
                      <div className="w-20 h-1 rounded-full bg-gray-800 overflow-hidden">
                        <div className="h-full w-[58%] rounded-full bg-gray-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 bg-[#1a1b26] hover:bg-[#222432] text-white font-bold py-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300 flex items-center justify-center gap-2 group/button">
                View Full Tier List
                <ArrowRight
                  size={18}
                  className="group-hover/button:translate-x-1 transition-transform"
                />
              </button>
            </div>

            {/* Pro Builds */}
            <div className="bg-[#12131c] rounded-2xl border border-gray-800 p-6 shadow-xl hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    ⚔️ Latest Pro Builds
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    The latest pro builds for League of Legends patch 26.19.
                  </p>
                </div>

                <span className="hidden sm:block text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                  META
                </span>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                {/* Gumayusi - Lucian */}
                <div className="bg-[#1a1b26] p-4 rounded-xl flex flex-wrap items-center justify-between border border-gray-800 hover:border-gray-600 hover:scale-[1.02] cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Lucian.png"
                      alt="Lucian"
                      className="w-12 h-12 rounded-full border-2 border-yellow-500/50"
                    />

                    <div>
                      <p className="font-bold text-base text-white">Lucian</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1">
                        Lucian · ADC · 10 / 2 / 5 KDA
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3 sm:mt-0">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/6672.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Kraken Slayer"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3072.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Bloodthirster"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3006.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Berserker's Greaves"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3094.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Rapid Firecannon"
                    />

                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3031.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Infinity Edge"
                    />
                    <div className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700"></div>
                  </div>
                </div>

                {/* Sylas */}
                <div className="bg-[#1a1b26] p-4 rounded-xl flex flex-wrap items-center justify-between border border-gray-800 hover:border-gray-600 hover:scale-[1.02] cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Sylas.png"
                      alt="Sylas"
                      className="w-12 h-12 rounded-full border-2 border-blue-500/50"
                    />

                    <div>
                      <p className="font-bold text-base text-white">Sylas</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1">
                        Sylas · Mid · 8 / 1 / 12 KDA
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3 sm:mt-0">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3152.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Hextech Rocketbelt"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3020.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Sorcerer's Shoes"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3157.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Zhonya's Hourglass"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3089.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Rabadon's Deathcap"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3135.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Void Staff"
                    />
                    <div className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700"></div>
                  </div>
                </div>

                {/* Tristana */}
                <div className="bg-[#1a1b26] p-4 rounded-xl flex flex-wrap items-center justify-between border border-gray-800 hover:border-gray-600 hover:scale-[1.02] cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Tristana.png"
                      alt="Tristana"
                      className="w-12 h-12 rounded-full border-2 border-pink-500/50"
                    />

                    <div>
                      <p className="font-bold text-base text-white">Tristana</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1">
                        ADC · 51.51% Win Rate · S+
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3 sm:mt-0">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3031.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Infinity Edge"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3087.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Statikk Shiv"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3006.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Berserker's Greaves"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3094.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Rapid Firecannon"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3153.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Blade of the Ruined King"
                    />
                    <div className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700"></div>
                  </div>
                </div>

                {/* Syndra */}
                <div className="bg-[#1a1b26] p-4 rounded-xl flex flex-wrap items-center justify-between border border-gray-800 hover:border-gray-600 hover:scale-[1.02] cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Syndra.png"
                      alt="Syndra"
                      className="w-12 h-12 rounded-full border-2 border-purple-500/50"
                    />

                    <div>
                      <p className="font-bold text-base text-white">Syndra</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1">
                        Mid · 50.35% Win Rate · S+
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3 sm:mt-0">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/6655.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Luden's Companion"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3020.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Sorcerer's Shoes"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/4645.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Shadowflame"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3089.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Rabadon's Deathcap"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3135.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Void Staff"
                    />
                    <div className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700"></div>
                  </div>
                </div>

                {/* Annie */}
                <div className="bg-[#1a1b26] p-4 rounded-xl flex flex-wrap items-center justify-between border border-gray-800 hover:border-gray-600 hover:scale-[1.02] cursor-pointer transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Annie.png"
                      alt="Annie"
                      className="w-12 h-12 rounded-full border-2 border-red-500/50"
                    />

                    <div>
                      <p className="font-bold text-base text-white">Annie</p>
                      <p className="text-xs font-semibold text-gray-400 mt-1">
                        Mid · 51.91% Win Rate · A
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mt-3 sm:mt-0">
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3118.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Malignance"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3020.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Sorcerer's Shoes"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3089.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Rabadon's Deathcap"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/3157.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Zhonya's Hourglass"
                    />
                    <img
                      src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/item/4645.png"
                      className="w-9 h-9 rounded-md border border-gray-700"
                      alt="Shadowflame"
                    />
                    <div className="w-9 h-9 rounded-md bg-gray-800 border border-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Guides */}
          <section className="mb-10">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold">Exclusive Guides</h2>
                <p className="text-sm text-gray-400 mt-1">
                  Learn combos and tips from Challengers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:h-[400px]">
              <div
                className="md:col-span-2 md:row-span-2 rounded-2xl border border-gray-800 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-xl min-h-[250px] hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ryze_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent group-hover:from-black transition-all"></div>
                <div className="relative z-20 p-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-md text-xs uppercase mb-3 inline-block">
                    In-depth
                  </span>
                  <h3 className="text-3xl font-black mb-2 text-white group-hover:text-yellow-400 transition">
                    Ryze Build Guide
                  </h3>
                </div>
              </div>

              <div
                className="rounded-2xl border border-gray-800 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-lg min-h-[180px] hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Thresh_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-black"></div>
                <div className="relative z-20 p-5 transform group-hover:-translate-y-1 transition-transform">
                  <h4 className="font-bold text-lg text-white">
                    Thresh Build Guide
                  </h4>
                </div>
              </div>

              <div
                className="rounded-2xl border border-gray-800 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-lg min-h-[180px] hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-black"></div>
                <div className="relative z-20 p-5 transform group-hover:-translate-y-1 transition-transform">
                  <h4 className="font-bold text-lg text-white">
                    Jinx Build Guide
                  </h4>
                </div>
              </div>
              <div
                className="rounded-2xl border border-gray-800 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-lg min-h-[180px] hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-black"></div>
                <div className="relative z-20 p-5 transform group-hover:-translate-y-1 transition-transform">
                  <h4 className="font-bold text-lg text-white">
                    Yasuo Build Guide
                  </h4>
                </div>
              </div>
              <div
                className="rounded-2xl border border-gray-800 flex flex-col justify-end relative overflow-hidden group cursor-pointer shadow-lg min-h-[180px] hover:scale-[1.02] transition-transform duration-300"
                style={{
                  backgroundImage:
                    "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Aatrox_0.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:from-black"></div>
                <div className="relative z-20 p-5 transform group-hover:-translate-y-1 transition-transform">
                  <h4 className="font-bold text-lg text-white">
                    Aatrox Build Guide
                  </h4>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
