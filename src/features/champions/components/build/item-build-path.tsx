import { useState } from 'react'
import { getItemIconUrl, getSpellIconUrl, getItemName } from '../../data/ddragon-ids'
import type { ChampionItems, SpellPair, BuildRole } from '../../types/champion-build'
import { Shield, Sword, Package, Star } from 'lucide-react'
import type { FloatingCardData } from './floating-preview-card'
import { getItemPreviewData } from '../../utils/preview-data'

const DDRAGON_VERSION = '14.24.1'

interface ItemBuildPathProps {
  items: ChampionItems
  spells: SpellPair[]
  championName?: string
  role?: BuildRole
  onSelectPreview?: (data: FloatingCardData) => void
  onClosePreview?: () => void
}

interface ItemIconProps {
  itemId: number
  size?: string
  showTooltip?: boolean
  onSelectPreview?: (data: FloatingCardData) => void
  onClosePreview?: () => void
}

function ItemIcon({
  itemId,
  size = 'w-10 h-10',
  showTooltip = true,
  onSelectPreview,
  onClosePreview,
}: ItemIconProps) {
  const [err, setErr] = useState(false)
  const url = getItemIconUrl(itemId, DDRAGON_VERSION)
  const itemName = getItemName(itemId, 'en')

  const handleTrigger = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSelectPreview) return
    const rect = e.currentTarget.getBoundingClientRect()
    const data = getItemPreviewData(itemId, rect)
    onSelectPreview(data)
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
      className={`relative group ${size} rounded-md overflow-hidden border border-zinc-700/60 bg-zinc-900 flex-shrink-0 cursor-pointer hover:border-amber-400/80 hover:scale-105 transition-all`}
    >
      {err ? (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-[10px]">
          {itemId}
        </div>
      ) : (
        <img
          src={url}
          alt={itemName}
          className="w-full h-full object-cover"
          onError={() => setErr(true)}
        />
      )}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
          <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-[11px] text-zinc-100 font-bold shadow-2xl">
            {itemName}
          </div>
        </div>
      )}
    </div>
  )
}

function SpellIcon({ spellId }: { spellId: number }) {
  const [err, setErr] = useState(false)
  const url = getSpellIconUrl(spellId, DDRAGON_VERSION)

  return (
    <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-amber-500/40 flex-shrink-0 bg-zinc-900">
      {err ? (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-[10px]">
          {spellId}
        </div>
      ) : (
        <img
          src={url}
          alt={`Spell ${spellId}`}
          className="w-full h-full object-cover"
          onError={() => setErr(true)}
        />
      )}
    </div>
  )
}

