/**
 * Custom Hook - useResidents
 * Maneja la lógica de fetching y estado de la lista de residents
 * Expone residents (filtrados con colores), myResidents (primeros N para grid) y allResidents (raw)
 */

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MY_RESIDENTS_LIMIT } from "../domain/residents";
import { residentsApi } from "../services/api/residents.api";
import { withResidentColors } from "../utils/residentUtils";
import type { Resident } from "../types/resident.types";

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
    () => residentsWithColors.slice(0, MY_RESIDENTS_LIMIT),
    [residentsWithColors]
  );

  return {
    residents: residentsWithColors,
    myResidents,
    allResidents: residents,
    isLoading,
    isError,
    error,
    refetch,
  };
}
