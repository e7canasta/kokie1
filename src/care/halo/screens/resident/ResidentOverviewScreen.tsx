import { useNavigate } from "react-router-dom";
import { useResident } from "../../hooks/useResident";
import { ResidentHeader } from "./ResidentHeader";
import { ViewRoomButton } from "./ViewRoomButton";
import { WellnessCard } from "../../components/residents/WellnessCard/WellnessCard";
import { TopCareCard } from "../../components/residents/TopCareCard/TopCareCard";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";
import { QuickActionBar } from "../../components/ui/QuickActionBar";

export default function ResidentOverviewScreen() {
    const navigate = useNavigate();
    const { resident, isLoading, isError, error, refetch } = useResident();

    const handleBack = (): void => {
        navigate("/");
    };

    const handleViewRoom = (): void => {
        if (resident?.room) {
            navigate(`/room/${resident.room}`);
        }
    };

    const handleConfirmVisit = (): void => {
        console.log("Confirm visit for resident", resident?.id);
        // TODO: Implementar confirmación de visita
    };

    const handleNote = (): void => {
        console.log("Add note for resident", resident?.id);
        // TODO: Implementar notas
    };

    const handleEscalate = (): void => {
        console.log("Escalate alert for resident", resident?.id);
        // TODO: Implementar escalamiento de alerta
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
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <div style={{ height: 10 }} />

                <ResidentHeader resident={resident} onBack={handleBack} />

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
        </ScreenLayout>
    );
}
