import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/champions')({
  component: ChampionsLayout,
})

function ChampionsLayout() {
  return <Outlet />
}