export function ItemBuildPath({
  items,
  spells,
  championName,
  onSelectPreview,
  onClosePreview,
}: ItemBuildPathProps) {
  // Best spell combo (most popular = first)
  const bestSpell = spells[0]

  // Determine boot from boots array (first = most popular)
  const bootItemId = items.boots[0]?.itemIds[0]
  const startingIds = items.starting[0]?.itemIds ?? []
  const coreIds = items.core[0]?.itemIds ?? []
  const completedIds = items.completed[0]?.itemIds ?? []
  const buildOrderIds = items.buildOrder ?? []
  const situationalIds = items.situational.flatMap((s) => s.itemIds)
  const trinketId = items.trinkets[0]?.itemIds[0]

  const ALL_BOOT_IDS = new Set([3006, 3009, 3020, 3047, 3111, 3117, 3158, 2422])
  const completedHasBoots =
    completedIds.some((id) => ALL_BOOT_IDS.has(id)) ||
    (bootItemId ? completedIds.includes(bootItemId) : false)
  const shouldRenderSeparateBoot = Boolean(bootItemId && !completedHasBoots && completedIds.length < 6)

  return (
    <div className="bg-[#0E121A] border border-zinc-800/80 rounded-xl p-4 shadow-lg select-none h-full flex flex-col justify-between space-y-3.5">
      {/* ── Top Header ── */}
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 shrink-0">
        <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
          Build Path ({championName || 'Champion'})
        </p>
        <p className="text-[10px] text-zinc-500 font-mono">Patch 26.19</p>
      </div>

      {/* ── Summoner Spells ── */}
      {bestSpell && (
        <div className="space-y-2 shrink-0">
          <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800/60">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
              Summoner Spells
            </p>
            <div className="ml-auto text-[10px] text-zinc-500 font-mono">
              {bestSpell.winRate.toFixed(1)}% WR · {bestSpell.pickRate.toFixed(1)}% Pick
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SpellIcon spellId={bestSpell.spell1Id} />
            <SpellIcon spellId={bestSpell.spell2Id} />
            {/* Secondary spell combo */}
            {spells[1] && (
              <>
                <div className="text-zinc-700 text-xs mx-1">|</div>
                <SpellIcon spellId={spells[1].spell1Id} />
                <SpellIcon spellId={spells[1].spell2Id} />
                <p className="text-[10px] text-zinc-600 ml-1">
                  {spells[1].pickRate.toFixed(1)}%
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Starting Items ── */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800/60">
          <Package className="w-3.5 h-3.5 text-cyan-400" />
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            Starting Items
          </p>
          <div className="ml-auto text-[10px] text-zinc-500 font-mono">
            {items.starting[0]?.winRate.toFixed(1)}% WR
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {startingIds.map((id, idx) => (
            <ItemIcon
              key={`starting-${id}-${idx}`}
              itemId={id}
              onSelectPreview={onSelectPreview}
              onClosePreview={onClosePreview}
            />
          ))}
        </div>
      </div>

      {/* ── Core Build ── */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800/60">
          <Sword className="w-3.5 h-3.5 text-rose-400" />
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            Core Build
          </p>
          <div className="ml-auto text-[10px] text-zinc-500 font-mono">
            {items.core[0]?.winRate.toFixed(1)}% WR
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {coreIds.map((id, idx) => (
            <ItemIcon
              key={`core-${id}-${idx}`}
              itemId={id}
              onSelectPreview={onSelectPreview}
              onClosePreview={onClosePreview}
            />
          ))}
        </div>
      </div>

      {/* ── Build Order ── */}
      {buildOrderIds.length > 0 && (
        <div className="space-y-2 shrink-0">
          <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800/60">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
              Build Order
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {buildOrderIds.map((id, idx) => (
              <div key={`order-wrap-${id}-${idx}`} className="flex items-center gap-1.5">
                <ItemIcon
                  key={`order-${id}-${idx}`}
                  itemId={id}
                  size="w-9 h-9"
                  onSelectPreview={onSelectPreview}
                  onClosePreview={onClosePreview}
                />
                {idx < buildOrderIds.length - 1 && (
                  <div className="text-zinc-700 text-[10px]">›</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Full Build (6 items) ── */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800/60">
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            Full Build
          </p>
          <div className="ml-auto text-[10px] text-zinc-500 font-mono">
            {items.completed[0]?.winRate.toFixed(1)}% WR
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {completedIds.map((id, idx) => (
            <ItemIcon
              key={`completed-${id}-${idx}`}
              itemId={id}
              onSelectPreview={onSelectPreview}
              onClosePreview={onClosePreview}
            />
          ))}
          {shouldRenderSeparateBoot && bootItemId && (
            <ItemIcon
              itemId={bootItemId}
              onSelectPreview={onSelectPreview}
              onClosePreview={onClosePreview}
            />
          )}
          {trinketId && (
            <ItemIcon
              itemId={trinketId}
              onSelectPreview={onSelectPreview}
              onClosePreview={onClosePreview}
            />
          )}
        </div>
      </div>

      {/* ── Boots ── */}
      <div className="space-y-2 shrink-0">
        <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800/60">
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            Boots
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.boots.map((boot, idx) => (
            <div key={`boot-wrap-${idx}`} className="flex items-center gap-1.5">
              {boot.itemIds.map((id, bIdx) => (
                <ItemIcon
                  key={`boot-${id}-${bIdx}`}
                  itemId={id}
                  size="w-9 h-9"
                  onSelectPreview={onSelectPreview}
                  onClosePreview={onClosePreview}
                />
              ))}
              <div className="flex flex-col">
                <p className="text-[10px] text-emerald-400 font-mono font-bold">
                  {boot.winRate.toFixed(1)}% WR
                </p>
                <p className="text-[10px] text-zinc-500 font-mono">
                  {boot.pickRate.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Situational ── */}
      {situationalIds.length > 0 && (
        <div className="space-y-2 shrink-0">
          <div className="flex items-center gap-2 pb-1.5 border-b border-zinc-800/60">
            <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
              Situational
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {situationalIds.map((id, idx) => (
              <ItemIcon
                key={`situational-${id}-${idx}`}
                itemId={id}
                size="w-9 h-9"
                onSelectPreview={onSelectPreview}
                onClosePreview={onClosePreview}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

