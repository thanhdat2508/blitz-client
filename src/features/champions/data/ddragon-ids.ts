/**
 * DDragon perk ID → icon URL + display name mapping.
 * Perk icons follow: https://ddragon.canisback.com/img/perk-images/...
 * Tree icons follow: https://ddragon.leagueoflegends.com/cdn/img/perk-images/...
 */

export const DDRAGON_IMG = 'https://ddragon.canisback.com/img'

// Tree/Style IDs
export const RUNE_STYLE_ICON: Record<number, string> = {
  8000: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png`,
  8100: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png`,
  8200: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png`,
  8300: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png`,
  8400: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png`,
}

export const RUNE_STYLE_NAME: Record<number, { en: string; vi: string; color: string }> = {
  8000: { en: 'Precision', vi: 'Chuẩn Xác', color: '#C89B3C' },
  8100: { en: 'Domination', vi: 'Áp Đảo', color: '#E84057' },
  8200: { en: 'Sorcery', vi: 'Pháp Thuật', color: '#9B77D1' },
  8300: { en: 'Inspiration', vi: 'Cảm Hứng', color: '#49AEB0' },
  8400: { en: 'Resolve', vi: 'Kiên Định', color: '#6CAE3B' },
}

// Perk ID → { icon path, name }
export interface PerkInfo {
  iconUrl: string
  name: string
}

export const PERK_DATA: Record<number, PerkInfo> = {
  // ── Precision keystones
  8005: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png`, name: 'Press the Attack' },
  8008: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png`, name: 'Lethal Tempo' },
  8021: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png`, name: 'Fleet Footwork' },
  8010: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/Conqueror/Conqueror.png`, name: 'Conqueror' },

  // ── Precision row 1
  9101: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/Overheal.png`, name: 'Overheal' },
  9111: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/Triumph.png`, name: 'Triumph' },
  8009: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png`, name: 'Presence of Mind' },
  // ── Precision row 2
  9104: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png`, name: 'Legend: Alacrity' },
  9105: { iconUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/legendhaste/legendhaste.png', name: 'Legend: Haste' },
  9103: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png`, name: 'Legend: Bloodline' },
  // ── Precision row 3
  8014: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png`, name: 'Coup de Grace' },
  8017: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Precision/CutDown/CutDown.png`, name: 'Cut Down' },
  8299: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/LastStand/LastStand.png`, name: 'Last Stand' },

  // ── Domination keystones
  8112: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/Electrocute/Electrocute.png`, name: 'Electrocute' },
  8124: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/Predator/Predator.png`, name: 'Predator' },
  8128: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png`, name: 'Dark Harvest' },
  9923: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png`, name: 'Hail of Blades' },

  // ── Domination row 1
  8126: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/CheapShot/CheapShot.png`, name: 'Cheap Shot' },
  8139: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png`, name: 'Taste of Blood' },
  8143: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png`, name: 'Sudden Impact' },
  // ── Domination row 2
  8136: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/ZombieWard/ZombieWard.png`, name: 'Zombie Ward' },
  8120: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/GhostPoro/GhostPoro.png`, name: 'Ghost Poro' },
  8138: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png`, name: 'Eyeball Collection' },
  // ── Domination row 3
  8135: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png`, name: 'Treasure Hunter' },
  8134: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/IngeniousHunter/IngeniousHunter.png`, name: 'Ingenious Hunter' },
  8105: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png`, name: 'Relentless Hunter' },
  8106: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png`, name: 'Ultimate Hunter' },

  // ── Sorcery keystones
  8214: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/SummonAery/SummonAery.png`, name: 'Summon Aery' },
  8229: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png`, name: 'Arcane Comet' },
  8230: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png`, name: 'Phase Rush' },

  // ── Sorcery row 1
  8224: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/NullifyingOrb/Pokeshield.png`, name: 'Nullifying Orb' },
  8226: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png`, name: 'Manaflow Band' },
  8275: { iconUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/nimbuscloak/6361.png', name: 'Nimbus Cloak' },
  // ── Sorcery row 2
  8210: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/Transcendence/Transcendence.png`, name: 'Transcendence' },
  8234: { iconUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/celerity/celeritytemp.png', name: 'Celerity' },
  8233: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png`, name: 'Absolute Focus' },
  // ── Sorcery row 3
  8237: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/Scorch/Scorch.png`, name: 'Scorch' },
  8232: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png`, name: 'Waterwalking' },
  8236: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png`, name: 'Gathering Storm' },

  // ── Resolve keystones
  8437: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png`, name: 'Grasp of the Undying' },
  8439: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png`, name: 'Aftershock' },
  8465: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/Guardian/Guardian.png`, name: 'Guardian' },

  // ── Resolve row 1
  8446: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/Demolish/Demolish.png`, name: 'Demolish' },
  8463: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png`, name: 'Font of Life' },
  8401: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/MirrorShell/MirrorShell.png`, name: 'Shield Bash' },
  // ── Resolve row 2
  8429: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/Conditioning/Conditioning.png`, name: 'Conditioning' },
  8444: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/SecondWind/SecondWind.png`, name: 'Second Wind' },
  8473: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/BonePlating/BonePlating.png`, name: 'Bone Plating' },
  // ── Resolve row 3
  8451: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/Overgrowth/Overgrowth.png`, name: 'Overgrowth' },
  8453: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/Revitalize/Revitalize.png`, name: 'Revitalize' },
  8242: { iconUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/unflinching/unflinching.png', name: 'Unflinching' },

  // ── Inspiration keystones
  8351: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png`, name: 'Glacial Augment' },
  8360: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png`, name: 'Unsealed Spellbook' },
  8369: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png`, name: 'First Strike' },

  // ── Inspiration row 1
  8306: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png`, name: 'Hextech Flashtraption' },
  8304: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png`, name: 'Magical Footwear' },
  8313: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png`, name: 'Perfect Timing' },
  // ── Inspiration row 2
  8321: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png`, name: "Future's Market" },
  8316: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/MinionDematerializer/MinionDematerializer.png`, name: 'Minion Dematerializer' },
  8345: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png`, name: 'Biscuit Delivery' },
  // ── Inspiration row 3
  8347: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png`, name: 'Cosmic Insight' },
  8410: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Resolve/ApproachVelocity/ApproachVelocity.png`, name: 'Approach Velocity' },
  9422: { iconUrl: `${DDRAGON_IMG}/perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png`, name: 'Time Warp Tonic' },
}

// ── Stat shards (IDs 5001-5013)
export const STAT_SHARD_DATA: Record<number, PerkInfo> = {
  5001: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsHealthScalingIcon.png`,
    name: '+10-180 Scaling Health',
  },
  5002: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsArmorIcon.png`,
    name: '+6 Armor',
  },
  5003: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsMagicResIcon.MagicResist_fix.png`,
    name: '+8 Magic Resist',
  },
  5005: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAttackSpeedIcon.png`,
    name: '+10% Attack Speed',
  },
  5007: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsCDRScalingIcon.png`,
    name: '+8 Ability Haste',
  },
  5008: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png`,
    name: '+9 Adaptive Force',
  },
  5010: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsMovementSpeedIcon.png`,
    name: '+2% Movement Speed',
  },
  5011: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsHealthPlusIcon.png`,
    name: '+65 Base Health',
  },
  5013: {
    iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsTenacityIcon.png`,
    name: '+10% Tenacity',
  },
}

