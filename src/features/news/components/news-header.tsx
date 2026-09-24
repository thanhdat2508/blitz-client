import { useState } from 'react'
import { Link2, Check } from 'lucide-react'

export function NewsHeader() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
      <div className="flex items-center gap-4">
        {/* LoL Hextech Crest Icon */}
        <div className="relative shrink-0 w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-600 via-amber-400 to-cyan-400 shadow-md shadow-amber-500/10">
          <div className="w-full h-full rounded-full bg-[#0a0c10] flex items-center justify-center border border-amber-300/30">
            <span className="font-black text-xl tracking-tighter bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent select-none">
              L
            </span>
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full" />
        </div>

        {/* Title & Subtitle */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            League of Legends News
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 max-w-2xl">
            All the latest from League of Legends breaking down the news, latest patch notes, and more.
          </p>
        </div>
      </div>

      {/* Share / Copy Link Button */}
      <div className="flex items-center self-start sm:self-center">
        <button
          onClick={handleCopyLink}
          type="button"
          title="Sao chép liên kết"
          className="group relative flex items-center justify-center w-9 h-9 rounded-lg bg-card/60 hover:bg-card border border-border/60 hover:border-amber-500/40 text-muted-foreground hover:text-amber-400 transition-all cursor-pointer shadow-sm"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Link2 className="w-4 h-4 group-hover:rotate-45 transition-transform duration-200" />
          )}

          {/* Tooltip */}
          {copied && (
            <span className="absolute -top-8 right-0 text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded shadow-lg whitespace-nowrap animate-in fade-in zoom-in-95">
              Đã sao chép!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
