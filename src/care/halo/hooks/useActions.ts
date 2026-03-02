import { useMutation, useQueryClient } from '@tanstack/react-query';
import { actionsApi } from '../services/api/actions.api';
import { haptics } from '../utils/haptics';

/**
 * Hook para confirmar visita manual
 */
export function useConfirmVisit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (residentId: number) => actionsApi.confirmVisit(residentId),
    onSuccess: (data) => {
      // Haptic feedback
      haptics.success();

      // Invalidate queries para refrescar data
      queryClient.invalidateQueries({ queryKey: ['residents'] });
      queryClient.invalidateQueries({ queryKey: ['resident', data.visit.residentId] });

      console.log('[Visit Confirmed]', data.message);
    },
    onError: (error: Error) => {
      haptics.error();
      console.error('[Visit Error]', error.message);
    },
  });
}

/**
 * Hook para agregar nota
 */
export function useAddNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      residentId,
      content,
      category = 'observation' as const,
    }: {
      residentId: number;
      content: string;
      category?: 'observation' | 'medication' | 'behavior' | 'other';
    }) => actionsApi.addNote(residentId, content, category),
    onSuccess: (data) => {
      haptics.success();
      queryClient.invalidateQueries({ queryKey: ['residents'] });
      queryClient.invalidateQueries({ queryKey: ['resident', data.note.residentId] });
      console.log('[Note Added]', data.message);
    },
    onError: (error: Error) => {
      haptics.error();
      console.error('[Note Error]', error.message);
    },
  });
}

/**
 * Hook para escalar alerta
 */
export function useEscalateAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      residentId,
      reason,
      severity = 'medium' as const,
    }: {
      residentId: number;
      reason: string;
      severity?: 'low' | 'medium' | 'high' | 'critical';
    }) => actionsApi.escalateAlert(residentId, reason, severity),
    onSuccess: (data) => {
      haptics.warning(); // Warning vibration para alertas
      queryClient.invalidateQueries({ queryKey: ['residents'] });
      queryClient.invalidateQueries({ queryKey: ['resident', data.alert.residentId] });
      console.log('[Alert Escalated]', data.message);
    },
    onError: (error: Error) => {
      haptics.error();
      console.error('[Alert Error]', error.message);
    },
  });
}

/**
 * Hook para bulk confirm de room (todos los residents sin CV)
 */
export function useBulkConfirm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roomId: string) => actionsApi.confirmBulkVisit(roomId),
    onSuccess: (data) => {
      haptics.success(); // Success vibration para bulk confirm
      queryClient.invalidateQueries({ queryKey: ['residents'] });
      console.log('[Bulk Visit Confirmed]', data.message, `(${data.count} residents)`);
    },
    onError: (error: Error) => {
      haptics.error();
      console.error('[Bulk Confirm Error]', error.message);
    },
  });
}
