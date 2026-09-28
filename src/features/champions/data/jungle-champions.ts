import type { ChampionMeta } from '../types/champion'
import { getAvatar, getSplash, getItem } from './helpers'

export const JUNGLE_CHAMPIONS: ChampionMeta[] = [
  {
    id: 'Rammus',
    name: 'Rammus',
    title: 'The Armordillo',
    roles: ['JUNGLE'],
    primaryRole: 'JUNGLE',
    avatarUrl: getAvatar('Rammus'),
    splashUrl: getSplash('Rammus'),
    tier: 'S',
    winRate: 53.3,
    pickRate: 1.1,
    banRate: 2.5,
    matches: 4061,
    trend: 0.6,
    counters: [
      { id: 'Trundle', name: 'Trundle', avatarUrl: getAvatar('Trundle'), winRateAgainst: 45.4 },
      { id: 'Vellkoz', name: 'Velkoz', avatarUrl: getAvatar('Velkoz'), winRateAgainst: 47.2 },
    ],
    buildGuide: {
      skillPriority: 'Q > E > W',
      skillOrder: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
      runes: {
        primaryTree: 'Resolve',
        keystone: {
          name: 'Aftershock',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
        },
        primaryRunes: ['Font of Life', 'Conditioning', 'Overgrowth'],
        secondaryTree: 'Precision',
        secondaryRunes: ['Legend: Alacrity', 'Triumph'],
        shards: ['+10% Attack Speed', '+6 Armor', '+6 Armor'],
      },
      items: {
        starting: [
          { name: 'Mosstomper Seedling', iconUrl: getItem('1103') },
          { name: 'Health Potion', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Thornmail', iconUrl: getItem('3075'), winRate: 54.8 },
          { name: 'Sunfire Aegis', iconUrl: getItem('3068'), winRate: 55.4 },
          { name: 'Turbo Chemtank', iconUrl: getItem('3742'), winRate: 56.1 },
        ],
        boots: [
          { name: 'Plated Steelcaps', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: "Randuin's Omen", iconUrl: getItem('3143'), winRate: 56.8 },
        ],
      },
      strengths: ['Ultimate counter to physical AD marksmen and assassins', 'High speed rolling ganks with Powerball (Q)'],
      weaknesses: ['Vulnerable to heavy magic damage burst'],
      keyTips: ['Activate Defensive Ball Curl (W) and taunt with E to force auto-attack recoil damage'],
    },
  },
  {
    id: 'LeeSin',
    name: 'Lee Sin',
    title: 'The Blind Monk',
    roles: ['JUNGLE'],
    primaryRole: 'JUNGLE',
    avatarUrl: getAvatar('LeeSin'),
    splashUrl: getSplash('LeeSin'),
    tier: 'S',
    winRate: 50.8,
    pickRate: 14.1,
    banRate: 7.2,
    matches: 81200,
    trend: 0.3,
    counters: [
      { id: 'Poppy', name: 'Poppy', avatarUrl: getAvatar('Poppy'), winRateAgainst: 46.2 },
    ],
    buildGuide: {
      skillPriority: 'Q > W > E',
      skillOrder: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
      runes: {
        primaryTree: 'Precision',
        keystone: {
          name: 'Conqueror',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
        },
        primaryRunes: ['Triumph', 'Legend: Alacrity', 'Coup de Grace'],
        secondaryTree: 'Inspiration',
        secondaryRunes: ['Magical Footwear', 'Cosmic Insight'],
        shards: ['+9 Adaptive Force', '+9 Adaptive Force', '+6 Armor'],
      },
      items: {
        starting: [
          { name: 'Mosstomper Seedling', iconUrl: getItem('1103') },
          { name: 'Health Potion', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Eclipse', iconUrl: getItem('6692'), winRate: 51.9 },
          { name: 'Sundered Sky', iconUrl: getItem('6610'), winRate: 53.2 },
          { name: 'Black Cleaver', iconUrl: getItem('3071'), winRate: 54.0 },
        ],
        boots: [
          { name: 'Plated Steelcaps', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: "Death's Dance", iconUrl: getItem('3053'), winRate: 55.4 },
        ],
      },
      strengths: ['Tremendous early game map presence and pressure', 'High playmaking ceiling with InSec ward-kick combos'],
      weaknesses: ['Demands high mechanical execution'],
      keyTips: ['Weave two basic attacks between ability casts to maximize Flurry passive energy restore'],
    },
  },
]
