import { Award } from 'lucide-react'

export interface OtpPlayer {
  id: string
  name: string
  server: string
  rank: string
  rankBadgeColor: string
  winRate: number
  games: number
  kda: string
  items: string[]
}

interface OtpBuildsCardProps {
  championName: string
  players?: OtpPlayer[]
  coreItemIds?: number[]
}

function getDynamicOtps(championName: string, coreItemIds?: number[]): OtpPlayer[] {
  const itemIcons = coreItemIds && coreItemIds.length >= 3
    ? coreItemIds.slice(0, 3).map((id) => `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${id}.png`)
    : [
        'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3089.png',
        'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6655.png',
        'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3157.png',
      ]

  return [
    {
      id: 'otp-1',
      name: `${championName} King`,
      server: 'KR',
      rank: 'Challenger',
      rankBadgeColor: 'bg-amber-950/80 border-amber-700/80 text-amber-300',
      winRate: 61.4,
      games: 482,
      kda: '3.6',
      items: itemIcons,
    },
    {
      id: 'otp-2',
      name: `Hide on ${championName}`,
      server: 'KR',
      rank: 'Grandmaster',
      rankBadgeColor: 'bg-rose-950/80 border-rose-700/80 text-rose-300',
      winRate: 58.2,
      games: 345,
      kda: '3.2',
      items: itemIcons,
    },
    {
      id: 'otp-3',
      name: `Best ${championName} NA`,
      server: 'NA',
      rank: 'Master',
      rankBadgeColor: 'bg-purple-950/80 border-purple-700/80 text-purple-300',
      winRate: 56.8,
      games: 290,
      kda: '2.9',
      items: itemIcons,
    },
  ]
}

export function OtpBuildsCard({
  championName,
  players,
  coreItemIds,
}: OtpBuildsCardProps) {
  const effectivePlayers = players || getDynamicOtps(championName, coreItemIds)

  return (
    <div className="bg-[#0E121A] border border-zinc-800/80 rounded-xl p-3.5 space-y-2.5 shadow-lg select-none">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-rose-400" />
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            OTP Specialists ({championName})
          </p>
        </div>
        <p className="text-[10px] text-zinc-500 font-medium">High Elo One-Tricks</p>
      </div>

      <div className="space-y-2">
        {effectivePlayers.map((p) => (
          <div
            key={p.id}
            className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-zinc-200">{p.name}</p>
                <div className="px-1.5 py-0.5 rounded bg-zinc-800 text-[9px] font-mono text-zinc-400">
                  {p.server}
                </div>
              </div>
              <div
                className={`px-1.5 py-0.5 rounded border text-[9px] font-black uppercase ${p.rankBadgeColor}`}
              >
                {p.rank}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <p className="font-black text-cyan-400">{p.winRate}% WR</p>
                <p className="text-zinc-500 font-mono text-[10px]">
                  {p.games} games
                </p>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">KDA: {p.kda}</p>
            </div>

            <div className="flex items-center gap-1.5 pt-1 border-t border-zinc-900">
              <p className="text-[9px] text-zinc-500 font-medium uppercase">
                Core Items:
              </p>
              <div className="flex items-center gap-1">
                {p.items.map((itemUrl, idx) => (
                  <img
                    key={idx}
                    src={itemUrl}
                    alt="Core Item"
                    className="w-5 h-5 rounded border border-zinc-700/80 bg-zinc-900"
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
