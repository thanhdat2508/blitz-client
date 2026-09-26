import { createFileRoute } from '@tanstack/react-router'
import { NewsList } from '@/features/news'

export const Route = createFileRoute('/news')({
  component: NewsPage,
})

function NewsPage() {
  return <NewsList />
}
