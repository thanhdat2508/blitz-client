import { createFileRoute, Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2, Layers, Navigation, Database, Sparkles } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  const stack = [
    {
      title: 'React 19 + Vite 8',
      desc: 'Bản React và bundler Vite mới nhất với hiệu năng siêu tốc và HMR mượt mà.',
      badge: 'Core',
      icon: Sparkles,
    },
    {
      title: 'Shadcn UI + Tailwind v4',
      desc: 'Hệ thống UI component tùy biến cao, hỗ trợ CSS-first variables và animation mượt mà.',
      badge: 'Design System',
      icon: Layers,
    },
    {
      title: 'TanStack Router',
      desc: 'File-based routing hoàn toàn typesafe, code splitting tự động và hỗ trợ full type-checking.',
      badge: 'Navigation',
      icon: Navigation,
    },
    {
      title: 'TanStack Query v5',
      desc: 'Quản lý asynchronous state, cache, prefetch và background refetching chuẩn production.',
      badge: 'Data Fetching',
      icon: Database,
    },
  ]

  return (
    <div className="space-y-12 py-4">
      {/* Hero section */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Sẵn sàng phát triển dự án Production
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Modern React Starter Kit
        </h1>
        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
          Project template hoàn chỉnh cấu hình sẵn React 19, Shadcn UI, TanStack Router và TanStack Query.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/demo" className={buttonVariants({ size: 'lg', className: 'gap-2' })}>
            Khám phá Demo Query <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/about" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Xem cấu trúc thư mục
          </Link>
        </div>
      </section>

      {/* Stack Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stack.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {item.desc}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </section>

      {/* Quick Start Guide */}
      <section className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Hướng dẫn nhanh</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 rounded-lg bg-muted/50 border space-y-2">
            <p className="font-semibold text-foreground">1. Thêm Route mới</p>
            <p className="text-muted-foreground">
              Tạo file mới trong <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">src/routes</code>. TanStack Router plugin sẽ tự động cập nhật <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">routeTree.gen.ts</code>.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border space-y-2">
            <p className="font-semibold text-foreground">2. Thêm UI Component</p>
            <p className="text-muted-foreground">
              Chạy lệnh <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">npx shadcn@latest add &lt;tên_component&gt;</code> để cài thêm component từ thư viện Shadcn.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50 border space-y-2">
            <p className="font-semibold text-foreground">3. Sử dụng Query</p>
            <p className="text-muted-foreground">
              Sử dụng hook <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">useQuery</code> hoặc <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">useMutation</code> với TanStack Query đã được inject sẵn qua Provider.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
