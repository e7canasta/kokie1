import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResident } from "../../hooks/useResident";
import { useResidentNavigation } from "../../hooks/useResidentNavigation";
import { useSwipeGesture } from "../../hooks/useSwipeGesture";
import { useConfirmVisit, useAddNote, useEscalateAlert } from "../../hooks/useActions";
import { useToggleFavorite } from "../../hooks/useToggleFavorite";
import { useRounding } from "../../context/RoundingContext";
import { useRoomVisitSummary, useConfirmRoomVisit, useMarkActivityCompleted } from "../../hooks/useRoomVisitSummary";
import { ResidentHeader } from "./ResidentHeader";
import { ViewRoomButton } from "./ViewRoomButton";
import { WellnessCard } from "../../components/residents/WellnessCard/WellnessCard";
import { TopCareCard } from "../../components/residents/TopCareCard/TopCareCard";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { QuickActionBar } from "../../components/ui/QuickActionBar";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { NoteForm } from "../../components/forms/NoteForm";
import { EscalateForm } from "../../components/forms/EscalateForm";
import { PostRoomSummarySheet } from "../../components/rounding/PostRoomSummarySheet";
import { theme } from "../../design-system";

export default function ResidentOverviewScreen() {
    const navigate = useNavigate();
    const { resident, isLoading, isError, error, refetch } = useResident();

    // Bottom sheet states
    const [noteSheetOpen, setNoteSheetOpen] = useState(false);
    const [escalateSheetOpen, setEscalateSheetOpen] = useState(false);
    const [postRoomSummaryOpen, setPostRoomSummaryOpen] = useState(false);

    // Rounding context
    const { state: roundingState } = useRounding();

    // Room visit summary (Sprint 3 - Post-room summary)
    const { data: roomVisitSummary } = useRoomVisitSummary(
        postRoomSummaryOpen && resident?.room ? resident.room : null
    );
    const confirmRoomVisitMutation = useConfirmRoomVisit();
    const markActivityMutation = useMarkActivityCompleted();

    // Sprint 1 (P0) - Quick Actions mutations
    const confirmVisitMutation = useConfirmVisit();
    const addNoteMutation = useAddNote();
    const escalateAlertMutation = useEscalateAlert();
    const { toggleFavorite } = useToggleFavorite();

    // Sprint 2 (P1) - Swipe navigation between residents (always call hook — never conditionally)
    const navigation = useResidentNavigation(resident?.id ?? -1);

    // Swipe gesture handlers
    const { ref: swipeRef } = useSwipeGesture({
        onSwipeLeft: () => navigation?.goToNext(),
        onSwipeRight: () => navigation?.goToPrev(),
        threshold: 50,
        velocity: 0.3,
    });

    const handleBack = (): void => {
        navigate("/");
    };

    const handleViewRoom = (): void => {
        if (resident?.room) {
            navigate(`/room/${resident.room}`);
        }
    };

    const handleConfirmVisit = async (): Promise<void> => {
        if (!resident) return;

        await confirmVisitMutation.mutateAsync({
            residentId: resident.id,
            roomId: resident.room || '',
        });

        // Si hay ronda activa, mostrar PostRoomSummarySheet
        if (roundingState.isActive) {
            setPostRoomSummaryOpen(true);
        }
    };

    const handleNote = (): void => {
        setNoteSheetOpen(true);
    };

    const handleNoteSubmit = async (content: string, category: 'observation' | 'medication' | 'behavior' | 'other'): Promise<void> => {
        if (!resident) return;

        await addNoteMutation.mutateAsync({
            residentId: resident.id,
            content,
            category,
        });

        setNoteSheetOpen(false);
    };

    const handleEscalate = (): void => {
        setEscalateSheetOpen(true);
    };

    const handleEscalateSubmit = async (reason: string, severity: 'low' | 'medium' | 'high' | 'critical'): Promise<void> => {
        if (!resident) return;

        await escalateAlertMutation.mutateAsync({
            residentId: resident.id,
            reason,
            severity,
        });

        setEscalateSheetOpen(false);
    };

    const handleCompleteAndNext = async (): Promise<void> => {
        if (!resident?.room) return;

        // Confirmar visita completada
        await confirmRoomVisitMutation.mutateAsync({
            roomId: resident.room,
        });

        // Cerrar sheet
        setPostRoomSummaryOpen(false);

        // TODO Sprint 5: Auto-advance to next room
        // navigate(`/resident/${nextResidentId}`);
    };

    const handleMarkActivityCompleted = async (activityId: string): Promise<void> => {
        if (!resident?.room) return;

        await markActivityMutation.mutateAsync({
            roomId: resident.room,
            activityId,
        });
    };

    if (isLoading) {
        return (
            <ScreenLayout>
                <LoadingState fullScreen message="Loading resident..." />
            </ScreenLayout>
        );
    }

    if (isError || !resident) {
        return (
            <ScreenLayout>
                <ErrorState
                    fullScreen
                    message={error?.message || "Failed to load resident"}
                    onRetry={() => refetch()}
                />
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout background="#FFFFFF">
            <div
                ref={swipeRef}
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <div style={{ height: 10 }} />

                <ResidentHeader
                    resident={resident}
                    onBack={handleBack}
                    onToggleFavorite={toggleFavorite}
                  />

                {/* Navigation Indicator (Sprint 2 P1) */}
                {navigation.totalResidents > 1 && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: "8px 20px 12px",
                        }}
                    >
                        <button
                            onClick={navigation.goToPrev}
                            disabled={!navigation.hasPrev}
                            style={{
                                background: "none",
                                border: "none",
                                color: navigation.hasPrev ? theme.colors.primary[500] : theme.colors.neutral[300],
                                fontSize: 20,
                                cursor: navigation.hasPrev ? "pointer" : "not-allowed",
                                padding: 4,
                                opacity: navigation.hasPrev ? 1 : 0.4,
                            }}
                        >
                            ←
                        </button>
                        <span
                            style={{
                                fontSize: theme.typography.fontSize.sm,
                                fontWeight: theme.typography.fontWeight.medium,
                                color: theme.colors.text.secondary,
                            }}
                        >
                            {navigation.navigationLabel}
                        </span>
                        <button
                            onClick={navigation.goToNext}
                            disabled={!navigation.hasNext}
                            style={{
                                background: "none",
                                border: "none",
                                color: navigation.hasNext ? theme.colors.primary[500] : theme.colors.neutral[300],
                                fontSize: 20,
                                cursor: navigation.hasNext ? "pointer" : "not-allowed",
                                padding: 4,
                                opacity: navigation.hasNext ? 1 : 0.4,
                            }}
                        >
                            →
                        </button>
                    </div>
                )}

                <div style={{ padding: "8px 20px 16px" }}>
                    <ViewRoomButton onClick={handleViewRoom} />
                </div>

                <div style={{ flex: 1, overflowY: "auto", paddingBottom: 20 }}>
                    <WellnessCard
                        data={{
                            items: resident.wellnessData || [],
                            trend: resident.wellness?.trend,
                            previousTrend: resident.wellness?.previousTrend,
                        }}
                    />

                    <TopCareCard />
                </div>

                {/* Quick Actions Bar */}
                <QuickActionBar
                    hasCV={resident.hasCV}
                    lastDetected={resident.lastCVDetection}
                    onConfirmVisit={handleConfirmVisit}
                    onNote={handleNote}
                    onEscalate={handleEscalate}
                />
            </div>

            {/* Note Bottom Sheet */}
            <BottomSheet
                isOpen={noteSheetOpen}
                onClose={() => setNoteSheetOpen(false)}
                height="auto"
            >
                <NoteForm
                    residentName={resident.name}
                    onSubmit={handleNoteSubmit}
                    onCancel={() => setNoteSheetOpen(false)}
                    isLoading={addNoteMutation.isPending}
                />
            </BottomSheet>

            {/* Escalate Alert Bottom Sheet */}
            <BottomSheet
                isOpen={escalateSheetOpen}
                onClose={() => setEscalateSheetOpen(false)}
                height="auto"
            >
                <EscalateForm
                    residentName={resident.name}
                    onSubmit={handleEscalateSubmit}
                    onCancel={() => setEscalateSheetOpen(false)}
                    isLoading={escalateAlertMutation.isPending}
                />
            </BottomSheet>

            {/* Post-Room Summary Bottom Sheet (Sprint 3) */}
            {roomVisitSummary && (
                <BottomSheet
                    isOpen={postRoomSummaryOpen}
                    onClose={() => setPostRoomSummaryOpen(false)}
                    height="auto"
                    title=""
                >
                    <PostRoomSummarySheet
                        summary={roomVisitSummary}
                        onAddNote={() => {
                            setPostRoomSummaryOpen(false);
                            setNoteSheetOpen(true);
                        }}
                        onMarkCompleted={handleMarkActivityCompleted}
                        onCompleteAndNext={handleCompleteAndNext}
                        onCancel={() => setPostRoomSummaryOpen(false)}
                    />
                </BottomSheet>
            )}
        </ScreenLayout>
    );
}
