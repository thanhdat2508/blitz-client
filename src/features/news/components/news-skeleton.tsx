export function NewsSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col bg-card/20 border border-border/30 rounded-xl overflow-hidden animate-pulse"
        >
          {/* Skeleton Thumbnail */}
          <div className="aspect-[16/9] w-full bg-muted/40 relative">
            <div className="absolute top-3 left-3 w-5 h-5 rounded-full bg-muted/70" />
            <div className="absolute top-3 right-3 w-16 h-4 rounded bg-muted/70" />
            <div className="absolute bottom-3 left-3 w-24 h-8 rounded bg-muted/70" />
          </div>

          {/* Skeleton Info */}
          <div className="p-4 space-y-2.5">
            <div className="w-20 h-3 rounded bg-muted/50" />
            <div className="w-3/4 h-5 rounded bg-muted/70" />
            <div className="w-full h-3.5 rounded bg-muted/40" />
            <div className="w-5/6 h-3.5 rounded bg-muted/40" />
          </div>
        </div>
      ))}
    </div>
  )
}
