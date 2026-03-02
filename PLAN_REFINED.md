
# UX Review Honesto: Halo Care — Estado del Arte y Roadmap Estratégico

**Fecha:** 2026-03-02
**Contexto:** Mobile-first triage assistant para enfermera de noche en ronda
**Comparación:** Healthcare field service apps (Epic Rover, Vocera, OnShift), consumer triage (Triage.com, Ada Health), field service (Salesforce Field Service, ServiceNow)

---

## Mi Evaluación Honesta

### Lo Que Ya Tienen (y está excelente)

Halo Care tiene una **base filosófica correcta** que muchas apps enterprise healthcare nunca logran:

1. **"Assisted Triage" como concepto** — El sistema gestiona la atención, no el usuario. Esto es exactamente lo que apps como Epic Rover intentan y fallan porque terminan siendo "listas de todo".

2. **Severidad visual clara** (Red/Orange/Green) — Sigue el modelo de triage clínico real (ESI, START triage). Correcto.

3. **Auto-expand de alertas** — Reducción de cognitive load. El usuario no tiene que buscar problemas.

4. **Mobile-first constraints** — Viewport containment, sticky headers con blur, touch targets >44px. Técnicamente sólido.

5. **CommandCenter ya existe** — Vi en el código que Sprint 1 ya implementó el "Glance Score". Esto es diferenciador vs. competencia.

6. **HotResidentsSlider generativo** — Ya está ordenando por `triageScore`. Esto es más avanzado que la mayoría de apps healthcare que solo listan alfabéticamente.

### Dónde Están vs. Estado del Arte

| Área | Halo Care | Estado del Arte | Gap |
|------|-----------|-----------------|-----|
| Glance Score | ✅ Implementado | Epic: No tiene, Vocera: Parcial | **Ahead** |
| Triage visual | ✅ Red/Orange/Green | Estándar industria | **Par** |
| Quick Actions | ❌ Placeholder | ServiceNow: 1-tap | **Behind** |
| Swipe Navigation | ⚠️ Parcial | Consumer apps: Standard | **Behind** |
| CV Integration | 🔧 Diseñado, no conectado | Futuro (nadie lo tiene) | **Innovation** |
| Offline Support | ⚠️ QueryClient ready, UI no | Epic: Parcial | **Behind** |
| Voice Input | ❌ No | Vocera: Core feature | **Behind** |
| Real-time | ❌ No | WebSocket standard | **Behind** |

---

## Análisis Crítico: "Ahogando la Reina"

### 1. El Gap Principal No Es UX Visual — Es Workflow

Ya tienen el diseño visual correcto. El problema es que **la app es read-only en la práctica**:

```
Actual:  VER info → ??? (dead end)
Debería: VER info → ACTUAR → CONFIRMAR → SIGUIENTE
```

Los Quick Actions en `ResidentOverviewScreen` son `console.log`. El FloatingActionPill "START ROUNDING" no hace nada. Esto **bloquea adopción** porque la enfermera vuelve a su método anterior (papel, otra app) para las acciones reales.

**Recomendación P0:** Implementar el loop completo aunque sea con mock. El usuario necesita sentir el flujo, no solo verlo.

### 2. Dual-Mode CV/Manual: Diseño Correcto, Falta Ejecutar

El diseño de Quick Actions dual-mode (con CV vs sin CV) está bien pensado:
- Con CV: "Detected 2m ago" (read-only) + Note + Escalate
- Sin CV: Confirm + Note + Escalate

Pero esto requiere:
- `hasCV` y `cvLastDetection` en el modelo de Room (no solo Resident)
- UI que muestre el estado de CV claramente
- Bulk confirm a nivel Room

**Implicación:** Room Detail Screen es P0, no P1. Sin esto, no pueden demostrar el valor de CV.

### 3. Hot Residents vs Rooms: La Tensión No Está Resuelta

