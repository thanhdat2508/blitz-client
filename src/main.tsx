import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { LanguageProvider } from './lib/i18n/language-context'
import './index.css'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
})

// Create router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
} as any)

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}
