import { useNavigate } from '@tanstack/react-router'
import type { SimilarChampion as BackendSimilarChampion } from '../../types/champion-build'
import { getChampionAvatarUrl } from '../../data/ddragon-ids'

interface SimilarChampionsCardProps {
  championName?: string
  similarChampions?: BackendSimilarChampion[]
}

interface SimilarChampion {
  id: string
  name: string
  avatarUrl: string
}

const DEFAULT_SIMILAR: SimilarChampion[] = [
  {
    id: 'Kayle',
    name: 'Kayle',
    avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Kayle.png',
  },
  {
    id: 'Sivir',
    name: 'Sivir',
    avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Sivir.png',
  },
  {
    id: 'Teemo',
    name: 'Teemo',
    avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Teemo.png',
  },
  {
    id: 'Tristana',
    name: 'Tristana',
    avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Tristana.png',
  },
  {
    id: 'MissFortune',
    name: 'Miss Fortune',
    avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/MissFortune.png',
  },
  {
    id: 'Ashe',
    name: 'Ashe',
    avatarUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ashe.png',
  },
]

export function SimilarChampionsCard({
  championName = 'Champion',
  similarChampions: propSimilar,
}: SimilarChampionsCardProps) {
  const navigate = useNavigate()

  const list: SimilarChampion[] =
    propSimilar && propSimilar.length > 0
      ? propSimilar.map((c) => ({
          id: c.key || String(c.championId) || c.name,
          name: c.name,
          avatarUrl:
            c.avatarUrl ||
            getChampionAvatarUrl(c.key || c.name),
        }))
      : DEFAULT_SIMILAR

  const handleSelectChampion = (champId: string) => {
    navigate({
      to: '/champions/$championId',
      params: { championId: champId },
    })
  }

  return (
    <div className="rounded-xl border border-zinc-800/80 bg-[#0E121A] p-4 sm:p-5 shadow-xl select-none space-y-4 font-sans">
      <div>
        <p className="text-base sm:text-lg font-extrabold text-white tracking-wide">
          Similar Champions
        </p>
        <p className="text-xs text-zinc-400 mt-0.5">
          A few champions that are similar playstyle to {championName}.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 pt-1">
        {list.map((champ) => (
          <button
            key={champ.id}
            type="button"
            onClick={() => handleSelectChampion(champ.id)}
            className="group flex flex-col items-center text-center cursor-pointer transition-all"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-zinc-700/80 bg-zinc-950 p-0.5 group-hover:border-amber-400 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-200 overflow-hidden">
              <img
                src={champ.avatarUrl}
                alt={champ.name}
                onError={(e) => {
                  const target = e.currentTarget
                  target.onerror = null
                  target.src = getChampionAvatarUrl(champ.name)
                }}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <p className="text-xs font-bold text-zinc-300 mt-2 truncate w-full group-hover:text-amber-400 transition-colors">
              {champ.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
