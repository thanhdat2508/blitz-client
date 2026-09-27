import { useState, Fragment } from 'react'
import type { ChampionInsights, ChampionAbilities } from '../../types/champion-build'
import { getCanonicalChampionKey } from '../../data/ddragon-ids'

interface ChampionInsightsCardProps {
  championName?: string
  insights?: ChampionInsights | null
  abilities?: ChampionAbilities | null
}

function AbilityIconPill({
  letter,
  championName,
  iconUrl,
}: {
  letter: 'P' | 'Q' | 'W' | 'E' | 'R'
  championName: string
  iconUrl?: string
}) {
  const [err, setErr] = useState(false)
  const canonical = getCanonicalChampionKey(championName)

  const ddragonFallback =
    letter === 'P'
      ? `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/passive/${canonical}_P.png`
      : `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/${canonical}${letter}.png`

  const src = err ? ddragonFallback : (iconUrl || ddragonFallback)

  const letterBadgeColor =
    letter === 'P'
      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
      : letter === 'R'
      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'

  return (
    <div className="inline-flex items-center gap-1 mx-1 align-baseline px-1.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-750 shadow-sm select-none">
      <div className="w-4 h-4 rounded overflow-hidden bg-zinc-950 border border-zinc-700 shrink-0 inline-flex items-center justify-center">
        <img
          src={src}
          alt={`${championName} [${letter}]`}
          loading="lazy"
          onError={() => setErr(true)}
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className={`font-mono font-black text-[10px] px-1 py-0.2 rounded border ${letterBadgeColor}`}
      >
        {letter}
      </div>
    </div>
  )
}

function renderInsightText(
  rawText: string,
  championName: string,
  abilities?: ChampionAbilities | null
) {
  const parts = rawText.split(/(\[[PQWER]\])/g)

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
        return <Fragment key={idx}>{part}</Fragment>
      })}
    </>
  )
}

export function ChampionInsightsCard({
  championName = 'Champion',
  insights,
  abilities,
}: ChampionInsightsCardProps) {
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
      {/* 1. KEY INSIGHTS */}
      <div className="space-y-2.5">
        <p className="text-cyan-400 font-extrabold text-sm sm:text-base tracking-wide">
          Key Insights
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-2">
          {generalList.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <p className="text-zinc-500 font-bold select-none leading-relaxed">◦</p>
              <div className="leading-relaxed">
                {renderInsightText(line, championName, abilities)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. STRENGTHS */}
      <div className="space-y-2.5 pt-2 border-t border-zinc-850">
        <p className="text-emerald-400 font-extrabold text-sm sm:text-base tracking-wide">
          Strengths
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-2">
          {strengthsList.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <p className="text-zinc-500 font-bold select-none leading-relaxed">◦</p>
              <div className="leading-relaxed">
                {renderInsightText(line, championName, abilities)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. WEAKNESSES */}
      <div className="space-y-2.5 pt-2 border-t border-zinc-850">
        <p className="text-rose-400 font-extrabold text-sm sm:text-base tracking-wide">
          Weaknesses
        </p>

        <div className="space-y-2 text-xs sm:text-sm text-zinc-300 pl-2">
          {weaknessesList.map((line, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <p className="text-zinc-500 font-bold select-none leading-relaxed">◦</p>
              <div className="leading-relaxed">
                {renderInsightText(line, championName, abilities)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
