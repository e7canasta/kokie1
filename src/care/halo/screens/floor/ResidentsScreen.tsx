import { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../../store";
import { useResidents } from "../../hooks/useResidents";
import { useRounding } from "../../context/RoundingContext";
import { usePolling } from "../../hooks/usePolling";
import { TriageQueue } from "../../components/residents/TriageQueue";
import { RoomCard } from "../../components/residents/RoomCard";
import { RoundingCard } from "../../components/rounding/RoundingCard";
import { FloatingActionPill } from "../../components/navigation/FloatingActionPill";
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
import { countTrendingResidents } from "../../utils/wellnessTrending";
import { optimizeRoundingRoute } from "../../utils/roundingOptimization";
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
  const { state: roundingState, startRounding, endRounding, getRoundingProgress } = useRounding();
  const [roundingSheetOpen, setRoundingSheetOpen] = useState(false);

  // Rounding suggestion (mock - future: viene del backend)
  const roundingSuggestion = useMemo(() => {
    if (roundingState.isActive) return null; // No mostrar sugerencia si ya hay ronda activa

    // Mock sugerencia basada en la hora actual
    const now = new Date();
    const hour = now.getHours();
    let suggestedType = "General";
    let scheduledTime = "14:00";

    if (hour >= 6 && hour < 9) {
      suggestedType = "Medicación";
      scheduledTime = "08:00";
    } else if (hour >= 9 && hour < 12) {
      suggestedType = "Observación";
      scheduledTime = "10:00";
    } else if (hour >= 12 && hour < 15) {
      suggestedType = "Alimentación";
      scheduledTime = "13:00";
    } else if (hour >= 15 && hour < 18) {
      suggestedType = "Observación";
      scheduledTime = "16:00";
    } else if (hour >= 18 && hour < 21) {
      suggestedType = "Vigia";
      scheduledTime = "20:00";
    }

    // Calcular cuántas rooms pueden ser virtuales (tienen monitoreo ambiental activo + sin alertas)
    const virtualPossible = roomGroups.filter(
      (g) =>
        g.cvStatus === "active" &&
        !g.residents.some((r) => r.wellness?.trend === "Low")
    ).length;

    return {
      type: suggestedType,
      scheduledTime,
      totalRooms: roomGroups.length,
      virtualPossible,
    };
  }, [roundingState.isActive, roomGroups]);

  // Sprint 3 (P0) - Real-time updates via polling (30s interval)
  usePolling({
    interval: 30000, // 30 segundos
    queryKeys: [['residents']],
    enabled: !isLoading, // Solo poll cuando ya cargó initial data
  });

  const handleResidentClick = (id: number): void => {
    setSelectedResidentId(id);
    navigate(`/resident/${id}`);
  };

  // Command Center data + CV Metrics + Trending (Sprint 3 P0)
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

    // Sprint 2 (P0) - CV Metrics: confirmaciones ahorradas
    // Mock: rooms con CV ahorran ~4 confirmaciones/room por día
    const confirmationsSaved = roomsWithCV * 4;

    // Sprint 3 (P0) - Trending alerts
    const trendingCounts = countTrendingResidents(residents);
    const { trendingDown, critical } = trendingCounts;

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
      trendingDown,
      critical,
    };
  }, [residents, roomGroups]);

  // Sprint 3 (P0) - Route optimization when rounding is active
  const displayedRoomGroups = useMemo(() => {
    if (roundingState.isActive) {
      return optimizeRoundingRoute(roomGroups);
    }
    return roomGroups;
  }, [roomGroups, roundingState.isActive]);

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

            {/* Command Center — glance score + trending */}
            <div style={{ position: "sticky", top: 0, zIndex: 20 }}>
              <CommandCenter
                alerts={commandCenterData.alerts}
                overdue={commandCenterData.overdue}
                ok={commandCenterData.ok}
                cvCoverage={commandCenterData.cvCoverage}
                nextRoom={commandCenterData.nextRoom}
                onGoToNext={handleGoToNext}
                trendingDown={commandCenterData.trendingDown}
                critical={commandCenterData.critical}
              />
            </div>

            {/* RoundingCard — workflow hub (Sprint 2) */}
            <RoundingCard
              suggestion={roundingSuggestion}
              isActive={roundingState.isActive}
              progress={
                roundingState.isActive
                  ? {
                      ...getRoundingProgress(),
                      elapsedMinutes: roundingState.startedAt
                        ? Math.floor((Date.now() - roundingState.startedAt.getTime()) / 60000)
                        : 0,
                    }
                  : undefined
              }
              onViewProgram={() => {
                // TODO: Navigate to RoundingProgramScreen (Sprint 5)
                console.log("View program");
              }}
              onStart={() => setRoundingSheetOpen(true)}
              onPause={() => {
                // TODO: Implementar pause (Sprint 5 - opcional)
                console.log("Pause rounding");
              }}
              onEnd={() => setRoundingSheetOpen(true)}
            />

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

            {/* Triage Queue — 100% generativo (Sprint 2 P1) */}
            {hotResidents.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px 6px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={theme.colors.error} stroke="none">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                  </svg>
                  <span
                    style={{
                      fontSize: theme.typography.fontSize.sm,
                      fontWeight: theme.typography.fontWeight.bold,
                      color: theme.colors.text.primary,
                    }}
                  >
                    REQUIEREN ATENCIÓN
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
                <TriageQueue
                  residents={hotResidents}
                  onResidentClick={handleResidentClick}
                />
              </div>
            )}

            {/* Rooms */}
            {displayedRoomGroups.length > 0 && (
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
                    {roundingState.isActive ? 'Rounding Route' : 'Rooms'}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: theme.typography.fontWeight.medium,
                      color: theme.colors.text.tertiary,
                    }}
                  >
                    {displayedRoomGroups.length} rooms
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {displayedRoomGroups.map((group, i) => (
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
        visited={roundingState.isActive ? getRoundingProgress().visited : 0}
        total={roundingState.isActive ? getRoundingProgress().total : 0}
        percentage={roundingState.isActive ? getRoundingProgress().percentage : 0}
      />

      {/* Rounding Bottom Sheet (Start or End) */}
      <BottomSheet
        isOpen={roundingSheetOpen}
        onClose={() => setRoundingSheetOpen(false)}
        height="auto"
        title={roundingState.isActive ? "Finalizar Ronda" : "Start Rounding"}
      >
        {roundingState.isActive ? (
          <EndRoundingForm
            progress={getRoundingProgress()}
            roundType={roundingState.roundType}
            onEnd={() => {
              endRounding();
              setRoundingSheetOpen(false);
            }}
            onCancel={() => setRoundingSheetOpen(false)}
          />
        ) : (
          <StartRoundingForm
            totalRooms={roomGroups.length}
            onStart={(roundType) => {
              startRounding(roomGroups.length, roundType);
              setRoundingSheetOpen(false);
            }}
            onCancel={() => setRoundingSheetOpen(false)}
          />
        )}
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

/**
 * End Rounding Form
 * Muestra resumen básico y permite finalizar ronda
 */
function EndRoundingForm({
  progress,
  roundType,
  onEnd,
  onCancel,
}: {
  progress: { visited: number; total: number; percentage: number };
  roundType: string | null;
  onEnd: () => void;
  onCancel: () => void;
}) {
  const pendingRooms = progress.total - progress.visited;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
      <div>
        <p style={{
          margin: 0,
          fontSize: theme.typography.fontSize.md,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.text.primary
        }}>
          {roundType || 'Ronda General'}
        </p>
        <p style={{
          margin: `${theme.spacing.xs} 0 0`,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary
        }}>
          Progreso actual
        </p>
      </div>

      {/* Progress summary */}
      <div style={{
        padding: theme.spacing.lg,
        background: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.md,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.md,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary
          }}>
            Habitaciones visitadas
          </span>
          <span style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.primary[500]
          }}>
            {progress.visited}/{progress.total}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: 8,
          background: theme.colors.neutral[200],
          borderRadius: theme.borderRadius.full,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${progress.percentage}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`,
            borderRadius: theme.borderRadius.full,
            transition: 'width 0.3s ease',
          }} />
        </div>

        <div style={{ fontSize: theme.typography.fontSize.xs, color: theme.colors.text.tertiary }}>
          {progress.percentage}% completado
        </div>
      </div>

      {pendingRooms > 0 && (
        <div style={{
          padding: theme.spacing.md,
          background: `${theme.colors.warning}10`,
          border: `1px solid ${theme.colors.warning}`,
          borderRadius: theme.borderRadius.sm,
        }}>
          <p style={{
            margin: 0,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.primary
          }}>
            ⚠️ Quedan {pendingRooms} habitacion{pendingRooms > 1 ? 'es' : ''} pendiente{pendingRooms > 1 ? 's' : ''}
          </p>
        </div>
      )}

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
          Cancelar
        </button>
        <button
          onClick={onEnd}
          style={{
            flex: 1,
            padding: theme.spacing.md,
            background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[700]})`,
            border: 'none',
            borderRadius: theme.borderRadius.md,
            fontSize: theme.typography.fontSize.base,
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.text.inverse,
            cursor: 'pointer',
          }}
        >
          Finalizar Ronda
        </button>
      </div>
    </div>
  );
}
