import type { ChampionMeta } from '../../types/champion'
import { ChampionCard } from '../champion-card'

interface ChampionsGridProps {
  champions: ChampionMeta[]
  onSelectChampion: (champion: ChampionMeta) => void
}

export function ChampionsGrid({ champions, onSelectChampion }: ChampionsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 select-none">
      {champions.map((champion) => (
        <ChampionCard
          key={champion.id}
          champion={champion}
          onSelect={onSelectChampion}
        />
      ))}
    </div>
  )
}
