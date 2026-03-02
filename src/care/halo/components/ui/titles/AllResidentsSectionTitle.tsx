import { theme } from "../../../design-system";

export function AllResidentsSectionTitle() {
  return (
    <div style={{ padding: `14px 18px 10px` }}>
      <span
        style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
          letterSpacing: theme.typography.letterSpacing.tight,
        }}
      >
        All Residents
      </span>
    </div>
  );
}
