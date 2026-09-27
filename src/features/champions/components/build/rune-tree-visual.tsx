import { useState } from 'react'
import type { ChampionRunes, RuneSetupBackend, StatShardOption } from '../../types/champion-build'
import {
  getPerkInfo,
  getStatShardInfo,
  RUNE_STYLE_ICON,
  RUNE_STYLE_NAME,
} from '../../data/ddragon-ids'
import { Trophy, Sparkles, Star } from 'lucide-react'
import type { FloatingCardData } from './floating-preview-card'
import { getRunePreviewData } from '../../utils/preview-data'

export const STYLE_PERK_STRUCTURE: Record<
  number,
  {
    keystones: number[]
    slots: [number[], number[], number[]]
  }
> = {
  8000: {
    // Precision
    keystones: [8005, 8008, 8021, 8010],
    slots: [
      [9101, 9111, 8009],
      [9104, 9105, 9103],
      [8014, 8017, 8299],
    ],
  },
  8100: {
    // Domination
    keystones: [8112, 8124, 8128, 9923],
    slots: [
      [8126, 8139, 8143],
      [8136, 8120, 8138],
      [8134, 8105, 8106],
    ],
  },
  8200: {
    // Sorcery
    keystones: [8214, 8229, 8230],
    slots: [
      [8224, 8226, 8275],
      [8210, 8234, 8233],
      [8237, 8232, 8236],
    ],
  },
  8400: {
    // Resolve
    keystones: [8437, 8439, 8465],
    slots: [
      [8446, 8463, 8401],
      [8429, 8444, 8473],
      [8451, 8453, 8242],
    ],
  },
  8300: {
    // Inspiration
    keystones: [8351, 8360, 8369],
    slots: [
      [8306, 8304, 8313],
      [8321, 8316, 8345],
      [8347, 8410, 9422],
    ],
  },
}

interface RuneTreeVisualProps {
  runes: ChampionRunes
  splashUrl?: string
  onSelectPreview?: (data: FloatingCardData) => void
  onClosePreview?: () => void
}

type PresetKey = 'mostPopular' | 'highestWinRate'

interface RuneCircleProps {
  perkId: number
  isActive: boolean
  isKeystone?: boolean
  activeColor?: string
  onSelectPreview?: (data: FloatingCardData) => void
  onClosePreview?: () => void
  winRate?: number
  pickRate?: number
}

