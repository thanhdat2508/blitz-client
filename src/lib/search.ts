export interface ChampionSearchResult {
  id: string;
  key: string;
  name: string;
  title: string;
  primaryClass?: string;
  roles: string[];
  avatarUrl: string;
  url: string;
}

export interface ProPlayerSearchResult {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  team: string;
  role: string;
  avatar: string;
  riotGameName: string;
  riotTagLine: string;
  riotId: string;
}

export interface PostSearchResult {
  id: string;
  slug: string;
  title: string;
  contentSnippet?: string;
  coverImageUrl?: string | null;
  authorName?: string;
  createdAt: string;
}

export interface SummonerSearchResult {
  gameName: string;
  tagLine: string;
  region: string;
  riotId: string;
  isDirectLookup: boolean;
}

export interface GlobalSearchData {
  query: string;
  region: string;
  totalMatches: number;
  champions: ChampionSearchResult[];
  proPlayers: ProPlayerSearchResult[];
  posts: PostSearchResult[];
  summoner?: SummonerSearchResult;
}

export interface GlobalSearchApiResponse {
  success: boolean;
  data: GlobalSearchData;
}

export async function fetchGlobalSearch(
  query: string,
  region: string = "vn2",
  limit: number = 6,
): Promise<GlobalSearchData> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      query: "",
      region,
      totalMatches: 0,
      champions: [],
      proPlayers: [],
      posts: [],
    };
  }

  const endpoint = `/api/search?q=${encodeURIComponent(trimmed)}&region=${encodeURIComponent(region)}&limit=${limit}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Search request failed with status: ${res.status}`);
    }
    const json: GlobalSearchApiResponse = await res.json();
    return json.data;
  } catch (err) {
    console.warn("[search] Fetch error, parsing fallback summoner candidate:", err);
    // Graceful fallback for summoner lookup if backend network fails
    let gameName = trimmed;
    let tagLine = region.toUpperCase();
    if (trimmed.includes("#")) {
      const parts = trimmed.split("#");
      gameName = parts[0].trim();
      tagLine = parts.slice(1).join("#").trim() || region.toUpperCase();
    }

    return {
      query: trimmed,
      region,
      totalMatches: 1,
      champions: [],
      proPlayers: [],
      posts: [],
      summoner: {
        gameName,
        tagLine,
        region,
        riotId: `${gameName}#${tagLine}`,
        isDirectLookup: trimmed.includes("#"),
      },
    };
  }
}
