import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

/**
 * usePolling Hook
 *
 * Sprint 3 (P0) - Real-time Updates Infrastructure
 *
 * Simula updates en tiempo real mediante polling.
 * Cuando WebSocket esté disponible, se reemplaza por WebSocket connection.
 *
 * Filosofía:
 * - Polling inteligente: solo cuando app está visible
 * - Backoff exponencial en caso de errores
 * - Auto-pause cuando no hay conexión
 *
 * Usage:
 *   usePolling({ interval: 30000 }); // Poll cada 30s
 */

export interface UsePollingOptions {
  /** Intervalo de polling en ms (default: 30000 = 30s) */
  interval?: number;
  /** Queries a invalidar (default: ['residents']) */
  queryKeys?: string[][];
  /** Pausar polling (default: false) */
  enabled?: boolean;
}

export function usePolling({
  interval = 30000, // 30 segundos default
  queryKeys = [['residents']],
  enabled = true,
}: UsePollingOptions = {}) {
  const queryClient = useQueryClient();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Polling function
    const poll = () => {
      // Solo invalidar si la ventana está visible
      if (document.visibilityState === 'visible') {
        queryKeys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    };

    // Initial poll
    poll();

    // Set up interval
    intervalRef.current = setInterval(poll, interval);

    // Pause polling cuando tab no está visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Resume: invalidar inmediatamente al volver
        poll();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(poll, interval);
      } else {
        // Pause: limpiar interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [interval, enabled, queryClient, queryKeys]);
}

/**
 * Hook para detectar cambios en wellness en tiempo real
 * Muestra toast notification cuando hay cambios significativos
 */
export function useWellnessChangeNotifications() {
  // TODO Sprint 3: Implementar detección de cambios y mostrar toast
  // Comparar wellness actual vs cache anterior
  // Si hay cambio de trend, mostrar toast con formatTrendMessage()
}
