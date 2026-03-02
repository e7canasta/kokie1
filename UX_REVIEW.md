# UX Review: Halo Care — Mobile Healthcare Triage Assistant

**Fecha:** 2026-03-02
**Reviewer:** Claude Sonnet 4.5 (Healthcare UX + Field Service specialist)
**First Citizen:** Enfermera de noche en ronda (mobile, one-handed, hallways)

---

## 🎯 Executive Summary

**Veredicto:** Base arquitectónica sólida con excelente filosofía UX (Assisted Triage), pero **flujo de trabajo incompleto** para uso real en campo.

**Gap principal:** La app muestra información pero no permite actuar sobre ella de forma fluida.

**Visión del sistema (Computer Vision):**
- CV detecta visitas automáticamente vía cámaras
- Cobertura parcial (no todas las rooms tienen CV)
- Diseño debe soportar **dual-mode**: con CV y sin CV
- Bottom-up adoption: UX debe incentivar que pidan más cámaras

---

## ✅ Lo Que Está Excelente

### 1. Filosofía Assisted Triage — CORRECTA ✓
La premisa core es sólida: "El sistema gestiona la atención de la enfermera, no al revés."
- Auto-expand de alerts
- Collapse de rooms calm
- Severidad visual (Red/Orange/Green)

### 2. RoomCard — Diseño Glanceable ✓
- Accent color driven by severity
- Pulsing dots para Low wellness
- Badge count para alerts
- Chevron animado para expand/collapse

### 3. Mobile Layout Constraints — Bien Ejecutado ✓
- Sticky headers con blur backdrop
- Pull to refresh
- Viewport containment correcto
- Touch targets > 44px

### 4. FloatingActionPill Contextual ✓
- START ROUNDING / CONTINUE ROUNDING / QUICK NOTE
- Cambia según contexto sin configuración

---

## 🚨 Problemas Críticos — "Ahogando la Reina"

### 1. CRÍTICO: No hay "Glance Score" Global

**El problema:**
La enfermera abre la app y ve una lista de RoomCards. No hay resumen ejecutivo instantáneo.

**Por qué duele (Field Service UX):**
En healthcare field service, **el primer segundo** al abrir la app define la urgencia mental. Si todo es una lista, el cerebro tiene que parsear card por card. **Cognitive load alto.**

**Solución — Command Center Header:**
```
┌─────────────────────────────────────────┐
│  🔴 3 ALERTS   ⏱️ 2 OVERDUE   ✅ 6 OK  │
│  📷 CV: 8/12 rooms (67%)                │
│  ────────────────────────────────────── │
│  Next: Room 203 (overdue 15m)  [GO →]   │
└─────────────────────────────────────────┘
```

**Beneficio:** < 1 segundo para saber el estado global. **Glance → Decision.**

**Prioridad:** P0

---

### 2. CRÍTICO: Resident Detail es Dead End

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
La enfermera ve el wellness, y... ¿ahora qué? No puede:
- Confirmar visita (en rooms sin CV)
- Agregar una nota rápida
- Escalar una alerta
- Ir al siguiente residente de la habitación

**Context Computer Vision:**
- Rooms CON CV: sistema detecta visita automáticamente
- Rooms SIN CV: enfermera necesita confirmar manualmente
- **Diseño debe soportar ambos escenarios**

**Solución — Quick Action Bar (dual-mode):**
```
Con CV:
┌─────────────────────────────────────────────────┐
│  ✓ Detected 2m ago  │  [📝 NOTE]  [🚨 ESCALATE]│
└─────────────────────────────────────────────────┘

Sin CV:
┌─────────────────────────────────────────────────┐
│  [✓ CONFIRM]  [📝 NOTE]  [🚨 ESCALATE]         │
└─────────────────────────────────────────────────┘
```

**Beneficio:** Quick wins con primeras camas monitoreadas, incentiva bottom-up adoption de CV.

**Prioridad:** P0

---

### 3. CRÍTICO: No hay "Swipe to Next Resident"

**El problema:**
En una habitación de 4 camas, la enfermera ve Robert (bed A) y termina. Para ir a Helen (bed B):
1. Tap back
2. Ver RoomCard
3. Tap Helen

