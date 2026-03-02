/**
 * Computer Vision Detection Utilities
 *
 * Lógica para determinar si una visita fue detectada automáticamente por CV
 * o requiere confirmación manual.
 *
 * Filosofía dual-mode:
 * - Con CV: auto-detectar visitas (si lastCVDetection < threshold)
 * - Sin CV: requerir confirmación manual
 */

export const CV_DETECTION_THRESHOLD = 30; // minutos

/**
 * Determina si una room tiene CV activo
 */
export function hasActiveCV(hasCV: boolean, lastDetection?: number): boolean {
  if (!hasCV) return false;
  if (lastDetection === undefined) return false;
  return lastDetection < CV_DETECTION_THRESHOLD;
}

/**
 * Determina si una visita fue auto-detectada por CV
 */
export function isAutoDetected(hasCV: boolean, lastDetection?: number): boolean {
  return hasActiveCV(hasCV, lastDetection);
}

/**
 * Calcula cuántas confirmaciones ahorró CV hoy
 *
 * Asumiendo:
 * - 4 visitas por room por turno (rondas de medicación, observación, etc.)
 * - CV ahorra la confirmación manual de cada una
 */
export function calculateConfirmationsSaved(
  roomsWithCV: number,
  visitsPerRoom: number = 4
): number {
  return roomsWithCV * visitsPerRoom;
}

/**
 * Calcula el porcentaje de cobertura CV
 */
export function calculateCVCoverage(roomsWithCV: number, totalRooms: number): number {
  if (totalRooms === 0) return 0;
  return Math.round((roomsWithCV / totalRooms) * 100);
}

/**
 * Determina el mensaje motivacional según cobertura CV
 */
export function getCVMotivationalMessage(coveragePercent: number): string {
  if (coveragePercent === 0) {
    return 'No CV coverage yet. Request cameras to save time!';
  }
  if (coveragePercent < 30) {
    return 'Low CV coverage. More cameras = less manual work!';
  }
  if (coveragePercent < 70) {
    return 'Good progress! CV is saving you time.';
  }
  return 'Excellent CV coverage! Maximum efficiency.';
}

/**
 * Formateo de tiempo relativo (minutos ago)
 */
export function formatMinutesAgo(minutes: number): string {
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1m ago';
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1h ago';
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return days === 1 ? '1d ago' : `${days}d ago`;
}