Tienen dos vistas paralelas:
- **HotResidentsSlider** (horizontal, generativo por `triageScore`)
- **RoomCards** (vertical, estructura fija por planograma)

**El problema:** ¿Cuándo usa la enfermera cada una?

Mi hipótesis basada en field service UX:
- **Walking hallway** → RoomCards (contexto espacial, "estoy pasando por 203")
- **Sentada en estación** → Hot Residents (priorización pura, "quién necesita más atención")
- **Durante ronda activa** → Next in round (ni Hot Residents ni spatial)

**Solución:** El sistema debería alternar automáticamente:
- `roundingActive === false` → Show HotResidentsSlider
- `roundingActive === true` → Hide slider, reorder RoomCards by route

Esto **no está diseñado actualmente**. La UI actual mezcla ambos siempre.

### 4. Rounding Flow: El Feature Killer Está Incompleto

El `FloatingActionPill` con "START ROUNDING" es el feature más importante y está en placeholder.

**Por qué es crítico:**
- Define el caso de uso principal (ronda estructurada)
- Conecta con CV detection (auto-visit marking)
- Habilita métricas de compliance
- Es el "aha moment" para adopción

**Estado actual:** Solo cambia texto, no hay:
- Selección de tipo de ronda (Medicación, Observación, Vigia)
- Reordenamiento de RoomCards por ruta óptima
- Progress indicator ("3 of 12 rooms")
- Auto-advance al completar room
- End-of-round summary

**Recomendación:** Este es el **feature killer**. Invertir aquí antes de pulir otros detalles.

---

## Oportunidades No Explotadas (Estado del Arte)

### 1. Haptic Feedback — Diferenciador Subestimado

Consumer apps (Apple Health, Headspace) usan haptic para:
- Confirmar acciones (success tap)
- Alertar cambios (warning buzz)
- Guiar navegación (edge tap)

Healthcare apps enterprise lo ignoran. Oportunidad de diferenciación **con cero costo extra** (APIs nativas disponibles).

### 2. Bottom Sheet Pattern — Falta Crítica

Apps modernas usan bottom sheet para:
- Detalles sin perder contexto
- Quick forms (notas)
- Confirmaciones

Halo Care navega a nueva pantalla para todo. **Cognitive cost alto**.

**Ejemplo:** "Add Note" debería ser bottom sheet, no full screen.

### 3. Skeleton Screens — UX Percibido

Actual: "Loading residents..." con texto

Estado del arte: Skeleton screens que muestran estructura

**Impacto:** Perceived performance mejora 30-40% sin cambiar velocidad real.

### 4. Voice Input — El Elephant in the Room

Vocera domina healthcare precisamente por voice-first. La enfermera caminando no puede tipar.

**Mínimo viable:** Tap-to-speak para notas. No necesita ser fancy.

---

## Roadmap Estratégico: "Ahogar la Reina"

### Fase 1: Loop Completo (Adopción)
**Objetivo:** La enfermera puede completar una ronda real sin salir de la app.

1. ✅ CommandCenter (ya existe)
2. ✅ HotResidentsSlider con triageScore (ya existe)
3. **TODO:** Quick Actions funcionales (no console.log)
4. **TODO:** Room Detail con Bulk Confirm
5. **TODO:** Rounding Flow básico (start → progress → complete)

### Fase 2: Dual-Mode CV (Diferenciación)
**Objetivo:** Demostrar valor de CV, incentivar adopción bottom-up.

1. CV Status Badge en RoomCard y RoomDetail
2. Auto-visit detection (cuando CV está activo)
3. Manual confirm (cuando no hay CV)
4. "CV te ahorró X confirmaciones" metrics

### Fase 3: Triage Assistant Proactivo (Moat)
**Objetivo:** El sistema predice, no solo muestra.

1. Trending alerts ("Robert bajó 20% en 2h")
2. Route optimization ("Visita 203 → 201 → 204")
3. Predictive wellness ("Patrón de caída detectado")
4. Real-time WebSocket updates

