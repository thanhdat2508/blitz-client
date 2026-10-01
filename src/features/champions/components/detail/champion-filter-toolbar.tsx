import type { Role } from '../../types/champion'
import { RoleIcon } from '../role-icons'

interface ChampionFilterToolbarProps {
  selectedRole: Role
  onSelectRole: (role: Role) => void
  selectedRank?: string
  onSelectRank?: (rank: string) => void
  selectedRegion?: string
  onSelectRegion?: (region: string) => void
  selectedMatchup?: string
  onSelectMatchup?: (matchup: string) => void
}

const ROLES: Role[] = ['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT']

export function ChampionFilterToolbar({
  selectedRole,
  onSelectRole,
}: ChampionFilterToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-2 text-xs select-none">
      {/* Left: Role icons */}
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
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/15 border border-amber-400/60 shadow-md shadow-amber-400/10 text-amber-300'
                    : 'border border-transparent text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60'
                }`}
              >
                <RoleIcon
                  role={role}
                  className={`w-5 h-5 transition-transform ${
                    isSelected ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'opacity-60 hover:opacity-100'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: Patch Label */}
      <div className="text-zinc-500 font-mono text-xs">
        <p>Patch 26.19</p>
      </div>
    </div>
  )
}

