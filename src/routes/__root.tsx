import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Globe, Flame } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <div className="min-h-screen bg-[#0B0E14] text-zinc-100 flex flex-col font-sans select-none antialiased">
      {/* Floating Language Switcher */}
      <div className="fixed top-3 right-4 z-50">
        <button
          type="button"
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-700/80 hover:border-amber-400/80 shadow-2xl backdrop-blur-md text-zinc-200 text-xs font-semibold cursor-pointer transition-colors"
          title={language === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <p className="uppercase font-mono text-[11px] font-bold text-amber-400">
            {language === 'en' ? 'EN' : 'VI'}
          </p>
        </button>
      </div>

      {/* 2. MAIN PAGE CONTENT */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
        <Outlet />
      </main>

      {/* 3. GLOBAL FOOTER */}
      <footer className="border-t border-zinc-800/80 bg-[#0B0E14] py-8 text-xs text-zinc-500 select-none">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-rose-600 flex items-center justify-center text-white">
              <Flame className="w-3 h-3 fill-white" />
            </div>
            <p className="font-bold text-zinc-300">LoL Meta Ranked Analytics</p>
            <p>• Patch 26.19 Emerald+</p>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
            <p>Support</p>
          </div>
        </div>
      </footer>

      {/* Devtools */}
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </div>
  )
}
