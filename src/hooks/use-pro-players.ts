import { useQuery } from "@tanstack/react-query";
import {
  getProPlayers,
  type ProPlayerApiItem,
  type ProPlayerItemSpell,
  type ProPlayerItemEquip,
  type ProPlayerLastMatch,
  type ProPlayersApiResponse,
} from "@/lib/pro-players";

export {
  getProPlayers,
  type ProPlayerApiItem,
  type ProPlayerItemSpell,
  type ProPlayerItemEquip,
  type ProPlayerLastMatch,
  type ProPlayersApiResponse,
};

export const proPlayersKeys = {
  all: ["pro-players"] as const,
};

export function useProPlayers() {
  return useQuery({
    queryKey: proPlayersKeys.all,
    queryFn: getProPlayers,
    staleTime: 1000 * 60 * 5,
  });
}
