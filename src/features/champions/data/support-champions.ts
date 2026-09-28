import type { ChampionMeta } from '../types/champion'
import { getAvatar, getSplash, getItem } from './helpers'

export const SUPPORT_CHAMPIONS: ChampionMeta[] = [
  {
    id: 'Thresh',
    name: 'Thresh',
    title: 'The Chain Warden',
    roles: ['SUPPORT'],
    primaryRole: 'SUPPORT',
    avatarUrl: getAvatar('Thresh'),
    splashUrl: getSplash('Thresh'),
    tier: 'S+',
    winRate: 51.5,
    pickRate: 12.6,
    banRate: 5.4,
    matches: 73500,
    trend: 0.4,
    counters: [
      { id: 'Morgana', name: 'Morgana', avatarUrl: getAvatar('Morgana'), winRateAgainst: 46.5 },
      { id: 'Zyra', name: 'Zyra', avatarUrl: getAvatar('Zyra'), winRateAgainst: 47.8 },
      { id: 'Brand', name: 'Brand', avatarUrl: getAvatar('Brand'), winRateAgainst: 48.2 },
    ],
    buildGuide: {
      skillPriority: 'Q > W > E',
      skillOrder: ['E', 'Q', 'W', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
      runes: {
        primaryTree: 'Resolve',
        keystone: {
          name: 'Aftershock',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
        },
        primaryRunes: ['Font of Life', 'Conditioning', 'Overgrowth'],
        secondaryTree: 'Inspiration',
        secondaryRunes: ['Hextech Flashtraption', 'Cosmic Insight'],
        shards: ['+8 Ability Haste', '+6 Armor', '+65 Health'],
      },
      items: {
        starting: [
          { name: 'World Atlas', iconUrl: getItem('3865') },
          { name: 'Health Potion', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Locket of the Iron Solari', iconUrl: getItem('3190'), winRate: 52.8 },
          { name: "Knight's Vow", iconUrl: getItem('3050'), winRate: 54.6 },
          { name: "Zeke's Convergence", iconUrl: getItem('3050'), winRate: 53.9 },
        ],
        boots: [
          { name: 'Mobility Boots', iconUrl: getItem('3117') },
        ],
        situational: [
          { name: 'Frozen Heart', iconUrl: getItem('3110'), winRate: 54.2 },
          { name: 'Thornmail', iconUrl: getItem('3075'), winRate: 52.0 },
          { name: 'Abyssal Mask', iconUrl: getItem('8020'), winRate: 55.1 },
        ],
      },
      strengths: [
        'Complete versatile kit: engage, disengage, rescue, and dash interruption',
        'Dark Passage (W) lantern rescues allies or sets up long-range ganks',
        'Infinite armor and AP scaling from collected souls',
      ],
      weaknesses: [
        'Fragile early game before collecting sufficient souls',
        'Missing Death Sentence (Q) surrenders all lane priority',
      ],
      keyTips: [
        'Use Flay (E) to interrupt incoming enemy dash animations',
        'Throw W behind your position to lantern your jungler directly into the fight',
      ],
    },
  },
  {
    id: 'Nautilus',
    name: 'Nautilus',
    title: 'The Titan of the Depths',
    roles: ['SUPPORT'],
    primaryRole: 'SUPPORT',
    avatarUrl: getAvatar('Nautilus'),
    splashUrl: getSplash('Nautilus'),
    tier: 'S',
    winRate: 51.2,
    pickRate: 11.8,
    banRate: 8.9,
    matches: 69200,
    trend: 0.1,
    counters: [
      { id: 'Morgana', name: 'Morgana', avatarUrl: getAvatar('Morgana'), winRateAgainst: 45.9 },
      { id: 'Poppy', name: 'Poppy', avatarUrl: getAvatar('Poppy'), winRateAgainst: 47.1 },
      { id: 'Braum', name: 'Braum', avatarUrl: getAvatar('Braum'), winRateAgainst: 47.8 },
    ],
    buildGuide: {
      skillPriority: 'Q > W > E',
      skillOrder: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R', 'W', 'W', 'E', 'E', 'R', 'E', 'E'],
      runes: {
        primaryTree: 'Resolve',
        keystone: {
          name: 'Aftershock',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
        },
        primaryRunes: ['Shield Bash', 'Conditioning', 'Overgrowth'],
        secondaryTree: 'Inspiration',
        secondaryRunes: ['Hextech Flashtraption', 'Cosmic Insight'],
        shards: ['+8 Ability Haste', '+6 Armor', '+65 Health'],
      },
      items: {
        starting: [
          { name: 'World Atlas', iconUrl: getItem('3865') },
          { name: 'Health Potion', iconUrl: getItem('2003') },
        ],
        core: [
          { name: "Zeke's Convergence", iconUrl: getItem('3050'), winRate: 52.9 },
          { name: 'Locket of the Iron Solari', iconUrl: getItem('3190'), winRate: 53.7 },
          { name: "Knight's Vow", iconUrl: getItem('3050'), winRate: 54.2 },
        ],
        boots: [
          { name: 'Mobility Boots', iconUrl: getItem('3117') },
        ],
        situational: [
          { name: 'Frozen Heart', iconUrl: getItem('3110'), winRate: 53.5 },
          { name: 'Thornmail', iconUrl: getItem('3075'), winRate: 51.8 },
          { name: "Randuin's Omen", iconUrl: getItem('3143'), winRate: 52.4 },
        ],
      },
      strengths: [
        'Crowd control powerhouse with 4 hard locking tools',
        'Point-and-click Depth Charge (R) cannot be dodged or flash avoided',
        'Titan’s Wrath (W) shield grants exceptional burst absorption',
      ],
      weaknesses: [
        'Dredge Line (Q) hooks pull Nautilus forward into dangerous spots on miss',
        'Relatively sluggish attack and cast animations',
      ],
      keyTips: [
        'Hook walls with Q to cut down travel time across the map',
        'Target enemy carries with R at the onset of teamfights to force out Flashes',
      ],
    },
  },
]
