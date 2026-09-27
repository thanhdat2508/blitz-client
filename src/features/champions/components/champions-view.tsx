import { useState, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { ChampionMeta, Role, RankBracket, Region } from '../types/champion'
import { useChampions } from '../api/get-champions'
import { useDebounce } from '@/hooks/use-debounce'
import { ChampionsHeader } from './overview/champions-header'
import { ChampionsToolbar } from './overview/champions-toolbar'
import { ChampionsTable } from './overview/champions-table'
import { ChampionsGrid } from './overview/champions-grid'

export function ChampionsView() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<Role>('ALL')
  const [selectedRank, setSelectedRank] = useState<RankBracket>('EMERALD_PLUS')
  const [selectedRegion, setSelectedRegion] = useState<Region>('WORLD')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'tier' | 'winRate' | 'pickRate' | 'banRate' | 'name'>('tier')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')

  const debouncedSearch = useDebounce(searchQuery, 150)

  const { data: champions = [], isLoading, isFetching, refetch } = useChampions({
    role: selectedRole,
    search: debouncedSearch,
    sortBy,
    sortOrder,
  })

  // Quick stats summary
  const summaryStats = useMemo(() => {
    if (!champions.length) return { total: 0, sPlusCount: 0 }
    const sPlus = champions.filter((c) => c.tier === 'S+').length
    return {
      total: champions.length,
      sPlusCount: sPlus,
    }
  }, [champions])

  const handleToggleSort = (field: 'tier' | 'winRate' | 'pickRate' | 'banRate' | 'name') => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  // Navigate to full standalone page for the champion build
  const handleSelectChampion = (champion: ChampionMeta) => {
    navigate({
      to: '/champions/$championId',
      params: { championId: champion.id },
    })
  }

  return (
    <div className="space-y-6 select-none font-sans text-zinc-100">
      {/* 1. HERO TITLE & META HEADER */}
      <ChampionsHeader
        totalChampions={summaryStats.total}
        sPlusCount={summaryStats.sPlusCount}
        isFetching={isFetching}
        onRefresh={() => refetch()}
      />

      {/* 2. ROLE FILTER & SEARCH CONTROLS */}
      <ChampionsToolbar
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRank={selectedRank}
        onRankChange={setSelectedRank}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* 3. CHAMPIONS LIST DATA DISPLAY */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <div className="w-10 h-10 border-4 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400 text-sm font-medium">
            Loading champions...
          </p>
        </div>
      ) : champions.length === 0 ? (
        <div className="py-16 text-center bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6">
          <p className="text-base font-bold text-zinc-200">
            No champions found
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            {searchQuery ? `No champions found matching "${searchQuery}".` : 'Try adjusting your filters.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedRole('ALL')
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold transition-colors cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        <ChampionsTable
          champions={champions}
          sortBy={sortBy}
          onToggleSort={handleToggleSort}
          onSelectChampion={handleSelectChampion}
        />
      ) : (
        <ChampionsGrid
          champions={champions}
          onSelectChampion={handleSelectChampion}
        />
      )}
    </div>
  )
}
