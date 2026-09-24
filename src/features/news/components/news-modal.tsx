import { useEffect, useState } from 'react'
import { X, Check, Share2, Clock, Calendar, ShieldAlert, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import type { NewsArticle } from '../types/news'
import { formatRelativeTime } from '../utils/date'
import { formatDate } from '@/utils/format'

interface NewsModalProps {
  article: NewsArticle | null
  onClose: () => void
}

export function NewsModal({ article, onClose }: NewsModalProps) {
  const [copied, setCopied] = useState(false)

  // Đóng bằng phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!article) return null

  const handleCopy = async () => {
    const shareUrl = `${window.location.origin}/news#${article.slug}`
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getChangeBadge = (type: string) => {
    switch (type) {
      case 'buff':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <TrendingUp className="w-3 h-3" /> Tăng sức mạnh (Buff)
          </span>
        )
      case 'nerf':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/40">
            <TrendingDown className="w-3 h-3" /> Giảm sức mạnh (Nerf)
          </span>
        )
      case 'rework':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40">
            <RefreshCw className="w-3 h-3" /> Làm lại (Rework)
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/40">
            <ShieldAlert className="w-3 h-3" /> Điều chỉnh (Adjust)
          </span>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop overlay click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-background/95 border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Banner with Close Button */}
        <div className="relative h-48 sm:h-64 w-full shrink-0 overflow-hidden bg-black">
          <img
            src={article.bannerUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Banner bottom info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1.5">
              {article.patchVersion && (
                <span className="px-2 py-0.5 rounded bg-amber-500 text-black text-xs font-black tracking-wider uppercase shadow">
                  Patch {article.patchVersion}
                </span>
              )}
              <span className="text-[11px] font-semibold text-zinc-300">
                {formatRelativeTime(article.publishedAt)}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Metadata bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pb-4 border-b border-border/40">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {article.readTimeMinutes} phút đọc
              </span>
              <span>Tác giả: <strong className="text-foreground">{article.author}</strong></span>
            </div>

            <button
              onClick={handleCopy}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-card hover:bg-muted border border-border/60 text-foreground text-xs font-medium cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Đã copy link!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Chia sẻ</span>
                </>
              )}
            </button>
          </div>

          {/* Overview text */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-foreground">Tổng quan bản cập nhật</h4>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {article.summary}
            </p>
            {article.content && (
              <p className="text-muted-foreground leading-relaxed text-sm">
                {article.content}
              </p>
            )}
          </div>

          {/* Champion Changes Section */}
          {article.changes && article.changes.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-bold text-foreground flex items-center gap-2">
                <span>Chi tiết thay đổi Tướng & Cơ chế</span>
                <span className="text-xs font-normal text-muted-foreground">({article.changes.length})</span>
              </h4>

              <div className="space-y-2.5">
                {article.changes.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-card/60 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatarUrl}
                        alt={item.champion}
                        className="w-10 h-10 rounded-lg object-cover border border-border/60 shrink-0"
                      />
                      <div>
                        <div className="font-bold text-foreground text-sm flex items-center gap-2">
                          {item.champion}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 self-start sm:self-center">
                      {getChangeBadge(item.type)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border/40 bg-card/40 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-card hover:bg-muted border border-border/60 text-foreground transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}
