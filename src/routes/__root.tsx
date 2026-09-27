import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthModal } from "@/features/auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#0b0c10] text-foreground flex flex-col font-sans">
        {/* Floating Language Switcher */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-700/80 hover:border-amber-400/80 shadow-2xl backdrop-blur-md text-zinc-200 text-xs font-semibold cursor-pointer transition-colors"
            title={language === "en" ? "Chuyển sang Tiếng Việt" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase font-mono text-[11px] font-bold text-amber-400">
              {language === "en" ? "EN" : "VI"}
            </span>
          </button>
        </div>

        <Header />

        {/* Global Auth Modal */}
        <AuthModal />

        <div className="flex-1 w-full">
          <Outlet />
        </div>

        <Footer />

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </div>
    </TooltipProvider>
  );
}
