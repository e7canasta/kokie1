import { theme } from "../../../design-system";

export function MyResidentsSectionTitle() {
  return (
    <div style={{ padding: `6px 18px 8px` }}>
      <div style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={theme.colors.text.primary} stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            letterSpacing: theme.typography.letterSpacing.tight,
          }}
        >
          My Residents
        </span>
      </div>
    </div>
  );
}
