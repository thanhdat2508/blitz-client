import { Zap } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import type { SkillPriority, ChampionAbilities } from '../../types/champion-build'

interface SkillOrderMatrixProps {
  skills: SkillPriority
  abilities: ChampionAbilities
}

const SKILL_KEYS = ['Q', 'W', 'E', 'R'] as const

export function SkillOrderMatrix({ skills, abilities }: SkillOrderMatrixProps) {
  const { t } = useLanguage()

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
            {t('skillPriorityTitle') || 'Skill Priority'}
          </p>
          <div className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-xs">
            {skills.maxOrder.join(' > ')}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 font-extrabold text-[10px]">
            {skills.winRate.toFixed(1)}% {t('winRateText') || 'WR'}
          </div>
          <p className="text-[10px] text-zinc-500 font-mono">
            {skills.pickRate.toFixed(1)}% {t('pickRateText') || 'Pick'}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <table className="w-full text-xs text-center border-collapse">
          <thead>
            <tr className="border-b border-zinc-800/80 text-zinc-500 font-medium">
              <th className="py-1.5 px-2 text-left w-10 font-semibold text-[11px]">
                {t('skill') || 'Skill'}
              </th>
              {Array.from({ length: 18 }, (_, i) => (
                <th key={i + 1} className="py-1 px-0.5 w-6 text-[10px] font-mono text-zinc-500">
                  {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 font-mono">
            {SKILL_KEYS.map((skillKey) => (
              <tr key={skillKey} className="hover:bg-zinc-900/40 group">
                <td className="py-1.5 px-2 text-left">
                  <div className="flex items-center gap-1">
                    <p className="font-black text-xs text-zinc-300">{skillKey}</p>
                    {abilityName[skillKey] && (
                      <p className="text-[9px] text-zinc-600 font-medium leading-tight max-w-[40px] truncate hidden sm:block">
                        {abilityName[skillKey]}
                      </p>
                    )}
                  </div>
                </td>
                {skills.progression.map((step, idx) => {
                  const isMatch = step === skillKey
                  return (
                    <td key={idx} className="py-1 px-0.5">
                      {isMatch ? (
                        <div
                          className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-black text-[10px] shadow-sm ${
                            skillKey === 'R'
                              ? 'bg-amber-400 text-zinc-950 font-black'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {skillKey}
                        </div>
                      ) : (
                        <div className="w-5 h-5 mx-auto rounded bg-zinc-900/30 text-zinc-800 flex items-center justify-center text-[10px]">
                          •
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
