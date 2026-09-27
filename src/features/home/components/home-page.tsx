import { HeroSection } from "./hero-section";
import { HomeNewsSection } from "./home-news-section";
import { NewChampionsSection } from "./new-champions-section";
import { TierListSection } from "./tier-list-section";
import { ProBuildsSection } from "./pro-builds-section";

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-100 font-sans pb-20 w-full">
      <div className="flex flex-col gap-12 w-full">
        <HeroSection />
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-14">
          <HomeNewsSection />
          <NewChampionsSection />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TierListSection />
            <ProBuildsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
