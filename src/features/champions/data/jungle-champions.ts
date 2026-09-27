import type { ChampionMeta } from '../types/champion'
import { getAvatar, getSplash, getItem } from './helpers'

export const JUNGLE_CHAMPIONS: ChampionMeta[] = [
  {
    id: 'Rammus',
    name: 'Rammus',
    title: 'Tê Tê Gai',
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
        primaryTree: 'Kiên Định (Resolve)',
        keystone: {
          name: 'Dư Chấn',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png',
        },
        primaryRunes: ['Nguồn Sống', 'Kiểm Soát Điều Kiện', 'Lan Tràn'],
        secondaryTree: 'Chuẩn Xác (Precision)',
        secondaryRunes: ['Huyền Thoại: Tốc Độ Đánh', 'Đắc Thắng'],
        shards: ['+10% Tốc Độ Đánh', '+6 Giáp', '+6 Giáp'],
      },
      items: {
        starting: [
          { name: 'Mộc Long Con', iconUrl: getItem('1103') },
          { name: 'Bình Máu', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Giáp Gai', iconUrl: getItem('3075'), winRate: 54.8 },
          { name: 'Khiên Thái Dương', iconUrl: getItem('3068'), winRate: 55.4 },
          { name: 'Giáp Gia Tốc Hóa Kỹ', iconUrl: getItem('3742'), winRate: 56.1 },
        ],
        boots: [
          { name: 'Giày Thép Gai', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: 'Khiên Băng Randuin', iconUrl: getItem('3143'), winRate: 56.8 },
        ],
      },
      strengths: ['Khắc tinh số 1 của tất cả các xạ thủ và sát thủ AD', 'Tốc độ lăn Q gank bất ngờ'],
      weaknesses: ['Yếu trước sát thương phép thuật'],
      keyTips: ['Bật W và khiêu khích E xạ thủ đối phương để họ tự bắn tự sát'],
    },
  },
  {
    id: 'LeeSin',
    name: 'Lee Sin',
    title: 'Thầy Tu Mù',
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
        primaryTree: 'Chuẩn Xác (Precision)',
        keystone: {
          name: 'Chinh Phục',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
        },
        primaryRunes: ['Đắc Thắng', 'Huyền Thoại: Tốc Độ Đánh', 'Nhát Chém Ân Huệ'],
        secondaryTree: 'Cảm Hứng (Inspiration)',
        secondaryRunes: ['Bước Chân Màu Nhiệm', 'Thấu Thị Vũ Trụ'],
        shards: ['+9 Sức Mạnh Thích Ứng', '+9 Sức Mạnh Thích Ứng', '+6 Giáp'],
      },
      items: {
        starting: [
          { name: 'Mộc Long Con', iconUrl: getItem('1103') },
          { name: 'Bình Máu', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Nguyệt Đao', iconUrl: getItem('6692'), winRate: 51.9 },
          { name: 'Giáo Thiên Đường', iconUrl: getItem('6610'), winRate: 53.2 },
          { name: 'Rìu Đen', iconUrl: getItem('3071'), winRate: 54.0 },
        ],
        boots: [
          { name: 'Giày Thép Gai', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: 'Vũ Điệu Tử Thần', iconUrl: getItem('3053'), winRate: 55.4 },
        ],
      },
      strengths: ['Tác động ván đấu cực mạnh đầu trận', 'Độ biến ảo và combo Insec'],
      weaknesses: ['Yêu cầu kỹ năng cao'],
      keyTips: ['Đan xen 2 đòn đánh thường giữa các lần dùng chiêu để tối ưu nội tại'],
    },
  },
]
