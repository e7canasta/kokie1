import { theme } from "../../../design-system";
import { Avatar } from "../../ui/Avatar";
import type { ResidentCardProps } from "../../../types/resident.types";

export function ResidentCard(props: ResidentCardProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 12px",
        background: theme.colors.background.primary,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border.light}`,
        cursor: "pointer",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <Avatar name={props.resident.name} size={44} colors={props.resident.colors} />
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
            whiteSpace: "nowrap",
          }}
        >
          {props.resident.name}
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            fontWeight: theme.typography.fontWeight.medium,
            display: "block",
            marginTop: 3,
            lineHeight: 1.2,
          }}
        >
          {props.resident.room}
        </span>
      </div>
    </div>
  );
}
