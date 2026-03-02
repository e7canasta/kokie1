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
import { AnimateOnScroll } from "../../components/ui/AnimateOnScroll";
import { CommandCenter } from "../../components/ui/CommandCenter";
import { theme } from "../../design-system";
import { useMemo, useRef } from "react";

const CURRENT_UNIT = "2nd Floor · Memory Care & AL";

const stickyBar: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 20,
  background: theme.colors.background.secondary,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
};

export default function ResidentsScreen() {
  const navigate = useNavigate();

  const { residents, myResidents, roomGroups, isLoading, isError, error, refetch } = useResidents();
  const setSelectedResidentId = useAppStore((s) => s.setSelectedResidentId);
  const roomRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleResidentClick = (id: number): void => {
    setSelectedResidentId(id);
    navigate(`/resident/${id}`);
  };

  // Command Center data
  const commandCenterData = useMemo(() => {
    const totalAlerts = residents.filter((r) => r.wellness?.trend === "Low").length;
    const overdueRooms = roomGroups.filter((g) => g.roundingStatus === "overdue").length;
    const okRooms = roomGroups.filter((g) => {
      const hasAlert = g.residents.some((r) => r.wellness?.trend === "Low");
      return !hasAlert && (g.roundingStatus === "visited" || g.roundingStatus === "pending");
    }).length;

    // CV coverage (mock - en producción vendría del backend)
    const roomsWithCV = roomGroups.filter((g) => g.cvStatus === "active").length;
    const cvCoverage = roomGroups.length > 0 ? roomsWithCV / roomGroups.length : 0;

    // Next room: prioridad overdue con alerts, luego overdue, luego pending con alerts
    const nextRoom =
      roomGroups.find(
        (g) => g.roundingStatus === "overdue" && g.residents.some((r) => r.wellness?.trend === "Low")
      ) ||
      roomGroups.find((g) => g.roundingStatus === "overdue") ||
      roomGroups.find(
        (g) => g.roundingStatus === "pending" && g.residents.some((r) => r.wellness?.trend === "Low")
      ) ||
      null;

    return {
      alerts: totalAlerts,
      overdue: overdueRooms,
      ok: okRooms,
      cvCoverage,
      nextRoom,
    };
  }, [residents, roomGroups]);

  const handleGoToNext = () => {
    if (commandCenterData.nextRoom) {
      const roomElement = roomRefs.current[commandCenterData.nextRoom.room];
      if (roomElement) {
        roomElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
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

            {/* Command Center — glance score */}
            <div style={{ position: "sticky", top: 0, zIndex: 20 }}>
              <CommandCenter
                alerts={commandCenterData.alerts}
                overdue={commandCenterData.overdue}
                ok={commandCenterData.ok}
                cvCoverage={commandCenterData.cvCoverage}
                nextRoom={commandCenterData.nextRoom}
                onGoToNext={handleGoToNext}
              />
            </div>

            {/* Unit context (simplified) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 18px 6px",
                background: theme.colors.background.secondary,
              }}
            >
              <span
                style={{
                  fontSize: theme.typography.fontSize.md,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.text.primary,
                }}
              >
                {CURRENT_UNIT}
              </span>
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
                {/* Rooms header — sticky below unit bar */}
                <div
                  style={{
                    ...stickyBar,
                    top: 42,
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
                  {roomGroups.map((group, i) => (
                    <AnimateOnScroll key={group.room} delay={i * 60}>
                      <div ref={(el) => (roomRefs.current[group.room] = el)}>
                        <RoomCard
                          group={group}
                          onResidentClick={handleResidentClick}
                        />
                      </div>
                    </AnimateOnScroll>
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
