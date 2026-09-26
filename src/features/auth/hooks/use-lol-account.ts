import * as React from 'react'
import { useAccountManager } from './use-account-manager'
import type { LolRegion, LolTier } from '../types/auth'

export function useLolAccount() {
  const {
    activeAccount,
    accounts,
    switchAccount,
    addAccount,
    removeAccount,
    updateAccount,
    setPrimaryAccount,
    toggleSetting,
    detectRiotClient,
    isScanningClient,
  } = useAccountManager()

  const updateRiotId = React.useCallback(
    (summonerName: string, tagLine: string, region: LolRegion) => {
      updateAccount(activeAccount.id, {
        summonerName: summonerName.trim() || 'Summoner',
        tagLine: tagLine.trim() || 'VN2',
        region,
      })
    },
    [activeAccount.id, updateAccount]
  )

  const toggleAutoRunes = React.useCallback(() => {
    toggleSetting(activeAccount.id, 'autoRunes')
  }, [activeAccount.id, toggleSetting])

  const toggleInGameOverlay = React.useCallback(() => {
    toggleSetting(activeAccount.id, 'inGameOverlay')
  }, [activeAccount.id, toggleSetting])

  const toggleAutoAccept = React.useCallback(() => {
    toggleSetting(activeAccount.id, 'autoAccept')
  }, [activeAccount.id, toggleSetting])

  const setRegion = React.useCallback(
    (region: LolRegion) => {
      updateAccount(activeAccount.id, { region })
    },
    [activeAccount.id, updateAccount]
  )

  const setTier = React.useCallback(
    (tier: LolTier, lp: number) => {
      updateAccount(activeAccount.id, { tier, lp })
    },
    [activeAccount.id, updateAccount]
  )

  const unlinkAccount = React.useCallback(() => {
    removeAccount(activeAccount.id)
  }, [activeAccount.id, removeAccount])

  return {
    account: activeAccount,
    accounts,
    isScanningClient,
    updateRiotId,
    toggleAutoRunes,
    toggleInGameOverlay,
    toggleAutoAccept,
    setRegion,
    setTier,
    unlinkAccount,
    switchAccount,
    addAccount,
    removeAccount,
    setPrimaryAccount,
    detectRiotClient,
  }
}
