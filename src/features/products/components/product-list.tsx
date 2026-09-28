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
      title: `New Sample Product #${Date.now().toString().slice(-4)}`,
      price: Math.floor(Math.random() * 100) + 10,
      description: 'Sample product created to test TanStack Query cache mutations.',
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
            placeholder="Search by product name..."
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
            Refresh
          </Button>

          <Button
            size="sm"
            onClick={handleAddSample}
            disabled={createProductMutation.isPending}
            className="gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Sample (Mutation)
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && <LoadingSpinner text="Loading products..." />}

      {/* Error State */}
      {isError && (
        <EmptyState
          title="Failed to load products"
          description={error instanceof Error ? error.message : 'An unexpected error occurred.'}
          action={
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          }
        />
      )}

      {/* Success & Empty State */}
      {!isLoading && !isError && filteredProducts && (
        <>
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              description={`No results match the keyword "${debouncedSearch}".`}
              action={
                <Button variant="outline" size="sm" onClick={() => setSearch('')}>
                  Clear filter
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => alert(`Added: ${p.title}`)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
