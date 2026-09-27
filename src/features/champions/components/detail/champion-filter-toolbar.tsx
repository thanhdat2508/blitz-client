import { useState } from 'react'
import { ChevronDown, Globe, Shield, Swords } from 'lucide-react'
import type { Role } from '../../types/champion'
import { RoleIcon } from '../role-icons'

interface ChampionFilterToolbarProps {
  selectedRole: Role
  onSelectRole: (role: Role) => void
  selectedRank: string
  onSelectRank: (rank: string) => void
  selectedRegion: string
  onSelectRegion: (region: string) => void
  selectedMatchup: string
  onSelectMatchup: (matchup: string) => void
}

const ROLES: Role[] = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT']

const RANKS = [
  { id: 'EMERALD_PLUS', label: 'Emerald+' },
  { id: 'DIAMOND_PLUS', label: 'Diamond+' },
  { id: 'MASTER_PLUS', label: 'Master+' },
  { id: 'ALL', label: 'All Ranks' },
]

const REGIONS = [
  { id: 'WORLD', label: 'World' },
  { id: 'KR', label: 'KR' },
  { id: 'NA', label: 'NA' },
  { id: 'EUW', label: 'EUW' },
  { id: 'VN', label: 'VN' },
]

const MATCHUPS = [
  { id: '', label: 'Select Matchup' },
  { id: 'Syndra', label: 'vs Syndra' },
  { id: 'Zed', label: 'vs Zed' },
  { id: 'Malzahar', label: 'vs Malzahar' },
  { id: 'Ahri', label: 'vs Ahri' },
  { id: 'Yasuo', label: 'vs Yasuo' },
  { id: 'Yone', label: 'vs Yone' },
]

export function ChampionFilterToolbar({
  selectedRole,
  onSelectRole,
  selectedRank,
  onSelectRank,
  selectedRegion,
  onSelectRegion,
  selectedMatchup,
  onSelectMatchup,
}: ChampionFilterToolbarProps) {
  const [openRank, setOpenRank] = useState(false)
  const [openRegion, setOpenRegion] = useState(false)
  const [openMatchup, setOpenMatchup] = useState(false)

  const currentRankLabel = RANKS.find((r) => r.id === selectedRank)?.label ?? 'Emerald+'
  const currentRegionLabel = REGIONS.find((r) => r.id === selectedRegion)?.label ?? 'World'
  const currentMatchupLabel = MATCHUPS.find((m) => m.id === selectedMatchup)?.label ?? 'Select Matchup'

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-2 text-xs select-none">
      {/* Left: Role icons + Rank + Region + Matchup */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Joined Role Icons Group */}
        <div className="flex items-center rounded-lg border border-zinc-800 bg-[#0E121A] p-0.5 shadow-sm">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role
            return (
              <button
                key={role}
                type="button"
                onClick={() => onSelectRole(role)}
                title={role}
                aria-label={role}
                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-800 text-white shadow-inner border border-zinc-700'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'
                }`}
              >
                <div className="scale-75">
                  <RoleIcon role={role} />
                </div>
              </button>
            )
          })}
        </div>

        {/* Rank Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenRank(!openRank)
              setOpenRegion(false)
              setOpenMatchup(false)
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E121A] border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold cursor-pointer transition-colors shadow-sm"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <p>{currentRankLabel}</p>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {openRank && (
            <div className="absolute top-full left-0 mt-1 w-36 rounded-lg bg-[#0E121A] border border-zinc-800 shadow-xl py-1 z-30">
              {RANKS.map((r) => (
                <div
                  key={r.id}
                  onClick={() => {
                    onSelectRank(r.id)
                    setOpenRank(false)
                  }}
                  className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-zinc-800/60 font-medium ${
                    selectedRank === r.id ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-zinc-300'
                  }`}
                >
                  <p>{r.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Region Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenRegion(!openRegion)
              setOpenRank(false)
              setOpenMatchup(false)
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E121A] border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold cursor-pointer transition-colors shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <p>{currentRegionLabel}</p>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {openRegion && (
            <div className="absolute top-full left-0 mt-1 w-32 rounded-lg bg-[#0E121A] border border-zinc-800 shadow-xl py-1 z-30">
              {REGIONS.map((reg) => (
                <div
                  key={reg.id}
                  onClick={() => {
                    onSelectRegion(reg.id)
                    setOpenRegion(false)
                  }}
                  className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-zinc-800/60 font-medium ${
                    selectedRegion === reg.id ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-zinc-300'
                  }`}
                >
                  <p>{reg.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Matchup Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setOpenMatchup(!openMatchup)
              setOpenRank(false)
              setOpenRegion(false)
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#0E121A] border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold cursor-pointer transition-colors shadow-sm"
          >
            <Swords className="w-3.5 h-3.5 text-rose-400" />
            <p>{currentMatchupLabel}</p>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {openMatchup && (
            <div className="absolute top-full left-0 mt-1 w-44 rounded-lg bg-[#0E121A] border border-zinc-800 shadow-xl py-1 z-30">
              {MATCHUPS.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    onSelectMatchup(m.id)
                    setOpenMatchup(false)
                  }}
                  className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-zinc-800/60 font-medium ${
                    selectedMatchup === m.id ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-zinc-300'
                  }`}
                >
                  <p>{m.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Patch Label */}
      <div className="text-zinc-500 font-mono text-xs">
        <p>Patch 26.19</p>
      </div>
    </div>
  )
}
