import { type ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from 'cn'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title = 'Không có dữ liệu',
  description = 'Chưa có mục nào được tìm thấy hoặc danh sách đang trống.',
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        'border-dashed border-border/80 bg-card/40 p-8 text-center flex flex-col items-center justify-center',
        className,
      )}
    >
      <CardContent className="flex flex-col items-center justify-center space-y-3 p-0">
        <div className="p-3 bg-muted rounded-full text-muted-foreground">
          {icon || <Inbox className="size-8" />}
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
        </div>
        {action && <div className="pt-2">{action}</div>}
      </CardContent>
    </Card>
  )
}
