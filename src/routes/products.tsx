import { createFileRoute } from '@tanstack/react-router'
import { ProductList } from '@/features/products'
import { PageHeader } from '@/components/common/page-header'

export const Route = createFileRoute('/products')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Danh sách Sản phẩm"
        description="Module mẫu cấu hình theo chuẩn Feature-based Architecture kết hợp TanStack Query & Shadcn UI."
      />
      <ProductList />
    </div>
  )
}
