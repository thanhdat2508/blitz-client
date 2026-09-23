import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FolderTree, Terminal, ShieldCheck } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  const structure = [
    { path: 'src/routes/__root.tsx', desc: 'Root layout, thanh điều hướng toàn app, devtools' },
    { path: 'src/routes/index.tsx', desc: 'Trang chủ (file-based routing "/")' },
    { path: 'src/routes/demo.tsx', desc: 'Trang demo TanStack Query & components ("/demo")' },
    { path: 'src/routes/about.tsx', desc: 'Trang thông tin dự án ("/about")' },
    { path: 'src/components/ui/*', desc: 'Các components Shadcn UI (Button, Card, Input, Badge...)' },
    { path: 'src/lib/utils.ts', desc: 'Hàm tiện ích cn (clsx + tailwind-merge)' },
    { path: 'src/main.tsx', desc: 'Khởi tạo QueryClient, RouterProvider và mount React' },
    { path: 'vite.config.ts', desc: 'Cấu hình TanStackRouterVite + Tailwind v4 + React' },
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cấu trúc dự án</h1>
        <p className="text-muted-foreground text-sm">
          Tổng quan kiến trúc và các quy ước thư mục được thiết lập trong template này.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-primary" />
            <CardTitle className="text-xl">Quy ước File-based Routing</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Bất kỳ file nào được tạo trong thư mục <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">src/routes</code> sẽ được TanStack Router theo dõi và sinh ra định nghĩa typesafe tương ứng trong <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">src/routeTree.gen.ts</code>.
          </p>

          <div className="border rounded-lg divide-y text-sm">
            {structure.map((item) => (
              <div key={item.path} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-mono text-xs font-semibold text-primary">{item.path}</span>
                <span className="text-xs text-muted-foreground">{item.desc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Các lệnh hữu ích</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-xs font-mono">
            <div className="p-2 bg-muted rounded">npm run dev</div>
            <div className="p-2 bg-muted rounded">npm run build</div>
            <div className="p-2 bg-muted rounded">npx shadcn@latest add dialog</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <CardTitle className="text-base">Đặc điểm bảo đảm chất lượng</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>✓ 100% Type-safe routes & params</p>
            <p>✓ Tối ưu hóa bundle với Auto Code Splitting</p>
            <p>✓ TanStack Query Cache tái sử dụng dữ liệu</p>
            <p>✓ Dark mode ready với CSS Variables</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
