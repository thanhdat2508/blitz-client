import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface NewsSkeletonGridProps {
  count?: number
}

export function NewsSkeletonGrid({ count = 6 }: NewsSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <Card
          key={idx}
          className="overflow-hidden border-border/40 bg-card/40 flex flex-col p-0 gap-0"
        >
          {/* Thumbnail Skeleton */}
          <div className="relative aspect-video w-full bg-muted/30 overflow-hidden">
            <Skeleton className="w-full h-full rounded-none" />
            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-20 h-4 rounded-md" />
            </div>
            <div className="absolute bottom-3 left-3 space-y-1">
              <Skeleton className="w-28 h-3 rounded" />
              <Skeleton className="w-36 h-6 rounded" />
            </div>
          </div>

          {/* Card Content Skeleton */}
          <CardHeader className="p-4 pb-2 space-y-2">
            <Skeleton className="w-24 h-3.5 rounded" />
            <Skeleton className="w-full h-5 rounded" />
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2 mt-auto">
            <Skeleton className="w-full h-3.5 rounded" />
            <Skeleton className="w-4/5 h-3.5 rounded" />
            <div className="pt-2">
              <Skeleton className="w-28 h-5 rounded-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
