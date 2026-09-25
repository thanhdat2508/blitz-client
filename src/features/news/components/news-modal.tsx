import { useState } from 'react'
import {
  Share2,
  Check,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react'
import type { NewsArticle, ChampionChange } from '../types/news'
import { formatRelativeTime } from '../utils/date'
import { formatDate } from '@/utils/format'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface NewsModalProps {
  article: NewsArticle | null
  onClose: () => void
}

export function NewsModal({ article, onClose }: NewsModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!article) return
    const shareUrl = `${window.location.origin}/news#${article.slug}`
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderChangeBadge = (type: ChampionChange['type']) => {
    switch (type) {
      case 'buff':
        return (
          <Badge
            variant="outline"
            className="gap-1 border-emerald-500/40 bg-emerald-500/15 text-emerald-400 font-semibold text-[11px]"
          >
            <TrendingUp className="size-3" />
            Tăng sức mạnh (Buff)
          </Badge>
        )
      case 'nerf':
        return (
          <Badge
            variant="outline"
            className="gap-1 border-rose-500/40 bg-rose-500/15 text-rose-400 font-semibold text-[11px]"
          >
            <TrendingDown className="size-3" />
            Giảm sức mạnh (Nerf)
          </Badge>
        )
      case 'rework':
        return (
          <Badge
            variant="outline"
            className="gap-1 border-purple-500/40 bg-purple-500/15 text-purple-400 font-semibold text-[11px]"
          >
            <RefreshCw className="size-3" />
            Làm lại (Rework)
          </Badge>
        )
      default:
        return (
          <Badge
            variant="outline"
            className="gap-1 border-sky-500/40 bg-sky-500/15 text-sky-400 font-semibold text-[11px]"
          >
            <ShieldAlert className="size-3" />
            Điều chỉnh (Adjust)
          </Badge>
        )
    }
  }

  return (
    <Dialog
      open={!!article}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      {article && (
        <DialogContent
          className="max-w-3xl p-0 overflow-hidden sm:max-w-3xl bg-background/95 border-border/80 shadow-2xl gap-0"
          showCloseButton={true}
        >
          {/* Header Banner */}
          <DialogHeader className="relative h-48 sm:h-60 w-full shrink-0 overflow-hidden bg-black p-0 gap-0">
            <img
              src={article.bannerUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/55 to-black/30" />

            {/* Banner info overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1">
              <div className="flex items-center gap-2">
                {article.patchVersion && (
                  <Badge className="bg-amber-500 text-black font-black uppercase text-xs shadow-md border-0">
                    Patch {article.patchVersion}
                  </Badge>
                )}
                <span className="text-[11px] font-semibold text-zinc-300">
                  {formatRelativeTime(article.publishedAt)}
                </span>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow">
                {article.title}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {article.summary}
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Scrollable Content Area */}
          <ScrollArea className="max-h-[60vh] sm:max-h-[62vh] px-5 sm:px-6 py-4">
            <div className="space-y-5">
              {/* Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pb-2">
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-3.5 text-amber-400" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-amber-400" />
                    {article.readTimeMinutes} phút đọc
                  </span>
                  <span>
                    Tác giả: <strong className="text-foreground">{article.author}</strong>
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="xs"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Đã copy link!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="size-3.5" />
                      <span>Chia sẻ</span>
                    </>
                  )}
                </Button>
              </div>

              <Separator />

              {/* Overview Section */}
              <div className="space-y-2">
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  Tổng quan bản cập nhật
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {article.summary}
                </p>
                {article.content && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {article.content}
                  </p>
                )}
              </div>

              {/* Champion Changes Section */}
              {article.changes && article.changes.length > 0 && (
                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-foreground">
                      Chi tiết thay đổi Tướng & Cơ chế
                    </h4>
                    <Badge variant="secondary" className="text-xs">
                      {article.changes.length}
                    </Badge>
                  </div>

                  <div className="space-y-2.5">
                    {article.changes.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-card/60 border border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-border transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar size="lg" className="rounded-lg shrink-0 border border-border/60">
                            <AvatarImage
                              src={item.avatarUrl}
                              alt={item.champion}
                              className="rounded-lg object-cover"
                            />
                            <AvatarFallback className="rounded-lg font-bold text-xs">
                              {item.champion.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-foreground text-sm">
                              {item.champion}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                              {item.summary}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 self-start sm:self-center">
                          {renderChangeBadge(item.type)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Dialog Footer */}
          <DialogFooter className="p-3 sm:p-4 bg-muted/30 border-t border-border/40 flex items-center justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="cursor-pointer"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  )
}
