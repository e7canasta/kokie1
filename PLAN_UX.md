# UX Review: Halo Care — Mobile Healthcare Triage

## First Citizen Profile
- **Who**: Enfermera de noche en ronda
- **Context**: Pasillos, entre habitaciones, caminando, una mano
- **Device**: Mobile phone (primary), tablet/PC (secondary, estación enfermería)
- **Goal**: Triage visual instantáneo — saber dónde ir sin pensar

## System Context (Crítico para UX)
- **Computer Vision**: El sistema detecta visitas automáticamente vía cámaras
- **Cobertura parcial**: No todas las rooms tienen CV (progresión bottom-up)
- **Ronda Virtual**: Futuro - observar cámaras + feedback = dar como pasada
- **Tipos de ronda**: Medicación, Observación, Vigia, etc.
- **My Residents**: Sección **generativa/contextual** (no favoritos estáticos)
  - "Hots" = residentes más problemáticos/relevantes para el contexto actual
  - Diferente de Rooms (planograma fijo con info activa)

---

## 🎯 Lo Que Está Excelente (Keep)

### 1. ✅ **Filosofía Assisted Triage — CORRECTA**
La premisa core es sólida: "El sistema gestiona la atención de la enfermera, no al revés."
- Auto-expand de alerts
- Collapse de rooms calm
- Severidad visual (Red/Orange/Green)

### 2. ✅ **RoomCard — Diseño Glanceable Bien Ejecutado**
```
Collapsed: [accent] Room [avatars] [dots] [badge] [chevron]
Expanded:  2-col grid + rounding footer
```
- Accent color driven by severity ✓
- Pulsing dots para Low wellness ✓
- Badge count para alerts ✓

### 3. ✅ **Sticky Unit Bar — Context Siempre Visible**
La enfermera siempre sabe qué piso/unidad está viendo.

### 4. ✅ **FloatingActionPill Contextual**
- START ROUNDING / CONTINUE ROUNDING / QUICK NOTE
- Cambia según contexto — no requiere configuración
- Color naranja para urgencia de rounding

---

## 🚨 Problemas Críticos — "Ahogando la Reina"

### 1. **CRÍTICO: No hay "Glance Score" Global**
**El problema:**
La enfermera abre la app y ve una lista de RoomCards. Pero no hay un **resumen ejecutivo instantáneo** de:
- ¿Cuántas alertas totales hay ahora mismo?
- ¿Cuánto tiempo llevo sin visitar habitaciones?
- ¿Está todo bajo control o necesito correr?

**Por qué duele (Field Service UX):**
En field service healthcare, el primer segundo al abrir la app define la urgencia mental. Si todo es una lista, el cerebro tiene que parsear card por card. **Cognitive load = alto**.

**Solución — "Command Center Header":**
```
┌─────────────────────────────────────────┐
│  🔴 3 ALERTS   ⏱️ 2 OVERDUE   ✅ 6 OK  │
│  ────────────────────────────────────── │
│  Next: Room 203 (overdue 15m)  [GO →]   │
└─────────────────────────────────────────┘
```

**Beneficio:** < 1 segundo para saber el estado global. **Glance → Decision.**

---

### 2. **CRÍTICO: Resident Detail es Dead End**
**El problema actual:**
```
ResidentOverviewScreen:
  - Header con back
  - ViewRoomButton (no hace nada)
  - WellnessCard
  - TopCareCard
  - ... no hay Quick Actions
```

**Por qué duele:**
La enfermera entra a ver un residente, ve el wellness, y... ¿ahora qué? No hay forma de:
- Confirmar visita (cuando no hay CV)
- Agregar una nota rápida
- Escalar una alerta
- Ir al siguiente residente de la habitación

**Context importante (CV):**
- En rooms CON Computer Vision: el sistema ya sabe que visitó
- En rooms SIN CV: la enfermera necesita confirmar manualmente
- **El diseño debe soportar ambos escenarios** (progresión bottom-up)

**Solución — Quick Action Bar (bottom):**
```
┌─────────────────────────────────────────────────┐
│  [✓ CONFIRM*]  [📝 NOTE]  [🚨 ESCALATE]        │
└─────────────────────────────────────────────────┘
* CONFIRM solo visible si room no tiene CV
* Si tiene CV, muestra "✓ Detected 2m ago" (solo lectura)
```

