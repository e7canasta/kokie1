# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development
npm run dev          # Start Vite dev server (port 5173, --host enabled)
npm run dev:server   # Start Express mock API server (port 3001)
npm run build        # Production build
npm run lint         # ESLint
npm run preview      # Preview production build

# Testing
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with Vitest UI
npm run test:run     # Run tests once (CI mode)
npm run test:coverage # Run tests with coverage report
```

Run both `dev` and `dev:server` together for full development environment. Vite proxies `/api` requests to port 3001.

## Tech Stack

- React 19 + TypeScript
- Vite 7 (build)
- React Router v7 (routing)
- TanStack React Query v5 (server state)
- Zustand v5 (minimal client state)
- Express.js (mock API in `/server`)

## Project Structure

```
src/
├── App.tsx                    # Routes and providers
├── store/                     # Zustand global state
└── care/halo/                 # Main application module
    ├── design-system/         # Theme, colors, spacing tokens
    ├── services/api/          # API service classes
    ├── hooks/                 # React Query data hooks
    ├── types/                 # TypeScript interfaces
    ├── components/
    │   ├── layout/            # ScreenLayout, ScreenHeader
    │   ├── ui/                # LoadingState, ErrorState, etc.
    │   ├── navigation/        # BottomNav, FloatingActionPill
    │   └── residents/         # Domain-specific cards
    ├── screens/               # Page-level components
    ├── domain/                # Business logic constants
    └── utils/                 # Pure utility functions
```

## Architecture

### Data Flow
```
Screen → Hook → API Service → Backend (Express mock)
           ↓
     React Query Cache
           ↓
     Component State
```

### State Management
- **Server state**: React Query handles all API data with caching (`staleTime: 2-5 min`)
- **Client state**: Zustand only for cross-screen context (e.g., `selectedResidentId`)

### Routes
- `/` — ResidentsScreen (room board)
- `/resident/:id` — ResidentOverviewScreen
- `/resident/:id/care-activities` — CareActivitiesScreen

## UX Assisted Triage Philosophy

This is a nursing rounding app. The core design principle: **the system manages the nurse's attention, not the other way around**.

### Two States
- **Calm** — Nothing needs action. Collapsed, green accent, minimal footprint.
- **Attention** — Needs nurse. Auto-expanded, red/orange accent, detail visible without tapping.

### Visual Severity
| Severity | Accent | Auto-Expand |
|----------|--------|-------------|
| Alert (Low wellness) | Red | Yes |
| Monitor (Medium) | Orange | No |
| Clear (High) | Green | No |

### Key Rules
- Alert rooms auto-expand on load; calm rooms stay collapsed
- Never require taps to discover problems
- Design for one-handed, glanceable, interrupt-driven use

## Mobile Layout Constraints

### Viewport Chain
```
html/body (100%, overflow: hidden)
  → #root (100%, overflow: hidden)
    → ScreenLayout (100%, flex column)
      → main (flex: 1, minHeight: 0, overflow: hidden)
        → PullToRefresh (overflowY: auto)
```

### Critical Rules
- Never use `100vw` (scrollbar issues) — use `width: 100%`
- Never use `height: 100vh` on components — use `height: 100%` from parent
- Grid children: always set `minWidth: 0` and `overflow: hidden` to prevent blowout
- Touch targets: minimum 44px
- Text overflow: `overflow: hidden; textOverflow: ellipsis; whiteSpace: nowrap`

### Sticky Elements
- Use `position: sticky` inside scroll containers
- Always set explicit `top`, `zIndex`, and `backdropFilter: blur(12px)` for glass effect

## Design System

Import from `care/halo/design-system`:
```typescript
import { theme } from '../design-system';

// Colors
color: theme.colors.primary[500]  // #2E7D6F

// Spacing (use tokens, not raw pixels)
padding: theme.spacing.lg  // 24px

