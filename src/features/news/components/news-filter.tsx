import { Search, X } from 'lucide-react'
import type { NewsCategory } from '../types/news'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

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
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-2">
      {/* Category Pills using ShadCN Button */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = category === cat.value
          return (
            <Button
              key={cat.value}
              type="button"
              variant={isSelected ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(cat.value)}
              className={`rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${isSelected
                  ? 'bg-amber-500 text-black hover:bg-amber-400 font-semibold shadow-sm shadow-amber-500/20 border-transparent'
                  : 'text-muted-foreground hover:text-foreground border-border/50 hover:bg-muted/50'
                }`}
            >
              {cat.label}
            </Button>
          )
        })}
      </div>

      {/* Search Input & Total counter using ShadCN Input & Badge */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 md:w-64">
          <Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo số bản vá (VD: 26.19)..."
            className="pl-8 pr-8 h-8 text-xs bg-card/40 border-border/50 focus-visible:ring-amber-500/30 focus-visible:border-amber-500/50"
          />
          {search && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => onSearchChange('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground size-6"
              aria-label="Xóa tìm kiếm"
            >
              <X className="size-3.5" />
            </Button>
          )}
        </div>

        <Badge variant="secondary" className="text-[11px] font-semibold text-muted-foreground shrink-0 hidden sm:inline-flex">
          {totalCount} bài viết
        </Badge>
      </div>
    </div>
  )
}
