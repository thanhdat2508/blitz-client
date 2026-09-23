import { Loader2 } from 'lucide-react'
import { cn } from 'cn'

interface LoadingSpinnerProps {
  className?: string
  text?: string
}

export function LoadingSpinner({ className, text = 'Đang tải dữ liệu...' }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground', className)}>
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      {text && <p className="text-sm font-medium">{text}</p>}
    </div>
  )
}
