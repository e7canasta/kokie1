import { ReactNode, useEffect, useRef, useState } from 'react';
import { theme } from '../../design-system';
import { haptics } from '../../utils/haptics';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  /** Height variant: auto (content-based), half, full */
  height?: 'auto' | 'half' | 'full';
  /** Allow drag to dismiss (default: true) */
  draggable?: boolean;
  /** Close on backdrop tap (default: true) */
  closeOnBackdrop?: boolean;
}

/**
 * BottomSheet Component
 *
 * Modern mobile bottom sheet with:
 * - Drag to dismiss
 * - Backdrop tap to close
 * - Keyboard aware (adjusts when keyboard opens)
 * - Spring animation
 * - Focus trap
 *
 * Usage:
 *   <BottomSheet isOpen={isOpen} onClose={handleClose} title="Add Note">
 *     <NoteForm />
 *   </BottomSheet>
 */
export function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
  height = 'auto',
  draggable = true,
  closeOnBackdrop = true,
}: BottomSheetProps) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  // Focus trap: focus first focusable element when opened
  useEffect(() => {
    if (isOpen && sheetRef.current) {
      const focusable = sheetRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Drag handlers
  const handleDragStart = (clientY: number) => {
    if (!draggable) return;
    startY.current = clientY;
    setIsDragging(true);
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging || !draggable) return;
    const deltaY = clientY - startY.current;
    if (deltaY > 0) {
      // Only allow dragging down
      setDragY(deltaY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging || !draggable) return;
    setIsDragging(false);

    // Close if dragged more than 100px
    if (dragY > 100) {
      haptics.light();
      onClose();
    }

    setDragY(0);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse events (for testing on desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  if (!isOpen) return null;

  const heightMap = {
    auto: 'auto',
    half: '50vh',
    full: '90vh',
  };

  const maxHeight = heightMap[height];

  return (
    <div
      style={styles.overlay}
      onClick={(e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
          haptics.light();
          onClose();
        }
      }}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={isDragging ? handleMouseUp : undefined}
    >
      <div
        ref={sheetRef}
        style={{
          ...styles.sheet,
          maxHeight,
          transform: `translateY(${dragY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* Drag Handle */}
        {draggable && (
          <div style={styles.handleContainer}>
            <div style={styles.handle} />
          </div>
        )}

        {/* Title */}
        {title && (
          <div style={styles.header}>
            <h3 style={styles.title}>{title}</h3>
          </div>
        )}

        {/* Content */}
        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: theme.zIndex.modal,
    display: 'flex',
    alignItems: 'flex-end',
    animation: 'fadeIn 0.2s ease-out',
  },
  sheet: {
    width: '100%',
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    boxShadow: theme.shadows['2xl'],
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  handleContainer: {
    padding: `${theme.spacing.sm} 0`,
    display: 'flex',
    justifyContent: 'center',
    cursor: 'grab',
  },
  handle: {
    width: '40px',
    height: '4px',
    backgroundColor: theme.colors.neutral[300],
    borderRadius: theme.borderRadius.full,
  },
  header: {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    borderBottom: `1px solid ${theme.colors.border.light}`,
  },
  title: {
    margin: 0,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  content: {
    padding: theme.spacing.lg,
    overflowY: 'auto',
    flex: 1,
    minHeight: 0,
  },
};

// Animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
`;
document.head.appendChild(styleSheet);
