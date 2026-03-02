/**
 * Animation Utilities
 * Utilidades para animaciones y transiciones consistentes
 */

export const animations = {
  // Page transitions (iOS-like)
  pageTransition: {
    enter: {
      opacity: 0,
      transform: "translateX(20px)",
    },
    enterActive: {
      opacity: 1,
      transform: "translateX(0)",
      transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
    },
    exit: {
      opacity: 1,
      transform: "translateX(0)",
    },
    exitActive: {
      opacity: 0,
      transform: "translateX(-20px)",
      transition: "opacity 0.25s ease-in, transform 0.25s ease-in",
    },
  },

  // Card animations
  cardHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  cardPress: {
    transform: "scale(0.98)",
    transition: "transform 0.1s ease-out",
  },

  // Fade animations
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: "0.3s",
    easing: "ease-out",
  },

  fadeInUp: {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    duration: "0.3s",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  // Stagger animation for lists
  stagger: (index: number) => ({
    animationDelay: `${index * 50}ms`,
  }),

  // Pulse animation for alerts
  pulse: {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },

  // Shake animation for errors
  shake: {
    animation: "shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)",
  },
} as const;

// CSS keyframes (to be added to global styles)
export const keyframes = `
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-4px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(4px);
  }
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOutLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
`;
