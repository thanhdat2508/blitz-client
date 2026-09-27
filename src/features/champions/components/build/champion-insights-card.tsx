import { useLanguage } from '@/lib/i18n/language-context'
import type { ChampionInsights, ChampionAbilities } from '../../types/champion-build'
import { getCanonicalChampionKey } from '../../data/ddragon-ids'

interface ChampionInsightsCardProps {
  championName?: string
  insights?: ChampionInsights | null
  abilities?: ChampionAbilities | null
}

function AbilityIconPill({
  letter,
  championName = 'Champion',
  iconUrl,
}: {
  letter: 'P' | 'Q' | 'W' | 'E' | 'R'
  championName?: string
  iconUrl?: string
}) {
  const canonical = getCanonicalChampionKey(championName)
  const defaultUrl =
    letter === 'P'
      ? `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/passive/${canonical}_Passive.png`
      : `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/${canonical}${letter}.png`

  const src = iconUrl || defaultUrl

  return (
    <div className="inline-flex items-center align-middle mx-1 relative select-none">
      <div className="w-5 h-5 rounded-md border border-amber-500/70 bg-zinc-950 overflow-hidden shrink-0 shadow-sm">
        <img
          src={src}
          alt={letter}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            target.onerror = null
            target.src = defaultUrl
          }}
        />
      </div>
      <div className="absolute -top-1.5 -right-1 px-1 py-0.2 rounded bg-zinc-950 border border-amber-400/90 text-amber-300 font-black text-[8px] leading-tight">
        {letter}
      </div>
    </div>
  )
}

const VI_TRANSLATIONS: Record<string, string> = {
  // Morgana
  'Shrewd use of [E] Black Shield can determine the outcome of team fights.':
    'Sử dụng khôn ngoan [E] Khiên Đen có thể định đoạt cục diện cả giao tranh lớn.',
  "Items that provide survivability allow Morgana to become extremely difficult to kill in conjunction with [E] Black Shield and [R] Soul Shackles.":
    'Trang bị gia tăng độ sống sót giúp Morgana cực kỳ khó bị hạ gục khi kết hợp cùng [E] Khiên Đen và [R] Trói Hồn.',
  "[W] Tormented Shadow is an excellent farming tool if you're by yourself in a lane.":
    '[W] Vùng Đất Chết là công cụ dọn lính tuyệt vời khi đẩy đường đơn.',
  'High burst and trading synergy when chaining [Q] into [E].':
    'Khả năng dồn sát thương và bảo kê mạnh mẽ khi khống chế bằng [Q] và chặn phép với [E].',
  'Excellent power curve with core Mage items amplifying key stats.':
    'Ngưỡng sức mạnh thăng tiến ổn định với các trang bị pháp sư gia tăng chỉ số SMPT và điểm hồi.',
  'Can proc [P] effectively during skirmishes to gain combat superiority.':
    'Hồi phục liên tục nhờ nội tại [P] Hút Hồn để chiếm ưu thế trong các pha trao đổi dài hơi.',
  'Strong map presence and lane pressure when [R] is available.':
    'Tạo áp lực khống chế diện rộng và bắt lẻ cực mạnh mỗi khi có chiêu cuối [R] Trói Hồn.',
  "[W] Tormented Shadow deals tons of damage to units missing large amounts of Health. When low on Health, be wary of Morgana's attempts to trap you within its reach.":
    '[W] Vùng Đất Chết gây thêm rất nhiều sát thương theo máu đã mất; khi thấp máu hãy cẩn thận tránh xa vùng ảnh hưởng.',
  'Morgana often needs to land [Q] Dark Binding to setup her other attacks. Use your minions as shields against Dark Binding.':
    'Morgana phụ thuộc nhiều vào việc tung trúng [Q] Khóa Bóng Tối; hãy dùng lính làm lá chắn để chặn tia trói.',
  '[E] has a high cooldown of 26 seconds at rank 1. Once used, Morgana can be punished.':
    '[E] Khiên Đen có thời gian hồi chiêu dài tới 26 giây ở cấp 1; khi vừa tung ra sẽ là thời cơ phản công hoàn hảo.',

  // Quinn
  'Kennen can get over most walls with [E] when cast toward them.':
    'Có thể nhảy vượt hầu hết các bờ tường bằng [E] Đột Kích khi lướt tới mục tiêu đối diện.',
  "Kennen's damaging abilities also apply [P].":
    'Các kỹ năng gây sát thương cũng đồng thời kích hoạt dấu ấn [P] Chim Săn Mồi.',
  '[P] reveals enemies it affects.':
    'Dấu ấn [P] Chim Săn Mồi soi sáng và làm lộ diện kẻ địch trúng phải.',
  '[Q] only applies Nearsight to the initial target.':
    'Chiêu [Q] Không Kích chỉ áp dụng hiệu ứng cận thị lên mục tiêu đầu tiên trúng đòn.',
  "[R]'s bonus movespeed is lost for 3 seconds if she takes damage from non-minions.":
    'Tốc độ di chuyển cộng thêm từ [R] Đi Tuần sẽ bị ngắt 3 giây nếu chịu sát thương từ tướng hoặc trụ.',
  'Can proc [P] multiple times in fights.':
    'Có thể kích hoạt dấu ấn [P] nhiều lần liên tiếp trong giao tranh để nhân đôi lượng sát thương.',
  'Excels with items that boost her attack damage, critical strike chance, and movement speed.':
    'Tương tác cực mạnh với các trang bị gia tăng sức mạnh công kích, tỉ lệ chí mạng và tốc độ di chuyển.',
  "[W]'s movespeed and attack speed buffs make her hard to trade with.":
    'Lượng tốc chạy và tốc đánh cộng thêm từ chiêu [W] khiến đối thủ rất khó trao đổi chiêu ngắn.',
  'Very strong laner, and is considered to be a lane bully.':
    'Giai đoạn đi đường cực mạnh, khả năng đè đường áp đảo biến vị tướng này thành nỗi ác mộng đầu trận.',
  'Due to her aggressive playstyle, it can leave her exposed to being ganked and/or flanked.':
    'Do lối chơi đẩy cao chủ động đè đường, cô nàng dễ rơi vào tầm ngắm bị rừng đối phương gank hoặc bọc sườn.',
  "Needs a lead to stay ahead, and falls off if she doesn't get one.":
    'Cần có lợi thế sớm để duy trì áp lực lăn cầu tuyết; nếu rơi vào thế thọt sẽ giảm nhiều tầm ảnh hưởng về cuối trận.',
  '[W] has a high cooldown of 50 seconds at rank 1. Once used, she can be punished.':
    'Chiêu [W] có thời gian hồi chiêu lên tới 50 giây ở cấp 1; khi vừa sử dụng xong sẽ là khoảng trống để đối phương trừng phạt.',
}

