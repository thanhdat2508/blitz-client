import { Award } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

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

const DEFAULT_OTPS: OtpPlayer[] = [
  {
    id: 'otp-1',
    name: 'DemaciaWings',
    server: 'KR',
    rank: 'Master 420 LP',
    rankBadgeColor: 'bg-purple-950/70 border-purple-700/50 text-purple-300',
    winRate: 64.2,
    games: 184,
    kda: '9.4 / 4.1 / 6.2',
    items: [
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3142.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3006.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6676.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3814.png',
    ],
  },
  {
    id: 'otp-2',
    name: 'BirdIsNotTheWord',
    server: 'EUW',
    rank: 'Grandmaster',
    rankBadgeColor: 'bg-red-950/70 border-red-700/50 text-red-300',
    winRate: 59.8,
    games: 242,
    kda: '8.1 / 5.0 / 5.5',
    items: [
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3142.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3006.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3036.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3026.png',
    ],
  },
  {
    id: 'otp-3',
    name: 'ValorInFlight',
    server: 'VN',
    rank: 'Challenger',
    rankBadgeColor: 'bg-amber-950/70 border-amber-700/50 text-amber-300',
    winRate: 61.5,
    games: 112,
    kda: '10.2 / 3.8 / 7.1',
    items: [
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3142.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3009.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6676.png',
      'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3031.png',
    ],
  },
]

interface OtpBuildsCardProps {
  championName: string
  players?: OtpPlayer[]
}

function formatRank(rank: string, lang: 'en' | 'vi') {
  if (lang === 'en') return rank
  return rank
    .replace(/Grandmaster/gi, 'Đại Cao Thủ')
    .replace(/Master/gi, 'Cao Thủ')
    .replace(/Challenger/gi, 'Thách Đấu')
}

export function OtpBuildsCard({
  championName,
  players = DEFAULT_OTPS,
}: OtpBuildsCardProps) {
  const { t, language } = useLanguage()

  return (
    <div className="bg-[#0E121A] border border-zinc-800/80 rounded-xl p-3.5 space-y-2.5 shadow-lg select-none">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-rose-400" />
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            {t('otpTitle')} ({championName})
          </p>
        </div>
        <p className="text-[10px] text-zinc-500 font-medium">{t('otpSubtitle')}</p>
      </div>

      <div className="space-y-2">
        {players.map((p) => (
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
                {formatRank(p.rank, language)}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <p className="font-black text-cyan-400">{p.winRate}% WR</p>
                <p className="text-zinc-500 font-mono text-[10px]">
                  {p.games} {t('games')}
                </p>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">KDA: {p.kda}</p>
            </div>

            <div className="flex items-center gap-1.5 pt-1 border-t border-zinc-900">
              <p className="text-[9px] text-zinc-500 font-medium uppercase">
                {language === 'en' ? 'Core Items:' : 'Đồ Cốt Lõi:'}
              </p>
              <div className="flex items-center gap-1">
                {p.items.map((itemUrl, idx) => (
                  <img
                    key={idx}
                    src={itemUrl}
                    alt="Trang bị OTP"
                    className="w-5 h-5 rounded border border-zinc-700/80 bg-zinc-900"
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
