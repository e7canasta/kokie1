import { useState } from "react";
import { theme } from "../../design-system";

export interface RoundingSuggestion {
  type: string;
  scheduledTime: string; // formato "HH:MM"
  totalRooms: number;
  virtualPossible: number;
}

interface RoundingCardProps {
  suggestion: RoundingSuggestion | null;
  isActive: boolean;
  progress?: {
    visited: number;
    total: number;
    percentage: number;
    elapsedMinutes: number;
  };
  onViewProgram?: () => void;
  onStart?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

const ClockIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export function RoundingCard({
  suggestion,
  isActive,
  progress,
  onViewProgram,
  onStart,
  onPause,
  onEnd,
}: RoundingCardProps) {
  const [viewProgramPressed, setViewProgramPressed] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [pausePressed, setPausePressed] = useState(false);
  const [endPressed, setEndPressed] = useState(false);

  if (!suggestion && !isActive) {
    return null; // No mostrar si no hay sugerencia ni ronda activa
  }

  // Ronda activa
  if (isActive && progress) {
    const pendingRooms = progress.total - progress.visited;

    return (
      <div style={{
        margin: `${theme.spacing.md} ${theme.spacing.lg}`,
        padding: theme.spacing.lg,
        background: `linear-gradient(135deg, ${theme.colors.primary[500]}15, ${theme.colors.primary[600]}08)`,
        border: `2px solid ${theme.colors.primary[500]}`,
        borderRadius: theme.borderRadius.lg,
        boxShadow: theme.shadows.md,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: theme.spacing.sm }}>
          <div style={{
            width: 8,
            height: 8,
            background: theme.colors.primary[500],
            borderRadius: '50%',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} />
          <span style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary[700],
            textTransform: 'uppercase',
            letterSpacing: theme.typography.letterSpacing.wide,
          }}>
            RONDA EN PROGRESO
          </span>
        </div>

        <div style={{ marginBottom: theme.spacing.md }}>
          <div style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            marginBottom: 4,
          }}>
            {suggestion?.type || 'Ronda General'}
          </div>
          <div style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
          }}>
            {progress.elapsedMinutes} min transcurridos
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: theme.spacing.md }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing.xs }}>
            <span style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.text.secondary,
            }}>
              {progress.visited}/{progress.total} completadas
            </span>
            <span style={{
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.primary[600],
            }}>
              {progress.percentage}%
            </span>
          </div>

          <div style={{
            width: '100%',
            height: 8,
            background: theme.colors.neutral[200],
            borderRadius: theme.borderRadius.full,
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress.percentage}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`,
              borderRadius: theme.borderRadius.full,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {pendingRooms > 0 && (
          <div style={{
            marginBottom: theme.spacing.md,
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            background: `${theme.colors.warning}10`,
            border: `1px solid ${theme.colors.warning}`,
            borderRadius: theme.borderRadius.sm,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.primary,
          }}>
            Siguiente: {pendingRooms} habitacion{pendingRooms > 1 ? 'es' : ''} pendiente{pendingRooms > 1 ? 's' : ''}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: theme.spacing.md }}>
          <button
            onClick={onPause}
            onMouseDown={() => setPausePressed(true)}
            onMouseUp={() => setPausePressed(false)}
            onMouseLeave={() => setPausePressed(false)}
            onTouchStart={() => setPausePressed(true)}
            onTouchEnd={() => setPausePressed(false)}
            style={{
              flex: 1,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              background: theme.colors.background.primary,
              border: `1.5px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              cursor: 'pointer',
              transform: pausePressed ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            }}
          >
            PAUSAR
          </button>
          <button
            onClick={onEnd}
            onMouseDown={() => setEndPressed(true)}
            onMouseUp={() => setEndPressed(false)}
            onMouseLeave={() => setEndPressed(false)}
            onTouchStart={() => setEndPressed(true)}
            onTouchEnd={() => setEndPressed(false)}
            style={{
              flex: 1,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[700]})`,
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.inverse,
              cursor: 'pointer',
              transform: endPressed ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            }}
          >
            FINALIZAR RONDA
          </button>
        </div>

        <style>
          {`
            @keyframes pulse {
              0%, 100% {
                opacity: 1;
              }
              50% {
                opacity: 0.5;
              }
            }
          `}
        </style>
      </div>
    );
  }

  // Sugerencia de ronda (no activa)
  if (suggestion) {
    return (
      <div style={{
        margin: `${theme.spacing.md} ${theme.spacing.lg}`,
        padding: theme.spacing.lg,
        background: theme.colors.background.primary,
        border: `1.5px solid ${theme.colors.border.light}`,
        borderRadius: theme.borderRadius.lg,
        boxShadow: theme.shadows.sm,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: theme.spacing.sm }}>
          {ClockIcon}
          <span style={{
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.secondary,
          }}>
            Próxima ronda sugerida
          </span>
        </div>

        <div style={{ marginBottom: theme.spacing.md }}>
          <div style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            marginBottom: 4,
          }}>
            {suggestion.type} • {suggestion.scheduledTime}
          </div>
          <div style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
          }}>
            {suggestion.totalRooms} habitaciones
            {suggestion.virtualPossible > 0 && (
              <span style={{ color: theme.colors.primary[600], fontWeight: theme.typography.fontWeight.semibold }}>
                {' '}• {suggestion.virtualPossible} virtual{suggestion.virtualPossible > 1 ? 'es' : ''} posible{suggestion.virtualPossible > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: theme.spacing.md }}>
          <button
            onClick={onViewProgram}
            onMouseDown={() => setViewProgramPressed(true)}
            onMouseUp={() => setViewProgramPressed(false)}
            onMouseLeave={() => setViewProgramPressed(false)}
            onTouchStart={() => setViewProgramPressed(true)}
            onTouchEnd={() => setViewProgramPressed(false)}
            style={{
              flex: 1,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              background: theme.colors.background.secondary,
              border: `1.5px solid ${theme.colors.border.medium}`,
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
              cursor: 'pointer',
              transform: viewProgramPressed ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s ease',
            }}
          >
            VER PROGRAMA
          </button>
          <button
            onClick={onStart}
            onMouseDown={() => setStartPressed(true)}
            onMouseUp={() => setStartPressed(false)}
            onMouseLeave={() => setStartPressed(false)}
            onTouchStart={() => setStartPressed(true)}
            onTouchEnd={() => setStartPressed(false)}
            style={{
              flex: 1,
              padding: `${theme.spacing.sm} ${theme.spacing.md}`,
              background: 'linear-gradient(135deg, #FF6B35, #E84E1B)',
              border: 'none',
              borderRadius: theme.borderRadius.md,
              fontSize: theme.typography.fontSize.sm,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.inverse,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transform: startPressed ? 'scale(0.97)' : 'scale(1)',
              transition: 'transform 0.15s ease',
              boxShadow: '0 4px 12px rgba(232, 78, 27, 0.25)',
            }}
          >
            INICIAR
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return null;
}
