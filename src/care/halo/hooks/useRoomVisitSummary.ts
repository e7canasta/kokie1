import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoomVisitSummary, markActivityCompleted, confirmRoomVisitComplete } from "../services/api/rounding.api";
import { haptics } from "../utils/haptics";

/**
 * Hook para obtener el summary de visita a una room
 */
export function useRoomVisitSummary(roomId: string | null) {
  return useQuery({
    queryKey: ["roomVisitSummary", roomId],
    queryFn: () => (roomId ? getRoomVisitSummary(roomId) : Promise.reject("No room ID")),
    enabled: !!roomId,
    staleTime: 0, // Siempre fresh (es contextual al momento de la visita)
  });
}

/**
 * Hook para marcar actividad como completada
 */
export function useMarkActivityCompleted() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, activityId }: { roomId: string; activityId: string }) =>
      markActivityCompleted(roomId, activityId),
    onSuccess: (data, variables) => {
      haptics.success();
      // Invalidar el summary para refrescar
      queryClient.invalidateQueries({ queryKey: ["roomVisitSummary", variables.roomId] });
      console.log("[Activity Completed]", data.message);
    },
    onError: (error: Error) => {
      haptics.error();
      console.error("[Activity Error]", error.message);
    },
  });
}

/**
 * Hook para confirmar visita completada
 */
export function useConfirmRoomVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roomId, notes }: { roomId: string; notes?: string }) =>
      confirmRoomVisitComplete(roomId, notes),
    onSuccess: (data) => {
      haptics.success();
      // Invalidar queries relevantes
      queryClient.invalidateQueries({ queryKey: ["residents"] });
      console.log("[Room Visit Confirmed]", data.message);
    },
    onError: (error: Error) => {
      haptics.error();
      console.error("[Room Visit Error]", error.message);
    },
  });
}
