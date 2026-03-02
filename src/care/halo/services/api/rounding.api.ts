import { DetectedActivity, ScheduledActivity, RoomVisitSummary } from "../../components/rounding/PostRoomSummarySheet";

/**
 * Rounding APIs
 *
 * Mock implementation - en producción, estos datos vienen del backend:
 * - Digital Twin team provee las actividades detectadas
 * - Planning/Operations provee las actividades programadas
 */

/**
 * Obtener summary de visita a una habitación
 * Incluye actividades detectadas automáticamente y programadas
 */
export async function getRoomVisitSummary(roomId: string): Promise<RoomVisitSummary> {
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simular latencia de red

  // Mock: Actividades detectadas por el sistema ambiental
  // En producción: vienen del Digital Twin (presencia, interacción, posición, medicación, etc.)
  const detected: DetectedActivity[] = [
    {
      id: "det1",
      label: "Tu presencia",
      detected: true,
      timestamp: "14:02 - 14:06",
    },
    {
      id: "det2",
      label: "Interacción con residente (Cama A)",
      detected: true,
      timestamp: "14:03",
    },
    {
      id: "det3",
      label: "Cambio de posición verificado",
      detected: true,
      timestamp: "14:04",
    },
  ];

  // Mock: Actividades programadas para esta ronda
  // En producción: vienen del Planning/Operations (según tipo de ronda y horario)
  const scheduled: ScheduledActivity[] = [
    {
      id: "sch1",
      label: "Observación general",
      completed: false,
      matchedWithDetection: true, // Coincide con "Tu presencia" + "Interacción"
    },
    {
      id: "sch2",
      label: "Cambio de posición",
      completed: false,
      matchedWithDetection: true, // Coincide con "Cambio de posición verificado"
    },
    {
      id: "sch3",
      label: "Medicación PM",
      completed: false,
      matchedWithDetection: false, // No detectado - requiere acción manual
    },
  ];

  // Mock: Siguiente habitación sugerida
  const nextRoom = {
    roomNumber: "203",
    isVirtual: true, // Tiene monitoreo ambiental activo y sin alertas
  };

  return {
    roomId,
    roomNumber: roomId,
    durationMinutes: 4,
    detected,
    scheduled,
    nextRoom,
  };
}

/**
 * Marcar actividad programada como completada
 */
export async function markActivityCompleted(
  roomId: string,
  activityId: string
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  console.log(`[Activity Marked] Room ${roomId}, Activity ${activityId}`);

  return {
    success: true,
    message: "Actividad marcada como completada",
  };
}

/**
 * Confirmar finalización de visita a habitación
 * Marca la room como visitada en el contexto de rounding
 */
export async function confirmRoomVisitComplete(
  roomId: string,
  notes?: string
): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log(`[Room Visit Complete] Room ${roomId}${notes ? `, Notes: ${notes}` : ""}`);

  return {
    success: true,
    message: "Visita confirmada",
  };
}
