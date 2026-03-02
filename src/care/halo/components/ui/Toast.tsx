import { useEffect, useState } from 'react';
import { theme } from '../../design-system';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

/**
 * Toast Notification Component
 *
 * Usado para feedback visual de acciones:
 * - CV detection confirmada
 * - Visita confirmada manualmente
 * - Nota guardada
 * - Alerta escalada
 *
 * Usage:
 *   const [toast, setToast] = useState<ToastProps | null>(null);
 *   setToast({ message: 'Visit confirmed', type: 'success' });
 */
export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300); // animation duration
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeConfig = {
    success: {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ),
      bg: theme.colors.success,
      textColor: '#FFFFFF',
    },
    error: {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
      bg: theme.colors.error,
      textColor: '#FFFFFF',
    },
    warning: {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      bg: theme.colors.warning,
      textColor: '#FFFFFF',
    },
    info: {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
      bg: theme.colors.info,
      textColor: '#FFFFFF',
    },
  };

  const config = typeConfig[type];

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: theme.zIndex.toast,
        pointerEvents: 'none',
        animation: isExiting
          ? 'toastSlideOut 0.3s cubic-bezier(0.4, 0, 1, 1) forwards'
          : 'toastSlideIn 0.3s cubic-bezier(0, 0, 0.2, 1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          background: config.bg,
          borderRadius: theme.borderRadius.full,
          boxShadow: theme.shadows.lg,
          color: config.textColor,
          minWidth: '200px',
          maxWidth: '90vw',
        }}
      >
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{config.icon}</div>
        <p
          style={{
            margin: 0,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            lineHeight: 1.4,
          }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}

// Toast container for managing multiple toasts
export function useToast() {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: number }>>([]);

  const showToast = (toast: ToastProps) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const ToastContainer = () => (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </>
  );

  return { showToast, ToastContainer };
}

// CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes toastSlideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes toastSlideOut {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
  }
`;
document.head.appendChild(styleSheet);
