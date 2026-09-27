import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaderboardPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function LeaderboardPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: LeaderboardPaginationProps) {
  if (totalPages <= 1 && totalItems <= pageSize) {
    return null;
  }

  // Calculate visible page numbers (max 5 buttons)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();
  const startItem = Math.min(totalItems, (currentPage - 1) * pageSize + 1);
  const endItem = Math.min(totalItems, currentPage * pageSize);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-xs text-neutral-400">
      {/* Item Range info & Page Size Selector using ShadCN Select */}
      <div className="flex items-center gap-3">
        <span>
          Hiển thị{" "}
          <span className="text-white font-semibold">
            {startItem} - {endItem}
          </span>{" "}
          trên <span className="text-white font-semibold">{totalItems}</span>{" "}
          tướng
        </span>

        {onPageSizeChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-neutral-500">Mỗi trang:</span>
            <Select
              value={String(pageSize)}
              onValueChange={(val) => val && onPageSizeChange(Number(val))}
            >
              <SelectTrigger
                size="sm"
                className="h-7 w-20 text-xs bg-[#141622] border-neutral-800 text-white"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#141622] border-neutral-800 text-white">
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* ShadCN Pagination Controls */}
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent className="gap-1">
          {/* Previous Page Link */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={`h-8 px-2.5 rounded-lg border border-neutral-800 bg-[#12141f] text-neutral-300 hover:text-white hover:bg-neutral-800 ${
                currentPage <= 1
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            />
          </PaginationItem>

          {/* First Ellipsis */}
          {pages[0] > 1 && (
            <PaginationItem>
              <PaginationEllipsis className="text-neutral-600" />
            </PaginationItem>
          )}

          {/* Numbered Pages */}
          {pages.map((p) => {
            const isActive = p === currentPage;
            return (
              <PaginationItem key={p}>
                <PaginationLink
                  href="#"
                  isActive={isActive}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(p);
                  }}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold cursor-pointer ${
                    isActive
                      ? "bg-rose-600 hover:bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-600/30 font-bold"
                      : "border border-neutral-800 bg-[#12141f] text-neutral-300 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Last Ellipsis */}
          {pages[pages.length - 1] < totalPages && (
            <PaginationItem>
              <PaginationEllipsis className="text-neutral-600" />
            </PaginationItem>
          )}

          {/* Next Page Link */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={`h-8 px-2.5 rounded-lg border border-neutral-800 bg-[#12141f] text-neutral-300 hover:text-white hover:bg-neutral-800 ${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
