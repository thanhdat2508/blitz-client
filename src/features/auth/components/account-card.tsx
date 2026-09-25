import * as React from 'react'
import type { GameAccount } from '../types/auth'
import { LeagueIcon, ValorantIcon, TftIcon } from './social-icons'
import {
  Shield,
  Zap,
  Layers,
  Trash2,
  Star,
  LogIn,
  MoreVertical,
  Crosshair,
} from 'lucide-react'

export const RANK_THEMES: Record<
  string,
  { label: string; text: string; bg: string; border: string; glow: string }
> = {
  Challenger: {
    label: 'Thách Đấu',
    text: 'text-amber-300',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/40',
    glow: 'rgba(251, 191, 36, 0.2)',
  },
  Grandmaster: {
    label: 'Đại Cao Thủ',
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/40',
    glow: 'rgba(244, 63, 94, 0.2)',
  },
  Master: {
    label: 'Cao Thủ',
    text: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/40',
    glow: 'rgba(168, 85, 247, 0.2)',
  },
  Diamond: {
    label: 'Kim Cương',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/40',
    glow: 'rgba(6, 182, 212, 0.2)',
  },
  Emerald: {
    label: 'Lục Bảo',
    text: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/40',
    glow: 'rgba(16, 185, 129, 0.2)',
  },
  Platinum: {
    label: 'Bạch Kim',
    text: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/40',
    glow: 'rgba(20, 184, 166, 0.2)',
  },
  Gold: {
    label: 'Vàng',
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/40',
    glow: 'rgba(234, 179, 8, 0.2)',
  },
  Silver: {
    label: 'Bạc',
    text: 'text-zinc-300',
    bg: 'bg-zinc-500/10',
    border: 'border-zinc-500/40',
    glow: 'rgba(161, 161, 170, 0.2)',
  },
}

interface AccountCardProps {
  account: GameAccount
  onSwitch: (id: string) => void
  onRemove: (id: string) => void
  onSetPrimary: (id: string) => void
  onToggleSetting: (
    id: string,
    setting: 'autoRunes' | 'inGameOverlay' | 'autoAccept'
  ) => void
  onLoginWithAccount?: (account: GameAccount) => void
  compact?: boolean
}

export function AccountCard({
  account,
  onSwitch,
  onRemove,
  onSetPrimary,
  onToggleSetting,
  onLoginWithAccount,
  compact = false,
}: AccountCardProps) {
  const [showMenu, setShowMenu] = React.useState(false)
  const rankTheme = RANK_THEMES[account.tier] || RANK_THEMES.Diamond

  const gameBadge = {
    lol: { label: 'LoL', icon: <LeagueIcon className="w-3 h-3 text-amber-400" />, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
    val: { label: 'VAL', icon: <ValorantIcon className="w-3 h-3 text-rose-400" />, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
    tft: { label: 'TFT', icon: <TftIcon className="w-3 h-3 text-purple-400" />, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  }[account.game]

  return (
    <div
      className={`group relative rounded-xl transition-all duration-200 border text-left ${
        account.isActive
          ? 'bg-gradient-to-r from-[#171926] via-[#141622] to-[#12131d] border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
          : 'bg-[#11131a] hover:bg-[#151722] border-neutral-800/80 hover:border-neutral-700'
      } ${compact ? 'p-2.5' : 'p-3.5'}`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left: Avatar + Details */}
        <div
          onClick={() => onSwitch(account.id)}
          className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
        >
          {/* Summoner / Agent Avatar */}
          <div className="relative shrink-0">
            <img
              src={account.profileIconUrl}
              alt={account.summonerName}
              className={`rounded-full object-cover border-2 transition-transform group-hover:scale-105 ${
                account.isActive ? 'border-amber-400' : 'border-neutral-700'
              } ${compact ? 'w-9 h-9' : 'w-11 h-11'}`}
            />
            {/* Level Badge */}
            <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-[#0a0a0f] border border-neutral-700 text-[9px] font-bold text-neutral-300 leading-tight">
              {account.level}
            </span>
          </div>

          {/* Info: Name, Tags, Region, Rank */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 leading-tight flex-wrap">
              <span className="font-bold text-sm text-white truncate hover:underline">
                {account.summonerName}
              </span>
              <span className="text-xs font-mono text-neutral-400 shrink-0">
                #{account.tagLine}
              </span>

              {/* Game Badge */}
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${gameBadge.color}`}
              >
                {gameBadge.icon}
                <span>{gameBadge.label}</span>
              </span>

              {/* Server Region */}
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-neutral-800 text-neutral-400">
                {account.region}
              </span>
            </div>

            {/* Rank info and Winrate */}
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold ${rankTheme.bg} ${rankTheme.text} border ${rankTheme.border}`}
              >
                <Shield className="w-2.5 h-2.5 fill-current" />
                <span>{rankTheme.label}</span>
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">
                {account.lp} LP
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {account.winRate}% WR
              </span>
              {account.mainRole && (
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">
                  {account.mainRole}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {account.isActive ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Đang chọn</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onSwitch(account.id)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-amber-500 hover:text-black text-neutral-300 transition-colors cursor-pointer"
            >
              Chuyển
            </button>
          )}

          {onLoginWithAccount && (
            <button
              type="button"
              onClick={() => onLoginWithAccount(account)}
              title="Đăng nhập ngay với tài khoản này"
              className="h-8 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng nhập</span>
            </button>
          )}

          {/* Quick Menu Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu((p) => !p)}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Tùy chọn tài khoản"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 top-8 w-44 rounded-xl bg-[#181a24] border border-neutral-700/80 shadow-xl p-1.5 z-30 text-xs text-neutral-200 animate-in fade-in zoom-in-95 duration-100"
                onMouseLeave={() => setShowMenu(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    onSetPrimary(account.id)
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400" />
                  <span>Đặt làm mặc định</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onToggleSetting(account.id, 'autoRunes')
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Auto Bảng ngọc</span>
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      account.autoRunes ? 'bg-emerald-400' : 'bg-neutral-600'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onToggleSetting(account.id, 'inGameOverlay')
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Lớp phủ Overlay</span>
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      account.inGameOverlay ? 'bg-emerald-400' : 'bg-neutral-600'
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onToggleSetting(account.id, 'autoAccept')
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                    <span>Tự chấp nhận trận</span>
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      account.autoAccept ? 'bg-emerald-400' : 'bg-neutral-600'
                    }`}
                  />
                </button>

                <div className="h-px bg-neutral-800 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    onRemove(account.id)
                    setShowMenu(false)
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 text-left text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa tài khoản</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