**Dual-mode design:**
- **Con CV**: Actions = Note, Escalate (visita ya detectada)
- **Sin CV**: Actions = Confirm Visit, Note, Escalate

**Beneficio:** Quick wins con primeras camas monitoreadas, incentiva bottom-up adoption de CV.

---

### 3. **CRÍTICO: No hay "Swipe to Next Resident"**
**El problema:**
En una habitación de 4 camas, la enfermera ve Robert (bed A), termina, y tiene que:
1. Tap back
2. Ver RoomCard
3. Tap Helen (bed B)

**Eso son 3 taps para ir al compañero de cuarto.**

**Por qué duele:**
En rounding real, la enfermera está **físicamente parada en la habitación**. Quiere:
- Swipe left → siguiente cama
- Swipe right → cama anterior

**Solución — Swipe Navigation en Resident Detail:**
```
[← Bed A]  Margaret Chen (Bed B)  [Bed C →]
           Swipe for next/prev
```

---

### 4. **MEDIO: My Residents → "Hot Residents" (Sección Generativa)**
**Clarificación del usuario:**
Esta NO es una sección de favoritos estáticos. Es una **UI generativa/contextual** que muestra los "hots":
- Residentes más problemáticos ahora mismo
- Consensuados por el sistema O por la enfermera
- Cambian según contexto de la noche
- Próximos en la ronda actual

**Diferencia con Rooms:**
- **Rooms** = Planograma fijo (estructura estática con data activa)
- **My Residents** = Vista generativa (contenido dinámico según contexto)

**Implicaciones de diseño:**
1. Renombrar internamente a `HotResidentsSlider` o `ContextualResidentsSlider`
2. El orden debe ser inteligente (no alfabético):
   - Primero: Alerts (Low wellness)
   - Segundo: Próximos en ronda
   - Tercero: Cambios recientes de wellness
3. Puede incluir indicador de "por qué está aquí" (badge: "Alert", "Next", "Changed")
4. El slider crece/decrece dinámicamente según el contexto

**Próxima evolución:** Integrar con Triage Assistant Agent para ordenamiento ML-driven.

---

### 5. **MEDIO: TopCareCard — Desconectada del Workflow**
**El problema actual:**
TopCareCard muestra actividades de cuidado, pero:
- No tiene checkboxes tappables
- No se integra con el workflow de rounding
- Es solo lectura

**Por qué duele:**
La enfermera ve "Physical Therapy - 10:30 AM" pero no puede marcarla como iniciada desde la app. Tiene que ir a otro sistema.

**Solución — Tappable Checklist:**
```
☐ Medication (8:00 AM) — Blood pressure
☑ Physical Therapy (10:30 AM) — Completed 10:45
☐ Doctor Visit — Pending
```
Tap = toggle + timestamp + optional note.

---

### 6. **ALTA: Room Detail Screen + Bulk Confirm**
**ViewRoomButton** existe pero no hace nada.

**Por qué importa (ALTA prioridad confirmada):**
- La enfermera frecuentemente visita toda la habitación a la vez
- En rooms sin CV, necesita confirmar visita de forma bulk
- Incluso con CV, puede necesitar agregar notas a nivel de room

**Solución — Room Detail Screen:**
```
Room 201 · Memory Care
┌─────────────────────────────────────────┐
│ 📷 CV Active | Last detected: 2m ago   │  ← Si tiene CV
└─────────────────────────────────────────┘
━━━━━━━━━━━━━━━━━━━━━━
[Bed A] Margaret - Monitor  [→]
[Bed B] Robert - ALERT      [→]
[Bed C] Helen - Stable      [→]
[Bed D] Richard - Monitor   [→]
━━━━━━━━━━━━━━━━━━━━━━
┌─────────────────────────────────────────┐
│  [✓ CONFIRM ALL*]  [📝 ROOM NOTE]      │
└─────────────────────────────────────────┘
* Solo si room NO tiene CV
```

**CV Status Badge:**
- 📷 **CV Active** (verde) = Room monitoreada, visitas auto-detectadas
- 📷 **CV Offline** (gris) = Cámara existe pero no está funcionando
- ❌ **No CV** (sin badge) = Room sin monitoreo, requiere confirmación manual

**Incentivo bottom-up:** La enfermera ve que rooms con CV requieren menos trabajo manual → pide más cámaras.

---

## 📊 Matriz de Priorización UX (Actualizada)

