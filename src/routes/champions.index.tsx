import { createFileRoute } from '@tanstack/react-router'
import { ChampionsView } from '@/features/champions'

export const Route = createFileRoute('/champions/')({
  component: ChampionsIndexPage,
})

function ChampionsIndexPage() {
  return (
    <div className="w-full">
      <ChampionsView />
    </div>
  )
}
