import { useState } from "react";
import { theme } from "../../design-system";

export type FabAction = "rounding" | "continue-rounding" | "quick-note";

interface ActionConfig {
  label: string;
  icon: React.ReactNode;
  gradient: string;
  shadow: string;
}

const PlayIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const ContinueIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);

const NoteIcon = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ACTION_CONFIG: Record<FabAction, ActionConfig> = {
  rounding: {
    label: "START ROUNDING",
    icon: PlayIcon,
    gradient: "linear-gradient(135deg, #FF6B35, #E84E1B)",
    shadow: "0 6px 20px rgba(232, 78, 27, 0.35), 0 2px 8px rgba(0,0,0,0.12)",
  },
  "continue-rounding": {
    label: "CONTINUE ROUNDING",
    icon: ContinueIcon,
    gradient: "linear-gradient(135deg, #FF8A50, #FF6B35)",
    shadow: "0 6px 20px rgba(255, 107, 53, 0.35), 0 2px 8px rgba(0,0,0,0.12)",
  },
  "quick-note": {
    label: "QUICK NOTE",
    icon: NoteIcon,
    gradient: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[700]})`,
    shadow: `0 6px 20px ${theme.colors.primary[600]}40, 0 2px 8px rgba(0,0,0,0.12)`,
  },
};

interface FloatingActionPillProps {
  action?: FabAction;
  onPress?: () => void;
}

export function FloatingActionPill({ action = "rounding", onPress }: FloatingActionPillProps) {
  const [isPressed, setIsPressed] = useState(false);
  const config = ACTION_CONFIG[action];

  return (
    <div
      style={{
        padding: "0 20px 8px",
        flexShrink: 0,
      }}
    >
      <button
        onClick={onPress}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "14px 24px",
          background: config.gradient,
          border: "none",
          borderRadius: theme.borderRadius.full,
          color: theme.colors.text.inverse,
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.bold,
          letterSpacing: theme.typography.letterSpacing.wider,
          cursor: "pointer",
          boxShadow: config.shadow,
          transform: isPressed ? "scale(0.97)" : "scale(1)",
          transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease",
        }}
      >
        {config.icon}
        {config.label}
      </button>
    </div>
  );
}
