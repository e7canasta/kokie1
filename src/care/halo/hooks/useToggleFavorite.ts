/**
 * useToggleFavorite - Gestionar favorito (estrella) del residente
 * Actualiza cache de React Query y persiste en localStorage.
 */

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  getStarredIdsFromStorage,
  setStarredIdsToStorage,
} from "../utils/favorites";
import type { Resident } from "../types/resident.types";
import { haptics } from "../utils/haptics";

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  const toggleFavorite = useCallback(
    (residentId: number) => {
      const set = getStarredIdsFromStorage();
      const nextStarred = !set.has(residentId);
      if (nextStarred) {
        set.add(residentId);
      } else {
        set.delete(residentId);
      }
      setStarredIdsToStorage(set);

      haptics.selection();

      // Actualizar lista de residents en cache
      const residents = queryClient.getQueryData<Resident[]>(["residents"]);
      if (Array.isArray(residents)) {
        const next = residents.map((r) => ({
          ...r,
          starred: set.has(r.id) ?? r.starred,
        }));
        queryClient.setQueryData(["residents"], next);
      }

      // Actualizar residente individual en cache
      const resident = queryClient.getQueryData<Resident>(["resident", String(residentId)]);
      if (resident) {
        queryClient.setQueryData(["resident", String(residentId)], {
          ...resident,
          starred: nextStarred,
        });
      }
    },
    [queryClient]
  );

  return { toggleFavorite };
}
