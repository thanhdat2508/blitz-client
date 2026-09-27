import type { ChampionMeta } from '../types/champion'
import { getAvatar, getSplash, getItem } from './helpers'

export const TOP_CHAMPIONS: ChampionMeta[] = [
  {
    id: 'Aatrox',
    name: 'Aatrox',
    title: 'Quỷ Kiếm Darkin',
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
        primaryTree: 'Chuẩn Xác (Precision)',
        keystone: {
          name: 'Chinh Phục (Conqueror)',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
        },
        primaryRunes: ['Đắc Thắng', 'Huyền Thoại: Tốc Độ Đánh', 'Nhát Chém Ân Huệ'],
        secondaryTree: 'Kiên Định (Resolve)',
        secondaryRunes: ['Ngọn Gió Thứ Hai', 'Tiếp Sức'],
        shards: ['+9 Sức Mạnh Thích Ứng', '+9 Sức Mạnh Thích Ứng', '+6 Giáp'],
      },
      items: {
        starting: [
          { name: 'Khiên Doran', iconUrl: getItem('1054') },
          { name: 'Bình Máu', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Nguyệt Đao', iconUrl: getItem('6692'), winRate: 52.8 },
          { name: 'Giáo Thiên Đường', iconUrl: getItem('6610'), winRate: 54.1 },
          { name: 'Vũ Điệu Tử Thần', iconUrl: getItem('3053'), winRate: 55.7 },
        ],
        boots: [
          { name: 'Giày Thép Gai', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: 'Rìu Đen', iconUrl: getItem('3071'), winRate: 53.4 },
          { name: 'Móng Vuốt Sterak', iconUrl: getItem('3053'), winRate: 56.1 },
          { name: 'Giáp Gai', iconUrl: getItem('3075'), winRate: 51.9 },
        ],
      },
      strengths: [
        'Hồi phục máu mạnh mẽ trong giao tranh kéo dài với Chiêu cuối R',
        'Sát thương diện rộng và khống chế liên tục với 3 nhịp Q',
        'Khả năng độc lập tác chiến và ép đường mạnh',
      ],
      weaknesses: [
        'Kém cơ động trước các tướng có nhiều lướt hoặc làm chậm',
        'Sợ hiệu ứng Vết Thương Sâu cắt giảm hồi máu',
      ],
      keyTips: [
        'Sử dụng E giữa các nhịp Q để bất ngờ đánh trúng điểm ngọt (Sweetspot)',
        'Bật R ngay khi bắt đầu giao tranh tổng để tối đa hóa lượng sát thương',
      ],
    },
  },
  {
    id: 'Darius',
    name: 'Darius',
    title: 'Đại Tướng Noxus',
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
        primaryTree: 'Chuẩn Xác (Precision)',
        keystone: {
          name: 'Chinh Phục (Conqueror)',
          iconUrl: 'https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png',
        },
        primaryRunes: ['Đắc Thắng', 'Huyền Thoại: Tốc Độ Đánh', 'Chốt Chặn Cuối Cùng'],
        secondaryTree: 'Kiên Định (Resolve)',
        secondaryRunes: ['Ngọn Gió Thứ Hai', 'Kiên Cường'],
        shards: ['+10% Tốc Độ Đánh', '+9 Sức Mạnh Thích Ứng', '+6 Giáp'],
      },
      items: {
        starting: [
          { name: 'Khiên Doran', iconUrl: getItem('1054') },
          { name: 'Bình Máu', iconUrl: getItem('2003') },
        ],
        core: [
          { name: 'Tam Hợp Kiếm', iconUrl: getItem('3078'), winRate: 52.8 },
          { name: 'Móng Vuốt Sterak', iconUrl: getItem('3053'), winRate: 54.6 },
          { name: 'Giáp Gia Tốc Hóa Kỹ', iconUrl: getItem('3742'), winRate: 53.9 },
        ],
        boots: [
          { name: 'Giày Thép Gai', iconUrl: getItem('3047') },
        ],
        situational: [
          { name: 'Vũ Điệu Tử Thần', iconUrl: getItem('3053'), winRate: 55.4 },
          { name: 'Giáp Tâm Linh', iconUrl: getItem('3065'), winRate: 53.2 },
          { name: 'Giáp Gai', iconUrl: getItem('3075'), winRate: 52.1 },
        ],
      },
      strengths: [
        'Vua solo 1v1 giai đoạn đầu trận đường trên',
        'Nội tại Xuất Huyết và Sức Mạnh Noxus đem lại lượng AD khổng lồ',
        'Máy Chém Noxus R gây sát thương chuẩn và hồi chiêu khi hạ gục',
      ],
      weaknesses: [
        'Dễ bị thả diều (kite) nếu không có Tốc Hành',
      ],
      keyTips: [
        'Mang Tốc Hành để khắc phục điểm yếu kém cơ động',
        'Căn rìa Q để vừa hồi máu vừa tích 1 điểm nội tại',
      ],
    },
  },
]
