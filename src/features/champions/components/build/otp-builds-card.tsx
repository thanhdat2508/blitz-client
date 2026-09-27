import { Crown } from 'lucide-react'
import { getPerkInfo } from '../../data/ddragon-ids'
import { optimizeCloudinaryUrl } from '@/lib/utils'

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
  keystoneId?: number
}

function getDynamicOtps(
  championName: string,
  coreItemIds?: number[],
  keystoneId?: number
): OtpPlayer[] {
  const itemIcons =
    coreItemIds && coreItemIds.length >= 3
      ? coreItemIds
          .slice(0, 3)
          .map((id) => `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${id}.png`)
      : [
          'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3089.png',
          'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6655.png',
          'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3157.png',
        ]

  const keystoneIcon = keystoneId
    ? getPerkInfo(keystoneId).iconUrl
    : 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png'

  return [
    {
      id: 'otp-1',
      name: `Findthe${championName.toLowerCase()} #TOP`,
      server: 'EUW',
      rank: 'CHALLENGER 1250 LP',
      rankBadgeColor: 'text-amber-300 font-black',
      winRate: 59.8,
      games: 482,
      kda: '3.6',
      avatarUrl: optimizeCloudinaryUrl('https://res.cloudinary.com/vptfaug1/image/upload/player2.png', 100),
      keystoneIcon,
      items: itemIcons,
    },
    {
      id: 'otp-2',
      name: `${championName} King KR`,
      server: 'KR',
      rank: 'GRANDMASTER 890 LP',
      rankBadgeColor: 'text-rose-400 font-black',
      winRate: 58.4,
      games: 345,
      kda: '3.2',
      avatarUrl: optimizeCloudinaryUrl('https://res.cloudinary.com/vptfaug1/image/upload/player3.png', 100),
      keystoneIcon,
      items: itemIcons,
    },
    {
      id: 'otp-3',
      name: `Best ${championName} NA`,
      server: 'NA',
      rank: 'MASTER 420 LP',
      rankBadgeColor: 'text-purple-400 font-black',
      winRate: 56.5,
      games: 290,
      kda: '2.9',
      avatarUrl: optimizeCloudinaryUrl('https://res.cloudinary.com/vptfaug1/image/upload/player1.png', 100),
      keystoneIcon,
      items: itemIcons,
    },
    {
      id: 'otp-4',
      name: `${championName} God VN`,
      server: 'VN',
      rank: 'MASTER 320 LP',
      rankBadgeColor: 'text-purple-400 font-black',
      winRate: 57.1,
      games: 245,
      kda: '3.3',
      avatarUrl: optimizeCloudinaryUrl('https://res.cloudinary.com/vptfaug1/image/upload/player2.png', 100),
      keystoneIcon,
      items: itemIcons,
    },
  ]
}

export function OtpBuildsCard({
  championName,
  players,
  coreItemIds,
  keystoneId,
}: OtpBuildsCardProps) {
  const otpList =
    players && players.length > 0
      ? players
      : getDynamicOtps(championName, coreItemIds, keystoneId)

  return (
    <div className="bg-[#12141c]/90 border border-zinc-800/80 rounded-xl p-3 space-y-2.5 shadow-lg select-none">
      {/* Header: One Trick Master */}
      <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800/80">
        <div className="flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <p className="font-bold text-xs text-amber-300 uppercase tracking-wide">
            One Trick Master ({championName})
          </p>
        </div>
        <p className="text-[10px] text-zinc-500 font-mono">Top High Elo OTPs</p>
      </div>

      {/* List of One Trick Masters */}
      <div className="space-y-1.5">
        {otpList.map((otp) => (
          <div
            key={otp.id}
            className="p-2 rounded-lg bg-zinc-950/70 border border-zinc-850 hover:border-zinc-700 transition-colors flex items-center justify-between gap-2"
          >
            {/* Left: Avatar + Server Tag + Name & Rank LP */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={optimizeCloudinaryUrl(otp.avatarUrl, 100)}
                  alt={otp.name}
                  loading="lazy"
                  className="w-7 h-7 rounded-full border border-amber-500/50 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://res.cloudinary.com/vptfaug1/image/upload/f_auto,q_auto,w_100/player2.png'
                  }}
                />
                <span className="absolute -bottom-1 -right-1 text-[7px] font-black px-0.5 rounded bg-zinc-850 border border-zinc-750 text-amber-300 leading-tight">
                  {otp.server}
                </span>
              </div>

              <div className="truncate min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-bold text-xs text-zinc-100 truncate hover:text-amber-300">
                    {otp.name}
                  </p>
                  <span className={`text-[9px] ${otp.rankBadgeColor} shrink-0`}>
                    {otp.rank.split(' ')[0]}
                  </span>
                </div>
                <p className="text-[9px] text-zinc-400 font-mono">
                  <span className="text-cyan-400 font-bold">{otp.winRate}% WR</span> · {otp.games}g · KDA {otp.kda}
                </p>
              </div>
            </div>

            {/* Right: Keystone Rune + Core Items */}
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-4 h-4 rounded-full overflow-hidden bg-zinc-900 border border-cyan-500/40">
                <img
                  src={otp.keystoneIcon}
                  alt="Rune"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-0.5">
                {otp.items.slice(0, 3).map((itemUrl, idx) => (
                  <img
                    key={idx}
                    src={itemUrl}
                    alt="Item"
                    className="w-4 h-4 rounded border border-zinc-800 bg-zinc-900 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