function renderInsightText(
  rawText: string,
  championName: string,
  language: 'en' | 'vi',
  abilities?: ChampionAbilities | null
) {
  const text = language === 'vi' ? (VI_TRANSLATIONS[rawText] || rawText) : rawText
  const parts = text.split(/(\[[PQWER]\])/g)

  const getAbilityIcon = (key: 'P' | 'Q' | 'W' | 'E' | 'R') => {
    if (!abilities) return undefined
    if (key === 'P') return abilities.passive?.iconUrl
    if (key === 'Q') return abilities.q?.iconUrl
    if (key === 'W') return abilities.w?.iconUrl
    if (key === 'E') return abilities.e?.iconUrl
    if (key === 'R') return abilities.r?.iconUrl
    return undefined
  }

  return (
    <>
      {parts.map((part, idx) => {
        const match = part.match(/^\[([PQWER])\]$/)
        if (match) {
          const letter = match[1] as 'P' | 'Q' | 'W' | 'E' | 'R'
          return (
            <AbilityIconPill
              key={idx}
              letter={letter}
              championName={championName}
              iconUrl={getAbilityIcon(letter)}
            />
          )
        }
        return <span key={idx}>{part}</span>
      })}
    </>
  )
}

export function ChampionInsightsCard({
  championName = 'Champion',
  insights,
  abilities,
}: ChampionInsightsCardProps) {
  const { language } = useLanguage()

  // Default fallback lists if backend insights not provided
  const fallbackGeneral = [
    `Can get over most terrain walls with [E] when cast toward targets.`,
    `Damaging abilities also apply [P] marks to enemies.`,
    `[P] reveals stealthed enemies and units hiding in bushes.`,
    `[Q] applies Nearsight restricting opponent vision range.`,
    `[R] bonus movespeed is interrupted upon taking non-minion damage.`,
  ]

  const fallbackStrengths = [
    `Can proc [P] multiple times in fights to amplify single-target burst.`,
    `Excels with items that boost attack damage, critical strike chance, and movement speed.`,
    `[W] movespeed and attack speed buffs make short trades very favorable.`,
    `Very strong laner, and is considered an oppressive lane bully against melee matchups.`,
  ]

  const fallbackWeaknesses = [
    `Aggressive playstyle leaves the champion exposed to coordinated ganks and flanks.`,
    `Needs a lead to stay ahead, and falls off significantly if falling behind.`,
    `[W] has a high cooldown at rank 1; vulnerable during cooldown downtime.`,
  ]

  const generalList = insights?.general && insights.general.length > 0 ? insights.general : fallbackGeneral
  const strengthsList = insights?.strengths && insights.strengths.length > 0 ? insights.strengths : fallbackStrengths
  const weaknessesList = insights?.weaknesses && insights.weaknesses.length > 0 ? insights.weaknesses : fallbackWeaknesses

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[#0E121A] p-4 sm:p-5 shadow-xl select-none space-y-5 font-sans">
      {/* 1. KEY INSIGHTS (MATCHING SCREENSHOT 2 & 3) */}
      <div className="space-y-2.5">
        <p className="text-cyan-400 font-extrabold text-sm sm:text-base tracking-wide">
          {language === 'en' ? 'Key Insights' : 'Mẹo Then Chốt'}
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-2">
          {generalList.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <p className="text-zinc-500 font-bold select-none leading-relaxed">◦</p>
              <div className="leading-relaxed">
                <p>
                  {renderInsightText(line, championName, language, abilities)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. STRENGTHS (MATCHING SCREENSHOT 2 & 3) */}
      <div className="space-y-2.5 pt-2 border-t border-zinc-850">
        <p className="text-emerald-400 font-extrabold text-sm sm:text-base tracking-wide">
          {language === 'en' ? 'Strengths' : 'Điểm Mạnh'}
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-2">
          {strengthsList.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <p className="text-zinc-500 font-bold select-none leading-relaxed">◦</p>
              <div className="leading-relaxed">
                <p>
                  {renderInsightText(line, championName, language, abilities)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WEAKNESSES (MATCHING SCREENSHOT 2 & 3) */}
      <div className="space-y-2.5 pt-2 border-t border-zinc-850">
        <p className="text-rose-400 font-extrabold text-sm sm:text-base tracking-wide">
          {language === 'en' ? 'Weaknesses' : 'Điểm Yếu'}
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-2">
          {weaknessesList.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <p className="text-zinc-500 font-bold select-none leading-relaxed">◦</p>
              <div className="leading-relaxed">
                <p>
                  {renderInsightText(line, championName, language, abilities)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
