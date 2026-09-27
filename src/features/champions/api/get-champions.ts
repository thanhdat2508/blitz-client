import { useQuery } from '@tanstack/react-query'
import type { ChampionMeta, ChampionFilterState, Role, Tier } from '../types/champion'
import { MOCK_CHAMPIONS } from '../data/mock-champions'

export const championKeys = {
  all: ['champions'] as const,
  list: (filters: Partial<ChampionFilterState>) => [...championKeys.all, 'list', filters] as const,
  detail: (id: string) => [...championKeys.all, 'detail', id] as const,
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const ROLE_TO_BACKEND: Record<Role, string> = {
  ALL: 'all',
  TOP: 'top',
  JUNGLE: 'jungle',
  MID: 'mid',
  ADC: 'ad',
  SUPPORT: 'sp',
}

const BACKEND_TO_ROLE: Record<string, Role> = {
  top: 'TOP',
  jungle: 'JUNGLE',
  mid: 'MID',
  ad: 'ADC',
  sp: 'SUPPORT',
}

interface BackendTierListItem {
  championId: string
  name: string
  title?: string
  role: string
  tier: string
  winRate: number
  pickRate: number
  banRate: number
  matches: number
  patchWrChange?: number
  avatarUrl?: string
}

export async function fetchChampions(filters?: Partial<ChampionFilterState>): Promise<ChampionMeta[]> {
  try {
    const roleParam = filters?.role ? ROLE_TO_BACKEND[filters.role] || 'all' : 'all'
    const rankParam = filters?.rank === 'ALL' ? 'all' : 'emerald'
    const searchParam = filters?.search?.trim() || ''
    const sortByParam = filters?.sortBy === 'tier' ? 'winRate' : (filters?.sortBy || 'winRate')
    const orderParam = filters?.sortOrder || 'desc'

    const url = new URL(`${API_BASE_URL}/api/champions/tier-list`)
    url.searchParams.set('role', roleParam)
    url.searchParams.set('rank', rankParam)
    if (searchParam) url.searchParams.set('search', searchParam)
    url.searchParams.set('sortBy', sortByParam)
    url.searchParams.set('order', orderParam)

    const res = await fetch(url.toString())
    if (!res.ok) throw new Error(`Backend returned HTTP ${res.status}`)

    const json = await res.json()
    if (!json.success || !Array.isArray(json.data)) throw new Error('Invalid backend response format')

    const mapped: ChampionMeta[] = (json.data as BackendTierListItem[]).map((item) => {
      const feRole = BACKEND_TO_ROLE[item.role] || 'MID'
      return {
        id: item.championId,
        name: item.name,
        title: item.title || item.name,
        roles: [feRole],
        primaryRole: feRole,
        avatarUrl: item.avatarUrl || `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${item.championId}.png`,
        splashUrl: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.championId}_0.jpg`,
        tier: (item.tier as Tier) || 'A',
        winRate: item.winRate,
        pickRate: item.pickRate,
        banRate: item.banRate,
        matches: item.matches,
        trend: item.patchWrChange || 0,
        counters: [],
        buildGuide: {
          skillOrder: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W'],
          skillPriority: 'Q > E > W',
          runes: {
            primaryTree: 'Precision',
            keystone: { name: 'Conqueror', iconUrl: '' },
            primaryRunes: [],
            secondaryTree: 'Resolve',
            secondaryRunes: [],
            shards: [],
          },
          items: {
            starting: [],
            core: [],
            boots: [],
            situational: [],
          },
          strengths: [],
          weaknesses: [],
          keyTips: [],
        },
      }
    })

    return mapped
  } catch (err) {
    console.warn('Backend tier-list query failed, using local mock fallback:', err)

    // Fallback logic
    let result = [...MOCK_CHAMPIONS]
    if (filters?.role && filters.role !== 'ALL') {
      result = result.filter((champ) => champ.roles.includes(filters.role!))
    }
    if (filters?.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim()
      result = result.filter(
        (champ) => champ.name.toLowerCase().includes(q) || champ.title.toLowerCase().includes(q)
      )
    }
    return result
  }
}

export async function fetchChampionById(id: string): Promise<ChampionMeta | undefined> {
  const allChamps = await fetchChampions()
  const found = allChamps.find(
    (c) => c.id.toLowerCase() === id.toLowerCase() || c.name.toLowerCase() === id.toLowerCase()
  )
  if (found) return found

  return MOCK_CHAMPIONS.find((c) => c.id.toLowerCase() === id.toLowerCase())
}

export function useChampions(filters?: Partial<ChampionFilterState>) {
  return useQuery({
    queryKey: championKeys.list(filters || {}),
    queryFn: () => fetchChampions(filters),
    staleTime: 1000 * 60 * 5,
  })
}

export function useChampion(id: string) {
  return useQuery({
    queryKey: championKeys.detail(id),
    queryFn: () => fetchChampionById(id),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 10,
  })
}
