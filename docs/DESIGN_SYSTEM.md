# Design System - Halo Care

## 🎯 Visión

Sistema de diseño unificado para aplicaciones móviles de healthcare, optimizado para enfermeros en contexto de trabajo (rondas, cuidado de pacientes).

## 📐 Principios Fundamentales

### 1. **Mobile-First Healthcare**
- Diseñado para uso en movimiento
- Optimizado para una mano
- Legible a distancia del brazo
- Funcional con guantes

### 2. **Speed & Clarity**
- Información crítica visible inmediatamente
- Acciones en máximo 2 taps
- Feedback visual instantáneo
- Jerarquía visual clara

### 3. **Safety & Trust**
- Prevención de errores
- Confirmaciones para acciones críticas
- Estados visuales claros
- Accesibilidad WCAG AA

## 🎨 Sistema de Colores

### Paleta Principal
```typescript
primary: {
  500: "#2E7D6F", // Main brand - Healthcare green
  600: "#1B5E50", // Darker variant
}
```

### Colores Semánticos
- **Success**: `#4CAF50` - Completado, normal
- **Warning**: `#FF9800` - Atención requerida
- **Error**: `#F44336` - Urgente, crítico
- **Info**: `#2196F3` - Información

### Uso de Colores
- **Verde**: Estados normales, éxito, completado
- **Amarillo**: Advertencias, atención necesaria
- **Rojo**: Urgencia, errores, crítico
- **Azul**: Información, enlaces

## 📏 Tipografía

### Escala de Tamaños
| Tamaño | Uso | Ejemplo |
|--------|-----|---------|
| **12px** (xs) | Labels secundarios | Metadata, timestamps |
| **14px** (sm) | Body mínimo | Información secundaria |
| **15px** (base) | Body estándar | Texto principal |
| **16px** (md) | Texto importante | Nombres, valores |
| **18px** (lg) | Subtítulos | Secciones |
| **20px** (xl) | Títulos | Headers de sección |
| **24px** (2xl) | Títulos principales | Nombres destacados |
| **28px** (3xl) | Hero | Títulos de pantalla |

### Jerarquía
1. **Hero** (24-28px, Bold) - Información más importante
2. **Título** (20-22px, Bold) - Secciones principales
3. **Subtítulo** (17-18px, Semibold) - Subsecciones
4. **Body Importante** (15-16px, Medium-Bold) - Información crítica
5. **Body** (14-15px, Normal-Medium) - Texto estándar
6. **Metadata** (12-13px, Medium) - Información auxiliar

### Line Height
- **Tight** (1.3): Títulos cortos
- **Normal** (1.5): Body text
- **Relaxed** (1.7): Párrafos largos

### Font Weights
- **400** (Normal): Texto estándar
- **500** (Medium): Mejor legibilidad
- **600** (Semibold): Énfasis moderado
- **700** (Bold): Énfasis fuerte

## 📐 Espaciado

### Sistema de Spacing
```
xs:  4px   → Espaciado mínimo
sm:  8px   → Espaciado pequeño
md:  16px  → Espaciado estándar
lg:  24px  → Espaciado grande
xl:  32px  → Espaciado extra grande
xxl: 48px  → Espaciado máximo
```

### Aplicación
- **Padding interno**: sm-md (8-16px)
- **Gap entre elementos**: sm-md (8-16px)
- **Margin entre secciones**: lg-xl (24-32px)
- **Padding de pantalla**: md-lg (16-24px)

## 🎭 Componentes Base

### Cards
- **Border radius**: 12-16px
- **Padding**: 16-20px
- **Shadow**: sm-md para elevación
- **Border**: 1px solid para definición

### Buttons
- **Tamaño mínimo**: 44x44px (Apple HIG)
- **Border radius**: Full (pill shape) o md
- **Padding**: 12-16px vertical
- **Font size**: 14-16px

### Inputs
- **Height**: Mínimo 44px
- **Font size**: 15px
- **Padding**: 12-16px
- **Border radius**: md-lg

## 🎬 Animaciones

### Transiciones
- **Fast**: 0.15s - Micro-interacciones
- **Normal**: 0.2s - Transiciones estándar
- **Slow**: 0.3s - Transiciones de página

### Easing
- **Ease-out**: Para entradas
- **Ease-in**: Para salidas
- **Cubic-bezier(0.4, 0, 0.2, 1)**: Material Design

### Patrones
- **Hover**: translateY(-2px) + shadow
- **Press**: scale(0.95-0.98)
- **Page transition**: slide + fade

## 📱 Mobile Patterns

### Thumb Zone
- **Zona cómoda**: Inferior de pantalla
- **Zona difícil**: Superior (evitar acciones críticas)
- **Bottom nav**: Siempre accesible

### Touch Targets
- **Mínimo**: 44x44px
- **Recomendado**: 48x48px
- **Espaciado**: Mínimo 8px entre targets

### Gestos
- **Swipe right**: Volver atrás
- **Swipe left**: Avanzar/Acción
- **Pull down**: Refresh
- **Long press**: Menú contextual

## 🎯 Estados Visuales

### Prioridad
- **Low**: Sin indicador
- **Medium**: Borde amarillo
- **High**: Borde rojo + pulso
- **Critical**: Borde rojo grueso + pulso intenso

### Estados de Componentes
- **Default**: Estado normal
- **Hover**: Elevación + sombra
- **Active/Pressed**: Scale down
- **Disabled**: Opacidad 0.5
- **Loading**: Spinner o skeleton
- **Error**: Borde rojo + mensaje

## 🔍 Accesibilidad

### Contraste
- **Texto normal**: Mínimo 4.5:1 (WCAG AA)
- **Texto grande**: Mínimo 3:1 (WCAG AA)
- **Componentes**: Mínimo 3:1

### Tamaños
- **Texto mínimo**: 14px (WCAG AA)
- **Touch targets**: 44x44px mínimo
- **Espaciado**: Generoso para precisión

### Navegación
- **Keyboard**: Tab order lógico
- **Screen readers**: ARIA labels
- **Focus states**: Claramente visibles

## 📚 Recursos

### Fuentes
- **Primary**: SF Pro Display (iOS native)
- **Fallback**: System fonts stack

### Iconos
- **Tamaño estándar**: 20-24px
- **Tamaño pequeño**: 16px
- **Tamaño grande**: 28-32px
- **Estilo**: Outline o filled según contexto

---

**Última actualización**: Basado en mejores prácticas de mobile healthcare UX y estándares de accesibilidad.
