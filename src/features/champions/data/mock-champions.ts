import type { ChampionMeta } from '../types/champion'
import { MID_CHAMPIONS } from './mid-champions'
import { TOP_CHAMPIONS } from './top-champions'
import { ADC_CHAMPIONS } from './adc-champions'
import { JUNGLE_CHAMPIONS } from './jungle-champions'
import { SUPPORT_CHAMPIONS } from './support-champions'

export * from './helpers'
export * from './mid-champions'
export * from './top-champions'
export * from './adc-champions'
export * from './jungle-champions'
export * from './support-champions'

export const MOCK_CHAMPIONS: ChampionMeta[] = [
  ...MID_CHAMPIONS,
  ...TOP_CHAMPIONS,
  ...ADC_CHAMPIONS,
  ...JUNGLE_CHAMPIONS,
  ...SUPPORT_CHAMPIONS,
]
