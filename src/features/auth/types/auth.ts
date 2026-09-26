export type LolRegion = 'VN' | 'KR' | 'NA' | 'EUW' | 'SEA' | 'BR' | 'LAN' | 'LAS' | 'OCE' | 'JP'

export type SupportedGame = 'lol' | 'val' | 'tft'

export type LolTier =
  | 'Challenger'
  | 'Grandmaster'
  | 'Master'
  | 'Diamond'
  | 'Emerald'
  | 'Platinum'
  | 'Gold'
  | 'Silver'
  | 'Bronze'
  | 'Iron'

export type GameRole =
  | 'TOP'
  | 'JUG'
  | 'MID'
  | 'BOT'
  | 'SUP'
  | 'DUELIST'
  | 'INITIATOR'
  | 'TACTICIAN'

export interface GameAccount {
  id: string
  game: SupportedGame
  summonerName: string
  tagLine: string
  region: LolRegion
  tier: LolTier
  division?: string
  lp: number
  level: number
  profileIconUrl: string
  mainRole: GameRole
  winRate: number
  isActive: boolean
  isPrimary: boolean
  autoRunes: boolean
  inGameOverlay: boolean
  autoAccept: boolean
  lastActive: string
}

// Keep LolAccountInfo for backward compatibility
export type LolAccountInfo = GameAccount

export type AuthProvider = 'email' | 'discord' | 'google' | 'riot'

export interface AuthUser {
  id: string
  email: string
  name: string
  avatar?: string
  provider: AuthProvider
  isPremium?: boolean
  createdAt: string
  lolAccount?: LolAccountInfo
}

export type AuthStatus = 'idle' | 'submitting' | 'otp_required' | 'authenticated'

export type AuthModalTab = 'saved_accounts' | 'login' | 'link_game'

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  status: AuthStatus
  pendingEmail?: string
  error?: string | null
  activeTab: AuthModalTab
}
