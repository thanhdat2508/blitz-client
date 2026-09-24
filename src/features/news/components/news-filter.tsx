import { Search, X } from 'lucide-react'
import type { NewsCategory } from '../types/news'

interface NewsFilterProps {
  category: NewsCategory
  onCategoryChange: (category: NewsCategory) => void
  search: string
  onSearchChange: (search: string) => void
  totalCount: number
}

const CATEGORIES: { label: string; value: NewsCategory }[] = [
  { label: 'Tất cả tin tức', value: 'all' },
  { label: 'Patch Notes', value: 'patch-notes' },
  { label: 'Gameplay & Classic', value: 'gameplay' },
  { label: 'Esports', value: 'esports' },
  { label: 'Cộng đồng & Dev', value: 'community' },
]

export function NewsFilter({
  category,
  onCategoryChange,
  search,
  onSearchChange,
  totalCount,
}: NewsFilterProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-4">
      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = category === cat.value
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => onCategoryChange(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-black font-semibold shadow-sm shadow-amber-500/20'
                  : 'bg-card/40 hover:bg-card text-muted-foreground hover:text-foreground border border-border/40'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Search Input & Total counter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 md:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo số bản vá (VD: 26.19)..."
            className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg bg-card/40 border border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <span className="text-[11px] font-semibold text-muted-foreground shrink-0 hidden sm:inline-block">
          {totalCount} bài viết
        </span>
      </div>
    </div>
  )
}
