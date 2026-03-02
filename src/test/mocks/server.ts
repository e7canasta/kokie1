/**
 * MSW Server Setup
 * Servidor mock para tests - intercepta requests HTTP
 */

import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Configura el servidor mock con los handlers
export const server = setupServer(...handlers);
