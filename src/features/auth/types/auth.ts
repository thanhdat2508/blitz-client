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

export type AuthProvider = 'email' | 'discord' | 'google' | 'riot' | 'LOCAL'

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  sessionId: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  username?: string
  avatar?: string
  avatarUrl?: string
  provider: AuthProvider
  isPremium?: boolean
  isEmailVerified?: boolean
  createdAt?: string
  lolAccount?: LolAccountInfo
  sessionId?: string
}

export interface SessionItem {
  id: string
  deviceId: string
  userAgent: string
  ipAddress: string
  country: string
  city: string
  deviceType: string
  os: string
  browserName: string
  lastUsedAt: string
  createdAt: string
  isCurrent: boolean
}

export type AuthStatus = 'idle' | 'submitting' | 'otp_required' | 'authenticated'

export type AuthModalTab = 'saved_accounts' | 'login' | 'link_game'

export interface AuthState {
  user: AuthUser | null
  tokens: AuthTokens | null
  sessionId: string | null
  isAuthenticated: boolean
  status: AuthStatus
  pendingEmail?: string
  recoveryCode?: string
  error?: string | null
  activeTab: AuthModalTab
}
