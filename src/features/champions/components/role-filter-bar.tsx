import type { Role } from '../types/champion'
import { RoleIcon } from './role-icons'

interface RoleFilterBarProps {
  activeRole: Role
  onSelectRole: (role: Role) => void
}

const ROLES: { id: Role; tooltip: string }[] = [
  { id: 'ALL', tooltip: 'All Roles' },
  { id: 'TOP', tooltip: 'Top Lane' },
  { id: 'JUNGLE', tooltip: 'Jungle' },
  { id: 'MID', tooltip: 'Mid Lane' },
  { id: 'ADC', tooltip: 'Bot / ADC' },
  { id: 'SUPPORT', tooltip: 'Support' },
]

export function RoleFilterBar({ activeRole, onSelectRole }: RoleFilterBarProps) {
  return (
    <div className="inline-flex items-center rounded-lg bg-zinc-900 border border-zinc-800 divide-x divide-zinc-800 overflow-hidden select-none">
      {ROLES.map((r) => {
        const isActive = activeRole === r.id
        return (
          <button
            key={r.id}
            type="button"
            title={r.tooltip}
            onClick={() => onSelectRole(r.id)}
            className={`w-9 h-8 md:w-10 md:h-9 flex items-center justify-center transition-colors cursor-pointer ${
              isActive
                ? 'bg-zinc-800 text-white font-bold'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-850'
            }`}
          >
            <RoleIcon role={r.id} className="w-4 h-4" />
          </button>
        )
      })}
    </div>
  )
}
