import type { Role, RankBracket, Region } from '../../types/champion'
import { RoleFilterBar } from '../role-filter-bar'
import { Search, LayoutList, LayoutGrid } from 'lucide-react'

interface ChampionsToolbarProps {
  selectedRole: Role
  onSelectRole: (role: Role) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedRank?: RankBracket
  onRankChange?: (rank: RankBracket) => void
  selectedRegion?: Region
  onRegionChange?: (region: Region) => void
  viewMode: 'table' | 'grid'
  onViewModeChange: (mode: 'table' | 'grid') => void
}

export function ChampionsToolbar({
  selectedRole,
  onSelectRole,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: ChampionsToolbarProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 pb-2 select-none text-xs">
      {/* Left: Search Champions Input */}
      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search champions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Role Filter Segmented Group */}
        <RoleFilterBar activeRole={selectedRole} onSelectRole={onSelectRole} />
      </div>

      {/* Right: Patch Tag + View Mode Switcher */}
      <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
        {/* Patch Tag */}
        <div className="px-2.5 py-1.5 text-zinc-400 text-xs font-medium hidden sm:block">
          <p>Patch 26.19</p>
        </div>

        {/* View Mode Switcher (Table / Grid) */}
        <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5">
          <button
            type="button"
            onClick={() => onViewModeChange('table')}
            aria-label="Table View"
            title="Table View"
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-zinc-800 text-amber-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            aria-label="Grid View"
            title="Grid View"
            className={`p-1.5 rounded-md transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-zinc-800 text-amber-400 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
