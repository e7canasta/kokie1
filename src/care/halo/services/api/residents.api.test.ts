/**
 * Tests - Residents API Service
 * Prueba la capa de API con validación Zod
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../../../test/mocks/server';
import { residentsApi } from './residents.api';
import { mockResidents } from '../../../../test/mocks/data/residents';

describe('ResidentsApiService', () => {
  describe('getAllResidents', () => {
    it('should fetch and validate residents successfully', async () => {
      const residents = await residentsApi.getAllResidents();

      expect(residents).toHaveLength(mockResidents.length);
      expect(residents[0]).toHaveProperty('id');
      expect(residents[0]).toHaveProperty('name');
      expect(residents[0]).toHaveProperty('wellness');
    });

    it('should throw error on network failure', async () => {
      server.use(
        http.get('/api/residents', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(residentsApi.getAllResidents()).rejects.toThrow();
    });

    it('should throw validation error on invalid response', async () => {
      server.use(
        http.get('/api/residents', () => {
          return HttpResponse.json([
            { id: 1, name: 'Test' }, // Missing required fields
          ]);
        })
      );

      await expect(residentsApi.getAllResidents()).rejects.toThrow();
    });

    it('should validate wellness trend enum values', async () => {
      server.use(
        http.get('/api/residents', () => {
          return HttpResponse.json([
            {
              id: 1,
              name: 'Test User',
              dob: 'Jan 1, 1950',
              room: '101',
              unit: 'Test Unit',
              age: 74,
              wellness: { trend: 'InvalidTrend', previousTrend: 'Low' }, // Invalid enum
              avatarGradient: 'linear-gradient(135deg, #000, #fff)',
              image: 'https://example.com/img.jpg',
            },
          ]);
        })
      );

      await expect(residentsApi.getAllResidents()).rejects.toThrow();
    });
  });

  describe('getResidentById', () => {
    it('should fetch resident by ID successfully', async () => {
      const resident = await residentsApi.getResidentById(1);

      expect(resident).toHaveProperty('id', 1);
      expect(resident).toHaveProperty('wellnessData');
      expect(resident).toHaveProperty('topCare');
    });

    it('should throw error for invalid ID', async () => {
      await expect(residentsApi.getResidentById('undefined')).rejects.toThrow(
        'Invalid resident ID'
      );
    });

    it('should throw 404 error for non-existent resident', async () => {
      await expect(residentsApi.getResidentById(999)).rejects.toThrow(
        'Resident not found'
      );
    });

    it('should validate response schema', async () => {
      server.use(
        http.get('/api/residents/:id', () => {
          return HttpResponse.json({
            id: 1,
            // Missing required fields
          });
        })
      );

      await expect(residentsApi.getResidentById(1)).rejects.toThrow();
    });
  });
});
