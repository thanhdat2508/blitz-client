import type { Role } from '../types/champion'
import { RoleIcon } from './role-icons'

interface RoleFilterBarProps {
  activeRole: Role
  onSelectRole: (role: Role) => void
}

const ROLES: { id: Role; tooltip: string }[] = [
  { id: 'ALL', tooltip: 'Tất cả' },
  { id: 'TOP', tooltip: 'Đường Trên' },
  { id: 'JUNGLE', tooltip: 'Rừng' },
  { id: 'MID', tooltip: 'Đường Giữa' },
  { id: 'ADC', tooltip: 'Xạ Thủ / Bot' },
  { id: 'SUPPORT', tooltip: 'Hỗ Trợ' },
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
