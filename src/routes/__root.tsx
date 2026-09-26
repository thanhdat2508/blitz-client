import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TooltipProvider } from '@/components/ui/tooltip'
import { GuestUserMenu, AuthModal } from '@/features/auth'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <header className="border-b bg-card/60 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-2 text-sm font-medium">
                <Link
                  to="/"
                  className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors [&.active]:bg-accent [&.active]:font-semibold"
                >
                  Trang chủ
                </Link>
                <Link
                  to="/products"
                  className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors [&.active]:bg-accent [&.active]:font-semibold"
                >
                  Sản phẩm (Feature)
                </Link>
                <Link
                  to="/news"
                  className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors [&.active]:bg-accent [&.active]:font-semibold flex items-center gap-1.5"
                >
                  <span>News</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                </Link>
                <Link
                  to="/demo"
                  className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors [&.active]:bg-accent [&.active]:font-semibold"
                >
                  Query Demo
                </Link>
                <Link
                  to="/about"
                  className="px-3 py-1.5 rounded-md hover:bg-accent transition-colors [&.active]:bg-accent [&.active]:font-semibold"
                >
                  Cấu trúc
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <GuestUserMenu />
            </div>
          </div>
        </header>

        {/* Global Auth Modal */}
        <AuthModal />

        <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
          <Outlet />
        </main>

        <footer className="border-t py-6 text-center text-sm text-muted-foreground bg-card/30">
          <div className="container mx-auto max-w-6xl px-4">
            React Base Project • Shadcn UI • TanStack Router • TanStack Query
          </div>
        </footer>

        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      </div>
    </TooltipProvider>
  )
}
