import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthModal, GuestUserMenu } from '@/features/auth'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        {/* Sleek Top Bar with only Log In / User Menu */}
        <header className="border-b border-border/40 bg-card/60 backdrop-blur sticky top-0 z-50">
          <div className="container mx-auto max-w-6xl px-4 h-14 flex items-center justify-end">
            <GuestUserMenu />
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
