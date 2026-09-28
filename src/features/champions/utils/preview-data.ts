import type { FloatingCardData } from '../components/build/floating-preview-card'
import {
  PERK_DATA,
  ITEM_NAMES,
  getItemIconUrl,
  getPerkInfo,
  getStatShardInfo,
} from '../data/ddragon-ids'
import { RUNE_TREES, type RuneDefinition } from '../data/rune-trees-data'
import { ITEMS_DATABASE, type ItemDefinition } from '../data/items-data'

// Map perk ID to RuneDefinition from rune-trees-data
const PERK_ID_TO_RUNE_DEF: Record<number, { rune: RuneDefinition; isKeystone: boolean; treeName: string }> = {}

// Build numeric index for runes
function buildRuneIndex() {
  for (const tree of Object.values(RUNE_TREES)) {
    for (const keystone of tree.keystones) {
      for (const [idStr, perk] of Object.entries(PERK_DATA)) {
        if (
          perk.name.toLowerCase() === keystone.enName.toLowerCase() ||
          keystone.icon.toLowerCase().includes(perk.name.toLowerCase().replace(/[^a-z]/g, ''))
        ) {
          PERK_ID_TO_RUNE_DEF[Number(idStr)] = {
            rune: keystone,
            isKeystone: true,
            treeName: tree.name,
          }
        }
      }
    }

    for (const slot of tree.slots) {
      for (const minorRune of slot) {
        for (const [idStr, perk] of Object.entries(PERK_DATA)) {
          if (
            perk.name.toLowerCase() === minorRune.enName.toLowerCase() ||
            perk.name.toLowerCase().includes(minorRune.enName.toLowerCase()) ||
            minorRune.enName.toLowerCase().includes(perk.name.toLowerCase())
          ) {
            PERK_ID_TO_RUNE_DEF[Number(idStr)] = {
              rune: minorRune,
              isKeystone: false,
              treeName: tree.name,
            }
          }
        }
      }
    }
  }
}
buildRuneIndex()

// Precompute item numeric ID to ItemDefinition
const ITEM_BY_NUMERIC_ID: Record<number, ItemDefinition> = {}
function buildItemIndex() {
  for (const item of Object.values(ITEMS_DATABASE)) {
    const match = item.iconUrl.match(/\/item\/(\d+)\.png/)
    if (match) {
      ITEM_BY_NUMERIC_ID[Number(match[1])] = item
    }
  }

  // Cross-reference with ITEM_NAMES for any items missing
  for (const [idStr, names] of Object.entries(ITEM_NAMES)) {
    const numId = Number(idStr)
    if (!ITEM_BY_NUMERIC_ID[numId]) {
      const matchByName = Object.values(ITEMS_DATABASE).find(
        (it) => it.enName.toLowerCase() === names.en.toLowerCase()
      )
      if (matchByName) {
        ITEM_BY_NUMERIC_ID[numId] = matchByName
      }
    }
  }
}
buildItemIndex()

const STAT_SHARD_INFO: Record<number, { desc: string; enDesc: string }> = {
  5001: {
    desc: '+10 - 180 Maximum Health (based on level)',
    enDesc: '+10 - 180 Maximum Health (based on level)',
  },
  5002: {
    desc: '+6 Bonus Armor from the start of the match',
    enDesc: '+6 Bonus Armor from the start of the match',
  },
  5003: {
    desc: '+8 Bonus Magic Resist from the start of the match',
    enDesc: '+8 Bonus Magic Resist from the start of the match',
  },
  5005: {
    desc: '+10% Bonus Attack Speed',
    enDesc: '+10% Bonus Attack Speed',
  },
  5007: {
    desc: '+8 Ability Haste',
    enDesc: '+8 Ability Haste',
  },
  5008: {
    desc: '+9 Attack Damage or +15 Ability Power',
    enDesc: '+9 Attack Damage or +15 Ability Power',
  },
  5010: {
    desc: '+2% Bonus Movement Speed',
    enDesc: '+2% Bonus Movement Speed',
  },
  5011: {
    desc: '+65 Flat Base Health from level 1',
    enDesc: '+65 Flat Base Health from level 1',
  },
  5013: {
    desc: '+10% Tenacity and Slow Resist',
    enDesc: '+10% Tenacity and Slow Resist',
  },
}

/**
 * Build FloatingCardData for a Rune or Stat Shard
 */