function RuneCircle({
  perkId,
  isActive,
  isKeystone = false,
  activeColor = '#C89B3C',
  onSelectPreview,
  onClosePreview,
  winRate,
  pickRate,
}: RuneCircleProps) {
  const perk = getPerkInfo(perkId)

  const handleTrigger = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSelectPreview) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cardData = getRunePreviewData(perkId, rect, { winRate, pickRate })
    onSelectPreview(cardData)
  }

  const handleMouseLeave = () => {
    if (onClosePreview) {
      onClosePreview()
    }
  }

  if (isKeystone) {
    return (
      <div
        onClick={handleTrigger}
        onMouseEnter={handleTrigger}
        onMouseLeave={handleMouseLeave}
        title={perk.name}
        className={`relative cursor-pointer transition-all duration-200 rounded-full flex items-center justify-center ${
          isActive
            ? 'scale-105 z-10'
            : 'opacity-30 grayscale hover:opacity-85 hover:grayscale-0 hover:scale-105'
        }`}
      >
        <div
          className={`w-12 h-12 sm:w-13 sm:h-13 rounded-full p-0.5 transition-all ${
            isActive
              ? 'border-2 shadow-lg ring-2 ring-offset-2 ring-offset-zinc-950'
              : 'border border-zinc-700/60'
          }`}
          style={{
            borderColor: isActive ? activeColor : undefined,
            boxShadow: isActive ? `0 0 14px ${activeColor}55` : undefined,
          }}
        >
          <img
            src={perk.iconUrl}
            alt={perk.name}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.opacity = '0.4'
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={handleTrigger}
      onMouseEnter={handleTrigger}
      onMouseLeave={handleMouseLeave}
      title={perk.name}
      className={`relative cursor-pointer transition-all duration-200 rounded-full flex items-center justify-center ${
        isActive
          ? 'scale-105 z-10'
          : 'opacity-30 grayscale hover:opacity-85 hover:grayscale-0 hover:scale-105'
      }`}
    >
      <div
        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full p-0.5 transition-all ${
          isActive
            ? 'border-2 shadow-md ring-1 ring-offset-1 ring-offset-zinc-950'
            : 'border border-zinc-800'
        }`}
        style={{
          borderColor: isActive ? activeColor : undefined,
          boxShadow: isActive ? `0 0 10px ${activeColor}40` : undefined,
        }}
      >
        <img
          src={perk.iconUrl}
          alt={perk.name}
          className="w-full h-full rounded-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.opacity = '0.4'
          }}
        />
      </div>
    </div>
  )
}

interface StatShardCircleProps {
  option: StatShardOption
  onSelectPreview?: (data: FloatingCardData) => void
  onClosePreview?: () => void
}

function StatShardCircle({
  option,
  onSelectPreview,
  onClosePreview,
}: StatShardCircleProps) {
  const shardInfo = getStatShardInfo(option.id)
  const displayName = option.name || shardInfo.name
  const iconUrl = option.iconUrl || shardInfo.iconUrl

  const handleTrigger = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSelectPreview) return
    const rect = e.currentTarget.getBoundingClientRect()
    const cardData = getRunePreviewData(option.id, rect)
    onSelectPreview(cardData)
  }

  const handleMouseLeave = () => {
    if (onClosePreview) {
      onClosePreview()
    }
  }

  return (
    <div
      onClick={handleTrigger}
      onMouseEnter={handleTrigger}
      onMouseLeave={handleMouseLeave}
      title={`${displayName}${option.description ? `: ${option.description}` : ''}`}
      className={`relative cursor-pointer transition-all duration-200 rounded-full flex items-center justify-center ${
        option.isSelected
          ? 'scale-105 z-10'
          : 'opacity-35 grayscale hover:opacity-90 hover:grayscale-0 hover:scale-105'
      }`}
    >
      <div
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center p-1.5 transition-all ${
          option.isSelected
            ? 'border-2 border-[#00C8FF] ring-2 ring-[#00C8FF]/40 bg-[#0E121A] shadow-[0_0_14px_rgba(0,200,255,0.45)]'
            : 'border border-zinc-800/80 bg-zinc-950/80 hover:border-zinc-600'
        }`}
      >
        <img
          src={iconUrl}
          alt={displayName}
          className={`w-full h-full object-contain ${
            option.isSelected ? 'filter drop-shadow-[0_0_4px_rgba(0,200,255,0.5)]' : ''
          }`}
          onError={(e) => {
            ;(e.target as HTMLImageElement).style.opacity = '0.3'
          }}
        />
      </div>
    </div>
  )
}