---

## Contexto de Decisiones

**Confirmado con el usuario:**
- **Rounding Types:** Por definir. Depende de madurez del geriátrico. Filosofía: **feature discovery permeable** (no hardcodear tipos, ser adaptable).
- **Prioridad:** Piloto funcional + polish visual (ambos). La UX define el uso, no solo la funcionalidad.
- **Scope:** Plan detallado sin implementación en esta sesión.

---

## Plan de Implementación Detallado

### Filosofía de Diseño: "Permeable Feature Discovery"

El sistema debe ser **adaptable** a diferentes niveles de madurez:

```
Geriátrico básico          Geriátrico avanzado
─────────────────────────────────────────────────►
Confirmación manual        CV auto-detection
Ronda única                Múltiples tipos de ronda
Checklist simple           Care activities integradas
Notas libres               Templates estructurados
```

**Principio:** Diseñar para el avanzado, degradar gracefully al básico. Nunca bloquear funcionalidad core por features opcionales.

---

## Sprint 1: Loop Funcional Básico (Piloto Ready)

**Objetivo:** Una enfermera puede completar una ronda real end-to-end.

### 1.1 Quick Actions Funcionales
**Archivo:** `src/care/halo/components/ui/QuickActionBar.tsx`
**Status actual:** Existe, pero acciones son `console.log`

**Implementar:**
```tsx
<QuickActionBar
  resident={resident}
  room={room}
  onConfirmVisit={async () => {
    await confirmVisitMutation.mutateAsync(resident.id);
    // Toast success
    // Auto-advance to next if in rounding mode
  }}
  onAddNote={() => {
    openBottomSheet(<NoteForm residentId={resident.id} />);
  }}
  onEscalate={() => {
    openBottomSheet(<EscalateForm residentId={resident.id} />);
  }}
/>
```

**Backend endpoints necesarios:**
- `POST /api/visits` — Registrar visita manual
- `POST /api/notes` — Agregar nota
- `POST /api/alerts` — Escalar alerta

**Polish:** Haptic feedback en confirm (success tap), loading states, optimistic updates.

### 1.2 Bottom Sheet Component
**Archivo:** `src/care/halo/components/ui/BottomSheet.tsx`
**Status:** No existe

**Por qué P0:** Sin bottom sheet, cada acción navega a pantalla completa. Cognitive cost alto, rompe flujo de ronda.

**Diseño:**
```
┌─────────────────────────────────────────┐
│ ─────  (drag handle)                    │
│                                         │
│  Add Note for Margaret Chen             │
│  ────────────────────────────────       │
│  [                                 ]    │
│  [        Text area                ]    │
│  [                                 ]    │
│                                         │
│  [Cancel]              [Save Note]      │
└─────────────────────────────────────────┘
```

**Features:**
- Drag to dismiss
- Keyboard-aware (sube con teclado)
- Backdrop tap to close
- Focus trap para accessibility

### 1.3 Room Detail Screen
**Archivo:** `src/care/halo/screens/room/RoomDetailScreen.tsx`
**Status:** ViewRoomButton existe pero no hace nada

**Implementar:**
```
Room 201 · Memory Care
━━━━━━━━━━━━━━━━━━━━━━
[CV Status Badge: Active/Offline/None]

Bed A · Margaret Chen     [Monitor] [→]
Bed B · Robert Williams   [ALERT]   [→]
Bed C · Helen Davis       [Stable]  [→]
Bed D · Richard Miller    [Monitor] [→]

━━━━━━━━━━━━━━━━━━━━━━
[✓ CONFIRM ALL*]  [📝 ROOM NOTE]

* Solo visible si room.hasCV === false
```

**Ruta:** `/room/:roomId`
**Data:** Agrupar residents por room, agregar `hasCV`, `cvLastDetection` al Room type.

