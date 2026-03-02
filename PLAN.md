# Plan: Create CLAUDE.md for Halo Care

## Proposed CLAUDE.md Content

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start Vite dev server (port 5173, --host enabled)
npm run dev:server   # Start Express mock API server (port 3001)
npm run build        # Production build
npm run lint         # ESLint
npm run preview      # Preview production build
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
```

## Implementation

After approval, I will write this content to `/home/visiona/Work/halo-care/v1/CLAUDE.md`.
