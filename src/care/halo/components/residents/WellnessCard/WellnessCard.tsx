import { theme } from "../../../design-system";
import { UpArrowIcon } from "../../../icons/UpArrowIcon";
import type { WellnessCardProps, WellnessDataItem } from "../../../types/resident.types";

export function WellnessCard({ data }: WellnessCardProps) {
  return (
    <div
      style={{
        margin: `0 20px`,
        background: theme.colors.background.primary,
        borderRadius: theme.borderRadius.md,
        border: `1px solid ${theme.colors.border.light}`,
        overflow: "hidden",
      }}
    >
      <WellnessHeader trend={data.trend} previousTrend={data.previousTrend} />

      <div
        style={{
          height: 1,
          background: theme.colors.border.light,
          margin: `0 ${theme.spacing.md}`,
        }}
      />

      {data.items.map((item, i) => (
        <WellnessRow key={i} item={item} isLast={i === data.items.length - 1} />
      ))}
    </div>
  );
}

interface WellnessHeaderProps {
    trend?: "Low" | "Medium" | "High";
    previousTrend?: "Low" | "Medium" | "High";
}

function WellnessHeader({ trend, previousTrend }: WellnessHeaderProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        padding: `14px ${theme.spacing.md} 10px`,
        alignItems: "baseline",
      }}
    >
      <span
        style={{
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.primary[500],
        }}
      >
        Wellness
      </span>
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            display: "block",
            lineHeight: theme.typography.lineHeight.tight,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          7 day avg
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing.xs,
            marginTop: theme.spacing.xs,
          }}
        >
          <UpArrowIcon />
          <span
            style={{
              fontSize: theme.typography.fontSize.lg,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.text.primary,
            }}
          >
            {trend}
          </span>
        </span>
      </div>
      <div style={{ textAlign: "right" }}>
        <span
          style={{
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.secondary,
            display: "block",
            lineHeight: theme.typography.lineHeight.tight,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          Last 30 days
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.text.primary,
            display: "block",
            marginTop: theme.spacing.xs,
          }}
        >
          {previousTrend}
        </span>
      </div>
    </div>
  );
}

interface WellnessRowProps {
    item: WellnessDataItem;
    isLast: boolean;
}

function WellnessRow({ item, isLast }: WellnessRowProps) {
  const previousValue = item.previous ?? item.value ?? "-";

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
          }}
        >
          {item.label}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: theme.spacing.xs,
          }}
        >
          {item.hasArrow && <UpArrowIcon />}
          <span
            style={{
              fontSize: theme.typography.fontSize.base,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.primary,
            }}
          >
            {item.current || item.value || "-"}
          </span>
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.medium,
            color: theme.colors.text.secondary,
            textAlign: "right",
          }}
        >
          {previousValue}
        </span>
      </div>
      {!isLast && (
        <div
          style={{
            height: 1,
            background: theme.colors.border.light,
            margin: `0 ${theme.spacing.md}`,
          }}
        />
      )}
    </div>
  );
}
