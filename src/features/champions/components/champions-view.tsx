import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import type { ChampionMeta, Role, RankBracket, Region } from '../types/champion'
import { useChampions } from '../api/get-champions'
import { useDebounce } from '@/hooks/use-debounce'
import { ChampionsHeader } from './overview/champions-header'
import { ChampionsToolbar } from './overview/champions-toolbar'
import { ChampionsTable } from './overview/champions-table'
import { ChampionsGrid } from './overview/champions-grid'
import { ChampionsPagination } from './overview/champions-pagination'

export function ChampionsView() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<Role>('ALL')
  const [selectedRank, setSelectedRank] = useState<RankBracket>('EMERALD_PLUS')
  const [selectedRegion, setSelectedRegion] = useState<Region>('WORLD')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'tier' | 'winRate' | 'pickRate' | 'banRate' | 'name'>('tier')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const debouncedSearch = useDebounce(searchQuery, 150)

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role)
    setPage(1)
  }

  const handleRankChange = (rank: RankBracket) => {
    setSelectedRank(rank)
    setPage(1)
  }

  const handleRegionChange = (region: Region) => {
    setSelectedRegion(region)
    setPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setPage(1)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setPage(1)
  }

  const handleToggleSort = (field: 'tier' | 'winRate' | 'pickRate' | 'banRate' | 'name') => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
    setPage(1)
  }

  const { data, isLoading, isFetching, refetch } = useChampions({
    role: selectedRole,
    rank: selectedRank,
    region: selectedRegion,
    search: debouncedSearch,
    sortBy,
    sortOrder,
    page,
    pageSize,
  })

  const champions = data?.champions ?? []
  const totalChampions = data?.total ?? champions.length
  const totalPages = data?.totalPages ?? Math.max(1, Math.ceil(totalChampions / pageSize))

  // Ensure current page does not exceed available pages
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(1)
    }
  }, [page, totalPages])

  // Quick stats summary
  const summaryStats = useMemo(() => {
    if (!champions.length) return { total: totalChampions, sPlusCount: 0 }
    const sPlus = champions.filter((c) => c.tier === 'S+' || c.tier === 'S').length
    return {
      total: totalChampions,
      sPlusCount: sPlus,
    }
  }, [champions, totalChampions])

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
        onSelectRole={handleRoleChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedRank={selectedRank}
        onRankChange={handleRankChange}
        selectedRegion={selectedRegion}
        onRegionChange={handleRegionChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* 3. CHAMPIONS LIST DATA DISPLAY */}
      {isLoading ? (
        <div className="rounded-xl border border-zinc-800 bg-[#121620] shadow-xl p-4 space-y-3 animate-pulse">
          <div className="h-9 w-full bg-zinc-800/60 rounded-lg" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-12 w-full bg-zinc-800/30 rounded-lg flex items-center px-4 gap-4"
            >
              <div className="w-5 h-4 bg-zinc-700/50 rounded" />
              <div className="w-8 h-8 rounded-lg bg-zinc-700/60 shrink-0" />
              <div className="w-28 h-4 bg-zinc-700/50 rounded" />
              <div className="w-10 h-6 rounded bg-zinc-700/40 ml-auto hidden sm:block" />
              <div className="w-16 h-4 bg-zinc-700/50 rounded hidden sm:block" />
              <div className="w-16 h-4 bg-zinc-700/50 rounded hidden md:block" />
            </div>
          ))}
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
              setPage(1)
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-semibold transition-colors cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {viewMode === 'table' ? (
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

          {/* 4. SHADCN PAGINATION BAR */}
          <ChampionsPagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalChampions}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </div>
  )
}

