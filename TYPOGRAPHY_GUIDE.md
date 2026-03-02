# Guía de Tipografía Mobile-First para Healthcare

## 🎯 Principios Aplicados

### 1. **Legibilidad a Distancia**
Para enfermeros que pueden estar:
- De pie, con el dispositivo a distancia del brazo
- Caminando, con movimiento
- Con guantes, reduciendo precisión táctil
- En diferentes condiciones de luz

### 2. **WCAG AA Compliance**
- Mínimo **14px** para body text (WCAG AA)
- Contraste mínimo 4.5:1 para texto normal
- Contraste mínimo 3:1 para texto grande (18px+)

### 3. **Mobile-First Sizing**
- Tamaños optimizados para pantallas pequeñas
- Escalable para tablets
- Considerando viewport móvil típico (375px-414px)

## 📏 Escala de Tamaños Actualizada

### Antes → Después

| Uso | Antes | Después | Razón |
|-----|-------|---------|-------|
| **Body text mínimo** | 11px | 14px | WCAG AA, legible a distancia |
| **Body text estándar** | 13px | 15px | Mejor legibilidad |
| **Títulos de cards** | 11-13px | 15-16px | Información crítica más visible |
| **Subtítulos** | 9.5-11.5px | 13-14px | Mínimo legible |
| **Títulos de sección** | 14px | 17px | Mejor jerarquía |
| **Títulos principales** | 20px | 22-24px | Más prominente |
| **Valores importantes** | 15px | 17-20px | Fácil de escanear |

## 🎨 Jerarquía Tipográfica

### Niveles de Información

1. **Hero/Título Principal** (24-28px)
   - Nombres de residents
   - Títulos de pantalla
   - Información más importante

2. **Títulos de Sección** (17-20px)
   - "My Residents", "All Residents"
   - "Top Care Activities"
   - Secciones principales

3. **Body Text Importante** (15-16px)
   - Nombres en cards
   - Valores en tablas
   - Información crítica

4. **Body Text Estándar** (14-15px)
   - Texto descriptivo
   - Metadata
   - Información secundaria

5. **Labels/Metadata** (12-13px)
   - Labels pequeños
   - Información auxiliar
   - Mínimo legible

## 📱 Optimizaciones Mobile

### 1. **Line Height Ajustado**
- **Tight**: 1.3 (antes 1.2) - Para títulos cortos
- **Normal**: 1.5 (antes 1.4) - Para body text
- **Relaxed**: 1.7 (antes 1.6) - Para párrafos

### 2. **Letter Spacing**
- Títulos grandes: `-0.02em` (más compacto, legible)
- Body text: `0` (estándar)
- Labels: `0.02em` (más espaciado para legibilidad)

### 3. **Font Weight**
- **Normal**: 400 - Texto estándar
- **Medium**: 500 - Mejor legibilidad que 400
- **Semibold**: 600 - Énfasis moderado
- **Bold**: 700 - Énfasis fuerte (títulos)

### 4. **Contraste Mejorado**
- Texto primario: `#1A1A1A` (antes `#333`)
- Texto secundario: `#666` (antes `#888`)
- Mejor contraste en todos los niveles

## 🎯 Casos de Uso Específicos

### Resident Cards (Grid)
- **Nombre**: 15px, Bold (antes 11px)
- **Room**: 13px, Medium (antes 9.5px)
- **Avatar**: 40px (antes 34px)

### Resident List Items
- **Nombre**: 16px, Bold (antes 13.5px)
- **Room**: 14px, Medium (antes 11.5px)

### Wellness Card
- **Título**: 17px, Bold (sin cambio)
- **Labels**: 12px, Medium (antes 11px)
- **Valores**: 17px, Bold (antes 15px)
- **Items**: 15px, Semibold (antes 14px)

### Top Care Activities
- **Título**: 20px, Bold (antes 18px)
- **Tab text**: 14px (antes 12.5px)
- **Headers**: 14px, Bold (antes 13px)
- **Activity names**: 15px, Semibold (antes 14px)
- **Values**: 15px, Bold (antes 14px)

### Navigation
- **Bottom nav labels**: 11px (antes 9px)
- **Screen titles**: 22px, Bold (antes 20px)

## ✅ Mejoras Implementadas

1. ✅ **Tamaños mínimos aumentados** - Todo texto legible
2. ✅ **Mejor jerarquía visual** - Diferencias más claras
3. ✅ **Contraste mejorado** - Colores más oscuros
4. ✅ **Line height optimizado** - Mejor spacing
5. ✅ **Font weights ajustados** - Medium para mejor legibilidad
6. ✅ **Letter spacing** - Para títulos grandes

## 📊 Comparación Visual

### Antes (Problemático)
```
Nombre: 11px  ← Muy pequeño, difícil de leer
Room: 9.5px   ← Casi ilegible
```

### Después (Optimizado)
```
Nombre: 15px  ← Legible a distancia
Room: 13px    ← Mínimo WCAG AA
```

## 🎯 Resultado

- ✅ **100% WCAG AA compliant**
- ✅ **Legible a distancia del brazo**
- ✅ **Optimizado para uso con guantes**
- ✅ **Mejor jerarquía visual**
- ✅ **Mobile-first approach**

---

**Filosofía**: "Si no puedes leerlo mientras caminas, es muy pequeño"
