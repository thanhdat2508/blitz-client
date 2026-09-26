import { createFileRoute } from '@tanstack/react-router'
import { NewsList } from '@/features/news'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return <NewsList />
}
