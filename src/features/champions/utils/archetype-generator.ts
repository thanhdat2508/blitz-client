import type { ChampionBuildPayload } from '../types/champion-build'
import type { ChampionMeta, Role } from '../types/champion'
import type { Archetype } from '../components/build/archetype-selector'
import { getPerkInfo, RUNE_STYLE_ICON } from '../data/ddragon-ids'

interface ArchetypeTemplate {
  name: string
  keystoneId: number
  subStyleId: number
}

// Class-specific third archetype options when primary & secondary are already known
const CLASS_THIRD_ARCHETYPES: Record<string, ArchetypeTemplate> = {
  Mage: {
    name: 'DoT Burn',
    keystoneId: 8214, // Summon Aery
    subStyleId: 8400, // Resolve
  },
  Assassin: {
    name: 'Duel Sustain',
    keystoneId: 8010, // Conqueror
    subStyleId: 8000, // Precision
  },
  Fighter: {
    name: 'Lethality Burst',
    keystoneId: 8112, // Electrocute
    subStyleId: 8100, // Domination
  },
  Marksman: {
    name: 'Lethality Poke',
    keystoneId: 8229, // Arcane Comet
    subStyleId: 8100, // Domination
  },
  Tank: {
    name: 'Sustain Grasp',
    keystoneId: 8437, // Grasp of the Undying
    subStyleId: 8300, // Inspiration
  },
  Support: {
    name: 'Poke Harass',
    keystoneId: 8229, // Arcane Comet
    subStyleId: 8300, // Inspiration
  },
}

const CLASS_NAMES: Record<
  string,
  {
    first: string
    second: string
    third: string
  }
> = {
  Mage: {
    first: 'AP Burst',
    second: 'Control CDR',
    third: 'DoT Burn',
  },
  Assassin: {
    first: 'Burst Lethality',
    second: 'Roam Speed',
    third: 'Duel Sustain',
  },
  Fighter: {
    first: 'Bruiser AD',
    second: 'Sustain HP',
    third: 'Lethality Burst',
  },
  Marksman: {
    first: 'Crit DPS',
    second: 'On-Hit AS',
    third: 'Lethality Poke',
  },
  Tank: {
    first: 'Tank Armor',
    second: 'Engage CC',
    third: 'Sustain Grasp',
  },
  Support: {
    first: 'Enchanter Utility',
    second: 'Engage Peel',
    third: 'Poke Harass',
  },
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

  // 2. Pick rates & matches calculation (Sum of matches ALWAYS equals totalMatches)
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

  // 4. Runes keystones & icons
  const mostPopKeystone = buildData?.runes?.mostPopular?.keystoneId ?? (isApDominated ? 8229 : 8010)
  const mostPopSubStyle = buildData?.runes?.mostPopular?.subStyleId ?? (isApDominated ? 8000 : 8400)

  const highWinKeystone =
    buildData?.runes?.highestWinRate?.keystoneId ?? (isApDominated ? 8369 : 8005)
  const highWinSubStyle =
    buildData?.runes?.highestWinRate?.subStyleId ?? (isApDominated ? 8200 : 8100)

  const thirdTemplate = CLASS_THIRD_ARCHETYPES[classKey] || CLASS_THIRD_ARCHETYPES.Mage
  let thirdKeystone = thirdTemplate.keystoneId
  let thirdSubStyle = thirdTemplate.subStyleId

  // Avoid identical keystones across archetypes if possible
  if (thirdKeystone === mostPopKeystone || thirdKeystone === highWinKeystone) {
    thirdKeystone = isApDominated ? 8112 : 8230 // Electrocute or Phase Rush
  }
  if (thirdSubStyle === mostPopSubStyle) {
    thirdSubStyle = 8300 // Inspiration
  }

  const keystone1 = getPerkInfo(mostPopKeystone)
  const keystone2 = getPerkInfo(highWinKeystone)
  const keystone3 = getPerkInfo(thirdKeystone)

  const secondaryIcon1 =
    RUNE_STYLE_ICON[mostPopSubStyle] ??
    'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png'
  const secondaryIcon2 =
    RUNE_STYLE_ICON[highWinSubStyle] ??
    'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png'
  const secondaryIcon3 =
    RUNE_STYLE_ICON[thirdSubStyle] ??
    'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png'

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
    },
  ]
}
