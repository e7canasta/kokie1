import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResident } from "../../../hooks/useResident";
import { theme } from "../../../design-system";
import { careActivitiesByTimeRange, timeRangeTabs } from "../../../domain/overview";
import { CheckableActivity } from "../../ui/CheckableActivity";
import type { CareActivity, TimeRangeTab, TimeRangeTabsProps, ActivityRowProps, Resident } from "../../../types/resident.types";

export function TopCareCard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resident, residentId } = useResident();
  const [activeTab, setActiveTab] = useState<TimeRangeTab>(timeRangeTabs[0]);
  const queryClient = useQueryClient();

  const currentActivities = useMemo(() => {
    return careActivitiesByTimeRange[activeTab];
  }, [activeTab]);

  // Sprint 3 (P2) - Mutation for toggling care activity
  const toggleActivityMutation = useMutation({
    mutationFn: async ({ title, done }: { title: string; done: boolean }) => {
      const response = await fetch(
        `/api/residents/${residentId}/care-activities/${encodeURIComponent(title)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ done }),
        }
      );
      if (!response.ok) throw new Error("Failed to update activity");
      return response.json();
    },
    onMutate: async ({ title, done }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["resident", residentId] });

      // Snapshot previous value
      const previousResident = queryClient.getQueryData<Resident>(["resident", residentId]);

      // Optimistically update
      queryClient.setQueryData<Resident>(["resident", residentId], (old) => {
        if (!old || !old.topCare) return old;
        return {
          ...old,
          topCare: old.topCare.map((item) =>
            item.title === title ? { ...item, done } : item
          ),
        };
      });

      return { previousResident };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousResident) {
        queryClient.setQueryData(["resident", residentId], context.previousResident);
      }
    },
    onSuccess: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["resident", residentId] });
    },
  });

  const handleToggleActivity = (title: string, done: boolean) => {
    toggleActivityMutation.mutate({ title, done });
  };

  return (
    <div style={{ padding: `${theme.spacing.lg} 20px 0` }}>
      <h2
        style={{
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
          margin: `0 0 ${theme.spacing.md} 0`,
          letterSpacing: theme.typography.letterSpacing.tight,
        }}
      >
        Top Care Activities
      </h2>

      {/* Sprint 3 (P2) - Today's Tasks (Checkable) */}
      {resident?.topCare && resident.topCare.length > 0 && (
        <div style={{ marginBottom: theme.spacing.lg }}>
          <h3
            style={{
              fontSize: theme.typography.fontSize.md,
              fontWeight: theme.typography.fontWeight.semibold,
              color: theme.colors.text.secondary,
              margin: `0 0 ${theme.spacing.sm} 0`,
            }}
          >
            Today's Tasks
          </h3>
          <div
            style={{
              background: theme.colors.background.primary,
              border: `1px solid ${theme.colors.border.light}`,
              borderRadius: theme.borderRadius.md,
              padding: "0 16px",
            }}
          >
            {resident.topCare.map((item, i) => (
              <div key={`${item.title}-${i}`}>
                <CheckableActivity item={item} onToggle={handleToggleActivity} />
                {i < resident.topCare!.length - 1 && (
                  <div style={{ height: 1, background: theme.colors.border.light }} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <TimeRangeTabs tabs={timeRangeTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <TableHeader />

      <div style={{ height: 1, background: theme.colors.border.light }} />

      {currentActivities.map((item, i) => (
        <ActivityRow key={`${item.activity}-${i}`} item={item} isLast={i === currentActivities.length - 1} />
      ))}

      <button
        onClick={() => navigate(`/resident/${id}/care-activities`)}
        style={{
          background: "none",
          border: "none",
          color: theme.colors.primary[500],
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.semibold,
          cursor: "pointer",
          padding: "14px 0 20px",
          width: "100%",
        }}
      >
        View More
      </button>
    </div>
  );
}

function TimeRangeTabs({ tabs, activeTab, onTabChange }: TimeRangeTabsProps) {
  return (
    <div
      style={{
        display: "flex",
        background: theme.colors.background.tertiary,
        borderRadius: 25,
        padding: 3,
        marginBottom: theme.spacing.md,
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            flex: 1,
            padding: "9px 0",
            border: "none",
            borderRadius: 22,
            fontSize: theme.typography.fontSize.sm,
            fontWeight: activeTab === tab ? theme.typography.fontWeight.bold : theme.typography.fontWeight.semibold,
            cursor: "pointer",
            background: activeTab === tab ? theme.colors.background.primary : "transparent",
            color: activeTab === tab ? theme.colors.text.primary : theme.colors.text.tertiary,
            boxShadow: activeTab === tab ? theme.shadows.md : "none",
            transition: theme.transitions.normal,
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function TableHeader() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr",
        padding: `0 0 10px 0`,
      }}
    >
      <span
        style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
        }}
      >
        Activity
      </span>
      <span
        style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
        }}
      >
        Initiated
      </span>
      <span
        style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
        }}
      >
        Uninitiated
      </span>
      <span
        style={{
          fontSize: theme.typography.fontSize.sm,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.text.primary,
          textAlign: "right",
        }}
      >
        Total
      </span>
    </div>
  );
}

function ActivityRow({ item, isLast }: ActivityRowProps) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr",
          padding: "13px 0",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.primary,
            fontWeight: theme.typography.fontWeight.semibold,
          }}
        >
          {item.activity}
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.secondary,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {item.initiated}
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.secondary,
            fontWeight: theme.typography.fontWeight.medium,
          }}
        >
          {item.uninitiated}
        </span>
        <span
          style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.text.primary,
            fontWeight: theme.typography.fontWeight.bold,
            textAlign: "right",
          }}
        >
          {item.total}
        </span>
      </div>
      {!isLast && <div style={{ height: 1, background: theme.colors.border.light }} />}
    </div>
  );
}
