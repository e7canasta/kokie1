import type { RoomGroup } from "../types/resident.types";

/**
 * Virtual Visit Eligibility
 *
 * Determina si una habitación puede ser visitada virtualmente.
 *
 * Criterios:
 * - Monitoreo ambiental activo (cvStatus === "active")
 * - Sin alertas (ningún residente con Low wellness)
 * - Opcional: No overdue (si está muy retrasada, mejor visita física)
 */

export interface VirtualVisitEligibility {
  isEligible: boolean;
  reason?: string; // Si no es elegible, por qué
}

/**
 * Determina si una room puede ser visitada virtualmente
 */
export function isRoomVirtualEligible(room: RoomGroup): VirtualVisitEligibility {
  // Criterio 1: Debe tener monitoreo ambiental activo
  if (room.cvStatus !== "active") {
    return {
      isEligible: false,
      reason: "Sin monitoreo ambiental activo",
    };
  }

  // Criterio 2: No debe tener alertas (ningún residente con Low wellness)
  const hasAlerts = room.residents.some((r) => r.wellness?.trend === "Low");
  if (hasAlerts) {
    return {
      isEligible: false,
      reason: "Tiene alertas activas",
    };
  }

  // Criterio 3 (opcional): Si está muy overdue, mejor visita física
  // Por ahora consideramos overdue como elegible si cumple los otros criterios
  // En el futuro, se puede agregar un threshold de tiempo

  return {
    isEligible: true,
  };
}

/**
 * Cuenta cuántas rooms son elegibles para visita virtual
 */
export function countVirtualEligibleRooms(rooms: RoomGroup[]): number {
  return rooms.filter((room) => isRoomVirtualEligible(room).isEligible).length;
}

/**
 * Filtra solo las rooms elegibles para visita virtual
 */
export function getVirtualEligibleRooms(rooms: RoomGroup[]): RoomGroup[] {
  return rooms.filter((room) => isRoomVirtualEligible(room).isEligible);
}
