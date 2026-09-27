import { ChevronRight } from 'lucide-react'
import type { SkillPriority, ChampionAbilities } from '../../types/champion-build'

interface SkillOrderMatrixProps {
  skills: SkillPriority
  abilities: ChampionAbilities
}

const SKILL_KEYS = ['Q', 'W', 'E', 'R'] as const

// Distinct styling for each skill key matching Blitz.gg
const SKILL_THEMES: Record<string, {
  color: string
  bgLearned: string
  borderLearned: string
  textColor: string
}> = {
  Q: {
    color: 'text-amber-500',
    bgLearned: 'bg-amber-600/90 text-white font-black',
    borderLearned: 'border-amber-500 shadow-amber-900/30',
    textColor: 'text-amber-400',
  },
  W: {
    color: 'text-cyan-400',
    bgLearned: 'bg-cyan-600/90 text-white font-black',
    borderLearned: 'border-cyan-500 shadow-cyan-900/30',
    textColor: 'text-cyan-400',
  },
  E: {
    color: 'text-purple-400',
    bgLearned: 'bg-purple-600/90 text-white font-black',
    borderLearned: 'border-purple-500 shadow-purple-900/30',
    textColor: 'text-purple-400',
  },
  R: {
    color: 'text-yellow-400',
    bgLearned: 'bg-yellow-500 text-zinc-950 font-black',
    borderLearned: 'border-yellow-400 shadow-yellow-900/30',
    textColor: 'text-yellow-400',
  },
}

export function SkillOrderMatrix({ skills, abilities }: SkillOrderMatrixProps) {
  const maxOrder = skills.maxOrder || ['Q', 'E', 'W']
  const progressionList = skills.progression || skills.order || []

  return (
    <div className="bg-[#12141c]/90 border border-zinc-800/80 rounded-xl p-3.5 shadow-xl select-none">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* ── LEFT SIDE: ABILITY MAX ORDER (MATCHING BLITZ.GG) ── */}
        <div className="shrink-0 space-y-2">
          <div>
            <p className="font-extrabold text-xs text-white uppercase tracking-wider">
              Ability Max Order
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-cyan-400 font-black text-xs">
                {skills.winRate ? `${skills.winRate.toFixed(0)}%` : '60%'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {skills.pickRate ? `${skills.pickRate.toFixed(0)}% Pick` : '1,106 GAMES'}
              </span>
            </div>
          </div>

          {/* Sequential Ability Icons: [Q] > [E] > [W] */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {maxOrder.map((key, idx) => {
              const ability = abilities[key.toLowerCase() as 'q' | 'w' | 'e' | 'r']
              const theme = SKILL_THEMES[key] || SKILL_THEMES.Q

              return (
                <div key={key} className="flex items-center gap-1.5">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-zinc-700 bg-zinc-900 shadow-md group hover:border-amber-400 transition-colors">
                    {ability?.iconUrl ? (
                      <img
                        src={ability.iconUrl}
                        alt={key}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-black text-zinc-400">
                        {key}
                      </div>
                    )}
                    {/* Key badge overlay on bottom right */}
                    <span
                      className={`absolute bottom-0 right-0 px-1 text-[10px] font-black leading-tight rounded-tl bg-zinc-950/90 ${theme.textColor}`}
                    >
                      {key}
                    </span>
                  </div>

                  {idx < maxOrder.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT SIDE: 1-18 SKILL LEVEL MATRIX (MATCHING BLITZ.GG) ── */}
        <div className="overflow-x-auto no-scrollbar flex-1 pt-1">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="w-5" />
                {Array.from({ length: 18 }, (_, i) => (
                  <th
                    key={i + 1}
                    className="py-1 px-0.5 text-[9px] font-mono font-medium text-zinc-500 w-5 min-w-[18px]"
                  >
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-1">
              {SKILL_KEYS.map((key) => {
                const ability = abilities[key.toLowerCase() as 'q' | 'w' | 'e' | 'r']
                const theme = SKILL_THEMES[key] || SKILL_THEMES.Q

                return (
                  <tr key={key}>
                    {/* Row Skill Icon */}
                    <td className="py-0.5 pr-1.5 text-left">
                      <div className="w-4 h-4 rounded overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                        {ability?.iconUrl ? (
                          <img
                            src={ability.iconUrl}
                            alt={key}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[9px] font-bold text-zinc-400">
                            {key}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 18 Level Squares */}
                    {Array.from({ length: 18 }, (_, idx) => {
                      const level = idx + 1
                      const isLearned = progressionList[level - 1] === key

                      return (
                        <td key={level} className="py-0.5 px-0.5">
                          {isLearned ? (
                            <div
                              className={`w-4 h-4 mx-auto rounded flex items-center justify-center text-[9px] font-black shadow-sm ${theme.bgLearned}`}
                              title={`${key} (Level ${level})`}
                            >
                              {key}
                            </div>
                          ) : (
                            <div className="w-4 h-4 mx-auto rounded bg-zinc-900/60 border border-zinc-850/60" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
