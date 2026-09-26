import { useState } from 'react'
import { useNews } from '../api/get-news'
import { NewsFilter } from './news-filter'
import { NewsCard } from './news-card'
import { NewsSkeletonGrid } from './news-skeleton'
import { NewsModal } from './news-modal'
import { EmptyState } from '@/components/common/empty-state'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import type { NewsArticle, NewsCategory } from '../types/news'
import { Newspaper, ChevronDown, RotateCcw } from 'lucide-react'

export function NewsList() {
  const [category, setCategory] = useState<NewsCategory>('all')
  const [searchInput, setSearchInput] = useState('')
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [displayLimit, setDisplayLimit] = useState(6)

  const debouncedSearch = useDebounce(searchInput, 300)

  const { data: articles = [], isLoading, isError, refetch } = useNews({
    category,
    search: debouncedSearch,
  })

  const visibleArticles = articles.slice(0, displayLimit)
  const hasMore = articles.length > displayLimit

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + 3)
  }

  const handleResetFilters = () => {
    setCategory('all')
    setSearchInput('')
    setDisplayLimit(6)
  }

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar with ShadCN Button, Input & Badge */}
      <NewsFilter
        category={category}
        onCategoryChange={(newCat) => {
          setCategory(newCat)
          setDisplayLimit(6)
        }}
        search={searchInput}
        onSearchChange={(query) => {
          setSearchInput(query)
          setDisplayLimit(6)
        }}
        totalCount={articles.length}
      />

      {/* Main Content Area */}
      {isLoading ? (
        <NewsSkeletonGrid count={6} />
      ) : isError ? (
        <EmptyState
          title="Không thể tải dữ liệu"
          description="Có lỗi xảy ra trong quá trình nạp danh sách tin tức. Vui lòng thử lại."
          action={
            <Button
              onClick={() => refetch()}
              variant="default"
              size="sm"
              className="bg-amber-500 text-black hover:bg-amber-400 font-semibold cursor-pointer"
            >
              <RotateCcw className="size-3.5 mr-1" />
              Thử lại
            </Button>
          }
        />
      ) : articles.length === 0 ? (
        <EmptyState
          icon={<Newspaper className="size-8 text-amber-500/80" />}
          title="Không tìm thấy bài viết"
          description={
            debouncedSearch
              ? `Không có bài viết nào khớp với từ khóa "${debouncedSearch}".`
              : 'Chưa có bài viết nào trong chuyên mục này.'
          }
          action={
            (category !== 'all' || searchInput) && (
              <Button
                onClick={handleResetFilters}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                Đặt lại bộ lọc
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

          {/* Load More Button using ShadCN Button */}
          {hasMore && (
            <div className="flex justify-center pt-2 pb-6">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="group rounded-full px-6 py-2.5 text-xs font-semibold hover:border-amber-500/40 hover:text-amber-400 transition-all cursor-pointer shadow-sm"
              >
                <span>Tải thêm tin tức</span>
                <ChevronDown className="size-3.5 text-muted-foreground group-hover:text-amber-400 group-hover:translate-y-0.5 transition-transform" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Detail Modal using ShadCN Dialog */}
      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  )
}
