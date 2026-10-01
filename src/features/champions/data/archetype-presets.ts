export interface ArchetypeTemplate {
  name: string
  keystoneId: number
  subStyleId: number
}

export interface ArchetypeBuildPreset {
  starting: number[]
  core: number[]
  buildOrder: number[]
  fullBuild: number[]
  boots: number[]
  spells: [number, number]
}

export const CLASS_THIRD_ARCHETYPES: Record<string, ArchetypeTemplate> = {
  Mage: {
    name: 'DoT Burn',
    keystoneId: 8214, // Summon Aery
    subStyleId: 8400, // Resolve
  },
  Assassin: {
    name: 'Duel Sustain',
    keystoneId: 8010, // Conqueror
    subStyleId: 8000, // Precision
  },
  Fighter: {
    name: 'Lethality Burst',
    keystoneId: 8112, // Electrocute
    subStyleId: 8100, // Domination
  },
  Marksman: {
    name: 'Lethality Poke',
    keystoneId: 8229, // Arcane Comet
    subStyleId: 8100, // Domination
  },
  Tank: {
    name: 'Sustain Grasp',
    keystoneId: 8437, // Grasp of the Undying
    subStyleId: 8300, // Inspiration
  },
  Support: {
    name: 'Poke Harass',
    keystoneId: 8229, // Arcane Comet
    subStyleId: 8300, // Inspiration
  },
}

export const CLASS_NAMES: Record<
  string,
  {
    first: string
    second: string
    third: string
  }
> = {
  Mage: {
    first: 'BURST',
    second: 'ROAM',
    third: 'DUEL',
  },
  Assassin: {
    first: 'BURST',
    second: 'ROAM',
    third: 'DUEL',
  },
  Fighter: {
    first: 'BRUISER',
    second: 'SUSTAIN',
    third: 'LETHAL',
  },
  Marksman: {
    first: 'CRIT',
    second: 'ON-HIT',
    third: 'POKE',
  },
  Tank: {
    first: 'ARMOR',
    second: 'ENGAGE',
    third: 'SUSTAIN',
  },
  Support: {
    first: 'ENCHANT',
    second: 'PEEL',
    third: 'POKE',
  },
}

export const CLASS_ITEM_PRESETS: Record<
  string,
  [ArchetypeBuildPreset, ArchetypeBuildPreset, ArchetypeBuildPreset]
