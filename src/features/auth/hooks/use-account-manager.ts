import * as React from 'react'
import type { GameAccount, LolRegion, LolTier, SupportedGame } from '../types/auth'

const STORAGE_KEY = 'blitz_saved_accounts'

export const INITIAL_ACCOUNTS: GameAccount[] = [
  {
    id: 'riot_acc_faker',
    game: 'lol',
    summonerName: 'Faker',
    tagLine: 'KR1',
    region: 'KR',
    tier: 'Challenger',
    division: '',
    lp: 945,
    level: 682,
    profileIconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/588.png',
    mainRole: 'MID',
    winRate: 63.8,
    isActive: true,
    isPrimary: true,
    autoRunes: true,
    inGameOverlay: true,
    autoAccept: true,
    lastActive: 'Just now',
  },
  {
    id: 'riot_acc_levi',
    game: 'lol',
    summonerName: 'Levi',
    tagLine: 'VN2',
    region: 'VN',
    tier: 'Grandmaster',
    division: '',
    lp: 620,
    level: 540,
    profileIconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/4088.png',
    mainRole: 'JUG',
    winRate: 59.4,
    isActive: false,
    isPrimary: false,
    autoRunes: true,
    inGameOverlay: true,
    autoAccept: false,
    lastActive: '2 hours ago',
  },
  {
    id: 'riot_acc_tenz',
    game: 'val',
    summonerName: 'TenZ',
    tagLine: 'SEN',
    region: 'NA',
    tier: 'Challenger',
    division: '',
    lp: 450,
    level: 320,
    profileIconUrl: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt56598c2ca77ad0a0/62d85f85e505cc3e83f5c71c/Jett_KeyArt.png',
    mainRole: 'DUELIST',
    winRate: 61.2,
    isActive: false,
    isPrimary: false,
    autoRunes: false,
    inGameOverlay: true,
    autoAccept: true,
    lastActive: 'Yesterday',
  },
]

let accountsState: GameAccount[] = INITIAL_ACCOUNTS

// Hydrate from localStorage in browser
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved) as GameAccount[]
      if (Array.isArray(parsed) && parsed.length > 0) {
        accountsState = parsed
      }
    }
  } catch {
    // Ignore JSON parse errors
  }
}

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

function updateAccounts(updater: (prev: GameAccount[]) => GameAccount[]) {
  accountsState = updater(accountsState)
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accountsState))
  }
  notify()
}

export function useAccountManager() {
  const accounts = React.useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange)
      return () => listeners.delete(onStoreChange)
    },
    () => accountsState,
    () => INITIAL_ACCOUNTS
  )

  const [isScanningClient, setIsScanningClient] = React.useState(false)

  // Derived active account
  const activeAccount = React.useMemo(() => {
    return accounts.find((a) => a.isActive) || accounts[0] || INITIAL_ACCOUNTS[0]
  }, [accounts])

  const switchAccount = React.useCallback((accountId: string) => {
    updateAccounts((prev) =>
      prev.map((acc) => ({
        ...acc,
        isActive: acc.id === accountId,
        lastActive: acc.id === accountId ? 'Just now' : acc.lastActive,
      }))
    )
  }, [])

  const addAccount = React.useCallback(
    (newAcc: {
      summonerName: string
      tagLine: string
      region: LolRegion
      game: SupportedGame
      tier?: LolTier
      lp?: number
      level?: number
      profileIconUrl?: string
      makeActive?: boolean
    }) => {
      const id = `riot_${Date.now()}`
      const createdAccount: GameAccount = {
        id,
        game: newAcc.game,
        summonerName: newAcc.summonerName.trim(),
        tagLine: newAcc.tagLine.trim().toUpperCase(),
        region: newAcc.region,
        tier: newAcc.tier || 'Diamond',
        division: 'I',
        lp: newAcc.lp || 75,
        level: newAcc.level || Math.floor(Math.random() * 200) + 50,
        profileIconUrl:
          newAcc.profileIconUrl ||
          `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${Math.floor(Math.random() * 20) + 1}.png`,
        mainRole: newAcc.game === 'val' ? 'DUELIST' : 'MID',
        winRate: Math.round((50 + Math.random() * 15) * 10) / 10,
        isActive: !!newAcc.makeActive,
        isPrimary: accountsState.length === 0,
        autoRunes: true,
        inGameOverlay: true,
        autoAccept: true,
        lastActive: 'Just now',
      }

      updateAccounts((prev) => {
        const list = newAcc.makeActive
          ? prev.map((a) => ({ ...a, isActive: false }))
          : [...prev]
        return [createdAccount, ...list]
      })

      return createdAccount
    },
    []
  )

  const removeAccount = React.useCallback((accountId: string) => {
    updateAccounts((prev) => {
      const filtered = prev.filter((a) => a.id !== accountId)
      if (filtered.length > 0 && !filtered.some((a) => a.isActive)) {
        filtered[0] = { ...filtered[0], isActive: true }
      }
      return filtered
    })
  }, [])

  const updateAccount = React.useCallback(
    (accountId: string, updates: Partial<GameAccount>) => {
      updateAccounts((prev) =>
        prev.map((acc) => (acc.id === accountId ? { ...acc, ...updates } : acc))
      )
    },
    []
  )

  const setPrimaryAccount = React.useCallback((accountId: string) => {
    updateAccounts((prev) =>
      prev.map((acc) => ({
        ...acc,
        isPrimary: acc.id === accountId,
      }))
    )
  }, [])

  const toggleSetting = React.useCallback(
    (accountId: string, setting: 'autoRunes' | 'inGameOverlay' | 'autoAccept') => {
      updateAccounts((prev) =>
        prev.map((acc) =>
          acc.id === accountId ? { ...acc, [setting]: !acc[setting] } : acc
        )
      )
    },
    []
  )

  const detectRiotClient = React.useCallback(async () => {
    setIsScanningClient(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsScanningClient(false)

    // Check if Faker already active, if not switch or add
    const current = accountsState.find((a) => a.isActive)
    return current || accountsState[0]
  }, [])

  return {
    accounts,
    activeAccount,
    isScanningClient,
    switchAccount,
    addAccount,
    removeAccount,
    updateAccount,
    setPrimaryAccount,
    toggleSetting,
    detectRiotClient,
  }
}