function BlitzRuneTreeGrid({
  setup,
  onSelectPreview,
  onClosePreview,
}: {
  setup: RuneSetupBackend
  onSelectPreview?: (data: FloatingCardData) => void
  onClosePreview?: () => void
}) {
  const primaryStyle = RUNE_STYLE_NAME[setup.primaryStyleId]
  const subStyle = RUNE_STYLE_NAME[setup.subStyleId]

  const primaryIcon = RUNE_STYLE_ICON[setup.primaryStyleId] ?? ''
  const subIcon = RUNE_STYLE_ICON[setup.subStyleId] ?? ''

  const primaryStruct = STYLE_PERK_STRUCTURE[setup.primaryStyleId] ?? STYLE_PERK_STRUCTURE[8000]
  const subStruct = STYLE_PERK_STRUCTURE[setup.subStyleId] ?? STYLE_PERK_STRUCTURE[8400]

  const primaryName = primaryStyle?.en || 'Primary'
  const subName = subStyle?.en || 'Secondary'

  // Season 14 3x3 Stat Shards Matrix from backend API with fallback
  const shardRows = setup.statShards?.rows && setup.statShards.rows.length === 3
    ? setup.statShards.rows
    : [
        {
          row: 1,
          type: 'offense' as const,
          selectedId: setup.statShards.offense,
          options: [5008, 5005, 5007].map((id) => ({
            id,
            code: '',
            name: '',
            description: '',
            iconUrl: '',
            isSelected: id === setup.statShards.offense,
          })),
        },
        {
          row: 2,
          type: 'flex' as const,
          selectedId: setup.statShards.flex,
          options: [5008, 5010, 5001].map((id) => ({
            id,
            code: '',
            name: '',
            description: '',
            iconUrl: '',
            isSelected: id === setup.statShards.flex,
          })),
        },
        {
          row: 3,
          type: 'defense' as const,
          selectedId: setup.statShards.defense,
          options: [5011, 5013, 5001].map((id) => ({
            id,
            code: '',
            name: '',
            description: '',
            iconUrl: '',
            isSelected: id === setup.statShards.defense,
          })),
        },
      ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pt-1">
      {/* ── LEFT COLUMN: PRIMARY TREE ── */}
      <div className="space-y-4 bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3.5">
        {/* Style Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/70">
          <img
            src={primaryIcon}
            alt={primaryName ?? 'Primary'}
            className="w-5 h-5 object-contain"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <p
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: primaryStyle?.color ?? '#C89B3C' }}
          >
            {primaryName ?? 'Primary Tree'}
          </p>
        </div>

        {/* Keystones Row */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
          {primaryStruct.keystones.map((kId) => (
            <RuneCircle
              key={kId}
              perkId={kId}
              isKeystone
              isActive={kId === setup.keystoneId}
              activeColor={primaryStyle?.color ?? '#C89B3C'}
              onSelectPreview={onSelectPreview}
              onClosePreview={onClosePreview}
              winRate={setup.winRate}
              pickRate={setup.pickRate}
            />
          ))}
        </div>

        {/* Primary Minor Tiers (3 rows) */}
        <div className="space-y-3 pt-1">
          {primaryStruct.slots.map((slot, rowIdx) => (
            <div
              key={rowIdx}
              className="flex items-center justify-center gap-3 sm:gap-4 py-0.5"
            >
              {slot.map((perkId) => (
                <RuneCircle
                  key={perkId}
                  perkId={perkId}
                  isActive={setup.selectedPerkIds.includes(perkId)}
                  activeColor={primaryStyle?.color ?? '#C89B3C'}
                  onSelectPreview={onSelectPreview}
                  onClosePreview={onClosePreview}
                  winRate={setup.winRate}
                  pickRate={setup.pickRate}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT COLUMN: SECONDARY TREE & STAT SHARDS ── */}
      <div className="space-y-4 bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-3.5">
        {/* Secondary Style Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-zinc-800/70">
          <img
            src={subIcon}
            alt={subName ?? 'Secondary'}
            className="w-5 h-5 object-contain"
            onError={(e) => {
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <p
            className="text-xs font-black uppercase tracking-wider"
            style={{ color: subStyle?.color ?? '#6CAE3B' }}
          >
            {subName ?? 'Secondary Tree'}
          </p>
        </div>

        {/* Secondary Minor Tiers (3 rows) */}
        <div className="space-y-2.5">
          {subStruct.slots.map((slot, rowIdx) => (
            <div
              key={rowIdx}
              className="flex items-center justify-center gap-3 sm:gap-4 py-0.5"
            >
              {slot.map((perkId) => (
                <RuneCircle
                  key={perkId}
                  perkId={perkId}
                  isActive={setup.subPerkIds.includes(perkId)}
                  activeColor={subStyle?.color ?? '#6CAE3B'}
                  onSelectPreview={onSelectPreview}
                  onClosePreview={onClosePreview}
                  winRate={setup.winRate}
                  pickRate={setup.pickRate}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Divider / Stat Shards Section (Season 14 3x3 Grid matching Screenshot 1) */}
        <div className="pt-3 border-t border-zinc-800/70 space-y-2.5">
          <p className="text-xs font-black uppercase tracking-wider text-cyan-400 text-center">
            STAT SHARDS
          </p>

          <div className="space-y-2">
            {shardRows.map((row) => (
              <div
                key={`shard-row-${row.row}`}
                className="flex items-center justify-center gap-4 sm:gap-5 py-0.5"
              >
                {row.options.map((opt, idx) => (
                  <StatShardCircle
                    key={`shard-${row.row}-${opt.id}-${idx}`}
                    option={opt}
                    onSelectPreview={onSelectPreview}
                    onClosePreview={onClosePreview}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function RuneTreeVisual({
  runes,
  splashUrl,
  onSelectPreview,
  onClosePreview,
}: RuneTreeVisualProps) {
  const [activePreset, setActivePreset] = useState<PresetKey>('mostPopular')

  const currentRunes = runes[activePreset]

  const presets: {
    key: PresetKey
    label: string
    icon: React.ReactNode
    winRate: number
    pickRate: number
  }[] = [
    {
      key: 'mostPopular',
      label: 'Most Popular',
      icon: <Trophy className="w-3 h-3" />,
      winRate: runes.mostPopular.winRate,
      pickRate: runes.mostPopular.pickRate,
    },
    {
      key: 'highestWinRate',
      label: 'Highest Win Rate',
      icon: <Star className="w-3 h-3" />,
      winRate: runes.highestWinRate.winRate,
      pickRate: runes.highestWinRate.pickRate,
    },
  ]

  const primaryStyle = RUNE_STYLE_NAME[currentRunes.primaryStyleId]
  const subStyle = RUNE_STYLE_NAME[currentRunes.subStyleId]

  const primaryName = primaryStyle?.en || 'Primary'
  const subName = subStyle?.en || 'Secondary'

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0E121A] border border-zinc-800/80 p-4 sm:p-5 select-none shadow-2xl space-y-4">
      {/* Background Splash Watermark */}
      {splashUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none filter blur-sm"
          style={{ backgroundImage: `url(${splashUrl})` }}
        />
      )}

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <p className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Runes
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 text-xs">
          <div className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 font-extrabold text-[10px]">
            {currentRunes.winRate.toFixed(1)}% WR
          </div>
          <p className="text-[10px] text-zinc-500 font-mono">
            {currentRunes.pickRate.toFixed(1)}% Pick
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="relative z-10 flex gap-2">
        {presets.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => setActivePreset(preset.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activePreset === preset.key
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : 'bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
            }`}
          >
            {preset.icon}
            {preset.label}
          </button>
        ))}
      </div>

      {/* Rune Tree Style Banner */}
      <div className="relative z-10 flex items-center gap-2 pb-1">
        <div
          className="w-1.5 h-5 rounded-full"
          style={{ backgroundColor: primaryStyle?.color ?? '#C89B3C' }}
        />
        <p
          className="text-xs font-black tracking-wide"
          style={{ color: primaryStyle?.color ?? '#C89B3C' }}
        >
          {primaryName ?? 'Primary Tree'}
        </p>
        <p className="text-zinc-600 text-xs">›</p>
        <p
          className="text-xs font-semibold"
          style={{ color: subStyle?.color ?? '#6CAE3B' }}
        >
          {subName ?? 'Secondary Tree'}
        </p>
      </div>

      {/* Authentic Blitz.gg 2-Column Grid */}
      <BlitzRuneTreeGrid
        setup={currentRunes}
        onSelectPreview={onSelectPreview}
        onClosePreview={onClosePreview}
      />
    </div>
  )
}
