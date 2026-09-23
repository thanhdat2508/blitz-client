import { type ReactNode } from 'react'
import { Inbox } from 'lucide-react'
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
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-xl bg-card/50 space-y-3',
        className,
      )}
    >
      <div className="p-3 bg-muted rounded-full text-muted-foreground">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
