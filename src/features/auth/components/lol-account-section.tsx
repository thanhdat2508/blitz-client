import * as React from 'react'
import {
  Trophy,
  Shield,
  Zap,
  Layers,
  Edit3,
  Check,
  X,
  Swords,
  Sparkles,
  ChevronDown,
  Users,
  Crosshair,
  Plus,
} from 'lucide-react'
import { useAccountManager } from '../hooks/use-account-manager'
import { useAuth } from '../hooks/use-auth'
import { LeagueIcon, ValorantIcon, TftIcon } from './social-icons'
import { RANK_THEMES } from './account-card'
import type { LolRegion } from '../types/auth'

const REGIONS: LolRegion[] = ['VN', 'KR', 'NA', 'EUW', 'SEA']

export function LolAccountSection() {
  const {
    accounts,
    activeAccount,
    switchAccount,
    updateAccount,
    toggleSetting,
  } = useAccountManager()

  const { openLoginModal } = useAuth()

  const [isEditing, setIsEditing] = React.useState(false)
  const [showAccountList, setShowAccountList] = React.useState(false)
  const [inputName, setInputName] = React.useState(activeAccount.summonerName)
  const [inputTag, setInputTag] = React.useState(activeAccount.tagLine)
  const [selectedRegion, setSelectedRegion] = React.useState<LolRegion>(activeAccount.region)

  const rankInfo = RANK_THEMES[activeAccount.tier] || RANK_THEMES.Diamond

  const gameIcon = {
    lol: <LeagueIcon className="w-3 h-3 text-amber-400" />,
    val: <ValorantIcon className="w-3 h-3 text-rose-400" />,
    tft: <TftIcon className="w-3 h-3 text-purple-400" />,
  }[activeAccount.game]

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInputName(activeAccount.summonerName)
    setInputTag(activeAccount.tagLine)
    setSelectedRegion(activeAccount.region)
    setIsEditing(true)
  }

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputName.trim()) return
    updateAccount(activeAccount.id, {
      summonerName: inputName.trim(),
      tagLine: inputTag.trim() || 'VN2',
      region: selectedRegion,
    })
    setIsEditing(false)
  }

  return (
    <div className="py-1">
      {/* Section Header */}
      <div className="flex items-center justify-between px-3 py-1 mb-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-500/90 flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Tài khoản Riot ({accounts.length})</span>
        </span>
        <button
          type="button"
          onClick={() => openLoginModal()}
          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center gap-1"
        >
          <Users className="w-2.5 h-2.5" />
          <span>Quản lý</span>
        </button>
      </div>

      {/* Active Account Card */}
      {!isEditing ? (
        <div className="mx-1 rounded-xl bg-gradient-to-b from-[#191a26] to-[#12131c] border border-amber-500/30 hover:border-amber-500/50 transition-all shadow-sm overflow-hidden">
          <div className="p-2.5 flex items-center justify-between gap-2">
            <div
              onClick={() => setShowAccountList((p) => !p)}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
              title="Bấm để xem các tài khoản khác"
            >
              {/* Profile Icon with Level */}
              <div className="relative shrink-0">
                <img
                  src={activeAccount.profileIconUrl}
                  alt={activeAccount.summonerName}
                  className="w-10 h-10 rounded-full border-2 border-amber-400/70 object-cover shadow-[0_0_10px_rgba(251,191,36,0.2)]"
                />
                <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-full bg-[#0a0a0e] border border-amber-400/40 text-[9px] font-bold text-amber-300 leading-tight">
                  {activeAccount.level}
                </span>
              </div>

              {/* Name, Tag, Rank */}
              <div className="min-w-0 flex-1 text-left">
                <div className="flex items-center gap-1 leading-tight flex-wrap">
                  {gameIcon}
                  <span className="font-bold text-xs text-white truncate">
                    {activeAccount.summonerName}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                    #{activeAccount.tagLine}
                  </span>
                  <span className="px-1 py-0.2 rounded bg-neutral-800 text-[9px] font-bold text-neutral-300">
                    {activeAccount.region}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold ${rankInfo.bg} ${rankInfo.text} border ${rankInfo.border}`}
                  >
                    <Shield className="w-2.5 h-2.5 fill-current" />
                    <span>{rankInfo.label}</span>
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium">
                    {activeAccount.lp} LP
                  </span>
                </div>
              </div>

              {/* Dropdown chevron to switch */}
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${
                  showAccountList ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* Quick Edit */}
            <button
              type="button"
              onClick={handleStartEdit}
              title="Đổi Riot ID / Máy chủ"
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer border border-transparent hover:border-neutral-700 ml-1"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Account Switcher dropdown inside card */}
          {showAccountList && (
            <div className="border-t border-neutral-800/80 bg-[#0f1017] p-1.5 space-y-1 animate-in fade-in duration-100">
              <span className="px-2 text-[9px] font-bold uppercase tracking-wider text-neutral-400 block text-left">
                Chuyển tài khoản nhanh:
              </span>
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => {
                    switchAccount(acc.id)
                    setShowAccountList(false)
                  }}
                  className={`flex items-center justify-between p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                    acc.isActive
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                      : 'hover:bg-white/5 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <img
                      src={acc.profileIconUrl}
                      alt={acc.summonerName}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-semibold text-white truncate">
                      {acc.summonerName}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      #{acc.tagLine}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 text-[10px]">
                    <span className="px-1 py-0.2 rounded bg-neutral-800 text-neutral-400 font-bold">
                      {acc.region}
                    </span>
                    {acc.isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setShowAccountList(false)
                  openLoginModal()
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-[11px] font-semibold transition-colors cursor-pointer mt-1"
              >
                <Plus className="w-3 h-3 text-amber-400" />
                <span>Thêm tài khoản Riot</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Inline Riot ID Editor */
        <form
          onSubmit={handleSaveEdit}
          className="mx-1 p-2.5 rounded-xl bg-[#161720] border border-amber-500/40 space-y-2 text-left"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span>Chỉnh sửa Riot ID</span>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <div className="col-span-2 space-y-1">
              <label htmlFor="riot-name-input" className="text-[10px] text-neutral-400 font-medium">Tên Riot</label>
              <input
                id="riot-name-input"
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Faker"
                className="w-full h-7 px-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="riot-tag-input" className="text-[10px] text-neutral-400 font-medium">Tag</label>
              <input
                id="riot-tag-input"
                type="text"
                value={inputTag}
                onChange={(e) => setInputTag(e.target.value)}
                placeholder="KR1"
                className="w-full h-7 px-2 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          {/* Region Picker in Edit mode */}
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 font-medium">Khu vực:</span>
            <div className="flex items-center gap-1">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRegion(r)}
                  className={`flex-1 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                    selectedRegion === r
                      ? 'bg-amber-400 text-black font-extrabold'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 pt-1">
            <button
              type="submit"
              className="flex-1 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Check className="w-3 h-3" />
              <span>Lưu</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="h-7 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {/* LoL & Riot Automation Companion Toggles */}
      <div className="mt-2 space-y-1">
        {/* Toggle: Auto Runes */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Zap className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-neutral-200 group-hover:text-white text-[11px] leading-tight">
                Tự động nhập Bảng ngọc
              </p>
              <p className="text-[10px] text-neutral-400">
                {activeAccount.autoRunes ? 'Đang bật theo meta' : 'Đã tắt'}
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={activeAccount.autoRunes}
            onClick={() => toggleSetting(activeAccount.id, 'autoRunes')}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
              activeAccount.autoRunes ? 'bg-amber-500' : 'bg-neutral-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-black shadow-md transition-transform ${
                activeAccount.autoRunes ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle: In-Game Overlay */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-neutral-200 group-hover:text-white text-[11px] leading-tight">
                Lớp phủ HUD trong trận
              </p>
              <p className="text-[10px] text-neutral-400">
                {activeAccount.inGameOverlay ? 'Đang bật hồi chiêu' : 'Đã tắt'}
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={activeAccount.inGameOverlay}
            onClick={() => toggleSetting(activeAccount.id, 'inGameOverlay')}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
              activeAccount.inGameOverlay ? 'bg-cyan-500' : 'bg-neutral-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-black shadow-md transition-transform ${
                activeAccount.inGameOverlay ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle: Auto Accept Match */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-white/5 transition-colors group">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-rose-400/10 border border-rose-400/20 flex items-center justify-center text-rose-400">
              <Crosshair className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-neutral-200 group-hover:text-white text-[11px] leading-tight">
                Tự động Chấp nhận trận
              </p>
              <p className="text-[10px] text-neutral-400">
                {activeAccount.autoAccept ? 'Đang kích hoạt' : 'Đã tắt'}
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={activeAccount.autoAccept}
            onClick={() => toggleSetting(activeAccount.id, 'autoAccept')}
            className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
              activeAccount.autoAccept ? 'bg-rose-500' : 'bg-neutral-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-black shadow-md transition-transform ${
                activeAccount.autoAccept ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Link: Champion Mastery & Match History */}
        <a
          href="/products"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
              <Swords className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-neutral-200 group-hover:text-white text-[11px] leading-tight">
                Tướng tủ & Lịch sử đấu
              </p>
              <p className="text-[10px] text-neutral-400">
                Tỷ lệ thắng {activeAccount.winRate}% • Vị trí {activeAccount.mainRole}
              </p>
            </div>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-neutral-500 group-hover:text-amber-400 transition-colors" />
        </a>
      </div>
    </div>
  )
}
