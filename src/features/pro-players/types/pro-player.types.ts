export interface MatchItem {
  id: number;
  name: string;
  icon: string;
}

export interface MatchSpell {
  name: string;
  icon: string;
}

export interface MatchRune {
  name: string;
  icon: string;
}

export interface ProPlayerMatch {
  championName: string;
  championTitle: string;
  championIcon: string;
  championSplash?: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  kdaRatio: string;
  cs: number;
  csPerMinute: string;
  gameDuration: string;
  gameMode: string;
  timeAgo: string;
  spells: MatchSpell[];
  runes: {
    primary: MatchRune;
    secondary: MatchRune;
  };
  items: MatchItem[];
}

export interface ProPlayer {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  role: 'MID' | 'TOP' | 'JUNGLE' | 'ADC' | 'SUPPORT';
  team: string;
  themeColor: 'blue' | 'gold' | 'red';
  playerImageUrl: string;
  riotGameName: string;
  riotTagLine: string;
  displayOrder: number;
  lastMatch: ProPlayerMatch;
}
