import { theme } from "../../design-system";
import { ExternalLinkIcon } from "../../icons/ExternalLinkIcon";

export function RoundingButton() {
  return (
    <div style={{ padding: `0 ${theme.spacing.md} 12px` }}>
      <button
        style={{
          width: "100%",
          padding: "14px 0",
          background: `linear-gradient(135deg, ${theme.colors.primary[700]}, ${theme.colors.primary[500]})`,
          color: theme.colors.text.inverse,
          border: "none",
          borderRadius: theme.borderRadius.full,
          fontSize: theme.typography.fontSize.base,
          fontWeight: theme.typography.fontWeight.bold,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: theme.spacing.sm,
          letterSpacing: theme.typography.letterSpacing.wider,
          boxShadow: `0 4px 14px ${theme.colors.primary[600]}50`,
        }}
      >
        <ExternalLinkIcon />
        START ROUNDING
      </button>
    </div>
  );
}
