import { useState } from 'react'
import { useProducts, useCreateProduct } from '../api'
import { ProductCard } from './product-card'
import { LoadingSpinner } from '@/components/common/loading-spinner'
import { EmptyState } from '@/components/common/empty-state'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useDebounce } from '@/hooks/use-debounce'
import { Plus, RefreshCw, Search } from 'lucide-react'

export function ProductList() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const { data: products, isLoading, isError, error, refetch, isFetching } = useProducts()
  const createProductMutation = useCreateProduct()

  const filteredProducts = products?.filter((p) =>
    p.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  )

  const handleAddSample = () => {
    createProductMutation.mutate({
      title: `Sản phẩm mẫu mới #${Date.now().toString().slice(-4)}`,
      price: Math.floor(Math.random() * 100) + 10,
      description: 'Sản phẩm được tạo mẫu để test tính năng cache mutation của TanStack Query.',
      category: 'electronics',
    })
  }

  return (
    <div className="space-y-6">
      {/* Controls: Search and actions */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tên sản phẩm..."
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            Làm mới
          </Button>

          <Button
            size="sm"
            onClick={handleAddSample}
            disabled={createProductMutation.isPending}
            className="gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm SP Mẫu (Mutation)
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSpinner text="Đang tải danh sách sản phẩm..." />}

      {/* Error State */}
      {isError && (
        <EmptyState
          title="Không thể tải sản phẩm"
          description={error instanceof Error ? error.message : 'Có lỗi không xác định xảy ra.'}
          action={
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Thử lại
            </Button>
          }
        />
      )}

      {/* Success & Empty State */}
      {!isLoading && !isError && filteredProducts && (
        <>
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="Không tìm thấy sản phẩm"
              description={`Không có kết quả nào phù hợp với từ khoá "${debouncedSearch}".`}
              action={
                <Button variant="outline" size="sm" onClick={() => setSearch('')}>
                  Xoá bộ lọc
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => alert(`Đã thêm: ${p.title}`)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
