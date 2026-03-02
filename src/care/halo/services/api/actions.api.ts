import type { Visit, Note, Alert } from '../../types/resident.types';

/**
 * Actions API Service
 * Endpoints para Quick Actions (visits, notes, alerts)
 */

const BASE_URL = '/api';

class ActionsApiService {
  /**
   * POST /api/visits - Confirmar visita manual
   */
  async confirmVisit(residentId: number): Promise<{
    success: boolean;
    visit: Visit;
    message: string;
  }> {
    const response = await fetch(`${BASE_URL}/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        residentId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to confirm visit');
    }

    return response.json();
  }

  /**
   * POST /api/notes - Agregar nota
   */
  async addNote(
    residentId: number,
    content: string,
    category: 'observation' | 'medication' | 'behavior' | 'other' = 'observation'
  ): Promise<{
    success: boolean;
    note: Note;
    message: string;
  }> {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        residentId,
        content,
        category,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add note');
    }

    return response.json();
  }

  /**
   * POST /api/alerts - Escalar alerta
   */
  async escalateAlert(
    residentId: number,
    reason: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<{
    success: boolean;
    alert: Alert;
    message: string;
  }> {
    const response = await fetch(`${BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        residentId,
        reason,
        severity,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to escalate alert');
    }

    return response.json();
  }

  /**
   * POST /api/visits/bulk - Confirmar visitas bulk para toda la room (sin CV)
   */
  async confirmBulkVisit(roomId: string): Promise<{
    success: boolean;
    visits: Visit[];
    message: string;
    count: number;
  }> {
    const response = await fetch(`${BASE_URL}/visits/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to confirm bulk visits');
    }

    return response.json();
  }
}

export const actionsApi = new ActionsApiService();
