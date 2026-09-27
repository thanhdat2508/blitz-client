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
  const [selectedArchetype, setSelectedArchetype] = useState('lethality')
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
    <div className="space-y-4 select-none relative">
      {/* FLOATING PREVIEW CARD (Rune & Item intro, guide, stats) */}
      <FloatingPreviewCard
        data={previewData}
        onClose={() => {
          handleCancelClose()
          setPreviewData(null)
        }}
        onMouseEnter={handleCancelClose}
      />

      {/* 1. 3-COLUMN CHAMPION BUILD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: ARCHETYPES & PRO/OTP BUILDS (Cols 1 to 3) */}
        <div className="lg:col-span-3 space-y-3.5">
          <ArchetypeSelector
            selectedId={selectedArchetype}
            onSelect={setSelectedArchetype}
          />
          <OtpBuildsCard championName={championName} />
          <ProBuildsCard championName={championName} />
        </div>

        {/* CENTER COLUMN: VISUAL RUNE TREE & SKILL PRIORITY MATRIX (Cols 4 to 8) */}
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

        {/* RIGHT COLUMN: SUMMONERS, STARTING & SEQUENTIAL BUILD ORDER (Cols 9 to 12) */}
        <div className="lg:col-span-4 space-y-3.5">
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

      {/* 2. CHAMPION BUILD GUIDE SUMMARY (MATCHING SCREENSHOT 3) */}
      <ChampionBuildGuideCard
        champion={champion}
        championName={championName}
        role={role}
        buildData={activeBuild}
      />

      {/* 3. KEY INSIGHTS, STRENGTHS & WEAKNESSES (MATCHING SCREENSHOTS 2 & 3) */}
      <ChampionInsightsCard
        championName={championName}
        insights={activeBuild.insights}
        abilities={activeBuild.abilities}
      />

      {/* 4. SIMILAR CHAMPIONS (MATCHING SCREENSHOT 2) */}
      <SimilarChampionsCard
        championName={championName}
        similarChampions={activeBuild.similarChampions}
      />
    </div>
  )
}
