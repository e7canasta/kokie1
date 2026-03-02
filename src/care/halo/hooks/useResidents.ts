/**
 * Custom Hook - useResidents
 * Maneja la lógica de fetching y estado de la lista de residents
 */

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { residentsApi } from "../services/api/residents.api";
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
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });

  // Filtrar residents por búsqueda
  const filteredResidents = useMemo(() => {
    if (!searchQuery) return residents;
    
    const query = searchQuery.toLowerCase();
    return residents.filter((resident) =>
      resident.name.toLowerCase().includes(query)
    );
  }, [residents, searchQuery]);

  return {
    residents: filteredResidents,
    allResidents: residents,
    isLoading,
    isError,
    error,
    refetch,
  };
}
