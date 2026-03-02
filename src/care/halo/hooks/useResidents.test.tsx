/**
 * Tests - useResidents Hook
 * Prueba el hook de fetching de residents con React Query
 */

import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useResidents } from './useResidents';
import { mockResidents } from '../../../test/mocks/data/residents';
import { createTestQueryClient } from '../../../test/utils';

describe('useResidents', () => {
  function wrapper({ children }: { children: React.ReactNode }) {
    const queryClient = createTestQueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  }

  it('should fetch residents successfully', async () => {
    const { result } = renderHook(() => useResidents(), { wrapper });

    // Initial loading state
    expect(result.current.isLoading).toBe(true);

    // Wait for data
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.residents).toHaveLength(mockResidents.length);
    expect(result.current.isError).toBe(false);
  });

  it('should filter residents by search query', async () => {
    const { result } = renderHook(() => useResidents('Margaret'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.residents.length).toBeLessThan(mockResidents.length);
    expect(result.current.residents[0].name).toContain('Margaret');
  });

  it('should add colors to residents', async () => {
    const { result } = renderHook(() => useResidents(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const firstResident = result.current.residents[0];
    expect(firstResident.colors).toBeDefined();
    expect(firstResident.colors).toHaveLength(3);
  });

  it('should filter starred residents for myResidents', async () => {
    const { result } = renderHook(() => useResidents(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const starredCount = mockResidents.filter((r) => r.starred).length;
    expect(result.current.myResidents.length).toBeLessThanOrEqual(starredCount);
    result.current.myResidents.forEach((resident) => {
      expect(resident.starred).toBe(true);
    });
  });

  it('should group residents by room', async () => {
    const { result } = renderHook(() => useResidents(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.roomGroups).toBeDefined();
    expect(result.current.roomGroups.length).toBeGreaterThan(0);

    const firstGroup = result.current.roomGroups[0];
    expect(firstGroup).toHaveProperty('room');
    expect(firstGroup).toHaveProperty('unit');
    expect(firstGroup).toHaveProperty('residents');
    expect(firstGroup).toHaveProperty('roundingStatus');
  });

  it('should handle search query case-insensitively', async () => {
    const { result: resultLower } = renderHook(() => useResidents('margaret'), { wrapper });
    const { result: resultUpper } = renderHook(() => useResidents('MARGARET'), { wrapper });

    await waitFor(() => {
      expect(resultLower.current.isLoading).toBe(false);
      expect(resultUpper.current.isLoading).toBe(false);
    });

    expect(resultLower.current.residents.length).toBe(
      resultUpper.current.residents.length
    );
  });
});
