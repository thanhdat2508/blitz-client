import { useState, useRef, useEffect, useMemo } from 'react'
import type { ChampionBuildPayload, BuildRole } from '../../types/champion-build'
import type { ChampionMeta, Role } from '../../types/champion'
import { RuneTreeVisual, type PresetKey } from '../build/rune-tree-visual'
import { ArchetypeSelector } from '../build/archetype-selector'
import { OtpBuildsCard } from '../build/otp-builds-card'
import { ProBuildsCard } from '../build/pro-builds-card'
import { SkillOrderMatrix } from '../build/skill-order-matrix'
import { ItemBuildPath } from '../build/item-build-path'
import { ChampionBuildGuideCard } from '../build/champion-build-guide-card'
import { ChampionInsightsCard } from '../build/champion-insights-card'
import { SimilarChampionsCard } from '../build/similar-champions-card'
import { FloatingPreviewCard, type FloatingCardData } from '../build/floating-preview-card'
import { DEFAULT_BUILD_PAYLOAD } from '../../data/default-build-payload'
import { generateChampionArchetypes } from '../../utils/archetype-generator'

interface TabRunesItemsProps {
  buildData?: ChampionBuildPayload | null
  championName?: string
  splashUrl?: string
  champion?: ChampionMeta
  role?: Role
  backendRole?: BuildRole
}

export function TabRunesItems({
  buildData,
  championName = 'Champion',
  splashUrl,
  champion,
  role = 'MID',
  backendRole = 'mid',
}: TabRunesItemsProps) {
  const [previewData, setPreviewData] = useState<FloatingCardData | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeBuild = buildData || DEFAULT_BUILD_PAYLOAD

  const totalMatches =
    buildData?.overview?.gamesPlayed ??
    champion?.matches ??
    activeBuild.overview?.gamesPlayed ??
    15000

  const archetypes = useMemo(() => {
    return generateChampionArchetypes(activeBuild, totalMatches, champion, role)
  }, [activeBuild, totalMatches, champion, role])

  const [selectedArchetype, setSelectedArchetype] = useState(archetypes[0]?.id ?? 'ap')
  const [activeRunePreset, setActiveRunePreset] = useState<PresetKey>('mostPopular')

  const currentArchetypeId = archetypes.some((a) => a.id === selectedArchetype)
    ? selectedArchetype
    : (archetypes[0]?.id ?? 'ap')

  const currentArchetype = archetypes.find((a) => a.id === currentArchetypeId) ?? archetypes[0]
  const activeItems = currentArchetype?.items ?? activeBuild.items
  const activeSpells = currentArchetype?.spells ?? activeBuild.spells
  const activeRunes =
    currentArchetype?.runes ??
    activeBuild.runes?.[activeRunePreset] ??
    activeBuild.runes?.mostPopular

  const handleArchetypeSelect = (id: string) => {
    setSelectedArchetype(id)
    if (id === archetypes[0]?.id) {
      setActiveRunePreset('mostPopular')
    } else if (id === archetypes[1]?.id) {
      setActiveRunePreset('highestWinRate')
    }
  }

  const handleRunePresetChange = (preset: PresetKey) => {
    setActiveRunePreset(preset)
    if (preset === 'mostPopular') {
      setSelectedArchetype(archetypes[0]?.id ?? 'ap')
    } else if (preset === 'highestWinRate') {
      setSelectedArchetype(archetypes[1]?.id ?? 'utility')
    }
  }

  const selectedKeystoneId =
    currentArchetype?.runes?.keystoneId ??
    (currentArchetypeId === archetypes[1]?.id
      ? activeBuild.runes?.highestWinRate?.keystoneId
      : activeBuild.runes?.mostPopular?.keystoneId)

  const handleOpenPreview = (data: FloatingCardData) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setPreviewData(data)
  }

  const handleClosePreview = (delay = 100) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
    }
    closeTimerRef.current = setTimeout(() => {
      setPreviewData(null)
      closeTimerRef.current = null
    }, delay)
  }

  const handleCancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    }
  }, [])

  return (
    <div className="space-y-5 select-none relative font-sans">
      {/* FLOATING PREVIEW CARD (Rune & Item intro, guide, stats) */}
      <FloatingPreviewCard
        data={previewData}
        onClose={() => {
          handleCancelClose()
          setPreviewData(null)
        }}
        onMouseEnter={handleCancelClose}
      />

      {/* ── 1. UNIFIED MAIN BUILD CANVAS (BLITZ.GG ARCHITECTURE) ── */}
      <div className="relative rounded-2xl border border-zinc-800/80 bg-[#0d0f17]/95 p-3.5 sm:p-4.5 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Ambient background champion splash art */}
        {splashUrl && (
          <div
            className="absolute inset-0 opacity-[0.06] bg-cover bg-center pointer-events-none filter blur-[1px]"
            style={{ backgroundImage: `url(${splashUrl})` }}
          />
        )}

        {/* 3-Column Grid: Sidebars shrunk slightly, Middle Runes expanded */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.8fr)_minmax(0,5.4fr)_minmax(0,2.8fr)] gap-3.5 lg:gap-4 relative z-10 items-stretch">
          {/* ── COLUMN 1: SIDEBAR (ARCHETYPES, OTP & PRO BUILDS FEED) ── */}
          <div className="min-w-0 flex flex-col space-y-3 h-full">
            <ArchetypeSelector
              archetypes={archetypes}
              selectedId={currentArchetypeId}
              onSelect={handleArchetypeSelect}
            />
            <OtpBuildsCard
              championName={championName}
              coreItemIds={activeItems?.core?.[0]?.itemIds}
              keystoneId={selectedKeystoneId}
              secondaryStyleId={
                currentArchetype?.runes?.subStyleId ??
                activeRunes?.subStyleId
              }
            />
            <ProBuildsCard championName={championName} />
          </div>

          {/* ── COLUMN 2: RUNES & INTEGRATED SKILL MATRIX (EXPANDED CENTER) ── */}
          <div className="min-w-0 space-y-3.5 self-start">
            <RuneTreeVisual
              runes={activeBuild.runes}
              activeSetup={activeRunes}
              splashUrl={splashUrl}
              activePreset={activeRunePreset}
              onPresetChange={handleRunePresetChange}
              onSelectPreview={handleOpenPreview}
              onClosePreview={() => handleClosePreview(100)}
            />
            <SkillOrderMatrix
              skills={activeBuild.skills}
              abilities={activeBuild.abilities}
            />
          </div>

          {/* ── COLUMN 3: SUMMONERS & SEQUENTIAL ITEMS ── */}
          <div className="min-w-0 flex flex-col h-full">
            <ItemBuildPath
              items={activeItems}
              spells={activeSpells}
              championName={championName}
              role={backendRole}
              onSelectPreview={handleOpenPreview}
              onClosePreview={() => handleClosePreview(100)}
            />
          </div>
        </div>
      </div>

      {/* ── 2. CHAMPION BUILD GUIDE SUMMARY ── */}
      <ChampionBuildGuideCard
        champion={champion}
        championName={championName}
        role={role}
        buildData={activeBuild}
      />

      {/* ── 3. KEY INSIGHTS, STRENGTHS & WEAKNESSES ── */}
      <ChampionInsightsCard
        championName={championName}
        insights={activeBuild.insights}
        abilities={activeBuild.abilities}
      />

      {/* ── 4. SIMILAR CHAMPIONS & MATCHUPS ── */}
      <SimilarChampionsCard
        championName={championName}
        similarChampions={activeBuild.similarChampions}
      />
    </div>
  )
}
