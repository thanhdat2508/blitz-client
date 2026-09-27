import { Crown } from 'lucide-react'

export interface OtpPlayer {
  id: string
  name: string
  server: string
  rank: string
  rankBadgeColor: string
  winRate: number
  games: number
  kda: string
  avatarUrl: string
  keystoneIcon: string
  items: string[]
}

interface OtpBuildsCardProps {
  championName: string
  players?: OtpPlayer[]
  coreItemIds?: number[]
}

function getDynamicOtp(championName: string, coreItemIds?: number[]): OtpPlayer {
  const itemIcons = coreItemIds && coreItemIds.length >= 3
    ? coreItemIds.slice(0, 3).map((id) => `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${id}.png`)
    : [
        'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3089.png',
        'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6655.png',
        'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3157.png',
      ]

  return {
    id: 'otp-top',
    name: `TTV Findthe${championName.toLowerCase()} #TOP`,
    server: 'EUW',
    rank: 'GRANDMASTER 1752 LP',
    rankBadgeColor: 'text-amber-400 font-black',
    winRate: 59.4,
    games: 412,
    kda: '3.4',
    avatarUrl: 'https://res.cloudinary.com/vptfaug1/image/upload/player2.png',
    keystoneIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png',
    items: itemIcons,
  }
}

export function OtpBuildsCard({
  championName,
  players,
  coreItemIds,
}: OtpBuildsCardProps) {
  const topOtp = players?.[0] || getDynamicOtp(championName, coreItemIds)

  return (
    <div className="bg-[#12141c]/90 border border-zinc-800/80 rounded-xl p-3 space-y-2 shadow-lg select-none">
      {/* Header matching Blitz.gg: 👑 Hwei OTP Builds */}
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-zinc-800/80">
        <Crown className="w-3.5 h-3.5 text-amber-400" />
        <p className="font-bold text-xs text-amber-300 uppercase tracking-wide">
          {championName} OTP Builds
        </p>
      </div>

      {/* 1-Row Compact Card (Blitz.gg style) */}
      <div className="p-2.5 rounded-lg bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex items-center justify-between gap-2">
        {/* Left: Avatar + Server Tag + Name & Rank LP */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <img
              src={topOtp.avatarUrl}
              alt={topOtp.name}
              className="w-9 h-9 rounded-full border border-amber-500/50 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://res.cloudinary.com/vptfaug1/image/upload/player2.png'
              }}
            />
            <span className="absolute -bottom-1 -right-1 text-[8px] font-black px-1 rounded bg-zinc-850 border border-zinc-700 text-amber-300 leading-tight">
              {topOtp.server}
            </span>
          </div>

          <div className="truncate min-w-0">
            <p className="font-bold text-xs text-zinc-100 truncate hover:text-amber-300">
              {topOtp.name}
            </p>
            <div className="flex items-center gap-1 text-[10px] text-amber-400 font-extrabold uppercase tracking-tight">
              <Crown className="w-2.5 h-2.5 inline" />
              <span>{topOtp.rank}</span>
            </div>
          </div>
        </div>

        {/* Right: Keystone Rune + Core Items */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-5 h-5 rounded-full overflow-hidden bg-zinc-900 border border-cyan-500/40">
            <img
              src={topOtp.keystoneIcon}
              alt="Rune"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center gap-0.5">
            {topOtp.items.slice(0, 3).map((itemUrl, idx) => (
              <img
                key={idx}
                src={itemUrl}
                alt="Item"
                className="w-5 h-5 rounded border border-zinc-800 bg-zinc-900 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