### 1.4 Rounding Flow Básico (Permeable)
**Archivos:**
- `src/care/halo/components/ui/FloatingActionPill.tsx` (modificar)
- `src/care/halo/context/RoundingContext.tsx` (crear)
- `src/care/halo/screens/floor/ResidentsScreen.tsx` (modificar)

**Estado actual:** FloatingActionPill cambia texto pero no hay estado real.

**Implementar:**

```typescript
// RoundingContext.tsx
interface RoundingState {
  isActive: boolean;
  roundType: string | null;  // Permeable: string libre, no enum
  startedAt: Date | null;
  visitedRooms: string[];
  totalRooms: number;
}
```

**Flujo:**
1. Tap "START ROUNDING" → Bottom sheet pregunta tipo (opcional, puede skip)
2. RoomCards se reordenan por ruta (próximo primero)
3. Badge "Next" en el room a visitar
4. Al confirmar room → auto-marca visitado, avanza al siguiente
5. Progress indicator: "4 of 12 rooms"
6. Al completar → Summary screen con métricas

**Diseño permeable:** El tipo de ronda es texto libre o selección de preset. Si el geriátrico no usa tipos, simplemente no selecciona nada. La funcionalidad no se bloquea.

### 1.5 Polish Visual (Paralelo)

**Skeleton Screens:**
- `src/care/halo/components/ui/Skeleton.tsx`
- Reemplazar "Loading residents..." con estructuras skeleton

**Haptic Feedback Util:**
- `src/care/halo/utils/haptics.ts`
- Wrapper sobre `navigator.vibrate()` con fallback

**Transiciones mejoradas:**
- Bottom sheet: spring animation
- Confirm action: scale + check animation
- Navigation: shared element transition (avatar)

---

## Sprint 2: Dual-Mode CV/Manual

**Objetivo:** Demostrar valor de CV, incentivar adopción bottom-up.

### 2.1 CV Status Model
**Archivo:** `src/care/halo/types/room.types.ts`

```typescript
interface Room {
  id: string;
  number: string;
  unit: string;
  // CV fields
  hasCV: boolean;
  cvStatus: 'active' | 'offline' | 'none';
  cvLastDetection: Date | null;
  // Residents
  beds: Bed[];
}
```

### 2.2 CV Status Badge
**Archivo:** `src/care/halo/components/ui/CVStatusBadge.tsx`

```
📷 Active     (verde, pulse)  — CV funcionando
📷 Offline    (gris)          — CV existe pero no funciona
[sin badge]                   — No hay CV
```

### 2.3 Auto-Visit Detection
**Lógica:** Si room tiene CV y `cvLastDetection` < 30 min, auto-marcar como visitado.

**UI:** En RoomCard mostrar "✓ Detected 2m ago" en lugar de requerir confirmación manual.

### 2.4 CV Metrics Component
**Archivo:** `src/care/halo/components/ui/CVMetrics.tsx`

```
📊 CV Coverage: 67% (8/12 rooms)
⏱️ CV te ahorró 14 confirmaciones hoy
```

**Objetivo:** Incentivar bottom-up adoption. La enfermera ve que rooms con CV = menos trabajo.

---

## Sprint 3: Triage Assistant Evolutivo

**Objetivo:** El sistema predice, no solo muestra.

### 3.1 Trending Alerts
**Lógica:** Comparar wellness actual vs. 2h/6h/24h antes. Si delta > threshold, alert "trending".

**UI en CommandCenter:**
```
🔴 3 Alerts  |  📉 2 Trending Down  |  ⏱️ 1 Overdue
```

### 3.2 Real-time Updates (Preparación)
**Archivo:** `src/care/halo/services/websocket/`

**Fase 1:** Long-polling como fallback
**Fase 2:** WebSocket connection
**UI:** Toast cuando wellness cambia en tiempo real

### 3.3 Route Optimization (Básico)
**Lógica:** Ordenar rooms por:
1. Alertas primero
2. Overdue segundo
3. Proximidad física (si tenemos floor plan data)

