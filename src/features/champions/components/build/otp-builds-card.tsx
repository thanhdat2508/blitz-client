import { Crown } from 'lucide-react'
import { getPerkInfo, RUNE_STYLE_ICON } from '../../data/ddragon-ids'
import { RuneIcon } from './rune-icon'

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
  secondaryIcon?: string
  items: string[]
}

interface OtpBuildsCardProps {
  championName: string
  players?: OtpPlayer[]
  coreItemIds?: number[]
  keystoneId?: number
  secondaryStyleId?: number
}

function getDynamicOtps(
  championName: string,
  coreItemIds?: number[],
  keystoneId?: number,
  secondaryStyleId?: number
): OtpPlayer[] {
  const itemIcons =
    coreItemIds && coreItemIds.length >= 3
      ? coreItemIds
          .slice(0, 3)
          .map((id) => `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${id}.png`)
      : [
          'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6655.png',
          'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/4645.png',
          'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3089.png',
        ]

  const keystoneIcon = keystoneId
    ? getPerkInfo(keystoneId).iconUrl
    : 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png'

  const secondaryIcon =
    secondaryStyleId && RUNE_STYLE_ICON[secondaryStyleId]
      ? RUNE_STYLE_ICON[secondaryStyleId]
      : 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png'

  return [
    {
      id: 'otp-1',
      name: `FindThe${championName}`,
      server: 'EUW',
      rank: 'CHALLENGER 1,350 LP',
      rankBadgeColor: 'text-amber-300 font-black',
      winRate: 62.5,
      games: 482,
      kda: '3.8',
      avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/6548.png',
      keystoneIcon,
      secondaryIcon,
      items: itemIcons,
    },
    {
      id: 'otp-2',
      name: `${championName} Master`,
      server: 'KR',
      rank: 'CHALLENGER 1,180 LP',
      rankBadgeColor: 'text-amber-300 font-black',
      winRate: 60.4,
      games: 380,
      kda: '3.5',
      avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/5345.png',
      keystoneIcon,
      secondaryIcon,
      items: itemIcons,
    },
    {
      id: 'otp-3',
      name: `Best ${championName}`,
      server: 'VN',
      rank: 'GRANDMASTER 820 LP',
      rankBadgeColor: 'text-rose-400 font-black',
      winRate: 58.7,
      games: 310,
      kda: '3.2',
      avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/588.png',
      keystoneIcon,
      secondaryIcon,
      items: itemIcons,
    },
    {
      id: 'otp-4',
      name: `Revenge ${championName}`,
      server: 'NA',
      rank: 'GRANDMASTER 740 LP',
      rankBadgeColor: 'text-rose-400 font-black',
      winRate: 57.8,
      games: 265,
      kda: '3.0',
      avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/4568.png',
      keystoneIcon,
      secondaryIcon,
      items: itemIcons,
    },
  ]
}

export function OtpBuildsCard({
  championName,
  players,
  coreItemIds,
  keystoneId,
  secondaryStyleId,
}: OtpBuildsCardProps) {
  const otpList =
    players && players.length > 0
      ? players
      : getDynamicOtps(championName, coreItemIds, keystoneId, secondaryStyleId)

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
                  src={otp.avatarUrl}
                  alt={otp.name}
                  loading="lazy"
                  className="w-7 h-7 rounded-full border border-amber-500/50 object-cover bg-zinc-900"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/588.png'
                  }}
                />
                <span className="absolute -bottom-1 -right-1 text-[7px] font-black px-0.5 rounded bg-zinc-850 border border-zinc-750 text-amber-300 leading-tight">
                  {otp.server}
                </span>
              </div>

              <div className="truncate min-w-0 flex-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <p
                    className="font-bold text-xs text-zinc-100 truncate hover:text-amber-300"
                    title={otp.name}
                  >
                    {otp.name}
                  </p>
                  <span className={`text-[8.5px] ${otp.rankBadgeColor} shrink-0`}>
                    {otp.rank.split(' ')[0]}
                  </span>
                </div>
                <p className="text-[9px] text-zinc-400 font-mono tracking-tight">
                  <span className="text-cyan-400 font-bold">{otp.winRate}% WR</span> · {otp.games}g · KDA {otp.kda}
                </p>
              </div>
            </div>

            {/* Right: Keystone Rune (same size as items) with small secondary rune at bottom-right corner + Core Items */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="relative shrink-0 flex items-center justify-center">
                <RuneIcon
                  iconUrl={otp.keystoneIcon}
                  alt="Keystone Rune"
                  size="w-4.5 h-4.5"
                  isKeystone
                />
                {otp.secondaryIcon && (
                  <div className="absolute -bottom-0.5 -right-0.5 z-10 pointer-events-none">
                    <RuneIcon
                      iconUrl={otp.secondaryIcon}
                      alt="Secondary Rune Tree"
                      size="w-2.5 h-2.5"
                      isSecondaryStyle
                      className="ring-1 ring-zinc-950 shadow-xs"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-0.5">
                {otp.items.slice(0, 3).map((itemUrl, idx) => (
                  <img
                    key={idx}
                    src={itemUrl}
                    alt="Item"
                    className="w-4.5 h-4.5 rounded border border-zinc-800 bg-zinc-900 object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = 'none'
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
