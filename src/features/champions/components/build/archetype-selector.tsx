import type { ChampionItems, SpellPair, RuneSetupBackend } from '../../types/champion-build'
import { RuneIcon } from './rune-icon'

export interface Archetype {
  id: string
  name: string
  primaryKeystone: string
  keystoneIcon: string
  secondaryIcon: string
  winRate: number
  matches: number
  pickRate: number
  items?: ChampionItems
  spells?: SpellPair[]
  runes?: RuneSetupBackend
}

interface ArchetypeSelectorProps {
  archetypes?: Archetype[]
  selectedId: string
  onSelect: (id: string) => void
}

const DEFAULT_ARCHETYPES: Archetype[] = [
  {
    id: 'burst',
    name: 'BURST',
    primaryKeystone: 'Electrocute',
    keystoneIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
    winRate: 50.0,
    matches: 16717,
    pickRate: 67.4,
  },
  {
    id: 'roam',
    name: 'ROAM',
    primaryKeystone: 'Dark Harvest',
    keystoneIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png',
    winRate: 51.5,
    matches: 4092,
    pickRate: 16.5,
  },
  {
    id: 'duel',
    name: 'DUEL',
    primaryKeystone: 'Conqueror',
    keystoneIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png',
    winRate: 49.1,
    matches: 3994,
    pickRate: 16.1,
  },
]

function formatMatches(matches: number): string {
  if (!matches) return '0'
  if (matches >= 1000) {
    return `${(matches / 1000).toFixed(1)}k`
  }
  return matches.toLocaleString()
}

export function ArchetypeSelector({
  archetypes = DEFAULT_ARCHETYPES,
  selectedId,
  onSelect,
}: ArchetypeSelectorProps) {
  return (
    <div className="bg-[#12141c]/90 border border-zinc-800/80 rounded-xl p-2 shadow-lg select-none">
      <div className="grid grid-cols-3 gap-1.5 w-full">
        {archetypes.map((arch) => {
          const isSelected = arch.id === selectedId
          return (
            <button
              key={arch.id}
              type="button"
              onClick={() => onSelect(arch.id)}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1 overflow-hidden w-full relative ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500/70 shadow-md shadow-cyan-950/30 ring-1 ring-cyan-500/30'
                  : 'bg-zinc-950/70 border-zinc-850 hover:bg-zinc-900/70 hover:border-zinc-700'
              }`}
            >
              {/* Top Row: Title + WinRate Badge */}
              <div className="flex items-center justify-between w-full min-w-0 gap-1">
                <span
                  className={`text-[11px] sm:text-xs font-black uppercase tracking-tight whitespace-nowrap ${
                    isSelected ? 'text-cyan-400' : 'text-zinc-100'
                  }`}
                  title={arch.name}
                >
                  {arch.name}
                </span>
                <span
                  className={`text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 leading-none ${
                    isSelected
                      ? 'bg-cyan-500 text-zinc-950 font-bold'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {arch.winRate}%
                </span>
              </div>

              {/* Bottom Row: Compact Matches + Separated Rune Icons */}
              <div className="flex items-center justify-between w-full min-w-0 gap-0.5 pt-0.5">
                <span className="text-[9px] sm:text-[9.5px] text-zinc-400 font-mono tracking-tight truncate">
                  {formatMatches(arch.matches)}
                </span>

                <div className="flex items-center gap-0.5 shrink-0">
                  <RuneIcon
                    iconUrl={arch.keystoneIcon}
                    alt={arch.primaryKeystone}
                    size="w-4 h-4"
                    isKeystone
                  />
                  <RuneIcon
                    iconUrl={arch.secondaryIcon}
                    alt="Secondary Rune"
                    size="w-3.5 h-3.5"
                    isSecondaryStyle
                  />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
