import type { ChampionMeta } from '../types/champion'
import { getAvatar, getSplash, getItem } from './helpers'

export const TOP_CHAMPIONS: ChampionMeta[] = [
  {
    id: 'Aatrox',
    name: 'Aatrox',
    title: 'The Darkin Blade',
    roles: ['TOP'],
    primaryRole: 'TOP',
    avatarUrl: getAvatar('Aatrox'),
    splashUrl: getSplash('Aatrox'),
    tier: 'S+',
    winRate: 51.8,
    pickRate: 11.2,
    banRate: 8.5,
    matches: 67320,
    trend: 0.5,
    counters: [
      { id: 'Fiora', name: 'Fiora', avatarUrl: getAvatar('Fiora'), winRateAgainst: 46.8 },
      { id: 'Darius', name: 'Darius', avatarUrl: getAvatar('Darius'), winRateAgainst: 48.2 },
      { id: 'Camille', name: 'Camille', avatarUrl: getAvatar('Camille'), winRateAgainst: 48.6 },
    ],
    buildGuide: {
      skillPriority: 'Q > E > W',
      skillOrder: ['Q', 'E', 'W', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
      runes: {
        primaryTree: 'Precision',
        keystone: {
          name: 'Conqueror',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
        },
        primaryRunes: ['Triumph', 'Legend: Alacrity', 'Last Stand'],
        secondaryTree: 'Resolve',
        secondaryRunes: ['Second Wind', 'Revitalize'],
        shards: ['+9 Adaptive Force', '+9 Adaptive Force', '+6 Armor'],
      },
      items: {
        starting: [
          { name: "Doran's Shield", iconUrl: getItem('1054') },
          { name: 'Health Potion', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Eclipse', iconUrl: getItem('6692'), winRate: 52.8 },
          { name: 'Sundered Sky', iconUrl: getItem('6610'), winRate: 54.1 },
          { name: "Death's Dance", iconUrl: getItem('3053'), winRate: 55.7 },
        ],
        boots: [
          { name: 'Plated Steelcaps', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: 'Black Cleaver', iconUrl: getItem('3071'), winRate: 53.4 },
          { name: "Sterak's Gage", iconUrl: getItem('3053'), winRate: 56.1 },
          { name: 'Thornmail', iconUrl: getItem('3075'), winRate: 51.9 },
        ],
      },
      strengths: [
        'Massive health sustain in extended skirmishes with World Ender (R)',
        'Area of effect damage and multi-knockup crowd control across 3 Q casts',
        'High solo lane pressure and skirmish independence',
      ],
      weaknesses: [
        'Vulnerable against highly mobile champions and slow effects',
        'Heavily countered by Grievous Wounds healing reduction',
      ],
      keyTips: [
        'Use E between Q casts to reliably hit sweetspots',
        'Trigger World Ender at fight initiation to maximize bonus AD and sustain',
      ],
    },
  },
  {
    id: 'Darius',
    name: 'Darius',
    title: 'The Hand of Noxus',
    roles: ['TOP'],
    primaryRole: 'TOP',
    avatarUrl: getAvatar('Darius'),
    splashUrl: getSplash('Darius'),
    tier: 'S',
    winRate: 51.4,
    pickRate: 8.7,
    banRate: 14.6,
    matches: 52100,
    trend: 0.2,
    counters: [
      { id: 'Vayne', name: 'Vayne', avatarUrl: getAvatar('Vayne'), winRateAgainst: 45.8 },
      { id: 'Quinn', name: 'Quinn', avatarUrl: getAvatar('Quinn'), winRateAgainst: 46.2 },
      { id: 'Yorick', name: 'Yorick', avatarUrl: getAvatar('Yorick'), winRateAgainst: 47.5 },
    ],
    buildGuide: {
      skillPriority: 'Q > E > W',
      skillOrder: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R', 'E', 'E', 'W', 'W', 'R', 'W', 'W'],
      runes: {
        primaryTree: 'Precision',
        keystone: {
          name: 'Conqueror',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
        },
        primaryRunes: ['Triumph', 'Legend: Alacrity', 'Last Stand'],
        secondaryTree: 'Resolve',
        secondaryRunes: ['Second Wind', 'Unflinching'],
        shards: ['+10% Attack Speed', '+9 Adaptive Force', '+6 Armor'],
      },
      items: {
        starting: [
          { name: "Doran's Shield", iconUrl: getItem('1054') },
          { name: 'Health Potion', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Trinity Force', iconUrl: getItem('3078'), winRate: 52.8 },
          { name: "Sterak's Gage", iconUrl: getItem('3053'), winRate: 54.6 },
          { name: 'Turbo Chemtank', iconUrl: getItem('3742'), winRate: 53.9 },
        ],
        boots: [
          { name: 'Plated Steelcaps', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: "Death's Dance", iconUrl: getItem('3053'), winRate: 55.4 },
          { name: 'Spirit Visage', iconUrl: getItem('3065'), winRate: 53.2 },
          { name: 'Thornmail', iconUrl: getItem('3075'), winRate: 52.1 },
        ],
      },
      strengths: [
        'Dominant 1v1 early top lane duelist',
        'Hemorrhage passive and Noxian Might provide enormous AD spikes',
        'Noxian Guillotine (R) executes with true damage and resets on takedown',
      ],
      weaknesses: [
        'Susceptible to kiting without Ghost',
      ],
      keyTips: [
        'Take Ghost to overcome limited innate mobility',
        'Hit enemies with the outer blade of Decimate (Q) to heal and stack passive',
      ],
    },
  },
]
