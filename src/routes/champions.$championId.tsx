import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import { useState } from 'react'
import { championKeys, fetchChampionById, useChampion } from '@/features/champions/api/get-champions'
import { championBuildKeys, fetchChampionBuild, useChampionBuild } from '@/features/champions/api/get-champion-build'
import type { BuildRole, BuildTier } from '@/features/champions/types/champion-build'
import { ChampionHeroHeader } from '@/features/champions/components/detail/champion-hero-header'
import { ChampionFilterToolbar } from '@/features/champions/components/detail/champion-filter-toolbar'
import { ChampionMetaStatsBar } from '@/features/champions/components/detail/champion-meta-stats-bar'
import { TabRunesItems } from '@/features/champions/components/modal/tab-runes-items'
import { ArrowLeft } from 'lucide-react'
import type { Role, ChampionMeta } from '@/features/champions/types/champion'
import { getChampionAvatarUrl, getChampionSplashUrl } from '@/features/champions/data/ddragon-ids'

export const Route = createFileRoute('/champions/$championId')({
  loader: async ({ params: { championId }, context: { queryClient } }) => {
    queryClient.prefetchQuery({
      queryKey: championKeys.detail(championId),
      queryFn: () => fetchChampionById(championId),
    })
    return queryClient.ensureQueryData({
      queryKey: championBuildKeys.build(championId, 'mid', { tier: 'EMERALD+', region: 'WORLD' }),
      queryFn: () => fetchChampionBuild(championId, 'mid', { tier: 'EMERALD+', region: 'WORLD' }),
    })
  },
  component: ChampionDetailPage,
})

// Map frontend role format (ALL, TOP, JUNGLE...) to backend format (top, jungle...)
function toBackendRole(role: Role): BuildRole {
  const map: Record<string, BuildRole> = {
    TOP: 'top',
    JUNGLE: 'jungle',
    MID: 'mid',
    ADC: 'adc',
    SUPPORT: 'support',
  }
  return map[role] ?? 'mid'
}

function ChampionDetailPage() {
  const navigate = useNavigate()
  const { championId } = useParams({ from: '/champions/$championId' })

  // Champion meta from backend or local catalog
  const { data: champion, isLoading: isLoadingMeta } = useChampion(championId)

  const [selectedRoleOverride, setSelectedRoleOverride] = useState<Role | null>(null)
  const [selectedRank, setSelectedRank] = useState<BuildTier>('EMERALD+')
  const [selectedRegion, setSelectedRegion] = useState('WORLD')
  const [selectedMatchup, setSelectedMatchup] = useState('')

  const frontendRole: Role = selectedRoleOverride ?? champion?.primaryRole ?? 'MID'
  const backendRole: BuildRole = toBackendRole(frontendRole)

  // Champion build from backend API
  const {
    data: buildData,
    isLoading: isLoadingBuild,
  } = useChampionBuild(
    champion?.id ?? championId,
    backendRole,
    { tier: selectedRank, region: selectedRegion }
  )

  // Robust champion resolution combining tier-list catalog and live build overview
  const resolvedChampion: ChampionMeta | undefined = champion
    ? {
      ...champion,
      matches: buildData?.overview?.gamesPlayed ?? champion.matches,
      winRate: buildData?.overview?.winRate ?? champion.winRate,
      pickRate: buildData?.overview?.pickRate ?? champion.pickRate,
      banRate: buildData?.overview?.banRate ?? champion.banRate,
      avatarUrl: buildData?.overview?.avatarUrl || champion.avatarUrl,
      splashUrl: buildData?.overview?.splashUrl || champion.splashUrl,
    }
    : buildData?.overview
      ? {
        id: buildData.overview.key || buildData.overview.id || championId,
        name: buildData.overview.name || championId,
        title: buildData.overview.title || championId,
        roles: [frontendRole],
        primaryRole: frontendRole,
        avatarUrl:
          buildData.overview.avatarUrl ||
          getChampionAvatarUrl(buildData.overview.key || championId),
        splashUrl:
          buildData.overview.splashUrl ||
          getChampionSplashUrl(buildData.overview.key || championId),
        tier: (buildData.overview.tierRank as any) || 'S',
        winRate: buildData.overview.winRate ?? 52.0,
        pickRate: buildData.overview.pickRate ?? 5.0,
        banRate: buildData.overview.banRate ?? 2.0,
        matches: buildData.overview.gamesPlayed ?? 10000,
        trend: buildData.previousPatch?.winRateDiff ?? 0,
        counters: [],
        buildGuide: {
          skillOrder: ['Q', 'E', 'W'],
          skillPriority: 'Q > E > W',
          runes: {
            primaryTree: 'Precision',
            keystone: { name: 'Conqueror', iconUrl: '' },
            primaryRunes: [],
            secondaryTree: 'Resolve',
            secondaryRunes: [],
            shards: [],
          },
          items: { starting: [], core: [], boots: [], situational: [] },
          strengths: [],
          weaknesses: [],
          keyTips: [],
        },
      }
      : undefined

  const isLoading = (isLoadingMeta || isLoadingBuild) && !resolvedChampion

  if (isLoading) {
    return (
      <div className="py-24 text-center space-y-3 select-none">
        <div className="w-10 h-10 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mx-auto" />
        <p className="text-zinc-400 text-sm font-medium">
          Loading champion data...
        </p>
      </div>
    )
  }

  if (!resolvedChampion) {
    return (
      <div className="py-20 text-center space-y-4 select-none">
        <p className="text-lg font-bold text-zinc-200">
          Champion not found
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: '/champions' })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <p>All Champions</p>
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-6 space-y-4 select-none pb-12 font-sans">
      {/* 1. HERO HEADER */}
      <ChampionHeroHeader
        champion={resolvedChampion}
        selectedRole={frontendRole}
      />

      {/* 2. FILTER TOOLBAR & META STATS BANNER (FOCUSED 100% ON BUILD) */}
      <div className="rounded-xl border border-zinc-800/80 bg-[#0E121A] overflow-hidden shadow-xl p-3 sm:p-4 space-y-3">
        {/* Active Build Header */}
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Champion Build &amp; Meta Guide
            </p>
          </div>
          <p className="text-[11px] text-zinc-500 font-mono">
            Patch 26.19 (Emerald+)
          </p>
        </div>

        <ChampionFilterToolbar
          selectedRole={frontendRole}
          onSelectRole={setSelectedRoleOverride}
          selectedRank={selectedRank}
          onSelectRank={(rank) => setSelectedRank(rank as BuildTier)}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
          selectedMatchup={selectedMatchup}
          onSelectMatchup={setSelectedMatchup}
        />

        <ChampionMetaStatsBar champion={resolvedChampion} />
      </div>

      {/* 3. MAIN CHAMPION BUILD CONTENT */}
      <div className="pt-2">
        {isLoadingBuild && !buildData && (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin mx-auto" />
            <p className="text-zinc-500 text-xs font-medium">
              Fetching latest build data from server...
            </p>
          </div>
        )}
        <TabRunesItems
          buildData={buildData}
          championName={resolvedChampion.name}
          splashUrl={resolvedChampion.splashUrl}
          champion={resolvedChampion}
          role={frontendRole}
          backendRole={backendRole}
        />
      </div>
    </div>
  )
}
