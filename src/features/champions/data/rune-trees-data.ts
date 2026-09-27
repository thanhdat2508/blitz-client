export interface RuneDefinition {
  id: string
  name: string
  enName: string
  icon: string
  desc: string
  enDesc?: string
  cooldown?: string
  winRate?: number
  matches?: number
  pickRate?: number
}

export interface RuneTreeDefinition {
  id: 'precision' | 'domination' | 'sorcery' | 'resolve' | 'inspiration'
  name: string
  enName: string
  icon: string
  color: string
  ringColor: string
  shadowColor: string
  keystones: RuneDefinition[]
  slots: [RuneDefinition[], RuneDefinition[], RuneDefinition[]]
}

export const RUNE_TREES: Record<string, RuneTreeDefinition> = {
  precision: {
    id: 'precision',
    name: 'Chuẩn Xác',
    enName: 'Precision',
    icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7201_Precision.png',
    color: 'text-amber-400',
    ringColor: 'border-amber-400 ring-amber-400/40',
    shadowColor: 'shadow-amber-500/30',
    keystones: [
      {
        id: 'pta',
        name: 'Sẵn Sàng Tấn Công',
        enName: 'Press the Attack',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png',
        desc: 'Đánh trúng 3 đòn liên tiếp gây thêm sát thương và khiến mục tiêu suy yếu.',
        enDesc: 'Hitting an enemy champion with 3 consecutive basic attacks deals bonus adaptive damage and causes them to take 8% increased damage for 5s.',
      },
      {
        id: 'lethal-tempo',
        name: 'Nhịp Độ Chết Người',
        enName: 'Lethal Tempo',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png',
        desc: 'Nhận tốc độ đánh khi tấn công tướng địch, cộng dồn tối đa 6 lần.',
        enDesc: 'Attacking an enemy champion grants stacking Attack Speed up to 6 times. At max stacks, attacks deal bonus adaptive on-hit damage.',
      },
      {
        id: 'fleet',
        name: 'Bước Chân Thần Tốc',
        enName: 'Fleet Footwork',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png',
        desc: 'Tích điểm khi di chuyển để hồi máu và tăng tốc độ chạy.',
        enDesc: 'Moving and attacking generates Energized stacks. At 100 stacks, your next attack heals you and grants +20% Move Speed for 1.25s.',
      },
      {
        id: 'conqueror',
        name: 'Chinh Phục',
        enName: 'Conqueror',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
        desc: 'Cộng dồn sức mạnh thích ứng khi gây sát thương lên tướng.',
        enDesc: 'Basic attacks and abilities grant stacks of Adaptive Force. At 12 stacks, heal for 8% of damage dealt to enemy champions.',
      },
    ],
    slots: [
      [
        {
          id: 'absorb-life',
          name: 'Hấp Thu Sinh Lực',
          enName: 'Absorb Life',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Overheal.png',
          desc: 'Tiêu diệt mục tiêu giúp hồi phục một lượng máu nhỏ.',
        enDesc: 'Killing a non-champion or champion target restores 2-17 health (based on level).',
        },
        {
          id: 'triumph',
          name: 'Đắc Thắng',
          enName: 'Triumph',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Triumph.png',
          desc: 'Tham gia hạ gục hồi máu đã mất và nhận thêm 20 vàng.',
        enDesc: 'Takedowns on enemy champions restore 2.5% max health + 5% missing health, and grant an additional 20 gold.',
        },
        {
          id: 'pom',
          name: 'Hiện Diện Trí Tuệ',
          enName: 'Presence of Mind',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png',
          desc: 'Tăng hồi năng lượng/nội năng khi gây sát thương lên tướng.',
        enDesc: 'Damaging an enemy champion restores mana or energy over 4s. Takedowns restore 15% of your maximum mana or energy.',
        },
      ],
      [
        {
          id: 'alacrity',
          name: 'Huyền Thoại: Tốc Độ Đánh',
          enName: 'Legend: Alacrity',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png',
          desc: 'Nhận thêm tốc độ đánh vĩnh viễn khi tham gia hạ gục.',
        enDesc: 'Gain 3% bonus Attack Speed plus an additional 1.5% per Legend stack, up to 18% at 10 stacks.',
        },
        {
          id: 'haste',
          name: 'Huyền Thoại: Gia Tốc',
          enName: 'Legend: Haste',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/LegendHaste/LegendHaste.png',
          desc: 'Nhận thêm điểm hồi kỹ năng cơ bản khi tham gia hạ gục.',
        enDesc: 'Gain 1.5 basic ability haste per Legend stack, up to 15 basic ability haste at 10 stacks.',
        },
        {
          id: 'bloodline',
          name: 'Huyền Thoại: Hút Máu',
          enName: 'Legend: Bloodline',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/LegendBloodline/LegendBloodline.png',
          desc: 'Nhận thêm hút máu vĩnh viễn và máu tối đa khi đạt tối đa cộng dồn.',
        enDesc: 'Gain 0.35% Life Steal per Legend stack, up to 5.25% Life Steal and +85 max Health at 15 stacks.',
        },
      ],
      [
        {
          id: 'coup',
          name: 'Nhát Chém Ân Huệ',
          enName: 'Coup de Grace',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png',
          desc: 'Gây thêm 8% sát thương lên tướng dưới 40% máu.',
        enDesc: 'Deal 8% increased damage to champions below 40% maximum health.',
        },
        {
          id: 'cut-down',
          name: 'Đốn Hạ',
          enName: 'Cut Down',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/CutDown/CutDown.png',
          desc: 'Gây thêm sát thương lên tướng có nhiều máu hơn bạn.',
        enDesc: 'Deal 8% increased damage to enemy champions with more than 60% maximum health.',
        },
        {
          id: 'last-stand',
          name: 'Chốt Chặn Cuối Cùng',
          enName: 'Last Stand',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/LastStand/LastStand.png',
          desc: 'Gây thêm sát thương lên tướng khi bạn còn ít máu.',
        enDesc: 'Deal 5% to 11% increased damage to enemy champions while below 60% health (maximum at 30% health).',
        },
      ],
    ],
  },
  domination: {
    id: 'domination',
    name: 'Áp Đảo',
    enName: 'Domination',
    icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png',
    color: 'text-rose-400',
    ringColor: 'border-rose-500 ring-rose-500/40',
    shadowColor: 'shadow-rose-600/30',
    keystones: [
      {
        id: 'electrocute',
        name: 'Sốc Điện',
        enName: 'Electrocute',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/Electrocute/Electrocute.png',
        desc: 'Đánh trúng tướng bằng 3 đòn đánh hoặc kỹ năng gây sát thương thích ứng.',
        enDesc: 'Hitting a champion with 3 separate attacks or abilities within 3s deals bonus adaptive burst damage.',
      },
      {
        id: 'dark-harvest',
        name: 'Thu Thập Hắc Ám',
        enName: 'Dark Harvest',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png',
        desc: 'Gây sát thương lên tướng dưới 50% máu để thu thập linh hồn vĩnh viễn.',
        enDesc: 'Damaging a champion below 50% health deals bonus adaptive damage and reaps their soul, permanently empowering Dark Harvest.',
      },
      {
        id: 'hail-of-blades',
        name: 'Mưa Kiếm',
        enName: 'Hail of Blades',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png',
        desc: 'Tăng mạnh tốc độ đánh cho 3 đòn đánh đầu tiên lên tướng.',
        enDesc: 'Gain 110% Attack Speed for the first 3 basic attacks against enemy champions.',
      },
    ],
    slots: [
      [
        {
          id: 'cheap-shot',
          name: 'Phát Bắn Đơn Giản',
          enName: 'Cheap Shot',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/CheapShot/CheapShot.png',
          desc: 'Gây thêm sát thương chuẩn lên kẻ địch bị khống chế hoặc hạn chế di chuyển.',
        enDesc: 'Damaging enemy champions with impaired movement or actions deals 10-45 bonus true damage.',
        },
        {
          id: 'taste-blood',
          name: 'Vị Máu',
          enName: 'Taste of Blood',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png',
          desc: 'Hồi máu khi bạn gây sát thương lên tướng địch. Hồi phục: 16-40 (+0.1 SMCK cộng thêm, +0.05 SMPT) máu (theo cấp).',
          enDesc: 'Heal when you damage an enemy champion. Healing: 16-40 (+0.1 bonus AD, +0.05 AP) health (based on level)',
          cooldown: '20s',
          winRate: 56.1,
          matches: 21,
          pickRate: 0.48,
        },
        {
          id: 'sudden-impact',
          name: 'Tác Động Bất Chợt',
          enName: 'Sudden Impact',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png',
          desc: 'Sau khi lướt, nhảy hoặc tàng hình, đòn đánh tiếp theo gây thêm sát thương.',
        enDesc: 'After exiting stealth or using a dash, leap, or teleport, dealing damage to a champion deals 20-80 bonus true damage.',
        },
      ],
      [
        {
          id: 'zombie',
          name: 'Mắt Thây Ma',
          enName: 'Zombie Ward',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/ZombieWard/ZombieWard.png',
          desc: 'Phá mắt địch để tạo mắt thây ma và tăng sức mạnh thích ứng.',
        enDesc: 'Killing an enemy ward spawns a friendly Zombie Ward in its place and grants permanent Adaptive Force.',
        },
        {
          id: 'ghost-poro',
          name: 'Poro Cảnh Giới',
          enName: 'Ghost Poro',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/GhostPoro/GhostPoro.png',
          desc: 'Mắt hết hạn biến thành Poro soi sáng khu vực.',
        enDesc: 'When your wards expire, they leave behind a Ghost Poro that grants vision and permanent Adaptive Force.',
        },
        {
          id: 'eyeball',
          name: 'Thu Thập Nhãn Cầu',
          enName: 'Eyeball Collection',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png',
          desc: 'Thu thập nhãn cầu khi tham gia hạ gục để nhận vĩnh viễn AD hoặc AP.',
        enDesc: 'Collect 1 eyeball per champion takedown to gain permanent bonus Attack Damage or Ability Power.',
        },
      ],
      [
        {
          id: 'treasure',
          name: 'Thợ Săn Kho Báu',
          enName: 'Treasure Hunter',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/TreasureHunter/TreasureHunter.png',
          desc: 'Nhận thêm vàng thưởng trong lần hạ gục đầu tiên mỗi tướng địch.',
        enDesc: 'Gain bonus gold the first time you score a unique takedown on each enemy champion (up to 450 gold total).',
        },
        {
          id: 'relentless',
          name: 'Thợ Săn Tàn Nhẫn',
          enName: 'Relentless Hunter',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png',
          desc: 'Tăng tốc độ di chuyển ngoài giao tranh vĩnh viễn.',
        enDesc: 'Gain +5 out-of-combat Move Speed plus +8 per unique champion takedown (up to +45 MS).',
        },
        {
          id: 'ultimate',
          name: 'Thợ Săn Tối Thượng',
          enName: 'Ultimate Hunter',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png',
          desc: 'Giảm thời gian hồi chiêu cuối vĩnh viễn với mỗi tướng địch hạ gục.',
        enDesc: 'Gain +6 Ultimate Ability Haste plus +5 per unique champion takedown (up to +31 Ultimate Haste).',
        },
      ],
    ],
  },
  sorcery: {
    id: 'sorcery',
    name: 'Pháp Thuật',
    enName: 'Sorcery',
    icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7202_Sorcery.png',
    color: 'text-indigo-400',
    ringColor: 'border-indigo-400 ring-indigo-400/40',
    shadowColor: 'shadow-indigo-500/30',
    keystones: [
      {
        id: 'arcane-comet',
        name: 'Thiên Thạch Bí Ẩn',
        enName: 'Arcane Comet',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png',
        desc: 'Gây sát thương kỹ năng phóng một thiên thạch tới vị trí của kẻ địch.',
        enDesc: 'Damaging a champion with an ability hurls a comet at their location, dealing adaptive damage.',
      },
      {
        id: 'phase-rush',
        name: 'Tăng Tốc Pha',
        enName: 'Phase Rush',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png',
        desc: 'Đánh trúng tướng bằng 3 đòn riêng biệt tăng mạnh tốc độ di chuyển và kháng làm chậm.',
        enDesc: 'Hitting an enemy champion with 3 separate attacks or abilities grants +25-50% Move Speed and 75% Slow Resist.',
      },
      {
        id: 'summon-aery',
        name: 'Triệu Hồi Aery',
        enName: 'Summon Aery',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/SummonAery/SummonAery.png',
        desc: 'Aery bay tới gây sát thương lên địch hoặc tạo lá chắn cho đồng minh.',
        enDesc: 'Your attacks and abilities send Aery to damage enemy champions or grant shields to allies.',
      },
    ],
    slots: [
      [
        {
          id: 'nullifying',
          name: 'Quả Cầu Băng Giá',
          enName: 'Nullifying Orb',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/NullifyingOrb/PoroSnax.png',
          desc: 'Tự động tạo lá chắn phép khi chịu sát thương phép khiến máu xuống thấp.',
        enDesc: 'Gain a magic damage shield for 4s when taking magic damage that would reduce you below 30% health.',
        },
        {
          id: 'manaflow',
          name: 'Dải Băng Năng Lượng',
          enName: 'Manaflow Band',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png',
          desc: 'Dùng kỹ năng trúng tướng tăng tối đa năng lượng, tối đa 250 năng lượng.',
        enDesc: 'Hitting an enemy champion with an ability permanently increases your maximum mana by 25 (up to 250 max).',
        },
        {
          id: 'nimbus',
          name: 'Áo Choàng Mây Phủ',
          enName: 'Nimbus Cloak',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/NimbusCloak/6361.png',
          desc: 'Sau khi dùng phép bổ trợ, tăng tốc độ di chuyển và đi xuyên vật thể.',
        enDesc: 'After casting a summoner spell, gain a burst of +5-25% Move Speed and ghosting for 2s.',
        },
      ],
      [
        {
          id: 'transcendence',
          name: 'Thăng Tiến Sức Mạnh',
          enName: 'Transcendence',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/Transcendence/Transcendence.png',
          desc: 'Nhận điểm hồi kỹ năng ở cấp 5 và 8. Hạ gục hoàn trả hồi chiêu cơ bản ở cấp 11.',
        enDesc: 'Gain +5 Ability Haste at level 5, +5 at level 8. Champion takedowns reduce basic ability cooldowns by 20% at level 11.',
        },
        {
          id: 'celerity',
          name: 'Mau Lẹ',
          enName: 'Celerity',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/Celerity/CelerityTemp.png',
          desc: 'Tất cả hiệu ứng tăng tốc độ di chuyển hiệu quả hơn 7%.',
        enDesc: 'All movement speed bonuses are 7% more effective on you, and you gain +1% flat Move Speed.',
        },
        {
          id: 'absolute-focus',
          name: 'Tập Trung Tuyệt Đối',
          enName: 'Absolute Focus',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png',
          desc: 'Khi trên 70% máu, nhận thêm sức mạnh thích ứng.',
        enDesc: 'While above 70% maximum health, gain bonus Adaptive Force based on level.',
        },
      ],
      [
        {
          id: 'scorch',
          name: 'Thiêu Rụi',
          enName: 'Scorch',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/Scorch/Scorch.png',
          desc: 'Kỹ năng đầu tiên trúng tướng đốt cháy mục tiêu gây thêm sát thương phép.',
        enDesc: 'Your next damaging ability hits an enemy champion and burns them for bonus magic damage after 1s.',
        },
        {
          id: 'waterwalking',
          name: 'Thủy Thượng Phiêu',
          enName: 'Waterwalking',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/Waterwalking/Waterwalking.png',
          desc: 'Nhận tốc độ di chuyển và sức mạnh thích ứng khi ở trên sông.',
        enDesc: 'Gain +25 bonus Move Speed and Adaptive Force when in the river.',
        },
        {
          id: 'gathering-storm',
          name: 'Cuồng Phong Tích Tụ',
          enName: 'Gathering Storm',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/GatheringStorm/GatheringStorm.png',
          desc: 'Cứ mỗi 10 phút trôi qua nhận thêm lượng lớn AD hoặc AP vĩnh viễn.',
        enDesc: 'Every 10 minutes, gain escalating permanent bonus Attack Damage or Ability Power.',
        },
      ],
    ],
  },
  resolve: {
    id: 'resolve',
    name: 'Kiên Định',
    enName: 'Resolve',
    icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png',
    color: 'text-emerald-400',
    ringColor: 'border-emerald-400 ring-emerald-400/40',
    shadowColor: 'shadow-emerald-500/30',
    keystones: [
      {
        id: 'grasp',
        name: 'Quyền Năng Bất Diệt',
        enName: 'Grasp of the Undying',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png',
        desc: 'Cứ 4 giây trong giao tranh, đòn đánh tiếp theo hồi máu, gây thêm sát thương và tăng máu vĩnh viễn.',
        enDesc: 'Every 4s in combat, your next basic attack deals bonus magic damage, heals you, and grants permanent max health.',
      },
      {
        id: 'aftershock',
        name: 'Dư Chấn',
        enName: 'Aftershock',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
        desc: 'Sau khi làm bất động tướng địch, nhận thêm giáp, kháng phép rồi nổ sát thương xung quanh.',
        enDesc: 'After immobilizing an enemy champion, gain +35 (+80% bonus resists) Armor and Magic Resist, then detonate for magic damage.',
      },
      {
        id: 'guardian',
        name: 'Hộ Vệ',
        enName: 'Guardian',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/Guardian/Guardian.png',
        desc: 'Bảo vệ đồng minh ở gần. Nếu bạn hoặc đồng minh chịu sát thương, cả hai nhận lá chắn.',
        enDesc: 'Guard allies within 350 units. If either takes damage, both gain a shield and bonus Move Speed.',
      },
    ],
    slots: [
      [
        {
          id: 'demolish',
          name: 'Tàn Phá Hủy Diệt',
          enName: 'Demolish',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/Demolish/Demolish.png',
          desc: 'Tích tụ đòn tấn công cực mạnh lên trụ khi đứng gần.',
        enDesc: 'Charge up a powerful strike against enemy turrets when within 600 units, dealing massive physical damage.',
        },
        {
          id: 'font-of-life',
          name: 'Suối Nguồn Sinh Mệnh',
          enName: 'Font of Life',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/FontOfLife/FontOfLife.png',
          desc: 'Hạn chế di chuyển tướng địch hồi máu cho bạn và đồng minh gần nhất.',
        enDesc: 'Impairing the movement of an enemy champion heals you and nearby allies when attacking the target.',
        },
        {
          id: 'shield-bash',
          name: 'Nện Khiên',
          enName: 'Shield Bash',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/MirrorShell/MirrorShell.png',
          desc: 'Mỗi khi nhận lá chắn, đòn đánh tiếp theo gây thêm sát thương thích ứng.',
        enDesc: 'Whenever you gain a shield, your next basic attack against an enemy champion deals bonus adaptive damage.',
        },
      ],
      [
        {
          id: 'conditioning',
          name: 'Kiểm Soát Điều Kiện',
          enName: 'Conditioning',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/Conditioning/Conditioning.png',
          desc: 'Sau 12 phút nhận thêm 8 Giáp và Kháng Phép, đồng thời tăng 3% tổng Giáp và Kháng Phép.',
        enDesc: 'After 12 minutes, gain +8 Armor, +8 Magic Resist, and increase your total Armor and Magic Resist by 3%.',
        },
        {
          id: 'second-wind',
          name: 'Ngọn Gió Thứ Hai',
          enName: 'Second Wind',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/SecondWind/SecondWind.png',
          desc: 'Sau khi chịu sát thương từ tướng địch, hồi lại một phần máu đã mất trong 10 giây.',
        enDesc: 'After taking damage from an enemy champion, regenerate 3 + 4% missing health over 10s.',
        },
        {
          id: 'bone-plating',
          name: 'Giáp Cốt',
          enName: 'Bone Plating',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/BonePlating/BonePlating.png',
          desc: 'Sau khi chịu sát thương, 3 đòn đánh/kỹ năng tiếp theo của tướng địch bị giảm sát thương.',
        enDesc: 'After taking damage from an enemy champion, the next 3 attacks or spells deal 30-60 less damage.',
        },
      ],
      [
        {
          id: 'overgrowth',
          name: 'Lan Rộng',
          enName: 'Overgrowth',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/Overgrowth/Overgrowth.png',
          desc: 'Hấp thụ tinh hoa từ quái và lính chết xung quanh để tăng máu tối đa vĩnh viễn.',
        enDesc: 'Absorb life essence from nearby dying minions and monsters, gaining permanent maximum health.',
        },
        {
          id: 'revitalize',
          name: 'Tiếp Sức',
          enName: 'Revitalize',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/Revitalize/Revitalize.png',
          desc: 'Hồi máu và tạo lá chắn mạnh hơn 5%, tăng lên 10% khi mục tiêu dưới 40% máu.',
        enDesc: 'Heals and shields you cast or receive are 5% stronger, increased to 10% on targets below 40% health.',
        },
        {
          id: 'unflinching',
          name: 'Kiên Cường',
          enName: 'Unflinching',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/Unflinching/Unflinching.png',
          desc: 'Nhận thêm giáp và kháng phép khi bị dính khống chế.',
        enDesc: 'Gain +2-10 bonus Armor and Magic Resist while impaired by crowd control effects and for 2s after.',
        },
      ],
    ],
  },
  inspiration: {
    id: 'inspiration',
    name: 'Cảm Hứng',
    enName: 'Inspiration',
    icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7203_Whimsy.png',
    color: 'text-cyan-400',
    ringColor: 'border-cyan-400 ring-cyan-400/40',
    shadowColor: 'shadow-cyan-500/30',
    keystones: [
      {
        id: 'glacial',
        name: 'Nâng Cấp Băng Giá',
        enName: 'Glacial Augment',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png',
        desc: 'Làm bất động tướng địch bắn ra 3 vệt băng làm chậm và giảm sát thương của chúng.',
        enDesc: 'Immobilizing an enemy champion shoots 3 glacial rays, slowing enemies and reducing their damage dealt by 15%.',
      },
      {
        id: 'unsealed',
        name: 'Sách Phép',
        enName: 'Unsealed Spellbook',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png',
        desc: 'Đổi phép bổ trợ một lần khi ngoài giao tranh.',
        enDesc: 'Swap one of your summoner spells to any other summoner spell during the game while out of combat.',
      },
      {
        id: 'first-strike',
        name: 'Đòn Phủ Đầu',
        enName: 'First Strike',
        icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png',
        desc: 'Tấn công tướng địch trước nhận 5 vàng và tăng sát thương cộng thêm vàng dựa trên sát thương gây ra.',
        enDesc: 'Damaging an enemy champion first grants 5 gold and +7% bonus true damage for 3s, plus gold equal to 100% of bonus damage.',
      },
    ],
    slots: [
      [
        {
          id: 'hextech',
          name: 'Tốc Biến Ma Thuật',
          enName: 'Hextech Flashtraption',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/HextechFlashtraption/HextechFlashtraption.png',
          desc: 'Khi Tốc Biến đang hồi chiêu, nhận Tốc Biến Ma Thuật có thể vận sức.',
        enDesc: 'While Flash is on cooldown, channel for 2s to blink to a new location with Hexflash.',
        },
        {
          id: 'boots',
          name: 'Bước Chân Màu Nhiệm',
          enName: 'Magical Footwear',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png',
          desc: 'Nhận giày miễn phí ở phút 12 (giảm 45 giây mỗi lần hạ gục). Giày tăng thêm 10 tốc chạy.',
        enDesc: 'Receive slightly magical boots at 12 minutes for free (takedowns reduce time by 45s). Boots grant +10 extra Move Speed.',
        },
        {
          id: 'cash-back',
          name: 'Hoàn Tiền',
          enName: 'Cash Back',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/CashBack/CashBack.png',
          desc: 'Được hoàn lại 6% vàng khi mua trang bị Huyền Thoại.',
        enDesc: 'Gain a 6% gold refund whenever you purchase a Legendary item.',
        },
      ],
      [
        {
          id: 'tonic',
          name: 'Dược Phẩm Tối Thượng',
          enName: 'Triple Tonic',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/TripleTonic/TripleTonic.png',
          desc: 'Nhận các bình thuốc đặc biệt ở cấp 3, 6 và 9 để tăng chỉ số và kỹ năng.',
        enDesc: 'Receive Triple Tonic elixirs at levels 3, 6, and 9 granting adaptive force, bonus skill points, and gold.',
        },
        {
          id: 'time-warp',
          name: 'Thuốc Thời Gian',
          enName: 'Time Warp Tonic',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/TimeWarpTonic/TimeWarpTonic.png',
          desc: 'Dùng bình thuốc ngay lập tức hồi một phần máu/năng lượng và tăng tốc chạy.',
        enDesc: 'Consuming a potion immediately restores 20 health or mana and grants +2% Move Speed while active.',
        },
        {
          id: 'biscuits',
          name: 'Giao Hàng Bánh Quy',
          enName: 'Biscuit Delivery',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png',
          desc: 'Nhận bánh quy hồi máu và tăng năng lượng tối đa vĩnh viễn.',
        enDesc: 'Receive a Total Biscuit of Everlasting Will every 2 minutes up to 6 minutes, restoring missing health and mana.',
        },
      ],
      [
        {
          id: 'cosmic',
          name: 'Thấu Thị Vũ Trụ',
          enName: 'Cosmic Insight',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png',
          desc: 'Nhận điểm hồi phép bổ trợ và điểm hồi trang bị kích hoạt.',
        enDesc: 'Gain +18 Summoner Spell Haste and +10 Item Haste.',
        },
        {
          id: 'velocity',
          name: 'Vận Tốc Tiếp Cận',
          enName: 'Approach Velocity',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/ApproachVelocity/ApproachVelocity.png',
          desc: 'Tăng tốc độ di chuyển về phía tướng địch bị hạn chế di chuyển gần đó.',
        enDesc: 'Gain +7.5% Move Speed towards movement-impaired enemy champions (increased to +15% if impaired by you).',
        },
        {
          id: 'jack',
          name: 'Đa Dụng Tinh Thông',
          enName: 'Jack of All Trades',
          icon: 'https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/JackOfAllTrades/JackOfAllTrades.png',
          desc: 'Nhận sức mạnh thích ứng với mỗi chỉ số khác nhau nhận được từ trang bị.',
        enDesc: 'Gain +1 Ability Haste for each unique stat gained from purchased items. At 5 and 10 stacks, gain bonus Adaptive Force.',
        },
      ],
    ],
  },
}

