/**
 * Vitest Setup File
 * Configuración global para tests
 */

import { expect, afterEach, beforeAll, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server';

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

// MSW Server - setup antes de todos los tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// MSW Server - cleanup después de todos los tests
afterAll(() => {
  server.close();
});

// Reset handlers después de cada test para evitar interferencias
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
