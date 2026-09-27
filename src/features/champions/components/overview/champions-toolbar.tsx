import type { Role, RankBracket, Region } from '../../types/champion'
import { RoleFilterBar } from '../role-filter-bar'
import { Search, Globe, ChevronDown, ShieldAlert, LayoutList, LayoutGrid } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

interface ChampionsToolbarProps {
  selectedRole: Role
  onSelectRole: (role: Role) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedRank: RankBracket
  onRankChange: (rank: RankBracket) => void
  selectedRegion: Region
  onRegionChange: (region: Region) => void
  viewMode: 'table' | 'grid'
  onViewModeChange: (mode: 'table' | 'grid') => void
}

export function ChampionsToolbar({
  selectedRole,
  onSelectRole,
  searchQuery,
  onSearchChange,
  selectedRank,
  onRankChange,
  selectedRegion,
  onRegionChange,
  viewMode,
  onViewModeChange,
}: ChampionsToolbarProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1 pb-2 select-none text-xs">
      {/* Left: Search Champions Input */}
      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder={t('searchChampionsPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700"
          />
        </div>

        {/* Role Filter Segmented Group */}
        <RoleFilterBar activeRole={selectedRole} onSelectRole={onSelectRole} />
      </div>

      {/* Right: Rank + Region + Patch */}
      <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
        {/* Emerald+ Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-zinc-200 font-semibold cursor-pointer">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={selectedRank}
              onChange={(e) => onRankChange(e.target.value as RankBracket)}
              aria-label={t('filterRank')}
              className="bg-transparent text-zinc-200 font-semibold cursor-pointer outline-none appearance-none pr-4"
            >
              <option value="EMERALD_PLUS" className="bg-zinc-900">
                {t('rankEmeraldPlus')}
              </option>
              <option value="DIAMOND_PLUS" className="bg-zinc-900">
                {t('rankDiamondPlus')}
              </option>
              <option value="MASTER_PLUS" className="bg-zinc-900">
                {t('rankMasterPlus')}
              </option>
              <option value="ALL" className="bg-zinc-900">
                {t('rankAll')}
              </option>
            </select>
            <ChevronDown className="w-3 h-3 text-zinc-500 pointer-events-none -ml-3" />
          </div>
        </div>

        {/* Region Dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 text-zinc-200 font-semibold cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-zinc-400" />
            <select
              value={selectedRegion}
              onChange={(e) => onRegionChange(e.target.value as Region)}
              aria-label={t('filterRegion')}
              className="bg-transparent text-zinc-200 font-semibold cursor-pointer outline-none appearance-none pr-4"
            >
              <option value="WORLD" className="bg-zinc-900">
                {t('regionWorld')}
              </option>
              <option value="KR" className="bg-zinc-900">
                {t('regionKorea')}
              </option>
              <option value="VN" className="bg-zinc-900">
                {t('regionVietnam')}
              </option>
              <option value="NA" className="bg-zinc-900">
                {t('regionNA')}
              </option>
              <option value="EUW" className="bg-zinc-900">
                {t('regionEUW')}
              </option>
            </select>
            <ChevronDown className="w-3 h-3 text-zinc-500 pointer-events-none -ml-3" />
          </div>
        </div>

        {/* Patch Tag */}
        <div className="px-2.5 py-1.5 text-zinc-400 text-xs font-medium hidden sm:block">
          <p>{t('patchTag')}</p>
        </div>

        {/* View Mode Switcher (Table / Grid) */}
        <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 p-0.5">
          <button
            type="button"
            onClick={() => onViewModeChange('table')}
            aria-label="Table View"
            title="Chế độ bảng"
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
            title="Chế độ lưới"
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
