/**
 * Haptic Feedback Utilities
 * Wrapper around native vibration API with fallback for unsupported browsers
 *
 * Usage:
 *   haptics.success()  // Confirmar acción exitosa
 *   haptics.warning()  // Alertar problema
 *   haptics.light()    // Feedback ligero de navegación
 */

type HapticPattern = number | number[];

interface HapticsAPI {
  success: () => void;
  warning: () => void;
  error: () => void;
  light: () => void;
  medium: () => void;
  heavy: () => void;
  selection: () => void;
}

// Patrones de vibración (en milisegundos)
const patterns = {
  success: [10, 50, 10] as HapticPattern,
  warning: [20, 100, 20, 100, 20] as HapticPattern,
  error: [50, 50, 50] as HapticPattern,
  light: 10 as HapticPattern,
  medium: 20 as HapticPattern,
  heavy: 30 as HapticPattern,
  selection: 5 as HapticPattern,
} as const;

/**
 * Check if haptic feedback is supported
 */
const isSupported = (): boolean => {
  return 'vibrate' in navigator;
};

/**
 * Trigger vibration with pattern
 */
const vibrate = (pattern: HapticPattern): void => {
  if (!isSupported()) {
    return; // Silently fail on unsupported browsers
  }

  try {
    navigator.vibrate(pattern);
  } catch (error) {
    // Some browsers throw on certain patterns
    console.warn('Haptic feedback failed:', error);
  }
};

/**
 * Haptics API
 */
export const haptics: HapticsAPI = {
  /**
   * Success feedback (confirmación de acción exitosa)
   * Uso: al confirmar visita, guardar nota, etc.
   */
  success: () => vibrate(patterns.success),

  /**
   * Warning feedback (atención requerida)
   * Uso: al detectar alerta, overdue room, etc.
   */
  warning: () => vibrate(patterns.warning),

  /**
   * Error feedback (error en acción)
   * Uso: fallo al guardar, validación fallida, etc.
   */
  error: () => vibrate(patterns.error),

  /**
   * Light feedback (interacción ligera)
   * Uso: tap en botón, navegación, scroll snap
   */
  light: () => vibrate(patterns.light),

  /**
   * Medium feedback (interacción media)
   * Uso: toggle, switch, checkbox
   */
  medium: () => vibrate(patterns.medium),

  /**
   * Heavy feedback (interacción importante)
   * Uso: pull-to-refresh, swipe action, delete
   */
  heavy: () => vibrate(patterns.heavy),

  /**
   * Selection feedback (cambio de selección)
   * Uso: picker scroll, tab change, slider
   */
  selection: () => vibrate(patterns.selection),
};

/**
 * Stop all ongoing vibrations
 */
export const stopHaptics = (): void => {
  if (isSupported()) {
    navigator.vibrate(0);
  }
};

export default haptics;
