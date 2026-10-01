import { createFileRoute } from '@tanstack/react-router'
import { ChampionsView } from '@/features/champions'
import { championKeys, fetchChampions } from '@/features/champions/api/get-champions'

const DEFAULT_FILTERS = {
  role: 'ALL' as const,
  rank: 'EMERALD_PLUS' as const,
  region: 'WORLD' as const,
  sortBy: 'tier' as const,
  sortOrder: 'desc' as const,
  page: 1,
  pageSize: 20,
}

export const Route = createFileRoute('/champions/')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: championKeys.list(DEFAULT_FILTERS),
      queryFn: () => fetchChampions(DEFAULT_FILTERS),
    })
  },
  component: ChampionsIndexPage,
})

function ChampionsIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-6 w-full">
      <ChampionsView />
    </div>
  )
}
