# Arquitectura del Sistema - Halo Care

## 🏗️ Visión General

Arquitectura escalable y mantenible para aplicación mobile-first de healthcare, diseñada para crecer sin "ahogar al rey" (evitar complejidad innecesaria).

## 📁 Estructura de Carpetas

```
src/
├── care/
│   └── halo/                    # Módulo principal
│       ├── design-system/       # Sistema de diseño centralizado
│       │   ├── theme.ts        # Tema completo
│       │   ├── styles.ts       # Estilos comunes
│       │   └── index.ts        # Barrel exports
│       │
│       ├── services/           # Capa de servicios
│       │   └── api/           # Servicios API
│       │       └── residents.api.ts
│       │
│       ├── hooks/              # Custom hooks
│       │   ├── useResident.ts
│       │   ├── useResidents.ts
│       │   └── useSwipeGesture.ts
│       │
│       ├── utils/              # Utilidades
│       │   └── animations.ts  # Utilidades de animación
│       │
│       ├── types/              # TypeScript types
│       │   └── resident.types.ts
│       │
│       ├── components/         # Componentes organizados
│       │   ├── layout/        # Layout components
│       │   ├── ui/            # UI genéricos
│       │   ├── navigation/    # Navegación
│       │   └── residents/     # Específicos de residents
│       │
│       ├── screens/           # Pantallas
│       │   ├── floor/
│       │   └── resident/
│       │
│       ├── domain/            # Lógica de dominio
│       │   ├── overview.ts
│       │   └── residents.ts
│       │
│       └── icons/             # Iconos SVG
│
├── store/                     # Estado global (Zustand)
│   └── index.ts
│
└── App.tsx                    # Configuración de rutas
```

## 🎯 Principios Arquitectónicos

### 1. **Separación de Responsabilidades**
- **Screens**: Solo orquestación y layout
- **Components**: UI reutilizable
- **Hooks**: Lógica de negocio reutilizable
- **Services**: Comunicación con API
- **Domain**: Lógica de negocio pura

### 2. **Feature-Based Organization**
- Componentes agrupados por feature
- Fácil encontrar código relacionado
- Escalable para nuevas features

### 3. **DRY (Don't Repeat Yourself)**
- Hooks para lógica compartida
- Componentes reutilizables
- Utilities para funciones comunes

### 4. **Type Safety**
- TypeScript estricto
- Interfaces compartidas
- Evitar `any` types

## 🔄 Flujo de Datos

```
┌─────────────┐
│   Screen    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Hook     │ ← Lógica de negocio
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │ ← API calls
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Backend   │
└─────────────┘
       │
       ▼
┌─────────────┐
│ React Query │ ← Caching automático
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Components │ ← UI
└─────────────┘
```

## 🧩 Capas del Sistema

### 1. **Presentation Layer** (Screens + Components)
- Responsable de: UI, interacciones, layout
- No contiene: Lógica de negocio, llamadas API directas

### 2. **Business Logic Layer** (Hooks)
- Responsable de: Lógica reutilizable, estado derivado
- No contiene: Llamadas API, detalles de UI

### 3. **Data Layer** (Services)
- Responsable de: Comunicación con API, transformación de datos
- No contiene: Lógica de negocio, UI

### 4. **Domain Layer** (Domain)
- Responsable de: Modelos de datos, constantes, tipos
- No contiene: Lógica de UI, llamadas API

## 🔌 Integraciones

### State Management
- **React Query**: Server state, caching
- **Zustand**: Client state global (mínimo)
- **Local State**: useState para estado de componente

### Routing
- **React Router**: Navegación
- **Nested Routes**: Para sub-pantallas
- **Route Guards**: Preparado para autenticación

### API Communication
- **Fetch API**: Nativo, sin dependencias
- **Services Layer**: Abstracción de API
- **Error Handling**: Centralizado

## 📦 Componentes

### Layout Components
- `ScreenLayout`: Contenedor base
- `ScreenHeader`: Header estándar
- Reutilizables en todas las pantallas

### UI Components
- `LoadingState`: Estados de carga
- `ErrorState`: Manejo de errores
- `PullToRefresh`: Refresh mobile
- `QuickActionButton`: Botones optimizados

### Feature Components
- Organizados por dominio (residents, navigation, etc.)
- Específicos del feature
- Reutilizables dentro del feature

## 🪝 Custom Hooks

### Patrón de Hooks
```typescript
// Hook retorna estado y acciones
const { data, isLoading, error, action } = useFeature();
```

### Hooks Disponibles
- `useResident`: Fetching de resident individual
- `useResidents`: Lista con filtrado
- `useSwipeGesture`: Detección de gestos

## 🎨 Design System Integration

### Theme Usage
```typescript
import { theme } from '../design-system';

// Usar siempre el theme
color: theme.colors.primary[500]
padding: theme.spacing.lg
fontSize: theme.typography.fontSize.lg
```

### Beneficios
- Consistencia visual
- Cambios globales fáciles
- Single source of truth

## 🚀 Performance

### Optimizaciones
- **React Query**: Caching inteligente
- **useMemo**: Cálculos costosos
- **Lazy Loading**: Preparado para rutas
- **Code Splitting**: Por feature

### Best Practices
- Evitar re-renders innecesarios
- Memoizar callbacks cuando sea necesario
- Lazy load de componentes pesados

## 🔒 Seguridad y Robustez

### Error Handling
- Try-catch en servicios
- Error boundaries (preparado)
- Validación de datos
- Manejo de estados de error

### Type Safety
- TypeScript estricto
- Validación de tipos en runtime (preparado)
- Interfaces compartidas

## 📈 Escalabilidad

### Agregar Nueva Feature
1. Crear carpeta en `screens/` o `components/`
2. Crear hook si hay lógica reutilizable
3. Crear servicio si hay llamadas API
4. Agregar tipos en `types/`
5. Agregar ruta en `App.tsx`

### Mantenibilidad
- Código organizado y claro
- Documentación en código
- Tests (preparado para agregar)

## 🧪 Testing Strategy (Preparado)

### Unit Tests
- Hooks
- Services
- Utilities

### Integration Tests
- Flujos completos
- Interacciones usuario

### E2E Tests
- User journeys críticos
- Flujos de trabajo principales

## 📚 Convenciones

### Naming
- **Components**: PascalCase (`ResidentCard`)
- **Hooks**: camelCase con `use` (`useResident`)
- **Services**: camelCase con sufijo `Api` (`residentsApi`)
- **Types**: PascalCase (`Resident`, `ResidentProps`)

### File Organization
- Un componente por archivo
- Barrel exports para agrupaciones
- Index files para facilitar imports

### Code Style
- TypeScript estricto
- Functional components
- Hooks para lógica
- Props tipadas

## 🔮 Futuro

### Preparado Para
- ✅ Autenticación
- ✅ Permisos y roles
- ✅ Notificaciones push
- ✅ Offline support
- ✅ Internacionalización
- ✅ Testing
- ✅ CI/CD

---

**Filosofía**: "Simple cuando es posible, complejo solo cuando es necesario"
