import { useState } from 'react'
import { useNews } from '../api/get-news'
import { NewsHeader } from './news-header'
import { NewsFilter } from './news-filter'
import { NewsCard } from './news-card'
import { NewsSkeletonGrid } from './news-skeleton'
import { NewsModal } from './news-modal'
import { EmptyState } from '@/components/common/empty-state'
import { useDebounce } from '@/hooks/use-debounce'
import type { NewsArticle, NewsCategory } from '../types/news'
import { Newspaper, ChevronDown } from 'lucide-react'

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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <NewsHeader />

      {/* Filter and Search Bar */}
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
            <button
              onClick={() => refetch()}
              type="button"
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 text-black hover:bg-amber-400 cursor-pointer"
            >
              Thử lại
            </button>
          }
        />
      ) : articles.length === 0 ? (
        <EmptyState
          icon={<Newspaper className="w-8 h-8 text-amber-500/80" />}
          title="Không tìm thấy bài viết"
          description={
            debouncedSearch
              ? `Không có bài viết nào khớp với từ khóa "${debouncedSearch}".`
              : 'Chưa có bài viết nào trong chuyên mục này.'
          }
          action={
            (category !== 'all' || searchInput) && (
              <button
                onClick={() => {
                  setCategory('all')
                  setSearchInput('')
                }}
                type="button"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-card border border-border/80 hover:bg-muted text-foreground cursor-pointer"
              >
                Đặt lại bộ lọc
              </button>
            )
          }
        />
      ) : (
        <div className="space-y-8">
          {/* News Card Grid */}
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
              <button
                type="button"
                onClick={handleLoadMore}
                className="group flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-card/60 hover:bg-card border border-border/60 hover:border-amber-500/40 text-foreground transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <span>Tải thêm tin tức</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-amber-400 group-hover:translate-y-0.5 transition-all" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Interactive Detail Modal */}
      <NewsModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </div>
  )
}
