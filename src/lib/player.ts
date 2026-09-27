import { ENV } from "@/config/env";
import type {
  GetPlayerProfileParams,
  PlayerApiResponse,
  PlayerProfileResponse,
} from "@/features/player/api/get-player-profile";

export async function fetchPlayerProfile(
  params: GetPlayerProfileParams,
): Promise<PlayerProfileResponse> {
  const searchParams = new URLSearchParams();
  if (params.gameName) searchParams.set("gameName", params.gameName);
  if (params.tagLine) searchParams.set("tagLine", params.tagLine);
  searchParams.set("region", params.region || "vn2");
  if (params.refresh) searchParams.set("refresh", "true");

  const queryString = searchParams.toString();
  const endpoint = `/api/player${queryString ? `?${queryString}` : ""}`;
  const url =
    typeof window !== "undefined" ? endpoint : `${ENV.BACKEND_URL}${endpoint}`;

  const res = await fetch(url);
  if (!res.ok) {
    let errorMsg = `Lỗi ${res.status}: ${res.statusText}`;
    try {
      const errJson = await res.json();
      if (errJson?.message) errorMsg = errJson.message;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  const json: PlayerApiResponse = await res.json();
  return json.data;
}