export function getPerkInfo(id: number): PerkInfo {
  return (
    PERK_DATA[id] ??
    STAT_SHARD_DATA[id] ?? {
      iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png`,
      name: `Perk ${id}`,
    }
  )
}

export function getStatShardInfo(id: number): PerkInfo {
  return (
    STAT_SHARD_DATA[id] ?? {
      iconUrl: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png`,
      name: `Shard ${id}`,
    }
  )
}

// Spell ID → spell key (for DDragon image URL)
export const SPELL_ID_TO_KEY: Record<number, string> = {
  1: 'SummonerBoost',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  11: 'SummonerSmite',
  12: 'SummonerTeleport',
  13: 'SummonerMana',
  14: 'SummonerDot',
  21: 'SummonerBarrier',
  32: 'SummonerSnowball',
}

export function getSpellIconUrl(spellId: number, version = '14.24.1'): string {
  const key = SPELL_ID_TO_KEY[spellId] ?? 'SummonerFlash'
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${key}.png`
}

export function getItemIconUrl(itemId: number, version = '14.24.1'): string {
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`
}

export const ITEM_NAMES: Record<number, { en: string; vi: string }> = {
  1054: { en: "Doran's Shield", vi: 'Khiên Doran' },
  1055: { en: "Doran's Blade", vi: 'Kiếm Doran' },
  1056: { en: "Doran's Ring", vi: 'Nhẫn Doran' },
  2003: { en: 'Health Potion', vi: 'Bình Máu' },
  1001: { en: 'Boots', vi: 'Giày Thường' },
  3006: { en: "Berserker's Greaves", vi: 'Giày Cuồng Nộ' },
  3009: { en: 'Boots of Swiftness', vi: 'Giày Bạc' },
  3020: { en: "Sorcerer's Shoes", vi: 'Giày Pháp Sư' },
  3047: { en: 'Plated Steelcaps', vi: 'Giày Thép Gai' },
  3111: { en: "Mercury's Treads", vi: 'Giày Thủy Ngân' },
  3158: { en: 'Ionian Boots of Lucidity', vi: 'Giày Khai Sáng Ionia' },
  3078: { en: 'Trinity Force', vi: 'Tam Hợp Kiếm' },
  3053: { en: "Sterak's Gage", vi: 'Móng Vuốt Sterak' },
  3071: { en: 'Black Cleaver', vi: 'Rìu Đen' },
  3026: { en: 'Guardian Angel', vi: 'Giáp Thiên Thần' },
  3075: { en: 'Thornmail', vi: 'Giáp Gai' },
  3065: { en: 'Spirit Visage', vi: 'Giáp Tâm Linh' },
  3143: { en: "Randuin's Omen", vi: 'Khiên Băng Randuin' },
  3142: { en: "Youmuu's Ghostblade", vi: 'Kiếm Ma Youmuu' },
  6676: { en: 'The Collector', vi: 'Thu Thập Chiến Tích' },
  3814: { en: 'Edge of Night', vi: 'Áo Choàng Bóng Tối' },
  3031: { en: 'Infinity Edge', vi: 'Vô Cực Kiếm' },
  3036: { en: "Lord Dominik's Regards", vi: 'Nỏ Thần Dominik' },
  3067: { en: 'Kindlegem', vi: 'Hỏa Ngọc' },
  3089: { en: "Rabadon's Deathcap", vi: 'Mũ Phù Thủy Rabadon' },
  3157: { en: "Zhonya's Hourglass", vi: 'Đồng Hồ Cát Zhonya' },
  3135: { en: 'Void Staff', vi: 'Trượng Hư Vô' },
  3285: { en: "Luden's Companion", vi: 'Súng Điện Luden' },
  4645: { en: 'Shadowflame', vi: 'Ngọn Lửa Hắc Hóa' },
  3865: { en: 'World Atlas', vi: 'Bản Đồ Thế Giới' },
  3869: { en: 'Solstice Sleigh', vi: 'Cỗ Xe Mùa Đông' },
  3190: { en: 'Locket of the Iron Solari', vi: 'Dây Chuyền Iron Solari' },
  3107: { en: 'Redemption', vi: 'Dây Chuyền Chuộc Tội' },
  3222: { en: "Mikael's Blessing", vi: 'Hòm Bảo Hộ Mikael' },
  3110: { en: 'Frozen Heart', vi: 'Tim Băng' },
  3340: { en: 'Stealth Ward', vi: 'Mắt Vật Tổ' },
}

