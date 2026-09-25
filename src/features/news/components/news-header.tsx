import { useState } from 'react'
import { Link2, Check, Radio } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarBadge } from '@/components/ui/avatar'

export function NewsHeader() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* LoL Hextech Crest with ShadCN Avatar */}
          <Avatar size="lg" className="border-2 border-amber-500/50 shadow-md shadow-amber-500/10 ring-2 ring-amber-500/20">
            <AvatarFallback className="bg-gradient-to-tr from-amber-600 via-amber-400 to-cyan-500 text-black font-black text-xl">
              <span className="w-full h-full rounded-full bg-[#0a0c10] flex items-center justify-center border border-amber-300/30 text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-500 font-extrabold text-lg select-none">
                L
              </span>
            </AvatarFallback>
            <AvatarBadge className="bg-emerald-500 ring-background" />
          </Avatar>

          {/* Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                League of Legends News
              </h1>
              <Badge variant="outline" className="text-[11px] gap-1 py-0.5 border-amber-500/40 text-amber-500 dark:text-amber-400">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                Live Feed
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              All the latest from League of Legends breaking down the news, latest patch notes, and champion balance updates.
            </p>
          </div>
        </div>

        {/* Share / Copy Link Button with ShadCN Tooltip & Button */}
        <div className="flex items-center self-start sm:self-center">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  aria-label="Sao chép liên kết"
                  className="hover:border-amber-500/40 hover:text-amber-400 transition-colors"
                />
              }
            >
              {copied ? (
                <Check className="size-4 text-emerald-400" />
              ) : (
                <Link2 className="size-4" />
              )}
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              {copied ? 'Đã sao chép liên kết!' : 'Sao chép liên kết trang'}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator className="border-border/40" />
    </div>
  )
}
