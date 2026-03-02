
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

## Preguntas Antes de Finalizar Plan

Antes de concretar el plan de implementación, necesito clarificar:

1. **Rounding Flow:** ¿Cuántos tipos de ronda existen? (Medicación, Observación, Vigia, etc.) ¿El flujo es diferente para cada uno?

2. **CV Coverage Actual:** ¿Qué % de rooms tienen CV actualmente? Esto afecta si el dual-mode es crítico ya o puede esperar.

3. **Backend Ready:** Los Quick Actions (confirm visit, add note, escalate) ¿tienen endpoints en el mock server o necesitan crearse?

4. **Prioridad Inmediata:** ¿Estamos optimizando para:
   - (A) Demo/pitch (polish visual)
   - (B) Pilot real con enfermeras (loop completo funcional)
   - (C) Integración CV (conectar el backend de vision)

5. **Scope de esta sesión:** ¿Quieres que:
   - (A) Solo documente el análisis UX
   - (B) Diseñe el plan de implementación detallado
   - (C) Implemente los cambios prioritarios

---

## Resumen Ejecutivo

**Estado:** Base filosófica excelente (mejor que competencia enterprise), ejecución incompleta en workflow.

**Gap principal:** La app es read-only. Muestra info pero no permite actuar fluidamente.

**Oportunidad única:** CV integration como moat. Nadie más tiene esto.

**Riesgo:** Si Rounding Flow no funciona end-to-end, la adopción se bloquea.

**Mi recomendación:** Priorizar **Rounding Flow funcional** sobre polish visual. Una enfermera que completa una ronda real con la app se vuelve advocate. Una que solo "ve bonito" vuelve al papel.
