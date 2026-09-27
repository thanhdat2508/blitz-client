import type { ChampionMeta } from '../types/champion'
import { getAvatar, getSplash, getItem } from './helpers'

export const SUPPORT_CHAMPIONS: ChampionMeta[] = [
  {
    id: 'Thresh',
    name: 'Thresh',
    title: 'Cai Ngục Xiềng Xích',
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
        primaryTree: 'Kiên Định (Resolve)',
        keystone: {
          name: 'Dư Chấn (Aftershock)',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
        },
        primaryRunes: ['Nguồn Sống', 'Kiểm Soát Điều Kiện', 'Lan Tràn'],
        secondaryTree: 'Cảm Hứng (Inspiration)',
        secondaryRunes: ['Tốc Biến Ma Thuật', 'Thấu Thị Vũ Trụ'],
        shards: ['+8 Điểm Hồi Kỹ Năng', '+6 Giáp', '+65 Máu'],
      },
      items: {
        starting: [
          { name: 'Bản Đồ Thế Giới', iconUrl: getItem('3865') },
          { name: 'Bình Máu', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Dây Chuyền Iron Solari', iconUrl: getItem('3190'), winRate: 52.8 },
          { name: 'Lời Thề Hiệp Sĩ', iconUrl: getItem('3050'), winRate: 54.6 },
          { name: 'Tụ Bão Zeke', iconUrl: getItem('3050'), winRate: 53.9 },
        ],
        boots: [
          { name: 'Giày Cơ Động', iconUrl: getItem('3117') },
        ],
        situational: [
          { name: 'Tim Băng', iconUrl: getItem('3110'), winRate: 54.2 },
          { name: 'Giáp Gai', iconUrl: getItem('3075'), winRate: 52.0 },
          { name: 'Mặt Nạ Vực Thẳm', iconUrl: getItem('8020'), winRate: 55.1 },
        ],
      },
      strengths: [
        'Bộ kỹ năng hỗ trợ toàn diện: Mở combat, cứu đồng minh, ngắt lướt địch',
        'Lồng Đèn W cứu nguy hoặc mở gank bất ngờ',
        'Tăng giáp và AP vô hạn từ linh hồn',
      ],
      weaknesses: [
        'Mỏng manh đầu trận trước khi tích đủ linh hồn',
        'Nếu kéo Q hụt sẽ mất hoàn toàn áp lực đường',
      ],
      keyTips: [
        'Dùng Lưỡi Hái Xoáy E để ngắt các chiêu lướt của địch',
        'Ném W về phía sau để rừng nhặt lồng đèn bay thẳng vào gank',
      ],
    },
  },
  {
    id: 'Nautilus',
    name: 'Nautilus',
    title: 'Khổng Lồ Biển Sâu',
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
        primaryTree: 'Kiên Định (Resolve)',
        keystone: {
          name: 'Dư Chấn',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
        },
        primaryRunes: ['Nện Khiên', 'Kiểm Soát Điều Kiện', 'Lan Tràn'],
        secondaryTree: 'Cảm Hứng (Inspiration)',
        secondaryRunes: ['Tốc Biến Ma Thuật', 'Thấu Thị Vũ Trụ'],
        shards: ['+8 Điểm Hồi Kỹ Năng', '+6 Giáp', '+65 Máu'],
      },
      items: {
        starting: [
          { name: 'Bản Đồ Thế Giới', iconUrl: getItem('3865') },
          { name: 'Bình Máu', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Tụ Bão Zeke', iconUrl: getItem('3050'), winRate: 52.9 },
          { name: 'Dây Chuyền Iron Solari', iconUrl: getItem('3190'), winRate: 53.7 },
          { name: 'Lời Thề Hiệp Sĩ', iconUrl: getItem('3050'), winRate: 54.2 },
        ],
        boots: [
          { name: 'Giày Cơ Động', iconUrl: getItem('3117') },
        ],
        situational: [
          { name: 'Tim Băng', iconUrl: getItem('3110'), winRate: 53.5 },
          { name: 'Giáp Gai', iconUrl: getItem('3075'), winRate: 51.8 },
          { name: 'Khiên Băng Randuin', iconUrl: getItem('3143'), winRate: 52.4 },
        ],
      },
      strengths: [
        'Vua khống chế với 4 hiệu ứng khóa mục tiêu',
        'Chiêu cuối R chỉ định không thể né tránh',
        'Lá chắn W đem lại độ trâu bò rất lớn',
      ],
      weaknesses: [
        'Nếu kéo Q trúng tường hoặc sai mục tiêu sẽ bị kéo vào thế bất lợi',
        'Hoạt ảnh ra đòn tương đối chậm',
      ],
      keyTips: [
        'Kéo Q vào tường địa hình để rút ngắn quãng đường di chuyển',
        'Khóa chết chủ lực đối thủ bằng chiêu cuối R ngay đầu giao tranh',
      ],
    },
  },
]
