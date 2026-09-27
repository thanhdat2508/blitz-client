import * as React from 'react'
import type { GameAccount, SupportedGame } from '../types/auth'
import { AccountCard } from './account-card'
import {
  ShieldCheck,
  Plus,
  RefreshCw,
  LogIn,
} from 'lucide-react'

interface SavedAccountsTabProps {
  accounts: GameAccount[]
  activeAccount: GameAccount
  isScanning: boolean
  onSwitch: (id: string) => void
  onRemove: (id: string) => void
  onSetPrimary: (id: string) => void
  onToggleSetting: (
    id: string,
    setting: 'autoRunes' | 'inGameOverlay' | 'autoAccept'
  ) => void
  onDetectClient: () => void
  onOpenLinkTab: () => void
  onLoginWithAccount: (account: GameAccount) => void
  onGoToLogin: () => void
}

export function SavedAccountsTab({
  accounts,
  activeAccount,
  isScanning,
  onSwitch,
  onRemove,
  onSetPrimary,
  onToggleSetting,
  onDetectClient,
  onOpenLinkTab,
  onLoginWithAccount,
  onGoToLogin,
}: SavedAccountsTabProps) {
  const [gameFilter, setGameFilter] = React.useState<SupportedGame | 'all'>('all')

  const filteredAccounts = React.useMemo(() => {
    if (gameFilter === 'all') return accounts
    return accounts.filter((a) => a.game === gameFilter)
  }, [accounts, gameFilter])

  return (
    <div className="w-full space-y-4">
      {/* Top Bar: Title & Client Auto-detect */}
      <div className="flex items-center justify-between pb-1 border-b border-neutral-800/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Tài khoản đã lưu ({accounts.length})
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-neutral-400 mt-0.5 text-left">
            Chuyển nhanh tài khoản hoặc đăng nhập trực tiếp 1-click
          </p>
        </div>

        {/* Scan Riot Client button */}
        <button
          type="button"
          disabled={isScanning}
          onClick={onDetectClient}
          title="Tự động đồng bộ với Riot Client trên máy"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700/60 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 text-amber-400 ${
              isScanning ? 'animate-spin' : ''
            }`}
          />
          <span>{isScanning ? 'Đang quét...' : 'Quét Client'}</span>
        </button>
      </div>

      {/* Filter Tabs by Game */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#10121a] border border-neutral-800/80">
        <button
          type="button"
          onClick={() => setGameFilter('all')}
          className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            gameFilter === 'all'
              ? 'bg-[#1e202f] text-white shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Tất cả ({accounts.length})
        </button>
        <button
          type="button"
          onClick={() => setGameFilter('lol')}
          className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            gameFilter === 'lol'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          LoL ({accounts.filter((a) => a.game === 'lol').length})
        </button>
        <button
          type="button"
          onClick={() => setGameFilter('val')}
          className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            gameFilter === 'val'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Valorant ({accounts.filter((a) => a.game === 'val').length})
        </button>
      </div>

      {/* List of Accounts */}
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onSwitch={onSwitch}
              onRemove={onRemove}
              onSetPrimary={onSetPrimary}
              onToggleSetting={onToggleSetting}
              onLoginWithAccount={onLoginWithAccount}
            />
          ))
        ) : (
          <div className="py-8 text-center text-xs text-neutral-400">
            Chưa có tài khoản nào thuộc tựa game này.
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-neutral-800/70">
        {/* Quick Login with Current Active Account */}
        <button
          type="button"
          onClick={() => onLoginWithAccount(activeAccount)}
          className="w-full h-11 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:brightness-110 active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_15px_rgba(244,63,94,0.3)]"
        >
          <LogIn className="w-4 h-4" />
          <span>
            Đăng nhập ngay với {activeAccount.summonerName} #{activeAccount.tagLine}
          </span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          {/* Link new Account */}
          <button
            type="button"
            onClick={onOpenLinkTab}
            className="h-10 rounded-xl bg-[#161824] hover:bg-[#1f2233] border border-neutral-700/70 hover:border-neutral-600 text-xs font-semibold text-neutral-200 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Thêm tài khoản Riot</span>
          </button>

          {/* Switch to normal login */}
          <button
            type="button"
            onClick={onGoToLogin}
            className="h-10 rounded-xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Đăng nhập Email / Khác</span>
          </button>
        </div>
      </div>
    </div>
  )
}