> = {
  Mage: [
    // 1. BURST (Luden's Companion + Shadowflame + Rabadon)
    {
      starting: [1056, 2003, 2003],
      core: [6655, 4645, 3089],
      buildOrder: [3802, 3145, 6655, 3020, 4645, 3089],
      fullBuild: [6655, 3020, 4645, 3089, 3157, 3135],
      boots: [3020], // Sorcerer's Shoes
      spells: [4, 14], // Flash + Ignite
    },
    // 2. ROAM (Stormsurge + Lich Bane + Cosmic Drive)
    {
      starting: [1082, 2031],
      core: [6657, 3100, 4629],
      buildOrder: [3113, 3057, 3100, 3009, 6657, 4629],
      fullBuild: [6657, 3009, 3100, 4629, 3089, 3152],
      boots: [3009], // Boots of Swiftness
      spells: [4, 12], // Flash + Teleport
    },
    // 3. DUEL (Liandry's Torment + Seraph's + Riftmaker)
    {
      starting: [3070, 2003, 2003],
      core: [3151, 3003, 4633],
      buildOrder: [3070, 3108, 3151, 3158, 3003, 4633],
      fullBuild: [3151, 3158, 3003, 4633, 3118, 3116],
      boots: [3158], // Ionian Boots of Lucidity
      spells: [4, 21], // Flash + Barrier
    },
  ],
  Assassin: [
    // 1. BURST (Profane Hydra + Opportunity + Serylda)
    {
      starting: [1055, 2003],
      core: [6694, 6695, 6697],
      buildOrder: [3134, 6695, 3158, 6694, 6697, 3142],
      fullBuild: [6695, 3158, 6694, 6697, 3142, 3814],
      boots: [3158],
      spells: [4, 14],
    },
    // 2. ROAM (Hubris + Eclipse + Youmuus)
    {
      starting: [1054, 2003],
      core: [6696, 6692, 3142],
      buildOrder: [3134, 3142, 3009, 6696, 6692, 6333],
      fullBuild: [3142, 3009, 6696, 6692, 6333, 3026],
      boots: [3009],
      spells: [4, 12],
    },
    // 3. DUEL (Black Cleaver + Eclipse + Steraks)
    {
      starting: [1055, 2003],
      core: [6692, 3071, 3053],
      buildOrder: [3044, 6692, 3047, 3071, 3053, 6333],
      fullBuild: [6692, 3047, 3071, 3053, 6333, 3156],
      boots: [3047],
      spells: [4, 6],
    },
  ],
  Fighter: [
    // 1. BRUISER (Stridebreaker + Sundered Sky + Steraks)
    {
      starting: [1055, 2003],
      core: [6631, 6610, 3053],
      buildOrder: [3077, 6631, 3047, 6610, 3053, 3071],
      fullBuild: [6631, 3047, 6610, 3053, 3071, 6333],
      boots: [3047],
      spells: [4, 12],
    },
    // 2. SUSTAIN (Ravenous Hydra + Trinity Force + Death's Dance)
    {
      starting: [1054, 2003],
      core: [3074, 3078, 6333],
      buildOrder: [3077, 3074, 3111, 3078, 6333, 3156],
      fullBuild: [3074, 3111, 3078, 6333, 3156, 3026],
      boots: [3111],
      spells: [4, 6],
    },
    // 3. LETHAL (Profane Hydra + Opportunity + Serylda)
    {
      starting: [1055, 2003],
      core: [6694, 6695, 6697],
      buildOrder: [3134, 6694, 3158, 6695, 6697, 6692],
      fullBuild: [6694, 3158, 6695, 6697, 6692, 3814],
      boots: [3158],
      spells: [4, 14],
    },
  ],
  Marksman: [
    // 1. CRIT (Kraken Slayer + Infinity Edge + LDR)
    {
      starting: [1055, 2003],
      core: [6672, 3031, 3036],
      buildOrder: [1037, 6672, 3006, 3031, 3036, 3072],
      fullBuild: [6672, 3006, 3031, 3036, 3072, 3094],
      boots: [3006],
      spells: [4, 7],
    },
    // 2. ON-HIT (BotRK + Guinsoo + Terminus)
    {
      starting: [1055, 2003],
      core: [3153, 3124, 3302],
      buildOrder: [1043, 3153, 3006, 3124, 3302, 3091],
      fullBuild: [3153, 3006, 3124, 3302, 3091, 3072],
      boots: [3006],
      spells: [4, 6],
    },
    // 3. POKE (Voltaic Cyclosword + Opportunity + LDR)
    {
      starting: [1055, 2003],
      core: [6698, 6695, 3036],
      buildOrder: [3134, 6698, 3158, 6695, 3036, 6694],
      fullBuild: [6698, 3158, 6695, 3036, 6694, 3814],
      boots: [3158],
      spells: [4, 21],
    },
  ],
  Tank: [
    // 1. ARMOR (Sunfire + Thornmail + Spirit Visage)
    {
      starting: [1054, 2003],
      core: [3068, 3075, 3065],
      buildOrder: [1031, 3068, 3047, 3075, 3065, 3110],
      fullBuild: [3068, 3047, 3075, 3065, 3110, 3083],
      boots: [3047],
      spells: [4, 12],
    },
    // 2. ENGAGE (Heartsteel + Warmog + Force of Nature)
    {
      starting: [1054, 2003],
      core: [3084, 3083, 4401],
      buildOrder: [3801, 3084, 3111, 3083, 4401, 3075],
      fullBuild: [3084, 3111, 3083, 4401, 3075, 3742],
      boots: [3111],
      spells: [4, 6],
    },
    // 3. SUSTAIN (Hollow Radiance + Jak'Sho + Kaenic Rookern)
    {
      starting: [1054, 2003],
      core: [6664, 6665, 6667],
      buildOrder: [3801, 6664, 3047, 6665, 6667, 3065],
      fullBuild: [6664, 3047, 6665, 6667, 3065, 3083],
      boots: [3047],
      spells: [4, 12],
    },
  ],
  Support: [
    // 1. ENCHANT (Moonstone + Ardent + Redemption)
    {
      starting: [3865, 2003, 2003],
      core: [6617, 3504, 3107],
      buildOrder: [3865, 3158, 6617, 3504, 3107, 6653],
      fullBuild: [3871, 3158, 6617, 3504, 3107, 6653],
      boots: [3158],
      spells: [4, 3],
    },
    // 2. PEEL (Locket + Zekes + Knights Vow)
    {
      starting: [3865, 2003, 2003],
      core: [3190, 3050, 3109],
      buildOrder: [3865, 3047, 3190, 3050, 3109, 3110],
      fullBuild: [3870, 3047, 3190, 3050, 3109, 3110],
      boots: [3047],
      spells: [4, 14],
    },
    // 3. POKE (Imperial Mandate + Rylais + Cryptbloom)
    {
      starting: [3865, 2003, 2003],
      core: [6653, 3116, 3118],
      buildOrder: [3865, 3020, 6653, 3116, 3118, 3157],
      fullBuild: [3869, 3020, 6653, 3116, 3118, 3157],
      boots: [3020],
      spells: [4, 14],
    },
  ],
}

