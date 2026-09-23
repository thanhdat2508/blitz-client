# ReactJS Modern Base Starter Kit

Dự án ReactJS base chuẩn Production được thiết lập sẵn theo mô hình **Feature-Based Architecture**:

- ⚡ **React 19** + **Vite 8** + **TypeScript 6**
- 🎨 **Shadcn UI** (Tailwind CSS v4, Base UI, CSS Variables)
- 🗺️ **TanStack Router** (File-based routing, 100% Type-safe, Auto Code Splitting)
- 🔄 **TanStack Query v5** (Async state, auto cache, queryKey factories, mutation optimistic updates)
- 🌐 **Axios API Client** (Request/Response Interceptors, Bearer token injection, BaseURL config)
- 🛠️ **Custom Hooks & Helpers** (`useDebounce`, `useLocalStorage`, `formatCurrency`, `formatDate`, `storage`)
- 🧹 **Oxlint** (Siêu tốc, 0 lỗi/cảnh báo)

---

## 🚀 Bắt đầu nhanh

### 1. Cài đặt dependencies (nếu clone về máy mới)
```bash
npm install
```

### 2. Khởi chạy Development Server
```bash
npm run dev
```
Mở trình duyệt tại địa chỉ: `http://localhost:5173`.

### 3. Kiểm tra mã nguồn (Linting)
```bash
npm run lint
```

### 4. Build sản phẩm (Production)
```bash
npm run build
```

---

## 📂 Kiến trúc & Cấu trúc thư mục (Feature-Based)

```text
src/
├── config/                  # Biến môi trường type-safe, cấu hình app
│   ├── env.ts              # ENV constants (API_BASE_URL, IS_DEV, v.v.)
│   └── site.ts             # Metadata website, navigation menu
├── lib/                     # Khởi tạo thư viện bên thứ 3
│   ├── api-client.ts       # Axios instance với Interceptors chuẩn
│   ├── react-query.ts      # Cấu hình QueryClient & default options
│   └── utils.ts            # Hàm cn() (clsx + tailwind-merge)
├── types/                   # Type definitions dùng chung toàn hệ thống
│   ├── api.ts              # ApiResponse<T>, PaginatedResponse<T>, ApiError
│   └── common.ts           # Nullable<T>, AsyncState<T>
├── utils/                   # Tiện ích bổ trợ (Formatters, Storage)
│   ├── format.ts           # formatCurrency (VND/USD), formatDate
│   └── storage.ts          # Thao tác localStorage an toàn (try/catch, JSON parse)
├── hooks/                   # Custom Hooks dùng chung
│   ├── use-debounce.ts     # useDebounce cho search, autocomplete
│   └── use-local-storage.ts# Đồng bộ state React với localStorage
├── components/
│   ├── ui/                 # Shadcn UI primitives (button, card, badge, input, ...)
│   └── common/             # Reusable UI widgets
│       ├── page-header.tsx # Tiêu đề trang chuẩn
│       ├── loading-spinner.tsx # Spinner hiển thị loading
│       └── empty-state.tsx # Trạng thái rỗng / lỗi
├── features/                # 🌟 TẤT CẢ TÍNH NĂNG NGHIỆP VỤ NẰM Ở ĐÂY
│   └── products/           # Module mẫu hoàn chỉnh để team nhân bản:
│       ├── types/          # Types riêng của module (Product, CreateProductDTO)
│       ├── api/            # API endpoints & TanStack Query hooks (get-products, create-product)
│       ├── components/     # UI components nội bộ (product-card, product-list)
│       └── index.ts        # Barrel export của feature
└── routes/                  # File-based TanStack Router
    ├── __root.tsx          # Root layout chung (Header, Footer, Devtools)
    ├── index.tsx           # Trang chủ ("/")
    ├── products.tsx        # Trang Sản phẩm ("/products")
    ├── demo.tsx            # Trang demo Query ("/demo")
    ├── about.tsx           # Trang giới thiệu kiến trúc ("/about")
    └── routeTree.gen.ts    # Tự động sinh bởi TanStack Router (không sửa tay)
```

---

## 🧩 Quy trình code một Feature mới (Dành cho Team)

Khi bạn cần thêm một tính năng mới (ví dụ: `orders`, `users`, `auth`), hãy làm theo 4 bước sau:

### Bước 1: Tạo thư mục feature trong `src/features/<tên-feature>/`
```text
src/features/orders/
├── types/index.ts         # Khai báo Order, OrderStatus, OrderItem
├── api/
│   ├── get-orders.ts      # Query hook & queryKeys factory
│   └── create-order.ts    # Mutation hook
├── components/
│   ├── order-card.tsx
│   └── order-list.tsx
└── index.ts               # Barrel export
```

### Bước 2: Viết API Hook với TanStack Query
```typescript
// src/features/orders/api/get-orders.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import type { Order } from '../types'

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  detail: (id: string) => [...orderKeys.all, 'detail', id] as const,
}

export function useOrders() {
  return useQuery({
    queryKey: orderKeys.lists(),
    queryFn: () => apiClient.get<Order[]>('/orders'),
  })
}
```

### Bước 3: Tạo UI Component của feature
Sử dụng các component trong `src/components/ui/` (Shadcn UI) kết hợp với các component `LoadingSpinner`, `EmptyState` trong `src/components/common/`.

### Bước 4: Tạo Route trong `src/routes/`
Tạo file `src/routes/orders.tsx`:
```tsx
import { createFileRoute } from '@tanstack/react-router'
import { OrderList } from '@/features/orders'
import { PageHeader } from '@/components/common/page-header'

export const Route = createFileRoute('/orders')({
  component: () => (
    <div className="space-y-6">
      <PageHeader title="Quản lý đơn hàng" />
      <OrderList />
    </div>
  ),
})
```
Vite sẽ tự động nhận diện và cập nhật `routeTree.gen.ts`. Bạn có thể dùng `<Link to="/orders">` ngay lập tức!
