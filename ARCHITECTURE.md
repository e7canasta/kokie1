# Arquitectura y Estructura del Proyecto

## 📁 Estructura de Carpetas

```
src/
├── care/
│   └── halo/                    # Módulo principal de la aplicación
│       ├── design-system/       # Sistema de diseño centralizado
│       │   ├── theme.ts        # Tema con colores, tipografía, espaciado
│       │   ├── styles.ts       # Estilos comunes y utilidades
│       │   └── index.ts        # Barrel exports
│       │
│       ├── services/           # Capa de servicios (API, lógica de negocio)
│       │   └── api/
│       │       └── residents.api.ts
│       │
│       ├── hooks/              # Custom hooks reutilizables
│       │   ├── useResident.ts
│       │   └── useResidents.ts
│       │
│       ├── types/              # TypeScript types e interfaces
│       │   └── resident.types.ts
│       │
│       ├── components/         # Componentes organizados por categoría
│       │   ├── layout/        # Componentes de layout (ScreenLayout, ScreenHeader)
│       │   ├── ui/            # Componentes UI genéricos (LoadingState, ErrorState)
│       │   ├── navigation/    # Componentes de navegación
│       │   └── residents/     # Componentes específicos de residents
│       │
│       ├── screens/           # Pantallas de la aplicación
│       │   ├── floor/
│       │   └── resident/
│       │
│       ├── domain/            # Datos y lógica de dominio
│       │   ├── overview.ts
│       │   └── residents.ts
│       │
│       ├── utils/             # Utilidades (p. ej. residentUtils: colores avatar)
│       │
│       └── icons/             # Iconos SVG
│
├── store/                     # Estado global (Zustand)
│   └── index.ts
│
└── App.tsx                    # Configuración de rutas y providers
```

## 🎨 Sistema de Diseño

### Theme
- **Colores**: Paleta consistente con variantes (primary, neutral, semantic)
- **Tipografía**: Tamaños, pesos, familias de fuentes
- **Espaciado**: Sistema de spacing consistente
- **Sombras**: Elevaciones predefinidas
- **Transiciones**: Animaciones estándar

### Uso
```typescript
import { theme } from '../design-system';

// Usar colores
color: theme.colors.primary[500]

// Usar espaciado
padding: theme.spacing.lg

// Usar tipografía
fontSize: theme.typography.fontSize.lg
```

## 🔧 Capa de Servicios

### API Services
- Separación de lógica de fetching
- Manejo centralizado de errores
- Tipado fuerte con TypeScript
- Fácil de testear y mockear

### Ejemplo
```typescript
import { residentsApi } from '../services/api/residents.api';

const resident = await residentsApi.getResidentById(id);
```

## 🪝 Custom Hooks

### useResident
- Maneja fetching de un resident individual
- Integrado con React Query
- Retorna estado, loading, error

### useResidents
- Maneja fetching de lista de residents
- Incluye filtrado por búsqueda y normalización de colores (avatar)
- Expone `residents` (filtrados con colores), `myResidents` (primeros N para grid) y `allResidents`
- Memoización automática

## 📦 Componentes

### Layout Components
- **ScreenLayout**: Contenedor base para pantallas
- **ScreenHeader**: Header con navegación estándar

### UI Components
- **LoadingState**: Estado de carga reutilizable
- **ErrorState**: Estado de error con retry

## 🚀 Mejores Prácticas

### 1. Separación de Responsabilidades
- **Screens**: Solo orquestación y layout
- **Components**: UI reutilizable
- **Hooks**: Lógica de negocio reutilizable
- **Services**: Comunicación con API

### 2. Tipado Fuerte
- Todos los componentes tipados
- Interfaces compartidas en `/types`
- Evitar `any` types

### 3. Performance
- React Query para caching automático
- useMemo para cálculos costosos
- Lazy loading de rutas cuando sea necesario

### 4. Consistencia
- Usar siempre el theme para estilos (obligatorio en componentes UI: color, tipografía, espaciado, sombras)
- Componentes de layout para estructura común
- Hooks personalizados para lógica compartida

## 🔄 Flujo de Datos

```
Screen → Hook → API Service → Backend
         ↓
    React Query Cache
         ↓
    Component State
```

## 📱 Navegación

- React Router para routing
- Rutas anidadas para sub-pantallas
- Navegación consistente con ScreenHeader

## 🎯 Próximos Pasos Sugeridos

1. ~~**Error Boundaries**~~: Implementado en `components/ui/ErrorBoundary.tsx`, envuelve las rutas en `App.tsx`.
2. **Context Providers**: Para estado compartido (preferencias, usuario)
3. **Form Handling**: Biblioteca para formularios (React Hook Form)
4. **Testing**: Setup de tests unitarios e integración
5. **Storybook**: Documentación de componentes
6. **i18n**: Internacionalización si es necesario
