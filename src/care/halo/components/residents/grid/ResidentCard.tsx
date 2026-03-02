import { theme } from "../../../design-system";
import { Avatar } from "../../ui/Avatar";
import type { ResidentCardProps } from "../../../types/resident.types";

export function ResidentCard(props: ResidentCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: theme.spacing.sm,
        padding: "10px 10px",
        background: theme.colors.background.primary,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border.light}`,
        cursor: "pointer",
      }}
    >
      <Avatar name={props.resident.name} size={40} colors={props.resident.colors} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            display: "block",
            lineHeight: theme.typography.lineHeight.tight,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {props.resident.name}
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            fontWeight: theme.typography.fontWeight.medium,
            display: "block",
            marginTop: 2,
          }}
        >
          {props.resident.room}
        </span>
      </div>
    </div>
  );
}
