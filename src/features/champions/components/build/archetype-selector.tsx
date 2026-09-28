export interface Archetype {
  id: string
  name: string
  primaryKeystone: string
  keystoneIcon: string
  secondaryIcon: string
  winRate: number
  matches: number
  pickRate: number
}

interface ArchetypeSelectorProps {
  archetypes?: Archetype[]
  selectedId: string
  onSelect: (id: string) => void
}

const DEFAULT_ARCHETYPES: Archetype[] = [
  {
    id: 'ap',
    name: 'AP Burst',
    primaryKeystone: 'Arcane Comet',
    keystoneIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
    winRate: 54.2,
    matches: 7890,
    pickRate: 68.5,
  },
  {
    id: 'utility',
    name: 'Control / CDR',
    primaryKeystone: 'First Strike',
    keystoneIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png',
    winRate: 52.8,
    matches: 5026,
    pickRate: 22.0,
  },
  {
    id: 'dps',
    name: 'DoT Burn',
    primaryKeystone: 'Summon Aery',
    keystoneIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/SummonAery/SummonAery.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png',
    winRate: 51.5,
    matches: 2257,
    pickRate: 9.5,
  },
]

export function ArchetypeSelector({
  archetypes = DEFAULT_ARCHETYPES,
  selectedId,
  onSelect,
}: ArchetypeSelectorProps) {
  return (
    <div className="bg-[#12141c]/90 border border-zinc-800/80 rounded-xl p-2 space-y-1.5 shadow-lg select-none">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {archetypes.map((arch) => {
          const isSelected = arch.id === selectedId
          return (
            <button
              key={arch.id}
              type="button"
              onClick={() => onSelect(arch.id)}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex-1 min-w-[110px] flex items-center justify-between gap-1.5 ${
                isSelected
                  ? 'bg-cyan-950/50 border-cyan-500/70 shadow-md shadow-cyan-950/20'
                  : 'bg-zinc-950/60 border-zinc-850 hover:bg-zinc-900/60 hover:border-zinc-700'
              }`}
            >
              <div className="text-left min-w-0">
                <p
                  className={`text-xs font-black uppercase leading-tight ${
                    isSelected ? 'text-cyan-400' : 'text-zinc-300'
                  }`}
                >
                  {arch.name.split(' ')[0]}
                </p>
                <p className="text-[9px] text-zinc-500 font-mono tracking-tight">
                  {arch.matches?.toLocaleString()} GAMES
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <div className="flex items-center -space-x-1">
                  <img
                    src={arch.keystoneIcon}
                    alt={arch.primaryKeystone}
                    className="w-4 h-4 rounded-full border border-zinc-700 bg-zinc-900"
                  />
                  <img
                    src={arch.secondaryIcon}
                    alt="Secondary"
                    className="w-3.5 h-3.5 rounded-full border border-zinc-800 bg-zinc-950"
                  />
                </div>
                <span
                  className={`text-[9px] font-black px-1 py-0.2 rounded ${
                    isSelected
                      ? 'bg-cyan-500 text-zinc-950'
                      : 'bg-zinc-850 text-zinc-400'
                  }`}
                >
                  {arch.winRate}%
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
