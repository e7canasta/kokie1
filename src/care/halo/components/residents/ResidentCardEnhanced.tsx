/**
 * Enhanced Resident Card
 * Card mejorada con animaciones, estados y quick actions
 */

import { useState } from "react";
import { ResidentCard } from "./grid/ResidentCard";
import { theme } from "../../design-system";
import type { Resident } from "../../types/resident.types";

interface ResidentCardEnhancedProps {
  resident: Resident;
  onClick: (id: number) => void;
  priority?: "low" | "medium" | "high" | "critical";
  showQuickActions?: boolean;
}

export function ResidentCardEnhanced({
  resident,
  onClick,
  priority = "low",
  showQuickActions = false,
}: ResidentCardEnhancedProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const priorityColors = {
    low: "transparent",
    medium: theme.colors.warning + "20",
    high: theme.colors.error + "30",
    critical: theme.colors.error + "40",
  };

  const priorityBorder = {
    low: "none",
    medium: `2px solid ${theme.colors.warning}`,
    high: `2px solid ${theme.colors.error}`,
    critical: `3px solid ${theme.colors.error}`,
  };

  return (
    <div
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onClick={() => onClick(resident.id)}
      style={{
        position: "relative",
        cursor: "pointer",
        transform: isPressed ? "scale(0.98)" : isHovered ? "translateY(-2px)" : "scale(1)",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        background: priorityColors[priority],
        border: priorityBorder[priority],
        borderRadius: theme.borderRadius.md,
        padding: priority !== "low" ? "2px" : "0",
      }}
    >
      <ResidentCard resident={resident} />
      
      {/* Priority indicator */}
      {priority !== "low" && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: priority === "critical" ? theme.colors.error : theme.colors.warning,
            boxShadow: `0 0 8px ${priority === "critical" ? theme.colors.error : theme.colors.warning}80`,
            animation: priority === "critical" ? "pulse 2s infinite" : "none",
          }}
        />
      )}
    </div>
  );
}
