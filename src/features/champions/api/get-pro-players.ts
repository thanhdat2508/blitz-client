import { useQuery } from '@tanstack/react-query'
import { fetchClient } from '@/lib/fetch-client'

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

export async function fetchProPlayers(): Promise<ProPlayer[]> {
  try {
    const res = await fetchClient<{ success: boolean; count: number; data: ProPlayer[] }>('/api/pro-players')
    if (res?.data && Array.isArray(res.data)) {
      return res.data
    }
    return []
  } catch (err) {
    console.error('Failed to fetch pro-players from backend server:', err)
    return []
  }
}

export function useProPlayers() {
  return useQuery({
    queryKey: ['pro-players'],
    queryFn: fetchProPlayers,
    staleTime: 1000 * 60 * 5,
  })
}