**Eso son 3 taps** para ir al compañero de cuarto.

**Por qué duele:**
En rounding real, la enfermera está **físicamente parada en la habitación**. Quiere navegar entre camas con swipe.

**Solución:**
```
[← Bed A]  Margaret Chen (Bed B)  [Bed C →]
           Swipe for next/prev
```

**Prioridad:** P1

---

### 4. ALTA: Room Detail Screen + Bulk Confirm

**ViewRoomButton** existe pero no hace nada.

**Por qué importa (confirmado ALTA prioridad):**
- La enfermera frecuentemente visita toda la habitación a la vez
- En rooms sin CV, necesita confirmar bulk
- Incluso con CV, puede necesitar agregar notas a nivel room

**Solución:**
```
Room 201 · Memory Care
┌─────────────────────────────────────────┐
│ 📷 CV Active | Last detected: 2m ago   │
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
- 📷 **CV Offline** (gris) = Cámara existe pero no funciona
- ❌ **No CV** (sin badge) = Room sin monitoreo, requiere confirmación manual

**Incentivo bottom-up:** La enfermera ve que rooms con CV requieren menos trabajo → pide más cámaras.

**Prioridad:** P0 (subió de P1)

---

### 5. MEDIO: My Residents → Hot Residents (Generativo)

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
1. Renombrar internamente a `HotResidentsSlider`
2. Ordenamiento inteligente (no alfabético):
   - Primero: Alerts (Low wellness)
   - Segundo: Próximos en ronda
   - Tercero: Cambios recientes de wellness
3. Indicador de "por qué está aquí" (badge: "Alert", "Next", "Changed")
4. El slider crece/decrece dinámicamente

**Prioridad:** P1

---

### 6. MEDIO: TopCareCard — Solo Lectura

**El problema:**
TopCareCard muestra actividades de cuidado pero:
- No tiene checkboxes tappables
- No se integra con el workflow de rounding
- Es solo lectura

**Solución:**
```
☐ Medication (8:00 AM) — Blood pressure
☑ Physical Therapy (10:30 AM) — Completed 10:45
☐ Doctor Visit — Pending
```
Tap = toggle + timestamp + optional note.

**Prioridad:** P2

---

## 📊 Matriz de Priorización UX

| Issue | Impact en Adopción | Effort | Prioridad |
|-------|-------------------|--------|-----------|
| Command Center (Glance Score) | 🔴 Alto | Medio | **P0** |
| Quick Actions (dual-mode CV/manual) | 🔴 Alto | Medio | **P0** |
| Room Detail + Bulk Confirm | 🔴 Alto | Medio | **P0** |
| Hot Residents Slider (generativo) | 🟡 Medio | Medio | P1 |
| Swipe Navigation Residents | 🟡 Medio | Medio | P1 |
| Tappable Care Activities | 🟡 Medio | Medio | P2 |
| CV Status Indicators | 🟢 Bajo | Bajo | P2 |

---

## 🎯 Roadmap de Implementación

### Sprint 1 — P0 (Critical for Adoption)

**Files a crear:**
- `components/ui/CommandCenter.tsx` — Glance score header
- `components/ui/QuickActionBar.tsx` — Actions (dual-mode CV/manual)
- `screens/room/RoomDetailScreen.tsx` — Room view + bulk confirm
- `components/ui/CVStatusBadge.tsx` — CV indicator

**Files a modificar:**
- `ResidentsScreen.tsx` — Integrar CommandCenter
- `ResidentOverviewScreen.tsx` — Integrar QuickActionBar
- `types/resident.types.ts` — hasCV, triageScore, triageReason
- `App.tsx` — Nueva ruta /room/:roomId
- `RoomCard.tsx` — Link a RoomDetailScreen

**Resultado esperado:**
- Enfermera puede ver estado global en < 1 segundo
- Puede confirmar visitas en rooms sin CV
- Puede confirmar habitaciones completas (bulk)

### Sprint 2 — P1 (High Value)

**Files a modificar:**
- `FavoriteResidentSlider.tsx` → Renombrar a `HotResidentsSlider.tsx`
- `HotResidentsSlider.tsx` — Ordenamiento inteligente + badges
- `ResidentOverviewScreen.tsx` — Swipe navigation
- `useSwipeGesture.ts` — Enhance for resident navigation

**Resultado esperado:**
- Hot Residents muestra los "hots" del contexto actual
- Swipe entre residentes de la misma habitación

### Sprint 3 — P2 (Nice to Have)

**Files a modificar:**
- `TopCareCard.tsx` — Interactive checklist
- Nuevo: `components/ui/CVMetrics.tsx` — Adoption incentive

**Resultado esperado:**
- Care activities tappables
- Métricas de CV para incentivar adopción

---

## 🔮 Visión Futura: Triage Assistant Evolutivo

### Fase 1 (Actual)
- Datos estáticos con refresh manual
- Hot Residents = alerts + próximos en ronda

### Fase 2 (Próxima)
- CV detecta visitas automáticamente
- Hot Residents ordenados por ML (urgencia predicha)
- Ronda Virtual: observar cámaras = dar como pasada

### Fase 3 (Futuro)
- Triage Assistant proactivo: "Robert necesita atención, su wellness bajó 20% en 2h"
- Sugerencias de ruta óptima: "Visita 203 → 201 → 204 para eficiencia"
- Alertas predictivas: "Helen muestra patrones de caída inminente"

**Implicación arquitectónica:**
- Hot Residents slider debe ser **data-driven**, no hardcoded
- Necesita `triageScore` y `triageReason` en el modelo de Resident
- Preparar para WebSocket/real-time updates

---

## 📐 CV Coverage Progression (Bottom-Up Adoption)

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

---

## 🎓 Principios de Diseño Aplicados

### Speed & Efficiency
- ✅ Command Center: < 1 segundo para glance score
- ✅ Quick Actions: 1 tap para acción común
- ❌ **Falta:** Swipe navigation (3 taps → 1 swipe)

### Context Awareness
- ✅ Sticky unit bar (siempre sabe dónde está)
- ✅ FloatingActionPill contextual
- ❌ **Falta:** Hot Residents generativo

### One-Hand Operation
- ✅ Thumb zone optimizado
- ✅ Touch targets > 44px
- ✅ Bottom nav + FAB

### Error Prevention
- ✅ Visual feedback (pulsing dots)
- ✅ Clear states (loading, error)
- ❌ **Falta:** Confirmación antes de acciones críticas

---

## 📊 Métricas de Éxito

**KPIs a monitorear post-implementación:**

1. **Time to Decision** (P0)
   - Baseline actual: ~5-7 segundos (parsear lista)
   - Target: < 2 segundos (Command Center)

2. **Taps per Action** (P0)
   - Confirmar visita: 3 taps → 1 tap
   - Navegar entre residentes: 3 taps → 1 swipe

3. **CV Adoption Rate** (P1)
   - Métrica: "Solicitudes de cámaras nuevas" post-UX update
   - Target: +30% en 3 meses

4. **User Satisfaction** (P0-P2)
   - Survey: "¿La app te ayuda a priorizar?"
   - Target: > 4.5/5

---

## 🎯 Conclusiones

**Estado actual:**
- ✅ Filosofía UX correcta (Assisted Triage)
- ✅ Diseño visual sólido
- ✅ Mobile-first bien ejecutado
- ❌ **Flujo de trabajo incompleto** para uso real

**Gap principal:**
La app muestra información pero no permite **actuar** sobre ella de forma fluida.

**Recomendación P0:**
1. Command Center (glance score)
2. Room Detail + Bulk Confirm
3. Quick Actions dual-mode

**Estos 3 cambios transforman Halo Care de "visor de datos" a "Triage Assistant activo".**

**Metáfora de ajedrez:**
La posición es sólida. Abrir las diagonales (acciones) + conectar las torres (CV integration) = control completo del tablero. **La reina puede moverse libremente.**

---

**Next Steps:** Ver `/home/visiona/.claude/plans/purring-scribbling-lamport.md` para plan de implementación detallado.
