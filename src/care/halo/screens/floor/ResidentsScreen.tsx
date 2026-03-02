import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";
import { useResidents } from "../../hooks/useResidents";
import { FavoriteResidentSlider } from "../../components/residents/FavoriteResidentSlider";
import { RoomCard } from "../../components/residents/RoomCard";
import { FloatingActionPill } from "../../components/navigation/FloatingActionPill";
import { BottomNavigationEnhanced } from "../../components/navigation/BottomNavigationEnhanced";
import { HomeIndicator } from "../../components/navigation/HomeIndicator";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { PullToRefresh } from "../../components/ui/PullToRefresh";
import { theme } from "../../design-system";

const CURRENT_UNIT = "2nd Floor · Memory Care & AL";

export default function ResidentsScreen() {
  const navigate = useNavigate();

  const { residents, myResidents, roomGroups, isLoading, isError, error, refetch } = useResidents();
  const setSelectedResidentId = useAppStore((s) => s.setSelectedResidentId);
  const totalAlerts = residents.filter((r) => r.wellness?.trend === "Low").length;

  const handleResidentClick = (id: number): void => {
    setSelectedResidentId(id);
    navigate(`/resident/${id}`);
  };

  if (isLoading) {
    return (
      <ScreenLayout>
        <LoadingState fullScreen message="Loading residents..." />
      </ScreenLayout>
    );
  }

  if (isError) {
    return (
      <ScreenLayout>
        <ErrorState
          fullScreen
          message={error?.message || "Failed to load residents"}
          onRetry={() => refetch()}
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <PullToRefresh onRefresh={async () => { await refetch(); }}>
          <div style={{ paddingBottom: theme.spacing.md, maxWidth: "100%" }}>

            {/* Unit/Floor context bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 18px 4px",
              }}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <span
                  style={{
                    fontSize: theme.typography.fontSize.xl,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.text.primary,
                    letterSpacing: theme.typography.letterSpacing.tight,
                  }}
                >
                  {CURRENT_UNIT}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.colors.text.tertiary} strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: theme.typography.fontSize.xs,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.text.tertiary,
                  }}
                >
                  {residents.length}
                </span>
                {totalAlerts > 0 && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.inverse,
                      background: theme.colors.error,
                      borderRadius: theme.borderRadius.full,
                      padding: "2px 7px",
                      lineHeight: "1.4",
                    }}
                  >
                    {totalAlerts}
                  </span>
                )}
              </div>
            </div>

            {/* My Residents */}
            {myResidents.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px 6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={theme.colors.primary[500]} stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    My Residents
                  </span>
                </div>
                <FavoriteResidentSlider
                  residents={myResidents}
                  onResidentClick={handleResidentClick}
                />
              </div>
            )}

            {/* Rooms */}
            {roomGroups.length > 0 && (
              <div style={{ padding: `4px ${theme.spacing.md} 0` }}>
                <div
                  style={{
                    padding: "6px 2px 8px",
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.lg,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                      letterSpacing: theme.typography.letterSpacing.tight,
                    }}
                  >
                    Rooms
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.tertiary,
                    }}
                  >
                    {roomGroups.length} rooms
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {roomGroups.map((group) => (
                    <RoomCard
                      key={group.room}
                      group={group}
                      onResidentClick={handleResidentClick}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </PullToRefresh>
      </div>

      <FloatingActionPill action="rounding" onPress={() => console.log("Start rounding")} />
      <BottomNavigationEnhanced />
      <HomeIndicator />
    </ScreenLayout>
  );
}
