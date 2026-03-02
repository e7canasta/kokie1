---    
Halo Care Architecture Overview    
 
This is a React + TypeScript healthcare/care facility management application built with a mobile-first approach. The app manages "residents" (likely elderly/patients in a care facility) with      
wellness tracking and care activities.    
 
---    
1. High-Level Architecture  
 
/src   
├── App.tsx      # Root: Routing + QueryClient provider 
├── main.tsx     # React 19 entry point   
├── store/# Global state (Zustand) 
│   └── index.ts     
├── assets/      # Static assets   
└── care/halo/   # Main feature module (domain-driven)  
    ├── components/     # Reusable UI components 
    │   ├── ui/  # Generic UI (Avatar, SearchBar, LoadingState, etc.) 
    │   ├── layout/     # Screen layouts (ScreenLayout, ScreenHeader) 
    │   ├── navigation/ # BottomNav, FloatingActionPill, PageTransition      
    │   └── residents/  # Domain-specific (RoomCard, WellnessCard, TopCareCard)     
    ├── screens/ # Page-level components  
    │   ├── floor/      # ResidentsScreen (list view)   
    │   └── resident/   # ResidentOverviewScreen, CareActivitiesScreen
    ├── services/api/   # API layer (class-based service)      
    ├── hooks/    # Custom hooks (data fetching, gestures)     
    ├── domain/  # Business logic & constants    
    ├── types/   # TypeScript type definitions   
    ├── design-system/  # Theme, common styles (centralized)   
    ├── utils/   # Pure utility functions 
    └── icons/   # SVG icon components    
 
---    
2. State Management Pattern 
 
Dual approach:
┌──────────────┬────────────────────────────┬──────────────────────────────────────────────────────────┐ 
│    Layer     │     Tool     │    Purpose     │ 
├──────────────┼────────────────────────────┼──────────────────────────────────────────────────────────┤ 
│ Server State │ @tanstack/react-query (v5) │ API data fetching, caching, refetching     │ 
├──────────────┼────────────────────────────┼──────────────────────────────────────────────────────────┤ 
│ Client State │ zustand      │ Minimal global state (currently just selectedResidentId) │ 
└──────────────┴────────────────────────────┴──────────────────────────────────────────────────────────┘ 
Key Files:    
- /home/visiona/Work/halo-care/v1/src/store/index.ts - Zustand store  
- /home/visiona/Work/halo-care/v1/src/care/halo/hooks/useResidents.ts - React Query hook (list)   
- /home/visiona/Work/halo-care/v1/src/care/halo/hooks/useResident.ts - React Query hook (single)  
 
Pattern: Server state is primary, client state is minimal. Hooks expose isLoading, isError, refetch from React Query with useMemo for derived data (filtering, color mapping, room grouping).
 
---    
3. API/Data Fetching Pattern
 
Service Layer Architecture: 
 
services/api/residents.api.ts      
 │      
 └── ResidentsApiService (class)    
     ├── getAllResidents() 
     ├── getResidentById(id)      
     └── handleError()     
      │
hooks/useResidents.ts      hooks/useResident.ts  
 │     │
 └── useQuery(["residents"])  └── useQuery(["resident", id])    
 
Key characteristics: 
- Class-based service at /home/visiona/Work/halo-care/v1/src/care/halo/services/api/residents.api.ts     
- Singleton export: export const residentsApi = new ResidentsApiService()    
- RESTful endpoints: /api/residents and /api/residents/:id     
- React Query wraps service calls with caching (staleTime: 2-5 min, gcTime: 5-10 min)      
- Error handling centralized in service layer    
 
---    
4. Routing Structure 
 
React Router v7 with 3 routes:     
┌───────────────────────────────┬────────────────────────┬─────────────────────────────────────────────┐ 
│      Path│  Screen  │     Purpose     │ 
├───────────────────────────────┼────────────────────────┼─────────────────────────────────────────────┤ 
│ / │ ResidentsScreen │ Floor view with room cards, favorite slider │ 
├───────────────────────────────┼────────────────────────┼─────────────────────────────────────────────┤ 
│ /resident/:id   │ ResidentOverviewScreen │ Individual resident detail    │ 
├───────────────────────────────┼────────────────────────┼─────────────────────────────────────────────┤ 
│ /resident/:id/care-activities │ CareActivitiesScreen   │ Care activities timeline      │ 
└───────────────────────────────┴────────────────────────┴─────────────────────────────────────────────┘ 
Key Files:    
- /home/visiona/Work/halo-care/v1/src/App.tsx - Router definition     
 
Pattern: Routes wrapped in <PageTransition> for iOS-like animations, <ErrorBoundary> for graceful error handling.      
 
---    
5. Component Architecture   
 
Three-tier component structure:    
 
screens/    # Page-level (routes)  
    └── Uses   
