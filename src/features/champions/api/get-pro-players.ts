import { useQuery } from '@tanstack/react-query'

export interface ProPlayerSpell {
  name: string
  icon: string
}

export interface ProPlayerItem {
  id: number
  name: string
  icon: string
}

export interface ProPlayerMatch {
  championName: string
  championTitle: string
  championIcon: string
  championSplash: string
  win: boolean
  kills: number
  deaths: number
  assists: number
  kdaRatio: string
  cs: number
  csPerMinute: string
  gameDuration: string
  gameMode: string
  timeAgo: string
  spells: ProPlayerSpell[]
  runes: {
    primary: { name: string; icon: string }
    secondary: { name: string; icon: string }
  }
  items: ProPlayerItem[]
}

export interface ProPlayer {
  id: string
  slug: string
  gameId: string
  name: string
  nickname: string
  description: string
  avatar: string
  playerImageUrl: string
  riotGameName: string
  riotTagLine: string
  role: string
  team: string
  themeColor: string
  displayOrder: number
  winRate?: number
  title?: string
  lastMatch?: ProPlayerMatch
}

export const DEFAULT_PRO_PLAYERS: ProPlayer[] = [
  {
    id: 'player-1',
    slug: 'whale-member',
    gameId: 'Only Prime#TW1',
    name: 'Whale Storm',
    nickname: 'Whale Storm',
    description: 'Standout Mid Laner for Team Whales known for elusive mechanics.',
    avatar: 'https://res.cloudinary.com/vptfaug1/image/upload/player3.png',
    playerImageUrl: 'https://res.cloudinary.com/vptfaug1/image/upload/player3.png',
    riotGameName: 'Only Prime',
    riotTagLine: 'TW1',
    role: 'MID',
    team: 'Team Whales',
    themeColor: 'blue',
    displayOrder: 1,
    winRate: 78.5,
    title: 'Player of the week',
  },
  {
    id: 'player-2',
    slug: 'geng-member',
    gameId: 'Chovy Jr#GEN',
    name: 'Chovy Jr.',
    nickname: 'Chovy Jr.',
    description: 'Prodigious Mid Laner for Gen.G Esports.',
    avatar: 'https://res.cloudinary.com/vptfaug1/image/upload/player2.png',
    playerImageUrl: 'https://res.cloudinary.com/vptfaug1/image/upload/player2.png',
    riotGameName: 'Chovy Jr',
    riotTagLine: 'GEN',
    role: 'MID',
    team: 'Gen.G Esports',
    themeColor: 'gold',
    displayOrder: 2,
    winRate: 81.2,
    title: 'Player of the week',
  },
  {
    id: 'player-3',
    slug: 't1-member',
    gameId: 'Knight#T1',
    name: 'Knight',
    nickname: 'Knight',
    description: 'Franchise Bot Laner for T1.',
    avatar: 'https://res.cloudinary.com/vptfaug1/image/upload/player1.png',
    playerImageUrl: 'https://res.cloudinary.com/vptfaug1/image/upload/player1.png',
    riotGameName: 'Knight',
    riotTagLine: 'T1',
    role: 'ADC',
    team: 'T1',
    themeColor: 'red',
    displayOrder: 3,
    winRate: 85.0,
    title: 'Player of the week',
  },
]

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export async function fetchProPlayers(): Promise<ProPlayer[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/pro-players`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data
    }
    return DEFAULT_PRO_PLAYERS
  } catch (err) {
    console.warn('Failed to fetch pro-players from backend API, using default dataset:', err)
    return DEFAULT_PRO_PLAYERS
  }
}

export function useProPlayers() {
  return useQuery({
    queryKey: ['pro-players'],
    queryFn: fetchProPlayers,
    staleTime: 1000 * 60 * 5,
    initialData: DEFAULT_PRO_PLAYERS,
  })
}