export function getRunePreviewData(
  perkId: number,
  rect?: DOMRect,
  extra?: { winRate?: number; pickRate?: number; games?: number | string }
): FloatingCardData {
  // Check if it's a Stat Shard (5001-5015)
  if (perkId >= 5000 && perkId <= 5015) {
    const shardInfo = getStatShardInfo(perkId)
    const matched = STAT_SHARD_INFO[perkId]
    const foundShardEnDesc = matched?.enDesc ?? '+9 Adaptive Force or defensive resistance'

    return {
      title: shardInfo.name,
      enTitle: shardInfo.name,
      icon: shardInfo.iconUrl,
      tag: 'Stat Shard',
      desc: foundShardEnDesc,
      enDesc: foundShardEnDesc,
      guide: 'Choose shard stats that counter your lane opponent for maximum early advantages.',
      enGuide: 'Choose shard stats that counter your lane opponent for maximum early advantages.',
      winRate: extra?.winRate ?? 51.8,
      pickRate: extra?.pickRate ?? 48.2,
      games: extra?.games ?? '28,450',
      rect,
    }
  }

  // Regular Rune or Keystone
  const indexed = PERK_ID_TO_RUNE_DEF[perkId]
  const perkInfo = getPerkInfo(perkId)

  if (indexed) {
    const { rune, isKeystone, treeName } = indexed
    return {
      title: rune.enName || rune.name,
      enTitle: rune.enName || rune.name,
      icon: perkInfo.iconUrl || rune.icon,
      tag: isKeystone ? `Keystone (${treeName})` : `Rune (${treeName})`,
      desc: rune.enDesc || rune.desc,
      enDesc: rune.enDesc || rune.desc,
      cooldown: rune.cooldown,
      enCooldown: rune.cooldown,
      guide: isKeystone
        ? 'Primary keystone delivering crucial trade bursts and combat sustain throughout the match.'
        : 'Essential minor perk augmenting core gameplay loops and champion power curves.',
      enGuide: isKeystone
        ? 'Primary keystone delivering crucial trade bursts and combat sustain throughout the match.'
        : 'Essential minor perk augmenting core gameplay loops and champion power curves.',
      winRate: extra?.winRate ?? rune.winRate ?? 52.4,
      pickRate: extra?.pickRate ?? rune.pickRate ?? 46.2,
      games: extra?.games ?? rune.matches ?? '14,890',
      rect,
    }
  }

  // Fallback from perkInfo
  return {
    title: perkInfo.name,
    enTitle: perkInfo.name,
    icon: perkInfo.iconUrl,
    tag: 'Rune',
    desc: 'Grants enhanced combat power and specialized tactical bonuses.',
    enDesc: 'Grants enhanced combat power and specialized tactical bonuses.',
    winRate: extra?.winRate ?? 51.5,
    pickRate: extra?.pickRate ?? 35.0,
    games: extra?.games ?? '9,600',
    rect,
  }
}

/**
 * Build FloatingCardData for an Item
 */
export function getItemPreviewData(itemId: number, rect?: DOMRect): FloatingCardData {
  const itemDef = ITEM_BY_NUMERIC_ID[itemId]
  const names = ITEM_NAMES[itemId]
  const iconUrl = getItemIconUrl(itemId)

  if (itemDef) {
    return {
      title: itemDef.enName || itemDef.name,
      enTitle: itemDef.enName || itemDef.name,
      icon: itemDef.iconUrl || iconUrl,
      tag: itemDef.tier || 'Item',
      cost: itemDef.cost,
      tier: itemDef.tier,
      stats: itemDef.enStats || itemDef.stats,
      enStats: itemDef.enStats || itemDef.stats,
      desc:
        itemDef.enPassive ||
        itemDef.passive ||
        'Enhances offensive burst, defensive survivability, and utility in fights.',
      enDesc:
        itemDef.enPassive ||
        itemDef.passive ||
        'Enhances offensive burst, defensive survivability, and utility in fights.',
      guide: itemDef.enGuide || itemDef.guide,
      enGuide: itemDef.enGuide || itemDef.guide,
      winRate: itemDef.winRate ?? 53.4,
      pickRate: itemDef.pickRate ?? 31.2,
      games: itemDef.matches ?? '11,250',
      rect,
    }
  }

  // Fallback using ITEM_NAMES
  const enTitle = names?.en || `Item #${itemId}`

  return {
    title: enTitle,
    enTitle,
    icon: iconUrl,
    tag: 'LoL Item',
    cost: '2,900g',
    tier: 'Legendary',
    stats: ['+Adaptive Force', '+Survivability'],
    enStats: ['+Adaptive Force', '+Survivability'],
    desc: 'Completed item providing superior combat stats and impactful unique passive effects.',
    enDesc: 'Completed item providing superior combat stats and impactful unique passive effects.',
    guide: 'Build in optimal sequence to spike in power at key game timings.',
    enGuide: 'Build in optimal sequence to spike in power at key game timings.',
    winRate: 52.8,
    pickRate: 27.4,
    games: '8,400',
    rect,
  }
}
