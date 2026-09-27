export type Role = 'ALL' | 'TOP' | 'JUNGLE' | 'MID' | 'ADC' | 'SUPPORT'

export type Tier = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D'

export type RankBracket = 'ALL' | 'EMERALD_PLUS' | 'DIAMOND_PLUS' | 'MASTER_PLUS'

export type Region = 'WORLD' | 'KR' | 'NA' | 'EUW' | 'VN'

export interface RuneSetup {
  id?: string
  name?: string
  pickRate?: number
  winRate?: number
  matches?: number
  primaryTree: string
  keystone: {
    name: string
    iconUrl: string
  }
  primaryRunes: string[]
  secondaryTree: string
  secondaryRunes: string[]
  shards: string[]
}

export interface ItemBuild {
  starting: { name: string; iconUrl: string }[]
  core: { name: string; iconUrl: string; winRate: number }[]
  boots: { name: string; iconUrl: string }[]
  situational: { name: string; iconUrl: string; winRate: number }[]
}

export interface CounterInfo {
  id: string
  name: string
  avatarUrl: string
  winRateAgainst: number
}

export interface ChampionBuildGuide {
  skillOrder: string[]
  skillPriority: string
  runes: RuneSetup
  runePresets?: RuneSetup[]
  items: ItemBuild
  strengths: string[]
  weaknesses: string[]
  keyTips: string[]
}

export interface ChampionMeta {
  id: string
  name: string
  title: string
  roles: Role[]
  primaryRole: Role
  avatarUrl: string
  splashUrl: string
  tier: Tier
  winRate: number
  pickRate: number
  banRate: number
  matches: number
  trend: number
  counters: CounterInfo[]
  buildGuide: ChampionBuildGuide
}

export interface ChampionFilterState {
  role: Role
  rank: RankBracket
  region: Region
  search: string
  sortBy: 'tier' | 'winRate' | 'pickRate' | 'banRate' | 'name'
  sortOrder: 'asc' | 'desc'
  viewMode: 'table' | 'grid'
}