export interface ArchetypeRunePreset {
  primaryStyleId: number
  primaryStyleName: string
  keystoneId: number
  selectedPerkIds: number[]
  subStyleId: number
  subStyleName: string
  subPerkIds: number[]
  statShards?: { offense: number; flex: number; defense: number }
}

export const CLASS_RUNE_PRESETS: Record<
  string,
  [ArchetypeRunePreset, ArchetypeRunePreset, ArchetypeRunePreset]
> = {
  Marksman: [
    // 1. CRIT (Lethal Tempo / Fleet + Inspiration)
    {
      primaryStyleId: 8000,
      primaryStyleName: 'Precision',
      keystoneId: 8008, // Lethal Tempo
      selectedPerkIds: [9111, 9104, 8017], // Triumph, Legend: Alacrity, Cut Down
      subStyleId: 8300,
      subStyleName: 'Inspiration',
      subPerkIds: [8304, 8347], // Magical Footwear, Cosmic Insight
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
    // 2. ON-HIT (Press the Attack + Domination)
    {
      primaryStyleId: 8000,
      primaryStyleName: 'Precision',
      keystoneId: 8005, // Press the Attack
      selectedPerkIds: [9111, 9104, 8299], // Triumph, Legend: Alacrity, Last Stand
      subStyleId: 8100,
      subStyleName: 'Domination',
      subPerkIds: [8139, 8138], // Taste of Blood, Eyeball Collection
      statShards: { offense: 5005, flex: 5008, defense: 5001 },
    },
    // 3. POKE (Arcane Comet + Domination)
    {
      primaryStyleId: 8200,
      primaryStyleName: 'Sorcery',
      keystoneId: 8229, // Arcane Comet
      selectedPerkIds: [8226, 8210, 8237], // Manaflow Band, Transcendence, Scorch
      subStyleId: 8100,
      subStyleName: 'Domination',
      subPerkIds: [8126, 8106], // Cheap Shot, Ultimate Hunter
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
  ],
  Mage: [
    // 1. BURST (Electrocute + Sorcery)
    {
      primaryStyleId: 8100,
      primaryStyleName: 'Domination',
      keystoneId: 8112, // Electrocute
      selectedPerkIds: [8139, 8138, 8106], // Taste of Blood, Eyeball, Ultimate Hunter
      subStyleId: 8200,
      subStyleName: 'Sorcery',
      subPerkIds: [8226, 8210], // Manaflow Band, Transcendence
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
    // 2. ROAM (Dark Harvest + Precision)
    {
      primaryStyleId: 8100,
      primaryStyleName: 'Domination',
      keystoneId: 8128, // Dark Harvest
      selectedPerkIds: [8126, 8138, 8105], // Cheap Shot, Eyeball, Relentless Hunter
      subStyleId: 8000,
      subStyleName: 'Precision',
      subPerkIds: [8009, 8014], // Presence of Mind, Coup de Grace
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
    // 3. DUEL (Summon Aery + Resolve)
    {
      primaryStyleId: 8200,
      primaryStyleName: 'Sorcery',
      keystoneId: 8214, // Summon Aery
      selectedPerkIds: [8226, 8210, 8237], // Manaflow, Transcendence, Scorch
      subStyleId: 8400,
      subStyleName: 'Resolve',
      subPerkIds: [8444, 8451], // Second Wind, Overgrowth
      statShards: { offense: 5008, flex: 5008, defense: 5011 },
    },
  ],
  Fighter: [
    // 1. BRUISER (Conqueror + Resolve)
    {
      primaryStyleId: 8000,
      primaryStyleName: 'Precision',
      keystoneId: 8010, // Conqueror
      selectedPerkIds: [9111, 9105, 8299], // Triumph, Legend: Haste, Last Stand
      subStyleId: 8400,
      subStyleName: 'Resolve',
      subPerkIds: [8444, 8451], // Second Wind, Overgrowth
      statShards: { offense: 5008, flex: 5008, defense: 5011 },
    },
    // 2. SUSTAIN (Grasp of the Undying + Precision)
    {
      primaryStyleId: 8400,
      primaryStyleName: 'Resolve',
      keystoneId: 8437, // Grasp
      selectedPerkIds: [8446, 8444, 8453], // Demolish, Second Wind, Revitalize
      subStyleId: 8000,
      subStyleName: 'Precision',
      subPerkIds: [9111, 9103], // Triumph, Legend: Bloodline
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
    // 3. LETHAL (Electrocute + Precision)
    {
      primaryStyleId: 8100,
      primaryStyleName: 'Domination',
      keystoneId: 8112, // Electrocute
      selectedPerkIds: [8143, 8138, 8105], // Sudden Impact, Eyeball, Relentless Hunter
      subStyleId: 8000,
      subStyleName: 'Precision',
      subPerkIds: [9111, 8014], // Triumph, Coup de Grace
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
  ],
  Assassin: [
    // 1. BURST (Electrocute + Precision)
    {
      primaryStyleId: 8100,
      primaryStyleName: 'Domination',
      keystoneId: 8112, // Electrocute
      selectedPerkIds: [8143, 8138, 8106],
      subStyleId: 8000,
      subStyleName: 'Precision',
      subPerkIds: [9111, 8014],
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
    // 2. ROAM (Dark Harvest + Sorcery)
    {
      primaryStyleId: 8100,
      primaryStyleName: 'Domination',
      keystoneId: 8128, // Dark Harvest
      selectedPerkIds: [8126, 8138, 8105],
      subStyleId: 8200,
      subStyleName: 'Sorcery',
      subPerkIds: [8234, 8232], // Celerity, Waterwalking
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
    // 3. DUEL (Conqueror + Resolve)
    {
      primaryStyleId: 8000,
      primaryStyleName: 'Precision',
      keystoneId: 8010, // Conqueror
      selectedPerkIds: [9111, 9104, 8299],
      subStyleId: 8400,
      subStyleName: 'Resolve',
      subPerkIds: [8473, 8451], // Bone Plating, Overgrowth
      statShards: { offense: 5008, flex: 5008, defense: 5011 },
    },
  ],
  Tank: [
    // 1. ARMOR (Grasp + Inspiration)
    {
      primaryStyleId: 8400,
      primaryStyleName: 'Resolve',
      keystoneId: 8437,
      selectedPerkIds: [8446, 8429, 8451],
      subStyleId: 8300,
      subStyleName: 'Inspiration',
      subPerkIds: [8304, 8347],
      statShards: { offense: 5008, flex: 5011, defense: 5001 },
    },
    // 2. ENGAGE (Aftershock + Domination)
    {
      primaryStyleId: 8400,
      primaryStyleName: 'Resolve',
      keystoneId: 8439, // Aftershock
      selectedPerkIds: [8401, 8444, 8451],
      subStyleId: 8100,
      subStyleName: 'Domination',
      subPerkIds: [8126, 8106],
      statShards: { offense: 5008, flex: 5011, defense: 5001 },
    },
    // 3. SUSTAIN (Guardian + Precision)
    {
      primaryStyleId: 8400,
      primaryStyleName: 'Resolve',
      keystoneId: 8465, // Guardian
      selectedPerkIds: [8463, 8444, 8453],
      subStyleId: 8000,
      subStyleName: 'Precision',
      subPerkIds: [9111, 9105],
      statShards: { offense: 5008, flex: 5011, defense: 5001 },
    },
  ],
  Support: [
    // 1. ENCHANT (Aery + Resolve)
    {
      primaryStyleId: 8200,
      primaryStyleName: 'Sorcery',
      keystoneId: 8214,
      selectedPerkIds: [8226, 8210, 8236],
      subStyleId: 8400,
      subStyleName: 'Resolve',
      subPerkIds: [8463, 8453],
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
    // 2. PEEL (Guardian + Inspiration)
    {
      primaryStyleId: 8400,
      primaryStyleName: 'Resolve',
      keystoneId: 8465,
      selectedPerkIds: [8463, 8444, 8453],
      subStyleId: 8300,
      subStyleName: 'Inspiration',
      subPerkIds: [8304, 8347],
      statShards: { offense: 5008, flex: 5011, defense: 5001 },
    },
    // 3. POKE (Comet + Domination)
    {
      primaryStyleId: 8200,
      primaryStyleName: 'Sorcery',
      keystoneId: 8229,
      selectedPerkIds: [8226, 8210, 8237],
      subStyleId: 8100,
      subStyleName: 'Domination',
      subPerkIds: [8126, 8106],
      statShards: { offense: 5008, flex: 5008, defense: 5001 },
    },
  ],
}