// Typography
fontSize: theme.typography.fontSize.lg
```

### Semantic Colors
- Green (`success`): Normal, completed
- Orange (`warning`): Attention needed
- Red (`error`): Urgent, critical

### Typography
- Minimum body text: 14px (WCAG AA)
- Touch targets: 44px minimum

## Animation Guidelines

### Do Animate
- Room cards: `fadeIn + translateY(12px)` on scroll, 60ms stagger
- Favorite slider cards: `slideIn` with index-based delay
- Duration: 250-350ms, easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Don't Animate
- Sticky headers (must feel anchored)
- Alert indicators (entry should be instant)
- Navigation taps (keep fast: 150ms max)

## Runtime Validation with Zod

All API responses are validated at runtime using Zod schemas to protect against unexpected backend changes.

### Zod Schemas
Located in `care/halo/types/resident.schema.ts`:
```typescript
import { ResidentSchema, ResidentsArraySchema } from '../types/resident.schema';

// In API service
const data = await response.json();
const validated = ResidentSchema.parse(data); // Throws on invalid data
```

### Benefits
- Type safety in runtime (not just compile-time)
- Catches breaking API changes before they reach components
- Clear validation errors with field-level detail
- Healthcare-critical: ensures data integrity

### Adding New Schemas
1. Define schema in `resident.schema.ts` using Zod
2. Use `.parse()` in API service layer
3. Handle `ZodError` in error handling

## Testing

### Tech Stack
- **Vitest** - Unit/integration test runner
- **Testing Library** - React component testing
- **MSW** - API mocking in tests
- **Jest DOM** - DOM matchers

### Test Structure
```
src/
├── test/
│   ├── setup.ts           # Global test setup
│   ├── utils.tsx          # Test utilities (renderWithProviders)
│   └── mocks/
│       ├── server.ts      # MSW server setup
│       ├── handlers.ts    # API request handlers
│       └── data/          # Mock data
└── care/halo/
    ├── hooks/
    │   └── useResidents.test.tsx    # Hook tests
    ├── services/api/
    │   └── residents.api.test.ts    # API service tests
    └── utils/
        └── residentUtils.test.ts    # Utility tests
```

### Writing Tests

**API Service Tests:**
```typescript
import { describe, it, expect } from 'vitest';
import { residentsApi } from './residents.api';

describe('ResidentsApiService', () => {
  it('should fetch residents successfully', async () => {
    const residents = await residentsApi.getAllResidents();
    expect(residents).toHaveLength(4);
  });
});
```

**Hook Tests:**
```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useResidents } from './useResidents';
import { createTestQueryClient } from '../../../test/utils';

function wrapper({ children }) {
  return <QueryClientProvider client={createTestQueryClient()}>{children}</QueryClientProvider>;
}

it('should fetch residents', async () => {
  const { result } = renderHook(() => useResidents(), { wrapper });
  await waitFor(() => expect(result.current.isLoading).toBe(false));
});
```

**Component Tests:**
```typescript
import { renderWithProviders, screen } from '../../../test/utils';

it('should render resident card', () => {
  renderWithProviders(<ResidentCard resident={mockResident} />);
  expect(screen.getByText('Margaret Chen')).toBeInTheDocument();
});
```

### MSW Mocking
MSW intercepts HTTP requests automatically in tests. Handlers defined in `test/mocks/handlers.ts`:

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/residents', () => {
    return HttpResponse.json(mockResidents);
  }),
];
```

Override handlers per test:
```typescript
import { server } from '../../../test/mocks/server';

it('should handle 404', async () => {
  server.use(
    http.get('/api/residents/:id', () => {
      return new HttpResponse(null, { status: 404 });
    })
  );
  // Test logic
});
```

### Test Priorities
1. **Critical**: API services, hooks with business logic, utility functions
2. **High**: Components with complex state/logic, error boundaries
3. **Medium**: UI components, animations
4. **Low**: Simple presentational components

## React Query Configuration

Global QueryClient config in `config/queryClient.ts` with:
- **Stale time**: 3 minutes (medical data freshness)
- **GC time**: 10 minutes (fast navigation)
- **Retry policy**: No retry on 404/validation errors, max 2 retries on network errors
- **Offline persistence**: 24 hours via localforage (IndexedDB)
- **No refetch on window focus** (mobile optimization)

### Usage
```typescript
import { queryClient } from './config/queryClient';

// Already configured in App.tsx
<QueryClientProvider client={queryClient}>
  {children}
</QueryClientProvider>
```