| Issue | Impact en Adopción | Effort | Prioridad |
|-------|-------------------|--------|-----------|
| Command Center Header (Glance Score) | 🔴 Alto | Medio | **P0** |
| Quick Actions (dual-mode CV/manual) | 🔴 Alto | Medio | **P0** |
| Room Detail Screen + Bulk Confirm | 🔴 Alto | Medio | **P0** |
| Hot Residents Slider (generativo) | 🟡 Medio | Medio | P1 |
| Swipe Navigation Residents | 🟡 Medio | Medio | P1 |
| Tappable Care Activities | 🟡 Medio | Medio | P2 |
| CV Status Indicators | 🟢 Bajo | Bajo | P2 |

**Cambio clave:** Room Detail subió a P0 porque Bulk Confirm es crítico para rooms sin CV.

---

## 🎯 UX Improvements Plan

### P0 — Critical for Adoption (Sprint 1)

#### 1. Command Center Header (Glance Score)
**New File:** `components/ui/CommandCenter.tsx`
**Modify:** `ResidentsScreen.tsx`
```tsx
<CommandCenter
  alerts={totalAlerts}
  overdue={overdueRooms}
  ok={okRooms}
  cvCoverage={roomsWithCV / totalRooms}
  nextRoom={nextOverdueRoom}
  onGoToNext={() => scrollToRoom(nextOverdueRoom)}
/>
```
**Data needed:** `roundingStatus` per room, alert counts

#### 2. Room Detail Screen + Bulk Confirm
**New File:** `screens/room/RoomDetailScreen.tsx`
**New Route:** `/room/:roomId`
**Features:**
- List all beds with mini resident cards
- CV Status badge (Active/Offline/None)
- "Confirm All Visited" (only if no CV)
- Room-level notes

#### 3. Quick Actions (Dual-Mode CV/Manual)
**Modify:** `ResidentOverviewScreen.tsx`
**New File:** `components/ui/QuickActionBar.tsx`
```tsx
<QuickActionBar
  hasCV={room.hasComputerVision}
  lastDetected={room.lastCVDetection}
  onConfirmVisit={() => confirmVisit(resident.id)}  // Solo si !hasCV
  onNote={() => openNoteSheet(resident.id)}
  onEscalate={() => escalateAlert(resident.id)}
/>
```

### P1 — High Value (Sprint 2)

#### 4. Hot Residents Slider (Generativo)
**Modify:** `FavoriteResidentSlider.tsx` → `HotResidentsSlider.tsx`
**Changes:**
- Ordenamiento inteligente (alerts → next in round → recent changes)
- Badge indicando "por qué está aquí" (🔴 Alert, ⏭️ Next, 📈 Changed)
- Datos de `triageScore` y `triageReason` en Resident type

#### 5. Swipe Navigation Between Residents
**Modify:** `ResidentOverviewScreen.tsx`
**Add:** Context de room residents para navegación lateral
```tsx
<SwipeableResident
  residents={roomResidents}
  currentIndex={currentIndex}
  onSwipeLeft={() => goToNext()}
  onSwipeRight={() => goToPrev()}
/>
```

### P2 — Nice to Have (Sprint 3)

#### 6. Tappable Care Activities
**Modify:** `TopCareCard.tsx`
**Add:** Interactive checklist con timestamps

#### 7. CV Metrics Dashboard
**New:** "CV te ahorró X confirmaciones hoy"
**Purpose:** Incentivar bottom-up adoption

---

## 🔮 Future-Proofing (No Ahogues la Reina)

### Triage Assistant Vision — UI Generativa
El sistema evoluciona de "visor de datos" a "asistente de triage":

**Fase 1 (Actual):**
- Datos estáticos con refresh manual
- Hot Residents = alerts + próximos en ronda

**Fase 2 (Próxima):**
- CV detecta visitas automáticamente
- Hot Residents ordenados por ML (urgencia predicha)
- Ronda Virtual: observar cámaras = dar como pasada

**Fase 3 (Futuro):**
- Triage Assistant proactivo: "Robert necesita atención, su wellness bajó 20% en 2h"
- Sugerencias de ruta óptima: "Visita 203 → 201 → 204 para eficiencia"
- Alertas predictivas: "Helen muestra patrones de caída inminente"

**Implicación arquitectónica:**
- Hot Residents slider debe ser **data-driven**, no hardcoded
- Necesita `triageScore` y `triageReason` en el modelo de Resident
- Preparar para WebSocket/real-time updates

