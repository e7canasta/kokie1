import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";
import { useResidents } from "../../hooks/useResidents";
import { useRounding } from "../../context/RoundingContext";
import { HotResidentsSlider } from "../../components/residents/HotResidentsSlider";
import { RoomCard } from "../../components/residents/RoomCard";
import { FloatingActionPill, type FabAction } from "../../components/navigation/FloatingActionPill";
import { BottomNavigationEnhanced } from "../../components/navigation/BottomNavigationEnhanced";
import { HomeIndicator } from "../../components/navigation/HomeIndicator";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { PullToRefresh } from "../../components/ui/PullToRefresh";
import { AnimateOnScroll } from "../../components/ui/AnimateOnScroll";
import { CommandCenter } from "../../components/ui/CommandCenter";
import { CVMetrics } from "../../components/ui/CVMetrics";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { theme } from "../../design-system";

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

  const { residents, hotResidents, roomGroups, isLoading, isError, error, refetch } = useResidents();
  const setSelectedResidentId = useAppStore((s) => s.setSelectedResidentId);
  const roomRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Sprint 1 (P0) - Rounding Flow
  const { state: roundingState, startRounding, getRoundingProgress } = useRounding();
  const [roundingSheetOpen, setRoundingSheetOpen] = useState(false);

  const handleResidentClick = (id: number): void => {
    setSelectedResidentId(id);
    navigate(`/resident/${id}`);
  };

  // Command Center data + CV Metrics (Sprint 3 P2)
  const commandCenterData = useMemo(() => {
    const totalAlerts = residents.filter((r) => r.wellness?.trend === "Low").length;
    const overdueRooms = roomGroups.filter((g) => g.roundingStatus === "overdue").length;
    const okRooms = roomGroups.filter((g) => {
      const hasAlert = g.residents.some((r) => r.wellness?.trend === "Low");
      return !hasAlert && (g.roundingStatus === "visited" || g.roundingStatus === "pending");
    }).length;

    // CV coverage
    const roomsWithCV = roomGroups.filter((g) => g.cvStatus === "active").length;
    const cvCoverage = roomGroups.length > 0 ? roomsWithCV / roomGroups.length : 0;

    // Sprint 3 (P2) - CV Metrics: confirmaciones ahorradas
    // Mock: rooms con CV ahorran ~4 confirmaciones/room por día
    const confirmationsSaved = roomsWithCV * 4;

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
      roomsWithCV,
      totalRooms: roomGroups.length,
      confirmationsSaved,
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

            {/* Sprint 3 (P2) - CV Metrics */}
            <CVMetrics
              roomsWithCV={commandCenterData.roomsWithCV}
              totalRooms={commandCenterData.totalRooms}
              confirmationsSaved={commandCenterData.confirmationsSaved}
            />

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

            {/* Hot Residents — Generative/contextual (Sprint 2 P1) */}
            {hotResidents.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px 6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={theme.colors.error} stroke="none">
                    <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" />
                  </svg>
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    Hot Residents
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.tertiary,
                      marginLeft: 2,
                    }}
                  >
                    ({hotResidents.length})
                  </span>
                </div>
                <HotResidentsSlider
                  residents={hotResidents}
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

      {/* Floating Action Pill — Contextual */}
      <FloatingActionPill
        action={roundingState.isActive ? "continue-rounding" : "rounding"}
        onPress={() => setRoundingSheetOpen(true)}
      />

      {/* Rounding Start Bottom Sheet */}
      <BottomSheet
        isOpen={roundingSheetOpen}
        onClose={() => setRoundingSheetOpen(false)}
        height="auto"
        title="Start Rounding"
      >
        <StartRoundingForm
          totalRooms={roomGroups.length}
          onStart={(roundType) => {
            startRounding(roomGroups.length, roundType);
            setRoundingSheetOpen(false);
          }}
          onCancel={() => setRoundingSheetOpen(false)}
        />
      </BottomSheet>

      <BottomNavigationEnhanced />
      <HomeIndicator />
    </ScreenLayout>
  );
}

/**
 * Start Rounding Form
 * Permite seleccionar tipo de ronda (opcional)
 */
function StartRoundingForm({
  totalRooms,
  onStart,
  onCancel,
}: {
  totalRooms: number;
  onStart: (roundType?: string) => void;
  onCancel: () => void;
}) {
  const [selectedType, setSelectedType] = useState<string>('');

  const roundTypes = ['Medicación', 'Observación', 'Vigía', 'Alimentación', 'General'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
      <div>
        <p style={{ margin: 0, fontSize: theme.typography.fontSize.sm, color: theme.colors.text.secondary }}>
          You will visit {totalRooms} rooms
        </p>
      </div>

      {/* Round type selector (optional) */}
      <div>
        <label
          style={{
            display: 'block',
            fontSize: theme.typography.fontSize.sm,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            marginBottom: theme.spacing.sm,
          }}
        >
          Round Type (Optional)
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: theme.spacing.sm }}>
          {roundTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              style={{
                padding: theme.spacing.sm,
                background: selectedType === type ? `${theme.colors.primary[500]}15` : theme.colors.background.secondary,
                border: `1.5px solid ${selectedType === type ? theme.colors.primary[500] : theme.colors.border.light}`,
                borderRadius: theme.borderRadius.sm,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: selectedType === type ? theme.colors.primary[500] : theme.colors.text.secondary,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {type}
            </button>
          ))}
        </div>
        <p
          style={{
            margin: `${theme.spacing.xs} 0 0`,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.text.tertiary,
          }}
        >
          You can skip this or type a custom round name
        </p>
      </div>

      {/* Custom type input */}
      <div>
        <input
          type="text"
          placeholder="Or type custom round name..."
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            width: '100%',
            padding: theme.spacing.md,
            border: `1.5px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.base,
            outline: 'none',
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: theme.spacing.md }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: theme.spacing.md,
            background: theme.colors.background.secondary,
            border: `1.5px solid ${theme.colors.border.medium}`,
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.primary,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onStart(selectedType || undefined)}
          style={{
            flex: 1,
            padding: theme.spacing.md,
            background: 'linear-gradient(135deg, #FF6B35, #E84E1B)',
            border: 'none',
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.inverse,
            cursor: 'pointer',
          }}
        >
          Start Rounding
        </button>
      </div>
    </div>
  );
}
