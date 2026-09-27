import { useQuery } from '@tanstack/react-query'
import type {
  ChampionBuildPayload,
  BuildApiResponse,
  BuildQueryParams,
  BuildRole,
} from '../types/champion-build'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export const championBuildKeys = {
  all: ['champion-build'] as const,
  build: (champion: string, role: BuildRole, params: BuildQueryParams) =>
    [...championBuildKeys.all, champion, role, params] as const,
}

export async function fetchChampionBuild(
  champion: string,
  role: BuildRole = 'mid',
  params: BuildQueryParams = {}
): Promise<ChampionBuildPayload> {
  const { tier = 'EMERALD+', region = 'WORLD', patch = '14.24' } = params

  const url = new URL(`${API_BASE}/api/champions/${encodeURIComponent(champion)}/build/${role}`)
  url.searchParams.set('tier', tier)
  url.searchParams.set('region', region)
  url.searchParams.set('patch', patch)

  const res = await fetch(url.toString())

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(
      (errorBody as { message?: string }).message || `Failed to fetch build: ${res.status}`
    )
  }

  const json: BuildApiResponse = await res.json()
  return json.data
}

export function useChampionBuild(
  champion: string,
  role: BuildRole = 'mid',
  params: BuildQueryParams = {}
) {
  return useQuery({
    queryKey: championBuildKeys.build(champion, role, params),
    queryFn: () => fetchChampionBuild(champion, role, params),
    enabled: Boolean(champion),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  })
}
