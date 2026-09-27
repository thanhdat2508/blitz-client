import type { ChampionMeta, Role } from '../../types/champion'
import type { ChampionBuildPayload } from '../../types/champion-build'
import { getItemName, getPerkInfo } from '../../data/ddragon-ids'

interface ChampionBuildGuideCardProps {
  champion?: ChampionMeta
  championName?: string
  role?: Role
  buildData?: ChampionBuildPayload | null
}

export function ChampionBuildGuideCard({
  champion,
  championName = 'Champion',
  role = 'MID',
  buildData,
}: ChampionBuildGuideCardProps) {
  const name = champion?.name ?? buildData?.overview?.name ?? championName

  // Role display name
  const roleDisplay = () => {
    if (role === 'MID') return 'Mid'
    if (role === 'TOP') return 'Top'
    if (role === 'JUNGLE') return 'Jungle'
    if (role === 'ADC') return 'ADC'
    if (role === 'SUPPORT') return 'Support'
    return 'Mid'
  }

  const roleName = roleDisplay()
  const tier = buildData?.overview?.tierRank ?? champion?.tier ?? 'A'
  const winRate = (buildData?.overview?.winRate ?? champion?.winRate ?? 51.6).toFixed(1)
  const pickRate = (buildData?.overview?.pickRate ?? champion?.pickRate ?? 4.8).toFixed(1)
  const banRate = (buildData?.overview?.banRate ?? champion?.banRate ?? 2.5).toFixed(1)
  const rawMatches = buildData?.overview?.gamesPlayed ?? champion?.matches ?? 18450
  const matches = rawMatches.toLocaleString()

  // Dynamic core items from backend build payload
  const coreIds = buildData?.items?.core?.[0]?.itemIds ?? [3078, 3053, 3158]
  const coreItem1 = getItemName(coreIds[0] ?? 3078, 'en')
  const coreItem2 = getItemName(coreIds[1] ?? 3053, 'en')
  const coreItem3 = getItemName(coreIds[2] ?? 3158, 'en')

  // Dynamic keystone from backend build payload
  const keystoneId = buildData?.runes?.mostPopular?.keystoneId ?? 8010
  const keystone = getPerkInfo(keystoneId).name

  // Dynamic key counter from backend matchups
  const counterName = buildData?.matchups?.worstAgainst?.[0]?.name ?? champion?.counters?.[0]?.name ?? 'Sylas'

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[#0E121A] p-4 sm:p-5 shadow-xl select-none space-y-3 font-sans">
      {/* Title */}
      <p className="text-base sm:text-lg font-extrabold text-white tracking-wide">
        {name} {roleName} Build Guide
      </p>

      {/* Paragraph 1: Meta standing & win rate */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {name} {roleName} is {tier} Tier with a {winRate}% win rate, {pickRate}% pick rate, and {banRate}% ban rate across {matches} Emerald+ matches in the World region on Patch 26.19.
      </p>

      {/* Paragraph 2: Core items, keystone and key counter */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        The recommended core item build is {coreItem1} → {coreItem2} → {coreItem3}. {keystone} is the recommended primary rune keystone. {counterName} is one of the more difficult matchups.
      </p>

      {/* Paragraph 3: Strategic gameplay advice */}
      <div className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1 border-t border-zinc-850">
        <p>
          Mastering {name} requires timing your power spikes around completed core items and adapting your rune choices against the enemy team composition.
        </p>
      </div>
    </div>
  )
}
