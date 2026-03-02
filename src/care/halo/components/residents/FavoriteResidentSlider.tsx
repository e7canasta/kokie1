import { useState } from "react";
import { Avatar } from "../ui/Avatar";
import { theme } from "../../design-system";
import type { Resident } from "../../types/resident.types";

const WELLNESS_RING: Record<string, string> = {
  High: theme.colors.success,
  Medium: theme.colors.warning,
  Low: theme.colors.error,
};

const WELLNESS_LABEL: Record<string, string> = {
  High: "Stable",
  Medium: "Monitor",
  Low: "Alert",
};

interface FavoriteResidentSliderProps {
  residents: Resident[];
  onResidentClick: (id: number) => void;
}

export function FavoriteResidentSlider({ residents, onResidentClick }: FavoriteResidentSliderProps) {
  if (residents.length === 0) return null;

  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        scrollSnapType: "x mandatory",
        display: "flex",
        gap: 10,
        padding: `0 ${theme.spacing.md} 4px`,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {residents.map((resident, i) => (
        <FavoriteCard
          key={resident.id}
          resident={resident}
          onClick={() => onResidentClick(resident.id)}
          index={i}
        />
      ))}

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

interface FavoriteCardProps {
  resident: Resident;
  onClick: () => void;
  index: number;
}

function FavoriteCard({ resident, onClick, index }: FavoriteCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const trend = resident.wellness?.trend ?? "Medium";
  const ringColor = WELLNESS_RING[trend] ?? theme.colors.neutral[400];
  const label = WELLNESS_LABEL[trend] ?? "";
  const colors = resident.colors ?? [theme.colors.primary[300], theme.colors.primary[500]];
  const firstName = resident.name.split(" ")[0];

  return (
    <div
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        scrollSnapAlign: "start",
        flexShrink: 0,
        width: 88,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "12px 4px 10px",
        borderRadius: theme.borderRadius.md,
        background: theme.colors.background.primary,
        border: `1px solid ${theme.colors.border.light}`,
        cursor: "pointer",
        transform: isPressed ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        animationName: "slideIn",
        animationDuration: `${0.25 + index * 0.05}s`,
        animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        animationFillMode: "backwards",
      }}
    >
      {/* Subtle gradient accent at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`,
          borderRadius: `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`,
        }}
      />

      {/* Avatar with wellness ring */}
      <div style={{ position: "relative" }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            padding: 2.5,
            background: `conic-gradient(${ringColor} 0deg, ${ringColor} 360deg)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            background: theme.colors.background.primary,
            padding: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Avatar name={resident.name} size={42} colors={colors} />
          </div>
        </div>
      </div>

      {/* Name */}
      <span
        style={{
          fontSize: 12,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.text.primary,
          lineHeight: 1.2,
          textAlign: "center",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {firstName}
      </span>

      {/* Room + Bed */}
      <span
        style={{
          fontSize: 10,
          fontWeight: theme.typography.fontWeight.medium,
          color: theme.colors.text.tertiary,
          lineHeight: 1,
        }}
      >
        {resident.room}{resident.bed ? ` · ${resident.bed}` : ""}
      </span>

      {/* Wellness micro-badge */}
      {trend === "Low" && (
        <span
          style={{
            fontSize: 9,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.error,
            lineHeight: 1,
            letterSpacing: "0.03em",
          }}
        >
          {label}
        </span>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(16px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
