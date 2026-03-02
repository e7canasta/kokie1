/**
 * MSW Request Handlers
 * Mock API responses para testing
 */

import { http, HttpResponse } from 'msw';
import { mockResidents, mockResidentWithDetails } from './data/residents';

const API_BASE_URL = '/api';

export const handlers = [
  // GET /api/residents - Lista de todos los residents
  http.get(`${API_BASE_URL}/residents`, () => {
    return HttpResponse.json(mockResidents);
  }),

  // GET /api/residents/:id - Detalles de un resident
  http.get(`${API_BASE_URL}/residents/:id`, ({ params }) => {
    const { id } = params;
    const residentId = parseInt(id as string);

    const resident = mockResidents.find((r) => r.id === residentId);

    if (!resident) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Resident not found',
      });
    }

    // Retorna resident con detalles adicionales (wellnessData, topCare)
    return HttpResponse.json({
      ...resident,
      wellnessData: mockResidentWithDetails.wellnessData,
      topCare: mockResidentWithDetails.topCare,
    });
  }),
];
