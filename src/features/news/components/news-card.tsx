import { formatRelativeTime } from '../utils/date'
import type { NewsArticle } from '../types/news'
import { Zap } from 'lucide-react'

interface NewsCardProps {
  article: NewsArticle
  onClick: (article: NewsArticle) => void
}

export function NewsCard({ article, onClick }: NewsCardProps) {
  const isClassic = article.patchVersion === 'CLASSIC'

  return (
    <article
      onClick={() => onClick(article)}
      className="group relative flex flex-col bg-card/30 hover:bg-card/70 border border-border/50 hover:border-amber-500/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/50 cursor-pointer"
    >
      {/* Thumbnail Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60 select-none">
        {/* Background Splash Image */}
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
          <div className="w-5 h-5 rounded-full bg-amber-500/30 border border-amber-400/90 flex items-center justify-center text-[10px] font-black text-amber-300 shadow-md backdrop-blur-md">
            L
          </div>

          {/* Blitz.gg Watermark */}
          <div className="flex items-center gap-1 text-[9px] font-black tracking-widest text-zinc-200/90 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/10 uppercase">
            <Zap className="w-2.5 h-2.5 text-red-500 fill-red-500" />
            BLITZ.GG
          </div>
        </div>

        {/* Banner Graphic Center/Bottom Content */}
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
                <span className="text-xs font-medium italic text-zinc-300/90 drop-shadow-sm">
                  Patch Notes
                </span>
                <span className="text-3xl sm:text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-none mt-0.5">
                  {article.patchVersion}
                </span>
              </div>
            )
          ) : (
            <div className="inline-block px-2 py-0.5 rounded bg-amber-500/80 text-black text-[10px] font-black tracking-wider uppercase">
              {article.category}
            </div>
          )}
        </div>
      </div>

      {/* Card Info */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 space-y-1.5">
        {/* Relative Timestamp */}
        <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground/80">
          {formatRelativeTime(article.publishedAt)}
        </span>

        {/* Title */}
        <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-amber-400 transition-colors line-clamp-1 leading-snug">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs text-muted-foreground/85 line-clamp-2 leading-relaxed">
          {article.summary}
        </p>

        {/* Mini stats badges if available */}
        {article.changes && article.changes.length > 0 && (
          <div className="pt-2 mt-auto flex items-center gap-1.5">
            <span className="text-[10px] font-medium text-zinc-400 bg-card/80 border border-border/40 px-2 py-0.5 rounded-full">
              {article.changes.length} tướng cân bằng
            </span>
          </div>
        )}
      </div>
    </article>
  )
}
