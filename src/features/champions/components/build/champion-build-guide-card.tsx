import type { ChampionMeta, Role } from '../../types/champion'
import type { ChampionBuildPayload } from '../../types/champion-build'
import { useLanguage } from '@/lib/i18n/language-context'
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
  const { language } = useLanguage()

  const name = champion?.name ?? buildData?.overview?.name ?? championName

  // Role display name
  const roleDisplay = () => {
    if (language === 'en') {
      if (role === 'MID') return 'Mid'
      if (role === 'TOP') return 'Top'
      if (role === 'JUNGLE') return 'Jungle'
      if (role === 'ADC') return 'ADC'
      if (role === 'SUPPORT') return 'Support'
      return 'Mid'
    } else {
      if (role === 'MID') return 'Đường Giữa'
      if (role === 'TOP') return 'Đường Trên'
      if (role === 'JUNGLE') return 'Đi Rừng'
      if (role === 'ADC') return 'Xạ Thủ'
      if (role === 'SUPPORT') return 'Hỗ Trợ'
      return 'Đường Giữa'
    }
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
  const coreItem1 = getItemName(coreIds[0] ?? 3078, language)
  const coreItem2 = getItemName(coreIds[1] ?? 3053, language)
  const coreItem3 = getItemName(coreIds[2] ?? 3158, language)

  // Dynamic keystone from backend build payload
  const keystoneId = buildData?.runes?.mostPopular?.keystoneId ?? 8010
  const keystone = getPerkInfo(keystoneId).name

  // Dynamic key counter from backend matchups
  const counterName = buildData?.matchups?.worstAgainst?.[0]?.name ?? champion?.counters?.[0]?.name ?? 'Sylas'

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[#0E121A] p-4 sm:p-5 shadow-xl select-none space-y-3 font-sans">
      {/* Title matching Screenshot 2 & 3 */}
      <p className="text-base sm:text-lg font-extrabold text-white tracking-wide">
        {name} {roleName} {language === 'en' ? 'Build Guide' : 'Hướng Dẫn Lên Đồ'}
      </p>

      {/* Paragraph 1: Meta standing & win rate */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {language === 'en' ? (
          <>
            {name} {roleName} is {tier} Tier with a {winRate}% win rate, {pickRate}% pick rate, and {banRate}% ban rate across {matches} Emerald+ matches in the World region on Patch 26.19.
          </>
        ) : (
          <>
            {name} {roleName} xếp hạng Bậc {tier} với {winRate}% tỷ lệ thắng, {pickRate}% tỷ lệ chọn, và {banRate}% tỷ lệ cấm qua {matches} trận bậc Lục Bảo+ khu vực Thế Giới tại Bản 26.19.
          </>
        )}
      </p>

      {/* Paragraph 2: Core items, keystone and key counter */}
      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
        {language === 'en' ? (
          <>
            The recommended core item build is {coreItem1} → {coreItem2} → {coreItem3}. {keystone} is the recommended primary rune keystone. {counterName} is one of the more difficult matchups.
          </>
        ) : (
          <>
            Bộ trang bị trấn phái đề xuất là {coreItem1} → {coreItem2} → {coreItem3}. {keystone} là ngọc siêu cấp đề xuất. {counterName} là một trong những kèo đấu khó khăn nhất.
          </>
        )}
      </p>

      {/* Paragraph 3: Strategic gameplay advice */}
      <div className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1 border-t border-zinc-850">
        <p>
          {language === 'en'
            ? `Mastering ${name} requires timing your power spikes around completed core items and adapting your rune choices against the enemy team composition.`
            : `Để thuần thục ${name}, hãy chú ý tận dụng tối đa các ngưỡng sức mạnh khi hoàn thành trang bị trấn phái và linh hoạt điều chỉnh bảng ngọc đối đầu với từng đội hình.`}
        </p>
      </div>
    </div>
  )
}
