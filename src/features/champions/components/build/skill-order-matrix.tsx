import { Zap } from 'lucide-react'
import type { SkillPriority, ChampionAbilities } from '../../types/champion-build'

interface SkillOrderMatrixProps {
  skills: SkillPriority
  abilities: ChampionAbilities
}

const SKILL_KEYS = ['Q', 'W', 'E', 'R'] as const

export function SkillOrderMatrix({ skills, abilities }: SkillOrderMatrixProps) {
  // Map skill key letter → ability name
  const abilityName: Record<string, string> = {
    Q: abilities.q.name,
    W: abilities.w.name,
    E: abilities.e.name,
    R: abilities.r.name,
  }

  return (
    <div className="bg-[#0E121A] border border-zinc-800/80 rounded-xl p-3.5 space-y-3 shadow-lg select-none">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            Skill Priority
          </p>
          <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-xs">
            {skills.maxOrder.join(' > ')}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 font-extrabold text-[10px]">
            {skills.winRate.toFixed(1)}% WR
          </div>
          <p className="text-[10px] text-zinc-500 font-mono">
            {skills.pickRate.toFixed(1)}% Pick
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/80 text-zinc-500 font-medium">
              <th className="py-1.5 px-2 text-left w-10 font-semibold text-[11px]">
                Skill
              </th>
              {Array.from({ length: 18 }, (_, i) => (
                <th key={i + 1} className="py-1 px-0.5 w-6 text-[10px] font-mono text-zinc-500">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 font-mono">
            {SKILL_KEYS.map((key) => {
              const ability = abilities[key.toLowerCase() as 'q' | 'w' | 'e' | 'r']
              const isMaxFirst = skills.maxOrder[0] === key

              return (
                <tr key={key} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="py-1.5 px-2 text-left">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded overflow-hidden border border-zinc-700/60 bg-zinc-800 shrink-0">
                        {ability?.iconUrl ? (
                          <img
                            src={ability.iconUrl}
                            alt={key}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <p className="w-full h-full flex items-center justify-center font-bold text-[10px] text-zinc-400">
                            {key}
                          </p>
                        )}
                      </div>
                      <p className={`font-black text-xs ${isMaxFirst ? 'text-amber-400' : 'text-zinc-300'}`}>
                        {key}
                      </p>
                    </div>
                  </td>

                  {Array.from({ length: 18 }, (_, idx) => {
                    const level = idx + 1
                    const progressionList = skills.progression || skills.order || []
                    const isLearned = progressionList[level - 1] === key

                    return (
                      <td key={level} className="py-1 px-0.5">
                        {isLearned ? (
                          <div
                            className={`w-5 h-5 mx-auto rounded flex items-center justify-center text-[10px] font-bold shadow-sm ${
                              key === 'R'
                                ? 'bg-rose-500 text-white shadow-rose-900/40'
                                : isMaxFirst
                                  ? 'bg-amber-400 text-zinc-950 font-black'
                                  : 'bg-cyan-500/90 text-zinc-950'
                            }`}
                            title={`${key} - ${abilityName[key]} (Level ${level})`}
                          >
                            {key}
                          </div>
                        ) : (
                          <div className="w-5 h-5 mx-auto rounded bg-zinc-900/60 border border-zinc-850" />
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
  )
}