**UI:** Badge "Next" y línea de progreso visual en el mapa.

### 3.4 Interactive Care Activities
**Archivo:** `src/care/halo/components/residents/TopCareCard.tsx` (modificar)

**De read-only a interactive:**
```
☐ Medication (8:00 AM)     [tap to complete]
☑ Physical Therapy (10:30) — Completed 10:45
☐ Doctor Visit             — Pending
```

---

## Arquitectura de Archivos

### Crear (Sprint 1)
```
src/care/halo/
├── components/ui/
│   ├── BottomSheet.tsx           # Sheet para acciones
│   ├── Skeleton.tsx              # Loading skeletons
│   └── haptics.ts → utils/       # Haptic feedback
├── context/
│   └── RoundingContext.tsx       # Estado de ronda activa
└── screens/room/
    └── RoomDetailScreen.tsx      # Vista de habitación
```

### Modificar (Sprint 1)
```
src/care/halo/
├── components/ui/
│   ├── QuickActionBar.tsx        # Implementar acciones reales
│   └── FloatingActionPill.tsx    # Conectar con RoundingContext
├── screens/floor/
│   └── ResidentsScreen.tsx       # Integrar rounding flow
├── screens/resident/
│   └── ResidentOverviewScreen.tsx # Quick actions funcionales
├── types/
│   └── resident.types.ts         # Agregar Room type con CV fields
└── App.tsx                       # Ruta /room/:roomId
```

### Backend (Mock Server)
```
server/
├── routes/
│   ├── visits.js                 # POST /api/visits
│   ├── notes.js                  # POST /api/notes
│   └── alerts.js                 # POST /api/alerts
└── data/
    └── rooms.json                # Room data con hasCV
```

---

## Verificación de Cada Sprint

### Sprint 1 — Acceptance Criteria
- [ ] Quick Actions ejecutan mutaciones reales (no console.log)
- [ ] Bottom sheet abre para Note/Escalate
- [ ] Room Detail muestra todos los beds con navegación
- [ ] "START ROUNDING" inicia flujo con progress tracking
- [ ] Skeleton screens durante loading
- [ ] Haptic feedback en confirm visit

### Sprint 2 — Acceptance Criteria
- [ ] CV Status Badge visible en RoomCard y RoomDetail
- [ ] Rooms con CV muestran "Detected Xm ago" automáticamente
- [ ] Rooms sin CV requieren confirmación manual
- [ ] CVMetrics muestra ahorro de tiempo

### Sprint 3 — Acceptance Criteria
- [ ] Trending alerts en CommandCenter
- [ ] Care activities son tappables
- [ ] Real-time updates funcionan (al menos polling)
- [ ] Route optimization básico funciona

---

## Resumen Ejecutivo

**Estado actual:**
- Base filosófica excelente (Assisted Triage)
- Ejecución visual sólida
- **Gap crítico:** Workflow incompleto (read-only)

**Estrategia:**
1. **Sprint 1:** Loop funcional completo → Piloto ready
2. **Sprint 2:** Dual-mode CV → Demostrar valor diferencial
3. **Sprint 3:** Triage evolutivo → Moat competitivo

**Filosofía permeable:**
- No hardcodear tipos de ronda → Texto libre + presets opcionales
- No bloquear por CV → Degradar gracefully a manual
- No asumir madurez → Descubrir features según uso

**Riesgo principal:**
Si Rounding Flow no funciona end-to-end, la adopción se bloquea. La enfermera vuelve al papel.

**Oportunidad única:**
CV integration como moat. Nadie más tiene esto en healthcare field service. Pero necesita el dual-mode funcionando para demostrar valor.

**Metáfora de ajedrez:**
La posición es sólida. Las piezas están desarrolladas. Falta abrir las líneas (Quick Actions) y conectar las torres (Rounding Flow). Cuando eso pase, la reina (enfermera) puede moverse libremente por el tablero.