export interface ShardDefinition {
  id: string
  name: string
  enName: string
  icon: string
  desc: string
  enDesc: string
}

export const STAT_SHARDS: [ShardDefinition[], ShardDefinition[], ShardDefinition[]] = [
  // Slot 1: Offense
  [
    {
      id: 'adaptive-1',
      name: '+9 Sức Mạnh Thích Ứng',
      enName: '+9 Adaptive Force',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png',
      desc: '+9 Sức mạnh Công kích hoặc +15 Sức mạnh Phép thuật',
      enDesc: '+9 Attack Damage or +15 Ability Power',
    },
    {
      id: 'attack-speed',
      name: '+10% Tốc Độ Đánh',
      enName: '+10% Attack Speed',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAttackSpeedIcon.png',
      desc: '+10% Tốc độ Đánh cộng thêm',
      enDesc: '+10% Bonus Attack Speed',
    },
    {
      id: 'ability-haste',
      name: '+8 Điểm Hồi Kỹ Năng',
      enName: '+8 Ability Haste',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsCDRScalingIcon.png',
      desc: '+8 Điểm Hồi Kỹ Năng',
      enDesc: '+8 Ability Haste',
    },
  ],
  // Slot 2: Flex
  [
    {
      id: 'adaptive-2',
      name: '+9 Sức Mạnh Thích Ứng',
      enName: '+9 Adaptive Force',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsAdaptiveForceIcon.png',
      desc: '+9 Sức mạnh Công kích hoặc +15 Sức mạnh Phép thuật',
      enDesc: '+9 Attack Damage or +15 Ability Power',
    },
    {
      id: 'move-speed',
      name: '+2% Tốc Độ Di Chuyển',
      enName: '+2% Move Speed',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsMovementSpeedIcon.png',
      desc: '+2% Tốc độ Di chuyển cộng thêm',
      enDesc: '+2% Bonus Movement Speed',
    },
    {
      id: 'scaling-hp-1',
      name: '+10-180 Máu Theo Cấp',
      enName: '+10-180 Scaling Health',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsHealthScalingIcon.png',
      desc: '+10 - 180 Máu tối đa (theo cấp độ tướng)',
      enDesc: '+10 - 180 Maximum Health (based on level)',
    },
  ],
  // Slot 3: Defense
  [
    {
      id: 'flat-hp',
      name: '+65 Máu Cơ Bản',
      enName: '+65 Flat Health',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsHealthPlusIcon.png',
      desc: '+65 Máu cơ bản ngay từ đầu trận',
      enDesc: '+65 Base Health from start',
    },
    {
      id: 'tenacity',
      name: '+10% Kháng Hiệu Ứng',
      enName: '+10% Tenacity & Slow Resist',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsTenacityIcon.png',
      desc: '+10% Kháng Hiệu ứng và Kháng Làm chậm',
      enDesc: '+10% Tenacity and Slow Resist',
    },
    {
      id: 'scaling-hp-2',
      name: '+10-180 Máu Theo Cấp',
      enName: '+10-180 Scaling Health',
      icon: 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatModsHealthScalingIcon.png',
      desc: '+10 - 180 Máu tối đa (theo cấp độ tướng)',
      enDesc: '+10 - 180 Maximum Health (based on level)',
    },
  ],
]

export function resolveTreeKey(treeName: string): keyof typeof RUNE_TREES {
  const lower = treeName.toLowerCase()
  if (lower.includes('chuẩn xác') || lower.includes('precision')) return 'precision'
  if (lower.includes('áp đảo') || lower.includes('domination')) return 'domination'
  if (lower.includes('pháp thuật') || lower.includes('sorcery')) return 'sorcery'
  if (lower.includes('kiên định') || lower.includes('resolve')) return 'resolve'
  return 'inspiration'
}
