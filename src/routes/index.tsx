import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/features/home";
import { tierListKeys, getTierList } from "@/features/home/api/get-tier-list";
import { postKeys, getPosts } from "@/features/news/api/get-posts";

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery({
      queryKey: tierListKeys.list({}),
      queryFn: () => getTierList({}),
    });
    return queryClient.prefetchQuery({
      queryKey: postKeys.list({ limit: 3 }),
      queryFn: () => getPosts({ limit: 3 }),
    });
  },
  component: HomePage,
});