export function getItemName(itemId: number, lang: 'en' | 'vi' = 'en'): string {
  const item = ITEM_NAMES[itemId]
  if (item) return lang === 'en' ? item.en : item.vi
  return `Item #${itemId}`
}

/**
 * Riot Data Dragon CDN champion key mapping.
 * Filenames are case-sensitive PascalCase and require specific aliases.
 */
export const SPECIAL_DDRAGON_CHAMPIONS: Record<string, string> = {
  wukong: 'MonkeyKing',
  monkeyking: 'MonkeyKing',
  renataglasc: 'Renata',
  renata: 'Renata',
  nunu: 'Nunu',
  nunuwillump: 'Nunu',
  belveth: 'Belveth',
  chogath: 'Chogath',
  drmundo: 'DrMundo',
  jarvaniv: 'JarvanIV',
  kaisa: 'Kaisa',
  khazix: 'Khazix',
  kogmaw: 'KogMaw',
  ksante: 'KSante',
  leblanc: 'Leblanc',
  leesin: 'LeeSin',
  masteryi: 'MasterYi',
  missfortune: 'MissFortune',
  tahmkench: 'TahmKench',
  twistedfate: 'TwistedFate',
  velkoz: 'Velkoz',
  xinzhao: 'XinZhao',
  aurelionsol: 'AurelionSol',
}

export function getCanonicalChampionKey(rawKey?: string): string {
  if (!rawKey) return 'Quinn'
  const cleaned = rawKey.toLowerCase().replace(/[^a-z0-9]/g, '')
  if (SPECIAL_DDRAGON_CHAMPIONS[cleaned]) {
    return SPECIAL_DDRAGON_CHAMPIONS[cleaned]
  }
  return rawKey.charAt(0).toUpperCase() + rawKey.slice(1)
}

export function getChampionAvatarUrl(championIdOrName?: string, version = '14.24.1'): string {
  const canonical = getCanonicalChampionKey(championIdOrName)
  return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${canonical}.png`
}

export function getChampionSplashUrl(championIdOrName?: string): string {
  const canonical = getCanonicalChampionKey(championIdOrName)
  return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${canonical}_0.jpg`
}

