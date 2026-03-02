/**
 * Custom Hook - useResident
 * Maneja la lógica de fetching y estado de un resident
 */

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { residentsApi } from "../services/api/residents.api";
import type { Resident } from "../types/resident.types";

export function useResident() {
  const { id } = useParams<{ id: string }>();
  const residentId = id || "";

  const {
    data: resident,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Resident>({
    queryKey: ["resident", residentId],
    queryFn: () => residentsApi.getResidentById(residentId),
    enabled: Boolean(residentId) && residentId !== "undefined",
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes cacheTime)
  });

  return {
    resident,
    residentId,
    isLoading,
    isError,
    error,
    refetch,
  };
}
