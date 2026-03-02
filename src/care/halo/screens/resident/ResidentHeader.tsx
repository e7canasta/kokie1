import { theme } from "../../design-system";
import { ChevronLeftIcon } from "../../icons/ChevronLeftIcon";
import { StarFilledIcon } from "../../icons/StarFilledIcon";
import { StarOutline } from "../../icons/StarOutlineIcon";
import type { ResidentHeaderProps } from "../../types/resident.types";

export function ResidentHeader({ resident, onBack, onToggleFavorite }: ResidentHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: `${theme.spacing.sm} 20px`,
        gap: theme.spacing.sm,
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: theme.spacing.xs,
          color: theme.colors.text.primary,
          display: "flex",
          alignItems: "center",
        }}
      >
        <ChevronLeftIcon />
      </button>

      <Avatar avatarGradient={resident.avatarGradient} showBadge />

      <div style={{ flex: 1 }}>
        <h1
          style={{
            fontSize: theme.typography.fontSize["2xl"],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            margin: 0,
            lineHeight: theme.typography.lineHeight.tight,
            letterSpacing: theme.typography.letterSpacing.tight,
          }}
        >
          {resident.name}
        </h1>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            margin: `${theme.spacing.xs} 0 0 0`,
            lineHeight: 1.4,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          DOB: {resident.dob}
        </p>
        <p
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            margin: "2px 0 0 0",
            lineHeight: 1.4,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          Room {resident.room} | Unit: {resident.unit}
        </p>
      </div>

      <div style={{ flexShrink: 0, paddingTop: 2 }}>
        {onToggleFavorite ? (
          <button
            type="button"
            onClick={() => onToggleFavorite(resident.id)}
            aria-label={resident.starred ? "Quitar de favoritos" : "Añadir a favoritos"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: theme.spacing.xs,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {resident.starred ? <StarFilledIcon /> : <StarOutline />}
          </button>
        ) : (
          resident.starred ? <StarFilledIcon /> : <StarOutline />
        )}
      </div>
    </div>
  );
}

interface AvatarProps {
    avatarGradient: string;
    showBadge: boolean;
}

function Avatar({ avatarGradient, showBadge }: AvatarProps) {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.full,
        background: avatarGradient,
        overflow: "hidden",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, ${theme.colors.primary[400]} 0%, ${theme.colors.primary[600]} 50%, ${theme.colors.primary[800]} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="15" r="8" fill="rgba(255,255,255,0.3)" />
          <ellipse cx="20" cy="35" rx="14" ry="10" fill="rgba(255,255,255,0.2)" />
        </svg>
      </div>
      {showBadge && (
        <div
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 20,
            height: 20,
            borderRadius: theme.borderRadius.full,
            background: theme.colors.primary[400],
            border: `2px solid ${theme.colors.text.inverse}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
            <rect x="1" y="3" width="8" height="1.5" rx="0.5" />
            <rect x="1" y="5.5" width="5" height="1.5" rx="0.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
