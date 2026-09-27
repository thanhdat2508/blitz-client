import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ChampionsPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export function ChampionsPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ChampionsPaginationProps) {
  if (totalItems === 0) return null

  // Calculate visible page numbers
  const getPageNumbers = () => {
    const pages: number[] = []
    const maxVisible = 5
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  const pages = getPageNumbers()
  const startItem = Math.min(totalItems, (currentPage - 1) * pageSize + 1)
  const endItem = Math.min(totalItems, currentPage * pageSize)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-xs text-zinc-400 select-none">
      {/* 1. Item Range Info & Page Size Selector */}
      <div className="flex flex-wrap items-center gap-3">
        <span>
          Showing{' '}
          <span className="text-zinc-100 font-semibold">
            {startItem} - {endItem}
          </span>{' '}
          of <span className="text-zinc-100 font-semibold">{totalItems}</span> champions
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-zinc-500">Per page:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(val) => val && onPageSizeChange(Number(val))}
            >
              <SelectTrigger
                size="sm"
                className="h-7 w-20 text-xs bg-[#121620] border-zinc-800 text-zinc-200 hover:bg-zinc-800/60"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121620] border-zinc-800 text-zinc-200">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* 2. ShadCN Pagination Controls */}
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent className="gap-1">
          {/* Previous Page Link */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) onPageChange(currentPage - 1)
              }}
              className={`h-8 px-2.5 rounded-lg border border-zinc-800 bg-[#121620] text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors ${
                currentPage <= 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'
              }`}
            />
          </PaginationItem>

          {/* First page jump if not in window */}
          {pages[0] > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === 1}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(1)
                  }}
                  className="h-8 w-8 rounded-lg text-xs font-semibold border border-zinc-800 bg-[#121620] text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {pages[0] > 2 && (
                <PaginationItem>
                  <PaginationEllipsis className="text-zinc-600" />
                </PaginationItem>
              )}
            </>
          )}

          {/* Numbered Page Links */}
          {pages.map((p) => {
            const isActive = p === currentPage
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={isActive}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(p)
                  }}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    isActive
                      ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 border-amber-400 font-bold shadow-md shadow-amber-500/20'
                      : 'border border-zinc-800 bg-[#121620] text-zinc-300 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {/* Last page jump if not in window */}
          {pages[pages.length - 1] < totalPages && (
            <>
              {pages[pages.length - 1] < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis className="text-zinc-600" />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === totalPages}
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(totalPages)
                  }}
                  className="h-8 w-8 rounded-lg text-xs font-semibold border border-zinc-800 bg-[#121620] text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Next Page Link */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) onPageChange(currentPage + 1)
              }}
              className={`h-8 px-2.5 rounded-lg border border-zinc-800 bg-[#121620] text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors ${
                currentPage >= totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
