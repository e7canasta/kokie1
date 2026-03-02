/**
 * Custom Hook - useResidents
 * Maneja la lógica de fetching y estado de la lista de residents
 * Expone residents (filtrados con colores), myResidents (favoritos estáticos),
 * hotResidents (generativo P1), y allResidents (raw)
 */

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MY_RESIDENTS_LIMIT } from "../domain/residents";
import { residentsApi } from "../services/api/residents.api";
import { withResidentColors, groupResidentsByRoom, getHotResidents } from "../utils/residentUtils";
import type { Resident, RoomGroup } from "../types/resident.types";

export function useResidents(searchQuery?: string) {
  const {
    data: residents = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Resident[]>({
    queryKey: ["residents"],
    queryFn: () => residentsApi.getAllResidents(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const filteredResidents = useMemo(() => {
    if (!searchQuery) return residents;
    const query = searchQuery.toLowerCase();
    return residents.filter((r) => r.name.toLowerCase().includes(query));
  }, [residents, searchQuery]);

  const residentsWithColors = useMemo(
    () => filteredResidents.map((r) => withResidentColors(r) as Resident),
    [filteredResidents]
  );

  const myResidents = useMemo(
    () => residentsWithColors.filter((r) => r.starred).slice(0, MY_RESIDENTS_LIMIT),
    [residentsWithColors]
  );

  // Sprint 2 (P1) - Hot Residents (generative/contextual)
  const hotResidents = useMemo(
    () => getHotResidents(residentsWithColors),
    [residentsWithColors]
  );

  const roomGroups: RoomGroup[] = useMemo(
    () => groupResidentsByRoom(residentsWithColors),
    [residentsWithColors]
  );

  return {
    residents: residentsWithColors,
    myResidents,
    hotResidents, // Sprint 2 (P1)
    roomGroups,
    allResidents: residents,
    isLoading,
    isError,
    error,
    refetch,
  };
}
