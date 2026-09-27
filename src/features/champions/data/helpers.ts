export const DDRAGON_VER = '14.19.1'

export const getAvatar = (id: string) =>
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VER}/img/champion/${id}.png`

export const getSplash = (id: string) =>
  `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`

export const getItem = (id: string) =>
  `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VER}/img/item/${id}.png`
