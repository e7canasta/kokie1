/**
 * React Query Client Configuration
 * Configuración global con retry policy, stale times, y error handling
 */

import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import localforage from 'localforage';

/**
 * Configuración de localforage para persistencia
 */
localforage.config({
  name: 'halo-care',
  storeName: 'react_query_cache',
  description: 'React Query offline cache for Halo Care',
});

/**
 * QueryClient con configuración optimizada para healthcare mobile app
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: 3 minutos - datos médicos deben ser recientes pero no ultra-fresh
      staleTime: 3 * 60 * 1000,

      // Garbage collection: 10 minutos - mantiene cache para navegación rápida
      gcTime: 10 * 60 * 1000,

      // Retry logic: no retry en 404s, sí en network errors
      retry: (failureCount, error: any) => {
        // No retry en errores 404 (resident no encontrado)
        if (error?.status === 404) return false;

        // No retry en errores de validación (probablemente un problema de schema)
        if (error?.validationErrors) return false;

        // Máximo 2 reintentos para network errors
        return failureCount < 2;
      },

      // Retry delay: exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // No refetch automático al enfocar ventana (reduce requests innecesarios en mobile)
      refetchOnWindowFocus: false,

      // Refetch al reconectar red (importante para mobile)
      refetchOnReconnect: true,

      // Network mode: online first, con fallback a cache
      networkMode: 'online',
    },

    mutations: {
      // Retry para mutations (acciones críticas como guardar datos)
      retry: 1,

      // Network mode para mutations
      networkMode: 'online',
    },
  },
});

/**
 * Persister para cache offline
 * Permite que la app funcione sin conexión con datos previamente cargados
 */
const persister = createSyncStoragePersister({
  storage: localforage as any,
  // Serialización custom si fuera necesaria
  serialize: (data) => JSON.stringify(data),
  deserialize: (data) => JSON.parse(data),
});

/**
 * Inicializa persistencia del cache
 * Cache persiste hasta 24 horas - ideal para shifts de enfermería
 */
persistQueryClient({
  queryClient,
  persister,
  maxAge: 1000 * 60 * 60 * 24, // 24 horas
  // Deshidratar cache solo si hay datos
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => {
      return query.state.status === 'success';
    },
  },
});

/**
 * Error handler global para logging/tracking
 * Puedes integrar con Sentry u otro servicio de error tracking aquí
 */
export function setupQueryErrorHandler() {
  queryClient.setDefaultOptions({
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
        // TODO: Integrar con Sentry o error tracking service
      },
    },
    queries: {
      onError: (error) => {
        console.error('Query error:', error);
        // TODO: Integrar con Sentry o error tracking service
      },
    },
  });
}
