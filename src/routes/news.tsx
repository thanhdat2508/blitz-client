import NewsList from "@/features/news/components/news-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/news")({
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <NewsList />
    </div>
  );
}
