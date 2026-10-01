import type {
  ChampionBuildPayload,
  ChampionItems,
  SpellPair,
  RuneSetupBackend,
} from '../types/champion-build'
import type { ChampionMeta, Role } from '../types/champion'
import type { Archetype } from '../components/build/archetype-selector'
import { getPerkInfo, RUNE_STYLE_ICON, RUNE_STYLE_NAME } from '../data/ddragon-ids'
import {
  CLASS_NAMES,
  CLASS_ITEM_PRESETS,
  CLASS_RUNE_PRESETS,
  type ArchetypeBuildPreset,
  type ArchetypeRunePreset,
} from '../data/archetype-presets'

function createArchetypeItems(
  preset: ArchetypeBuildPreset,
  winRate: number
): { items: ChampionItems; spells: SpellPair[] } {
  const items: ChampionItems = {
    starting: [{ itemIds: preset.starting, winRate: Number(winRate.toFixed(1)), pickRate: 75.0, gamesPlayed: 10000 }],
    early: [{ itemIds: [preset.buildOrder[0] || preset.core[0], preset.boots[0]], winRate: Number(winRate.toFixed(1)), pickRate: 65.0, gamesPlayed: 9000 }],
    core: [{ itemIds: preset.core, winRate: Number((winRate + 1.2).toFixed(1)), pickRate: 58.0, gamesPlayed: 8000 }],
    completed: [{ itemIds: preset.fullBuild, winRate: Number((winRate + 4.5).toFixed(1)), pickRate: 35.0, gamesPlayed: 4500 }],
    buildOrder: preset.buildOrder,
    boots: [{ itemIds: preset.boots, winRate: Number(winRate.toFixed(1)), pickRate: 85.0, gamesPlayed: 11000 }],
    situational: [{ itemIds: preset.fullBuild.slice(-3), winRate: Number(winRate.toFixed(1)), pickRate: 40.0, gamesPlayed: 5500 }],
    trinkets: [{ itemIds: [3340], winRate: Number(winRate.toFixed(1)), pickRate: 90.0, gamesPlayed: 12000 }],
  }

  const spells: SpellPair[] = [
    { spell1Id: preset.spells[0], spell2Id: preset.spells[1], winRate: Number((winRate + 0.8).toFixed(1)), pickRate: 68.0 },
    { spell1Id: preset.spells[0], spell2Id: preset.spells[1] === 12 ? 14 : 12, winRate: Number(winRate.toFixed(1)), pickRate: 32.0 },
  ]

  return { items, spells }
}

function createRuneSetup(
  preset: ArchetypeRunePreset,
  winRate: number,
  pickRate: number
): RuneSetupBackend {
  const primaryName = RUNE_STYLE_NAME[preset.primaryStyleId]?.en || preset.primaryStyleName
  const subName = RUNE_STYLE_NAME[preset.subStyleId]?.en || preset.subStyleName

  return {
    primaryStyleId: preset.primaryStyleId,
    primaryStyleName: primaryName,
    keystoneId: preset.keystoneId,
    selectedPerkIds: preset.selectedPerkIds,
    subStyleId: preset.subStyleId,
    subStyleName: subName,
    subPerkIds: preset.subPerkIds,
    statShards: {
      offense: preset.statShards?.offense ?? 5008,
      flex: preset.statShards?.flex ?? 5008,
      defense: preset.statShards?.defense ?? 5001,
      slots: [
        preset.statShards?.offense ?? 5008,
        preset.statShards?.flex ?? 5008,
        preset.statShards?.defense ?? 5001,
      ],
    },
    winRate,
    pickRate,
  }
}

