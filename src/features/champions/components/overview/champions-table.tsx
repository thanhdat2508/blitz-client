import type { ChampionMeta } from '../../types/champion'
import { ChampionRow } from '../champion-row'
import { ChevronDown } from 'lucide-react'

interface ChampionsTableProps {
  champions: ChampionMeta[]
  sortBy: 'tier' | 'winRate' | 'pickRate' | 'banRate' | 'name'
  onToggleSort: (field: 'tier' | 'winRate' | 'pickRate' | 'banRate' | 'name') => void
  onSelectChampion: (champion: ChampionMeta) => void
}

export function ChampionsTable({
  champions,
  sortBy,
  onToggleSort,
  onSelectChampion,
}: ChampionsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#121620] shadow-xl select-none">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800/80 bg-[#0E121A] text-[11px] text-zinc-400 font-bold uppercase tracking-wider">
            <th className="py-2.5 px-3 text-center w-12">
              <p>#</p>
            </th>
            <th className="py-2.5 px-3 text-center w-12">
              <p>ROLE</p>
            </th>
            <th className="py-2.5 px-4">
              <button
                type="button"
                onClick={() => onToggleSort('name')}
                className={`inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                  sortBy === 'name' ? 'text-amber-400 font-black' : ''
                }`}
              >
                <p>CHAMPION</p>
                {sortBy === 'name' && <ChevronDown className="w-3 h-3 text-amber-400" />}
              </button>
            </th>
            <th className="py-2.5 px-3 text-center w-16">
              <button
                type="button"
                onClick={() => onToggleSort('tier')}
                className={`inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                  sortBy === 'tier' ? 'text-amber-400 font-black' : ''
                }`}
              >
                <p>TIER</p>
                {sortBy === 'tier' && <ChevronDown className="w-3 h-3 text-amber-400" />}
              </button>
            </th>
            <th className="py-2.5 px-4 text-center">
              <button
                type="button"
                onClick={() => onToggleSort('winRate')}
                className={`inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                  sortBy === 'winRate' ? 'text-amber-400 font-black' : ''
                }`}
              >
                <p>WIN RATE</p>
                {sortBy === 'winRate' && <ChevronDown className="w-3 h-3 text-amber-400" />}
              </button>
            </th>
            <th className="py-2.5 px-4 text-center">
              <p>TREND</p>
            </th>
            <th className="py-2.5 px-4 text-center">
              <button
                type="button"
                onClick={() => onToggleSort('banRate')}
                className={`inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                  sortBy === 'banRate' ? 'text-amber-400 font-black' : ''
                }`}
              >
                <p>BAN RATE</p>
                {sortBy === 'banRate' && <ChevronDown className="w-3 h-3 text-amber-400" />}
              </button>
            </th>
            <th className="py-2.5 px-4 text-center">
              <button
                type="button"
                onClick={() => onToggleSort('pickRate')}
                className={`inline-flex items-center gap-1 hover:text-white transition-colors cursor-pointer ${
                  sortBy === 'pickRate' ? 'text-amber-400 font-black' : ''
                }`}
              >
                <p>PICK RATE</p>
                {sortBy === 'pickRate' && <ChevronDown className="w-3 h-3 text-amber-400" />}
              </button>
            </th>
            <th className="py-2.5 px-4 text-center">
              <p>MATCHES</p>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/40">
          {champions.map((champion, idx) => (
            <ChampionRow
              key={champion.id}
              champion={champion}
              index={idx}
              onSelect={onSelectChampion}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
