import { useState, useRef } from 'react'
import type { ChampionBuildPayload, BuildRole } from '../../types/champion-build'
import type { ChampionMeta, Role } from '../../types/champion'
import { RuneTreeVisual } from '../build/rune-tree-visual'
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
  const [selectedArchetype, setSelectedArchetype] = useState('ap')
  const [previewData, setPreviewData] = useState<FloatingCardData | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const activeBuild = buildData || DEFAULT_BUILD_PAYLOAD

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
      <div className="relative rounded-2xl border border-zinc-800/80 bg-[#0d0f17]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md overflow-hidden">
        {/* Ambient background champion splash art */}
        {splashUrl && (
          <div
            className="absolute inset-0 opacity-[0.06] bg-cover bg-center pointer-events-none filter blur-[1px]"
            style={{ backgroundImage: `url(${splashUrl})` }}
          />
        )}

        {/* 3-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10 items-start">
          {/* ── COLUMN 1: SIDEBAR (ARCHETYPES, OTP & PRO BUILDS FEED) - Cols 1 to 3 ── */}
          <div className="lg:col-span-3 space-y-3">
            <ArchetypeSelector
              selectedId={selectedArchetype}
              onSelect={setSelectedArchetype}
            />
            <OtpBuildsCard
              championName={championName}
              coreItemIds={activeBuild.items?.core?.[0]?.itemIds}
            />
            <ProBuildsCard championName={championName} />
          </div>

          {/* ── COLUMN 2: RUNES & INTEGRATED SKILL MATRIX - Cols 4 to 8 ── */}
          <div className="lg:col-span-5 space-y-3.5">
            <RuneTreeVisual
              runes={activeBuild.runes}
              splashUrl={splashUrl}
              onSelectPreview={handleOpenPreview}
              onClosePreview={() => handleClosePreview(100)}
            />
            <SkillOrderMatrix
              skills={activeBuild.skills}
              abilities={activeBuild.abilities}
            />
          </div>

          {/* ── COLUMN 3: SUMMONERS & SEQUENTIAL ITEMS - Cols 9 to 12 ── */}
          <div className="lg:col-span-4 space-y-3">
            <ItemBuildPath
              items={activeBuild.items}
              spells={activeBuild.spells}
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