export function generateChampionArchetypes(
  buildData: ChampionBuildPayload | null | undefined,
  totalMatches: number,
  champion?: ChampionMeta,
  role?: Role
): Archetype[] {
  const games = totalMatches > 0 ? totalMatches : 15000

  // 1. Determine Champion Class & Damage Profile
  const currentRole = role ?? champion?.primaryRole
  const primaryClass =
    buildData?.overview?.primaryClass ||
    (currentRole === 'ADC' || champion?.roles?.includes('ADC')
      ? 'Marksman'
      : currentRole === 'SUPPORT' || champion?.roles?.includes('SUPPORT')
        ? 'Support'
        : currentRole === 'TOP' || champion?.roles?.includes('TOP')
          ? 'Fighter'
          : currentRole === 'JUNGLE' || champion?.roles?.includes('JUNGLE')
            ? 'Assassin'
            : 'Mage')

  const magicDamage = buildData?.damageBreakdown?.magic ?? (primaryClass === 'Mage' ? 80 : 20)
  const isApDominated = magicDamage >= 50 || primaryClass === 'Mage'

  const classKey = isApDominated ? 'Mage' : primaryClass in CLASS_NAMES ? primaryClass : 'Fighter'
  const names = CLASS_NAMES[classKey] || CLASS_NAMES.Mage
  const itemPresets = CLASS_ITEM_PRESETS[classKey] || CLASS_ITEM_PRESETS.Mage
  const runePresets = CLASS_RUNE_PRESETS[classKey] || CLASS_RUNE_PRESETS.Marksman

  // 2. Pick rates & matches calculation
  const rawPick1 = buildData?.runes?.mostPopular?.pickRate ?? 65.0
  const rawPick2 = buildData?.runes?.highestWinRate?.pickRate ?? 24.5

  const pickRate1 = Math.min(78, Math.max(50, Number(rawPick1.toFixed(1))))
  const pickRate2 = Math.min(35, Math.max(15, Number(rawPick2.toFixed(1))))
  const pickRate3 = Math.max(5, Number((100 - pickRate1 - pickRate2).toFixed(1)))

  const matches1 = Math.round(games * (pickRate1 / 100))
  const matches2 = Math.round(games * (pickRate2 / 100))
  const matches3 = Math.max(0, games - matches1 - matches2)

  // 3. Win rates calculation
  const winRate1 = buildData?.runes?.mostPopular?.winRate ?? buildData?.overview?.winRate ?? 52.4
  const winRate2 =
    buildData?.runes?.highestWinRate?.winRate ?? Number((winRate1 + 1.6).toFixed(1))
  const winRate3 = Number((Math.min(winRate1, winRate2) - 0.9).toFixed(1))

  // 4. Distinct Runes Generation: ensure no duplicates across archetypes
  const runes1: RuneSetupBackend =
    buildData?.runes?.mostPopular && buildData.runes.mostPopular.selectedPerkIds?.length >= 3
      ? buildData.runes.mostPopular
      : createRuneSetup(runePresets[0], winRate1, pickRate1)

  const isSetup2Duplicate = Boolean(
    buildData?.runes?.highestWinRate &&
      buildData.runes.highestWinRate.keystoneId === runes1.keystoneId &&
      buildData.runes.highestWinRate.subStyleId === runes1.subStyleId
  )

  const runes2: RuneSetupBackend =
    buildData?.runes?.highestWinRate &&
    buildData.runes.highestWinRate.selectedPerkIds?.length >= 3 &&
    !isSetup2Duplicate
      ? buildData.runes.highestWinRate
      : createRuneSetup(runePresets[1], winRate2, pickRate2)

  const runes3: RuneSetupBackend = createRuneSetup(runePresets[2], winRate3, pickRate3)

  const keystone1 = getPerkInfo(runes1.keystoneId)
  const keystone2 = getPerkInfo(runes2.keystoneId)
  const keystone3 = getPerkInfo(runes3.keystoneId)

  const secondaryIcon1 =
    RUNE_STYLE_ICON[runes1.subStyleId] ??
    'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png'
  const secondaryIcon2 =
    RUNE_STYLE_ICON[runes2.subStyleId] ??
    'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png'
  const secondaryIcon3 =
    RUNE_STYLE_ICON[runes3.subStyleId] ??
    'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png'

  // 5. Generate distinct items & spells for each archetype
  const build1 =
    buildData?.items && buildData.items.core?.length > 0 && buildData.items.core[0].itemIds?.length >= 3
      ? { items: buildData.items, spells: buildData.spells || createArchetypeItems(itemPresets[0], winRate1).spells }
      : createArchetypeItems(itemPresets[0], winRate1)

  const build2 = createArchetypeItems(itemPresets[1], winRate2)
  const build3 = createArchetypeItems(itemPresets[2], winRate3)

  return [
    {
      id: isApDominated ? 'ap' : 'primary',
      name: names.first,
      primaryKeystone: keystone1.name,
      keystoneIcon: keystone1.iconUrl,
      secondaryIcon: secondaryIcon1,
      winRate: Number(winRate1.toFixed(1)),
      matches: matches1,
      pickRate: pickRate1,
      items: build1.items,
      spells: build1.spells,
      runes: runes1,
    },
    {
      id: isApDominated ? 'utility' : 'secondary',
      name: names.second,
      primaryKeystone: keystone2.name,
      keystoneIcon: keystone2.iconUrl,
      secondaryIcon: secondaryIcon2,
      winRate: Number(winRate2.toFixed(1)),
      matches: matches2,
      pickRate: pickRate2,
      items: build2.items,
      spells: build2.spells,
      runes: runes2,
    },
    {
      id: isApDominated ? 'dps' : 'situational',
      name: names.third,
      primaryKeystone: keystone3.name,
      keystoneIcon: keystone3.iconUrl,
      secondaryIcon: secondaryIcon3,
      winRate: Number(winRate3.toFixed(1)),
      matches: matches3,
      pickRate: pickRate3,
      items: build3.items,
      spells: build3.spells,
      runes: runes3,
    },
  ]
}
