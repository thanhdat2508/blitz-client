import * as React from 'react'
import type { AuthState, AuthUser, GameAccount } from '../types/auth'

const STORAGE_KEY = 'app_auth_user'

interface StoreState extends AuthState {
  isModalOpen: boolean
}

let state: StoreState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  pendingEmail: undefined,
  error: null,
  isModalOpen: false,
  activeTab: 'login',
}

// Hydrate from localStorage once on module load in browser
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsedUser = JSON.parse(saved) as AuthUser
      state = {
        ...state,
        user: parsedUser,
        isAuthenticated: true,
      }
    }
  } catch {
    // Ignore JSON parse errors on invalid storage
  }
}

const listeners = new Set<() => void>()

function notify() {
  listeners.forEach((listener) => listener())
}

function updateStore(updater: (prev: StoreState) => StoreState) {
  state = updater(state)
  if (typeof window !== 'undefined') {
    if (state.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
  notify()
}

export function useAuth() {
  const store = React.useSyncExternalStore(
    (onStoreChange) => {
      listeners.add(onStoreChange)
      return () => listeners.delete(onStoreChange)
    },
    () => state,
    () => state
  )

  const openLoginModal = React.useCallback((_tab?: string) => {
    updateStore((prev) => ({
      ...prev,
      isModalOpen: true,
      error: null,
    }))
  }, [])

  const closeLoginModal = React.useCallback(() => {
    updateStore((prev) => ({
      ...prev,
      isModalOpen: false,
      status: 'idle',
      pendingEmail: undefined,
      error: null,
    }))
  }, [])

  const loginWithPassword = React.useCallback(
    async (email: string, password: string) => {
      updateStore((prev) => ({ ...prev, status: 'submitting', error: null }))
      await new Promise((resolve) => setTimeout(resolve, 600))

      if (password.length < 6) {
        updateStore((prev) => ({
          ...prev,
          status: 'idle',
          error: 'Mật khẩu phải có ít nhất 6 ký tự.',
        }))
        return false
      }

      const username = email.split('@')[0]
      const user: AuthUser = {
        id: `usr_${Date.now()}`,
        email,
        name: username,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
        provider: 'email',
        isPremium: true,
        createdAt: new Date().toISOString(),
      }

      updateStore((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        status: 'authenticated',
        isModalOpen: false,
        error: null,
      }))
      return true
    },
    []
  )

  const loginWithSavedAccount = React.useCallback((account: GameAccount) => {
    updateStore((prev) => ({ ...prev, status: 'submitting', error: null }))

    const user: AuthUser = {
      id: `usr_${account.id}`,
      email: `${account.summonerName.toLowerCase()}@riot.games`,
      name: `${account.summonerName} #${account.tagLine}`,
      avatar: account.profileIconUrl,
      provider: 'riot',
      isPremium: true,
      createdAt: new Date().toISOString(),
      lolAccount: account,
    }

    updateStore((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
      status: 'authenticated',
      isModalOpen: false,
      error: null,
    }))
  }, [])

  const requestEmailOtp = React.useCallback(async (email: string) => {
    updateStore((prev) => ({ ...prev, status: 'submitting', error: null }))
    await new Promise((resolve) => setTimeout(resolve, 500))
    updateStore((prev) => ({
      ...prev,
      status: 'otp_required',
      pendingEmail: email,
    }))
  }, [])

  const verifyOtp = React.useCallback(async (code: string) => {
    updateStore((prev) => ({ ...prev, status: 'submitting', error: null }))
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (code.length < 4) {
      updateStore((prev) => ({
        ...prev,
        status: 'otp_required',
        error: 'Mã xác thực không hợp lệ. Vui lòng kiểm tra lại.',
      }))
      return false
    }

    const email = state.pendingEmail || 'user@example.com'
    const username = email.split('@')[0]
    const user: AuthUser = {
      id: `usr_${Date.now()}`,
      email,
      name: username,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
      provider: 'email',
      isPremium: false,
      createdAt: new Date().toISOString(),
    }

    updateStore((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
      status: 'authenticated',
      isModalOpen: false,
      pendingEmail: undefined,
      error: null,
    }))
    return true
  }, [])

  const loginWithSocial = React.useCallback(
    async (provider: 'discord' | 'google' | 'riot') => {
      updateStore((prev) => ({ ...prev, status: 'submitting', error: null }))
      await new Promise((resolve) => setTimeout(resolve, 500))

      const mockName =
        provider === 'riot'
          ? 'BlitzPro #VN2'
          : provider === 'discord'
          ? 'GamerPro#2026'
          : 'Nexus Member'

      const user: AuthUser = {
        id: `usr_${provider}_${Date.now()}`,
        email: `${provider}_user@example.com`,
        name: mockName,
        avatar:
          provider === 'riot'
            ? 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/588.png'
            : `https://api.dicebear.com/7.x/bottts/svg?seed=${mockName}`,
        provider,
        isPremium: true,
        createdAt: new Date().toISOString(),
      }

      updateStore((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        status: 'authenticated',
        isModalOpen: false,
        pendingEmail: undefined,
        error: null,
      }))
    },
    []
  )

  const resetFlow = React.useCallback(() => {
    updateStore((prev) => ({
      ...prev,
      status: 'idle',
      pendingEmail: undefined,
      error: null,
    }))
  }, [])

  const logout = React.useCallback(() => {
    updateStore(() => ({
      user: null,
      isAuthenticated: false,
      status: 'idle',
      pendingEmail: undefined,
      error: null,
      isModalOpen: false,
      activeTab: 'login',
    }))
  }, [])

  return {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    status: store.status,
    isModalOpen: store.isModalOpen,
    pendingEmail: store.pendingEmail,
    error: store.error,
    openLoginModal,
    closeLoginModal,
    loginWithPassword,
    loginWithSavedAccount,
    requestEmailOtp,
    verifyOtp,
    loginWithSocial,
    resetFlow,
    logout,
  }
}
