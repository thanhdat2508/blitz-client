import { formatRelativeTime } from '../utils/date'
import type { NewsArticle } from '../types/news'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface NewsCardProps {
  article: NewsArticle
  onClick: (article: NewsArticle) => void
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  const isClassic = article.patchVersion === 'CLASSIC'

  return (
    <Card
      onClick={() => onClick(article)}
      className="group relative flex flex-col bg-card/30 hover:bg-card/80 border-border/50 hover:border-amber-500/40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/40 cursor-pointer p-0 gap-0"
    >
      {/* Thumbnail Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-black select-none">
        <img
          src={article.bannerUrl}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

        {/* Top Header inside Banner */}
        <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between z-10">
          {/* LoL Badge Icon */}
          <div className="size-5 rounded-full bg-amber-500/30 border border-amber-400/90 flex items-center justify-center text-[10px] font-black text-amber-300 shadow-md backdrop-blur-md">
            L
          </div>
        </div>

        {/* Banner Graphic Bottom Info */}
        <div className="absolute bottom-3 left-3.5 right-3.5 z-10">
          {article.patchVersion ? (
            isClassic ? (
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-amber-300/80 uppercase">
                  SUMMONER'S RIFT
                </span>
                <span className="text-xl sm:text-2xl font-black italic tracking-wider text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text drop-shadow">
                  LEAGUE OF LEGENDS
                </span>
                <span className="text-xs font-black tracking-widest text-amber-400/90">
                  CLASSIC
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-xs font-medium italic text-zinc-300 drop-shadow-sm">
                  Patch Notes
                </span>
                <span className="text-3xl sm:text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-none mt-0.5">
                  {article.patchVersion}
                </span>
              </div>
            )
          ) : (
            <Badge className="bg-amber-500 text-black hover:bg-amber-400 text-[10px] font-black tracking-wider uppercase border-0">
              {article.category}
            </Badge>
          )}
        </div>
      </div>

      {/* Card Info using ShadCN CardHeader, CardTitle, CardDescription */}
      <CardHeader className="p-4 pb-2 space-y-1.5 flex-1">
        <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">
          {formatRelativeTime(article.publishedAt)}
        </span>
        <CardTitle className="text-sm sm:text-base font-bold text-foreground group-hover:text-amber-400 transition-colors line-clamp-1 leading-snug">
          {article.title}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {article.summary}
        </CardDescription>
      </CardHeader>

      {/* Card Footer with stats badges */}
      <CardFooter className="p-4 pt-0 mt-auto flex items-center justify-between border-t-0 bg-transparent">
        {article.changes && article.changes.length > 0 ? (
          <Badge variant="outline" className="text-[10px] font-medium border-border/50 text-muted-foreground bg-card/60">
            {article.changes.length} tướng cân bằng
          </Badge>
        ) : (
          <span />
        )}
        <span className="text-[10px] text-muted-foreground">
          {article.readTimeMinutes} phút đọc
        </span>
      </CardFooter>
    </Card>
  )
}
