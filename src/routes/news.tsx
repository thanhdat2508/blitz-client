import NewsList from "@/features/news/components/news-list";
import { createFileRoute } from "@tanstack/react-router";
import { newsKeys } from "@/features/news/api/get-news";
import { getNews } from "@/lib/news";

export const Route = createFileRoute("/news")({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData({
      queryKey: newsKeys.list({ category: "all" }),
      queryFn: () => getNews({ category: "all" }),
    });
  },
  validateSearch: (search: Record<string, unknown>): { article?: string; slug?: string } => ({
    article: typeof search.article === "string" ? search.article : undefined,
    slug: typeof search.slug === "string" ? search.slug : undefined,
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="container mx-auto max-w-6xl py-4">
      <NewsList />
    </div>
  );
}