components/ # Reusable building blocks    
    ├── layout/     # ScreenLayout (header/main/footer slots)   
    ├── ui/  # Atomic (Avatar, SearchBar, LoadingState, ErrorState)    
    ├── navigation/ # App chrome (BottomNav, FAB, PageTransition)      
    └── residents/  # Domain-specific cards (RoomCard, WellnessCard)   
 
Layout System (ScreenLayout):      
- Flexbox-based container   
- Optional header/footer slots     
- Configurable background and padding     
- Mobile-optimized overflow handling      
 
---    
6. Design System     
 
Centralized at /home/visiona/Work/halo-care/v1/src/care/halo/design-system/  
┌───────────┬─────────────────────────────────────────────────────────┐      
│   File    │    Purpose    │      
├───────────┼─────────────────────────────────────────────────────────┤      
│ theme.ts  │ Colors, spacing, typography, shadows, breakpoints│      
├───────────┼─────────────────────────────────────────────────────────┤      
│ styles.ts │ Common style objects (card, button, container patterns) │      
├───────────┼─────────────────────────────────────────────────────────┤      
│ index.ts  │ Barrel export │      
└───────────┴─────────────────────────────────────────────────────────┘      
Design Tokens:
- Healthcare-green primary palette (#2E7D6F)     
- Semantic colors: success/warning/error/info    
- Mobile-first typography (14px minimum for WCAG AA)    
- iOS-like shadows and transitions 
 
Usage: Components import { theme } or { theme, commonStyles } directly.      
 
---    
7. Shared Utilities & Hooks 
 
Custom Hooks: 
┌───────────────────┬────────────────────────────────────────────┬───────────────────────────┐    
│Hook │    Purpose     │  Location   │    
├───────────────────┼────────────────────────────────────────────┼───────────────────────────┤    
│ useResidents()    │ Fetch + filter + transform residents list  │ /hooks/useResidents.ts    │    
├───────────────────┼────────────────────────────────────────────┼───────────────────────────┤    
│ useResident()     │ Fetch single resident by route param│ /hooks/useResident.ts     │    
├───────────────────┼────────────────────────────────────────────┼───────────────────────────┤    
│ useSwipeGesture() │ Touch gesture detection (swipe navigation) │ /hooks/useSwipeGesture.ts │    
└───────────────────┴────────────────────────────────────────────┴───────────────────────────┘    
Utility Functions:   
┌────────────────────────┬─────────────────────────────────────┬─────────────────────────┐ 
│ Function │ Purpose │ Location  │ 
├────────────────────────┼─────────────────────────────────────┼─────────────────────────┤ 
│ withResidentColors()   │ Extract avatar colors from gradient │ /utils/residentUtils.ts │ 
├────────────────────────┼─────────────────────────────────────┼─────────────────────────┤ 
│ groupResidentsByRoom() │ Group residents into RoomGroup[]    │ /utils/residentUtils.ts │ 
├────────────────────────┼─────────────────────────────────────┼─────────────────────────┤ 
│ animations      │ Predefined animation configs │ /utils/animations.ts    │ 
└────────────────────────┴─────────────────────────────────────┴─────────────────────────┘ 
---    
8. Domain/Business Logic    
 
Located in /home/visiona/Work/halo-care/v1/src/care/halo/domain/:     
 
- residents.ts - Static data, MY_RESIDENTS_LIMIT constant      
- overview.ts - Care activities data by time range, wellness data structures 
 
Type System (at /types/resident.types.ts):
- Resident - Core entity with wellness, room, avatar data      
- RoomGroup - Grouping with rounding status      
- WellnessDataItem, TopCareItem, CareActivity - Supporting types      
- Component prop types (ResidentCardProps, WellnessCardProps, etc.)   
 
---    
9. Mobile-First Features    
 
The app is explicitly designed for mobile healthcare workers:  
 
- PullToRefresh component for native-feel refresh
- BottomNavigation with iOS-style FAB     
- HomeIndicator (iOS safe area)    
- Touch gestures (swipe navigation hook)  
- iOS-like page transitions (slide animations)   
- WCAG AA typography (minimum 14px body text)    
 
---    
10. Key Architectural Decisions    
 
1. Feature-based organization: All "halo care" code lives under /care/halo/ - suggests potential for multi-app or multi-feature architecture.      
2. CSS-in-JS approach: Inline styles using theme tokens rather than CSS files or styled-components.      
3. Service + Hook pattern: API services are separated from React, hooks wrap them with React Query for caching. 
4. Minimal global state: Zustand only for cross-screen context (selected ID). All data flows through React Query.      
5. Domain separation: Types, domain logic, and utilities are separated from components.    
6. Mobile-first: Every UX decision (typography, touch targets, gestures) is optimized for mobile. 
 
---    
Tech Stack Summary   
 
- Framework: React 19 + TypeScript 
- Build: Vite 7      
- Routing: React Router v7  
- Server State: TanStack React Query v5   
- Client State: Zustand v5  
- Backend: Express.js (separate server in /server)      
- Styling: CSS-in-JS with centralized theme      
- 3D: Three.js (likely for room visualization - placeholder)     
