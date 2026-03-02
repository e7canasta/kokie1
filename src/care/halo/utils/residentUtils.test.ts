/**
 * Tests - Resident Utils
 * Prueba las funciones de utilidad para residents
 */

import { describe, it, expect } from 'vitest';
import {
  extractColorsFromGradient,
  withResidentColors,
  groupResidentsByRoom,
} from './residentUtils';
import type { Resident } from '../types/resident.types';

describe('residentUtils', () => {
  describe('extractColorsFromGradient', () => {
    it('should extract colors from valid gradient', () => {
      const gradient = 'linear-gradient(135deg, #2E7D6F, #1B5E50)';
      const colors = extractColorsFromGradient(gradient);

      expect(colors).toHaveLength(3);
      expect(colors[0]).toBe('#2E7D6F');
      expect(colors[1]).toBe('#1B5E50');
      expect(colors[2]).toBe('#1B5E5080'); // Con alpha
    });

    it('should return default colors for invalid gradient', () => {
      const gradient = 'invalid-gradient';
      const colors = extractColorsFromGradient(gradient);

      expect(colors).toHaveLength(3);
      expect(colors[0]).toBe('#8B4A5E');
    });

    it('should handle gradient with one color', () => {
      const gradient = 'linear-gradient(#2E7D6F)';
      const colors = extractColorsFromGradient(gradient);

      expect(colors).toHaveLength(3);
      expect(colors[0]).toBe('#8B4A5E'); // Default fallback
    });
  });

  describe('withResidentColors', () => {
    it('should add colors from avatarGradient', () => {
      const resident = {
        id: 1,
        name: 'Test User',
        avatarGradient: 'linear-gradient(135deg, #2E7D6F, #1B5E50)',
      };

      const result = withResidentColors(resident);

      expect(result.colors).toBeDefined();
      expect(result.colors).toHaveLength(3);
      expect(result.colors[0]).toBe('#2E7D6F');
    });

    it('should use existing colors if provided', () => {
      const resident = {
        id: 1,
        name: 'Test User',
        colors: ['#FF0000', '#00FF00', '#0000FF'],
      };

      const result = withResidentColors(resident);

      expect(result.colors).toEqual(['#FF0000', '#00FF00', '#0000FF']);
    });

    it('should use default colors if no gradient or colors', () => {
      const resident = {
        id: 1,
        name: 'Test User',
      };

      const result = withResidentColors(resident);

      expect(result.colors).toBeDefined();
      expect(result.colors[0]).toBe('#8B4A5E');
    });
  });

  describe('groupResidentsByRoom', () => {
    const mockResidents: Resident[] = [
      {
        id: 1,
        name: 'Margaret Chen',
        dob: 'June 15, 1947',
        room: '201',
        bed: 'A',
        unit: 'Memory Care',
        age: 78,
        wellness: { trend: 'Medium', previousTrend: 'Low' },
        avatarGradient: 'linear-gradient(135deg, #2E7D6F, #1B5E50)',
        image: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: 2,
        name: 'Robert Williams',
        dob: 'March 22, 1943',
        room: '201',
        bed: 'B',
        unit: 'Memory Care',
        age: 82,
        wellness: { trend: 'Low', previousTrend: 'High' },
        avatarGradient: 'linear-gradient(135deg, #5C6BC0, #3F51B5)',
        image: 'https://i.pravatar.cc/150?img=2',
      },
      {
        id: 3,
        name: 'Dorothy Martinez',
        dob: 'September 8, 1949',
        room: '202',
        bed: 'A',
        unit: 'Memory Care',
        age: 75,
        wellness: { trend: 'High', previousTrend: 'Medium' },
        avatarGradient: 'linear-gradient(135deg, #66BB6A, #388E3C)',
        image: 'https://i.pravatar.cc/150?img=3',
      },
    ];

    it('should group residents by room', () => {
      const groups = groupResidentsByRoom(mockResidents);

      expect(groups).toHaveLength(2);
      expect(groups[0].room).toBe('201');
      expect(groups[0].residents).toHaveLength(2);
      expect(groups[1].room).toBe('202');
      expect(groups[1].residents).toHaveLength(1);
    });

    it('should sort groups by room number', () => {
      const groups = groupResidentsByRoom(mockResidents);

      expect(groups[0].room).toBe('201');
      expect(groups[1].room).toBe('202');
    });

    it('should include rounding status', () => {
      const groups = groupResidentsByRoom(mockResidents);

      expect(groups[0].roundingStatus).toBeDefined();
      expect(['visited', 'pending', 'overdue']).toContain(groups[0].roundingStatus);
    });

    it('should include unit from residents', () => {
      const groups = groupResidentsByRoom(mockResidents);

      expect(groups[0].unit).toBe('Memory Care');
      expect(groups[1].unit).toBe('Memory Care');
    });

    it('should handle empty array', () => {
      const groups = groupResidentsByRoom([]);

      expect(groups).toHaveLength(0);
    });
  });
});
