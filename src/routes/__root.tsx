import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
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
