import { useMemo, useState, useEffect } from "react";
import { useNews } from "../api/get-news";
import { getPostBySlug } from "../api/get-posts";
import { NewsFilter } from "./news-filter";
import { NewsCard } from "./news-card";
import { NewsSkeletonGrid } from "./news-skeleton";
import { NewsModal } from "./news-modal";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { Newspaper, ChevronDown, RotateCcw } from "lucide-react";
import type { NewsArticle, NewsCategory } from "@/types/news";

const NewsList = () => {
  const [category, setCategory] = useState<NewsCategory>("all");
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(
    null,
  );
  const [displayLimit, setDisplayLimit] = useState(6);

  const debouncedSearch = useDebounce(searchInput, 300);

  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
  } = useNews({
    category,
    search: debouncedSearch,
  });

  // Handle opening specific article directly from search or URL query
  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const slugToFind =
      searchParams.get("article") ||
      searchParams.get("slug") ||
      window.location.hash.replace("#", "");

    if (!slugToFind) return;

    if (articles.length > 0) {
      const match = articles.find(
        (a) => a.slug === slugToFind || a.id === slugToFind,
      );
      if (match) {
        setSelectedArticle(match);
        return;
      }
    }

    // Fallback: fetch article by slug directly from backend if not in loaded list
    getPostBySlug(slugToFind)
      .then((post) => {
        if (post) {
          const mapped: NewsArticle = {
            id: post.id,
            slug: post.slug,
            title: post.title,
            summary: post.content?.slice(0, 160) || post.title,
            category: "patch-notes",
            bannerUrl:
              post.coverImageUrl ||
              "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
            publishedAt: post.createdAt,
            readTimeMinutes: post.readingTime || 3,
            author: post.author?.name || post.author?.username || "Riot Games",
            content: post.content,
          };
          setSelectedArticle(mapped);
        }
      })
      .catch(() => {});
  }, [articles]);

  const handleCloseModal = () => {
    setSelectedArticle(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (
        url.searchParams.has("article") ||
        url.searchParams.has("slug") ||
        url.hash
      ) {
        url.searchParams.delete("article");
        url.searchParams.delete("slug");
        url.hash = "";
        window.history.replaceState(
          {},
          "",
          url.pathname + (url.search ? url.search : ""),
        );
      }
    }
  };

  const visibleArticles = useMemo(
    () => articles.slice(0, displayLimit),
    [articles, displayLimit],
  );

  const hasMore = useMemo(
    () => articles.length > displayLimit,
    [articles.length, displayLimit],
  );

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 3);
  };

  const handleResetFilters = () => {
    setCategory("all");
    setSearchInput("");
    setDisplayLimit(6);
  };

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar with ShadCN Button, Input & Badge */}
      <NewsFilter
        category={category}
        onCategoryChange={(newCat) => {
          setCategory(newCat);
          setDisplayLimit(6);
        }}
        search={searchInput}
        onSearchChange={(query) => {
          setSearchInput(query);
          setDisplayLimit(6);
        }}
        totalCount={articles.length}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <NewsSkeletonGrid count={6} />
      ) : isError ? (
        <EmptyState
          title="Unable to load articles"
          description="An error occurred while fetching news articles. Please try again."
          action={
            <Button
              onClick={() => refetch()}
              variant="default"
              size="sm"
              className="bg-amber-500 text-black hover:bg-amber-400 font-semibold cursor-pointer"
            >
              <RotateCcw className="size-3.5 mr-1" />
              Retry
            </Button>
          }
        />
      ) : !articles.length ? (
        <EmptyState
          icon={<Newspaper className="size-8 text-amber-500/80" />}
          title="No articles found"
          description={
            debouncedSearch
              ? `No articles match the keyword "${debouncedSearch}".`
              : "No articles found in this category."
          }
          action={
            (category !== "all" || searchInput) && (
              <Button
                onClick={handleResetFilters}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                Reset filters
              </Button>
            )
          }
        />
      ) : (
        <div className="space-y-8">
          {/* News Card Grid using ShadCN Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleArticles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onClick={(item) => setSelectedArticle(item)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-2 pb-6">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="group rounded-full px-6 py-2.5 text-xs font-semibold hover:border-amber-500/40 hover:text-amber-400 transition-all cursor-pointer shadow-sm"
              >
                <p>Load more news</p>
                <ChevronDown className="size-3.5 text-muted-foreground group-hover:text-amber-400 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Detail Modal using ShadCN Dialog */}
      <NewsModal article={selectedArticle} onClose={handleCloseModal} />
    </div>
  );
};

export default NewsList;
