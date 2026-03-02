/**
 * Design System - Theme
 * Centraliza todos los valores de diseño para mantener consistencia
 */

export const theme = {
  colors: {
    // Primary - Healthcare Green
    primary: {
      50: "#E8F5F3",
      100: "#C8E8E0",
      200: "#A3D9CD",
      300: "#7ECAB9",
      400: "#5DBFA9",
      500: "#2E7D6F", // Main brand color
      600: "#1B5E50",
      700: "#154A3F",
      800: "#0F362E",
      900: "#09221C",
    },
    
    // Semantic colors
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    info: "#2196F3",
    
    // Neutrals
    neutral: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#1A1A1A",
    },
    
    // Backgrounds
    background: {
      primary: "#FFFFFF",
      secondary: "#F6F5F3",
      tertiary: "#F3F3F3",
    },
    
    // Text
    text: {
      primary: "#1A1A1A",
      secondary: "#666666",
      tertiary: "#999999",
      inverse: "#FFFFFF",
    },
    
    // Borders
    border: {
      light: "#E8E8E8",
      medium: "#E0E0E0",
      dark: "#CCCCCC",
    },
  },
  
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  
  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    full: "9999px",
  },
  
  typography: {
    fontFamily: {
      primary: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "'SF Mono', 'Monaco', 'Menlo', monospace",
    },
    // Mobile-first font sizes optimized for healthcare workers
    // Minimum 14px for body text (WCAG AA, readable at arm's length)
    fontSize: {
      xs: "12px",      // Labels secundarios, metadata (antes 11px)
      sm: "14px",      // Body text mínimo, información secundaria (antes 12px)
      base: "15px",    // Body text estándar, fácil de leer (antes 13px)
      md: "16px",      // Texto importante, cards (antes 14px)
      lg: "18px",      // Subtítulos, valores importantes (antes 16px)
      xl: "20px",      // Títulos de sección (antes 18px)
      "2xl": "24px",   // Títulos principales (antes 20px)
      "3xl": "28px",   // Títulos hero (antes 24px)
      "4xl": "32px",   // Títulos muy grandes (nuevo)
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      heavy: 750,
    },
    lineHeight: {
      tight: 1.3,      // Ajustado para mejor legibilidad (antes 1.2)
      normal: 1.5,    // Mejor spacing para lectura rápida (antes 1.4)
      relaxed: 1.7,   // Para párrafos largos (antes 1.6)
    },
    // Letter spacing para mejor legibilidad
    letterSpacing: {
      tight: "-0.01em",
      normal: "0",
      wide: "0.02em",
      wider: "0.05em",
    },
  },
  
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.04)",
    md: "0 1px 4px rgba(0,0,0,0.08)",
    lg: "0 4px 12px rgba(0,0,0,0.12)",
    xl: "0 10px 30px rgba(0,0,0,0.15)",
    "2xl": "0 30px 90px rgba(0,0,0,0.2), 0 10px 30px rgba(0,0,0,0.12)",
  },
  
  transitions: {
    fast: "0.15s ease",
    normal: "0.2s ease",
    slow: "0.3s ease",
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    toast: 1080,
  },
  
  breakpoints: {
    mobile: "375px",
    tablet: "768px",
    desktop: "1024px",
  },
} as const;

export type Theme = typeof theme;