### CV Coverage Progression (Bottom-Up Adoption)
La UX debe **incentivar** la adopción de más cámaras:

```
Sin CV                     Con CV
[Manual work] ─────────► [Auto-detected]
     │                        │
     │  "Esto es más fácil"   │
     │  ◄──────────────────── │
     │                        │
     ▼                        ▼
"Pidamos más cámaras"    "Quick wins"
```

**UX Tactics:**
1. Mostrar claramente qué rooms tienen CV (badge verde)
2. Metrics de tiempo ahorrado: "CV te ahorró 12 confirmaciones hoy"
3. Friction reducida en rooms con CV (menos taps)

### Para Tablet/PC (Estación de Enfermería)
El diseño actual es **mobile-first correctamente**. Para tablet/PC:
- Agregar sidebar con lista de rooms (siempre visible)
- Detail pane a la derecha (no full-screen)
- Keyboard shortcuts para power users
- Multi-resident selection para bulk actions
- Vista de cámaras en grid (Ronda Virtual)

### Para Real-Time Updates
- WebSocket ready architecture
- Optimistic UI updates
- Conflict resolution para edits simultáneos
- Push notifications para cambios de wellness

### Para Shift Handoff
- "End of Shift" summary view
- Notas que persisten entre shifts
- "Flagged for next shift" badges
- Métricas de cobertura de ronda

---

## Verification

### Testing de Cambios UX
1. **Lighthouse mobile score** — Target: > 90
2. **Task completion time**: "Find alert and act" < 5 seconds
3. **User testing**: 3-tap rule (any action completable in ≤3 taps)

### Files a Modificar/Crear

**P0 — Sprint 1:**
```
CREAR:
├── components/ui/CommandCenter.tsx       # Glance score header
├── components/ui/QuickActionBar.tsx      # Actions (dual-mode CV/manual)
├── screens/room/RoomDetailScreen.tsx     # Room view + bulk confirm
└── components/ui/CVStatusBadge.tsx       # CV indicator

MODIFICAR:
├── ResidentsScreen.tsx                   # Integrar CommandCenter
├── ResidentOverviewScreen.tsx            # Integrar QuickActionBar
├── types/resident.types.ts               # hasCV, triageScore, triageReason
├── App.tsx                               # Nueva ruta /room/:roomId
└── RoomCard.tsx                          # Link a RoomDetailScreen
```

**P1 — Sprint 2:**
```
RENOMBRAR:
└── FavoriteResidentSlider.tsx → HotResidentsSlider.tsx

MODIFICAR:
├── HotResidentsSlider.tsx                # Ordenamiento inteligente + badges
├── ResidentOverviewScreen.tsx            # Swipe navigation
└── useSwipeGesture.ts                    # Enhance for resident navigation
```

**P2 — Sprint 3:**
```
MODIFICAR:
├── TopCareCard.tsx                       # Interactive checklist
└── Nuevo: components/ui/CVMetrics.tsx    # Adoption incentive
```

---

## Resumen Ejecutivo

**Estado actual:** Base sólida de UX Assisted Triage con buen diseño visual, pero **flujo de trabajo incompleto** para rounding real.

**Gap principal:** La app muestra información pero no permite **actuar** sobre ella de forma fluida. La enfermera ve alertas pero no puede:
- Confirmar visitas (especialmente en rooms sin CV)
- Navegar entre residentes sin volver atrás
- Ver un resumen global instantáneo

**Vision clave (del usuario):**
1. **My Residents = Sección generativa** (no favoritos estáticos). Los "hots" del contexto actual.
2. **CV detecta visitas automáticamente** pero no todas las rooms tienen cámaras.
3. **Diseño dual-mode**: Soportar rooms con CV (auto) y sin CV (manual).
4. **Bottom-up adoption**: La UX debe incentivar que pidan más cámaras.

**Recomendación P0:**
1. **Command Center** — Glance score global (< 1 segundo para saber estado)
2. **Room Detail + Bulk Confirm** — Confirmar toda la habitación
3. **Quick Actions dual-mode** — Detectar si tiene CV o no

**Estos 3 cambios transforman Halo Care de "visor de datos" a "Triage Assistant activo" que funciona con o sin Computer Vision.**

**Metáfora de ajedrez:** La posición es sólida. Abrir las diagonales (acciones) + conectar las torres (CV integration) = control completo del tablero. La reina puede moverse libremente.
