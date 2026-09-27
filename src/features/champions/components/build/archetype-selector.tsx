import { Target } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'

export interface Archetype {
  id: string
  name: string
  enName: string
  primaryKeystone: string
  enPrimaryKeystone: string
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
    id: 'lethality',
    name: 'Sát Lực Dồn Sát Thương',
    enName: 'Lethality Burst',
    primaryKeystone: 'Sốc Điện',
    enPrimaryKeystone: 'Electrocute',
    keystoneIcon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/Electrocute/Electrocute.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png',
    winRate: 56.3,
    matches: 5240,
    pickRate: 64.8,
  },
  {
    id: 'crit-lethality',
    name: 'Chí Mạng & Sát Lực',
    enName: 'Crit / Lethality Hybrid',
    primaryKeystone: 'Bước Chân Thần Tốc',
    enPrimaryKeystone: 'Fleet Footwork',
    keystoneIcon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png',
    winRate: 54.1,
    matches: 2180,
    pickRate: 26.2,
  },
  {
    id: 'pure-crit',
    name: 'Xạ Thủ Tốc Đánh',
    enName: 'DPS Hypercarry',
    primaryKeystone: 'Sẵn Sàng Tấn Công',
    enPrimaryKeystone: 'Press the Attack',
    keystoneIcon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png',
    secondaryIcon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png',
    winRate: 52.8,
    matches: 960,
    pickRate: 9.0,
  },
]

export function ArchetypeSelector({
  archetypes = DEFAULT_ARCHETYPES,
  selectedId,
  onSelect,
}: ArchetypeSelectorProps) {
  const { t, language } = useLanguage()

  return (
    <div className="bg-[#0E121A] border border-zinc-800/80 rounded-xl p-3.5 space-y-2.5 shadow-lg select-none">
      <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 text-amber-400" />
          <p className="font-bold text-xs text-zinc-200 uppercase tracking-wide">
            {t('archetypesTitle')}
          </p>
        </div>
        <p className="text-[10px] text-zinc-500 font-medium">{t('archetypesMeta')}</p>
      </div>

      <div className="space-y-1.5">
        {archetypes.map((arch) => {
          const isSelected = arch.id === selectedId
          return (
            <button
              key={arch.id}
              type="button"
              onClick={() => onSelect(arch.id)}
              className={`w-full text-left p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/70 shadow-md shadow-amber-500/10'
                  : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-900/60 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 overflow-hidden flex items-center justify-center p-0.5">
                    <img
                      src={arch.keystoneIcon}
                      alt={language === 'en' ? arch.enPrimaryKeystone : arch.primaryKeystone}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-zinc-950 border border-zinc-700 overflow-hidden flex items-center justify-center">
                    <img
                      src={arch.secondaryIcon}
                      alt="Nhánh phụ"
                      className="w-2.5 h-2.5 object-contain"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <p className={`text-xs font-bold truncate ${isSelected ? 'text-amber-300' : 'text-zinc-200'}`}>
                    {language === 'en' ? arch.enName : arch.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {language === 'en' ? arch.enPrimaryKeystone : arch.primaryKeystone}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p className="text-xs font-black text-cyan-400">
                  {arch.winRate}%
                </p>
                <p className="text-[10px] text-zinc-500 font-mono">
                  {arch.pickRate}% {t('pickRateText')}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
