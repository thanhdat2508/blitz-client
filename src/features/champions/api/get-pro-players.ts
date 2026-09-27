import { useQuery } from '@tanstack/react-query'
import { ENV } from '@/config/env'

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
    const endpoint = '/api/pro-players'
    const url = typeof window !== 'undefined' ? endpoint : `${ENV.BACKEND_URL}${endpoint}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch pro players: ${res.status} ${res.statusText}`)
    }
    const json: { success: boolean; count: number; data: ProPlayer[] } = await res.json()
    if (json?.data && Array.isArray(json.data)) {
      return json.data
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
