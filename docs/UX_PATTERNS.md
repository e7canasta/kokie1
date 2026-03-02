# UX Patterns - Halo Care

## 🎯 Contexto de Uso

### Usuario Principal
**Enfermero en Rondas de Cuidado**
- Trabaja de pie, caminando
- Usa dispositivo móvil/tablet
- Puede tener guantes
- Necesita acceso rápido a información
- Contexto de trabajo: alta presión, tiempo limitado

### Escenarios de Uso
1. **Ronda rápida**: Ver estado de múltiples residents
2. **Detalle de resident**: Revisar información completa
3. **Completar tareas**: Marcar actividades realizadas
4. **Documentar**: Agregar notas, observaciones
5. **Alertas**: Responder a situaciones urgentes

## 🧭 Patrones de Navegación

### 1. Master-Detail Pattern
```
Lista (Master) 
  → Detalle (Detail) 
    → Sub-detalle (Care Activities)
```

**Características**:
- Swipe right para volver
- Breadcrumbs visuales
- Transiciones suaves
- Contexto preservado

### 2. Tab Navigation
- **Bottom tabs**: Secciones principales (siempre visible)
- **Top tabs**: Filtros/vistas dentro de sección
- **Indicadores claros**: Active state destacado

### 3. Stack Navigation
- Pila de pantallas con historial
- Back button consistente (arriba izquierda)
- Animaciones push/pop tipo iOS

## 🎨 Patrones Visuales

### 1. Card-Based Design
**Cuándo usar**:
- Listas de items
- Información agrupada
- Acciones por item

**Características**:
- Información escaneable
- Acciones claras
- Estados visuales

### 2. Priority Indicators
**Sistema de colores**:
- 🟢 **Verde**: Normal, completado
- 🟡 **Amarillo**: Atención necesaria
- 🔴 **Rojo**: Urgente, crítico
- 🔵 **Azul**: Información

**Implementación**:
- Badges de prioridad
- Bordes de color
- Iconos de alerta
- Animaciones de pulso

### 3. Information Hierarchy
```
1. Información crítica (arriba, grande, destacada)
2. Acciones principales (fácil acceso)
3. Detalles secundarios (expandibles)
4. Metadata (pequeña, discreta)
```

## ⚡ Micro-interacciones

### 1. Button Feedback
```typescript
onPress: scale(0.95)
onRelease: scale(1)
Duration: 0.15s
```

### 2. Card Interactions
```typescript
onHover: translateY(-2px) + shadow
onTap: scale(0.98)
Duration: 0.2s
```

### 3. Loading States
- **Skeleton screens**: Mejor que spinners
- **Progress indicators**: Para procesos largos
- **Optimistic updates**: Feedback inmediato

### 4. Success Feedback
- Checkmark animation
- Toast notifications
- Haptic feedback (simulado)

## 🎯 Patrones de Flujo

### Flujo de Ronda Típico
1. **Ver lista** → Prioridades destacadas
2. **Tocar resident** → Overview rápido
3. **Ver actividades** → Quick actions
4. **Completar tarea** → Feedback inmediato
5. **Siguiente** → Swipe o back

### Optimizaciones
- **Batch actions**: Múltiples tareas a la vez
- **Quick notes**: Sin salir del contexto
- **Voice input**: Para notas mientras caminan
- **Photo capture**: Documentación rápida

## 📱 Mobile-Specific Patterns

### 1. Pull to Refresh
- Patrón estándar mobile
- Feedback visual durante pull
- Animación de carga

### 2. Swipe Actions
- **Swipe right**: Volver/Navegar
- **Swipe left**: Acción rápida
- **Long press**: Menú contextual

### 3. Bottom Sheet
- Información adicional
- Sin perder contexto
- Pull up desde abajo

### 4. Quick Actions
- FAB (Floating Action Button)
- Menú contextual
- Atajos táctiles

## 🎨 Visual Feedback

### Estados de Carga
1. **Skeleton screens**: Mejor UX que spinners
2. **Progress bars**: Para procesos conocidos
3. **Optimistic UI**: Actualizar antes de confirmar

### Estados de Error
1. **Inline errors**: Cerca del campo
2. **Toast notifications**: Errores no críticos
3. **Error screens**: Errores críticos con retry

### Confirmaciones
1. **Visual feedback**: Cambio inmediato
2. **Toast**: Para acciones simples
3. **Dialog**: Para acciones críticas

## 🔄 Patrones de Datos

### 1. Progressive Disclosure
- Información esencial primero
- Detalles bajo demanda
- Expandir/colapsar

### 2. Empty States
- Mensaje claro
- Acción sugerida
- Ilustración/icono

### 3. Error States
- Mensaje claro del error
- Acción de retry
- Alternativas sugeridas

## 🎯 Principios de Diseño Aplicados

### Fitts's Law
- Botones grandes y fáciles de tocar
- Áreas de toque amplias
- Espaciado adecuado

### Hick's Law
- Menos opciones = decisiones más rápidas
- Agrupación lógica
- Navegación predecible

### Miller's Rule
- Máximo 7±2 items visibles
- Agrupación de información
- Chunking de datos

### Gestalt Principles
- **Proximidad**: Items relacionados juntos
- **Similaridad**: Mismo estilo = misma función
- **Continuidad**: Flujo visual claro

## 📊 Métricas de UX

### KPIs
1. **Time to Task**: < 3 segundos
2. **Error Rate**: < 2%
3. **Task Completion**: > 95%
4. **User Satisfaction**: > 4.5/5

### A/B Testing
- Tamaños de botones
- Colores de prioridad
- Posición de acciones
- Animaciones vs. estáticas

---

**Filosofía**: "Fast, Clear, Safe" - Rápido para usar, claro para entender, seguro para confiar.
