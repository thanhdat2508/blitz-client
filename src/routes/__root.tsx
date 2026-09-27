import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthModal } from "@/features/auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#0b0c10] text-foreground flex flex-col font-sans">
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
