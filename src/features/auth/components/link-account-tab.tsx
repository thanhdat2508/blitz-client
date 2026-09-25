import * as React from 'react'
import type { LolRegion, LolTier, SupportedGame } from '../types/auth'
import { LeagueIcon, ValorantIcon, TftIcon } from './social-icons'
import { RANK_THEMES } from './account-card'
import { Shield, Plus, Sparkles, ArrowLeft } from 'lucide-react'

const REGIONS: LolRegion[] = ['VN', 'KR', 'NA', 'EUW', 'SEA', 'BR', 'OCE', 'JP']

interface LinkAccountTabProps {
  onAddAccount: (acc: {
    summonerName: string
    tagLine: string
    region: LolRegion
    game: SupportedGame
    tier?: LolTier
    makeActive?: boolean
  }) => void
  onCancel: () => void
}

export function LinkAccountTab({ onAddAccount, onCancel }: LinkAccountTabProps) {
  const [game, setGame] = React.useState<SupportedGame>('lol')
  const [summonerName, setSummonerName] = React.useState('')
  const [tagLine, setTagLine] = React.useState('')
  const [region, setRegion] = React.useState<LolRegion>('VN')
  const [makeActive, setMakeActive] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  // Auto fallback tagline based on region if empty
  const defaultTag = React.useMemo(() => {
    return region === 'VN' ? 'VN2' : region === 'KR' ? 'KR1' : region === 'NA' ? 'NA1' : 'EUW'
  }, [region])

  const effectiveTag = tagLine.trim() || defaultTag

  // Simulated live rank preview based on entered name
  const simulatedTier: LolTier = React.useMemo(() => {
    const len = summonerName.length
    if (len >= 6) return 'Challenger'
    if (len >= 4) return 'Grandmaster'
    if (len >= 2) return 'Diamond'
    return 'Platinum'
  }, [summonerName])

  const rankTheme = RANK_THEMES[simulatedTier] || RANK_THEMES.Diamond

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!summonerName.trim()) {
      setError('Vui lòng nhập Riot ID hoặc Tên tài khoản')
      return
    }

    onAddAccount({
      summonerName: summonerName.trim(),
      tagLine: effectiveTag,
      region,
      game,
      tier: simulatedTier,
      makeActive,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh sách</span>
        </button>
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Liên kết Riot Games</span>
        </span>
      </div>

      {error && (
        <div className="px-3 py-2 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-xs">
          {error}
        </div>
      )}

      {/* Game Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-300">
          Chọn tựa game
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setGame('lol')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              game === 'lol'
                ? 'bg-amber-500/15 border-amber-500/60 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <LeagueIcon className="w-3.5 h-3.5" />
            <span>LoL</span>
          </button>

          <button
            type="button"
            onClick={() => setGame('val')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              game === 'val'
                ? 'bg-rose-500/15 border-rose-500/60 text-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.15)]'
                : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <ValorantIcon className="w-3.5 h-3.5" />
            <span>Valorant</span>
          </button>

          <button
            type="button"
            onClick={() => setGame('tft')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              game === 'tft'
                ? 'bg-purple-500/15 border-purple-500/60 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
          >
            <TftIcon className="w-3.5 h-3.5" />
            <span>Đấu Trường Chân Lý</span>
          </button>
        </div>
      </div>

      {/* Riot ID Name and Tag */}
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-2 space-y-1.5">
          <label htmlFor="summoner-name" className="text-xs font-semibold text-neutral-300">
            Tên Riot ID
          </label>
          <input
            id="summoner-name"
            type="text"
            required
            placeholder="vd: Faker, Levi, TenZ"
            value={summonerName}
            onChange={(e) => {
              setSummonerName(e.target.value)
              if (error) setError(null)
            }}
            className="w-full h-10 px-3 rounded-xl bg-[#161822] border border-neutral-700/70 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="tagline" className="text-xs font-semibold text-neutral-300">
            Tag (#)
          </label>
          <div className="relative">
            <span className="absolute left-2.5 top-2.5 text-neutral-500 text-xs font-mono">
              #
            </span>
            <input
              id="tagline"
              type="text"
              placeholder={defaultTag}
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value.replace(/#/g, ''))}
              className="w-full h-10 pl-6 pr-2 rounded-xl bg-[#161822] border border-neutral-700/70 text-white placeholder:text-neutral-500 text-sm font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 uppercase"
            />
          </div>
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-300">
          Máy chủ / Khu vực
        </label>
        <div className="flex flex-wrap gap-1.5">
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                region === r
                  ? 'bg-amber-400 text-black shadow-sm font-extrabold'
                  : 'bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview Card */}
      <div className="p-3 rounded-xl bg-[#12141c] border border-neutral-800 text-left space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Xem trước hiển thị trên Blitz:
        </span>
        <div className="flex items-center gap-3 pt-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border-2 border-amber-400/60 flex items-center justify-center font-bold text-amber-300 text-sm">
            {summonerName.trim().slice(0, 2).toUpperCase() || 'ID'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white truncate">
                {summonerName.trim() || 'Summoner'}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                #{effectiveTag}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-neutral-800 text-neutral-300">
                {region}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold ${rankTheme.bg} ${rankTheme.text} border ${rankTheme.border}`}
              >
                <Shield className="w-2.5 h-2.5 fill-current" />
                <span>{rankTheme.label}</span>
              </span>
              <span className="text-[10px] text-neutral-400">75 LP • Cấp 120</span>
            </div>
          </div>
        </div>
      </div>

      {/* Checkbox: Make active immediately */}
      <label className="flex items-center gap-2.5 cursor-pointer text-xs text-neutral-300 select-none">
        <input
          type="checkbox"
          checked={makeActive}
          onChange={(e) => setMakeActive(e.target.checked)}
          className="w-4 h-4 rounded bg-neutral-900 border-neutral-700 text-amber-500 focus:ring-amber-500"
        />
        <span>Đặt làm tài khoản hoạt động ngay trên Blitz</span>
      </label>

      {/* Submit Button */}
      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)]"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Liên kết tài khoản này</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-11 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-semibold transition-colors cursor-pointer"
        >
          Hủy
        </button>
      </div>
    </form>
  )
}
