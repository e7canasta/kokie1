import { useNavigate } from "react-router-dom";
import { useResident } from "../../hooks/useResident";
import { ResidentHeader } from "./ResidentHeader";
import { ViewRoomButton } from "./ViewRoomButton";
import { WellnessCard } from "../../components/residents/WellnessCard/WellnessCard";
import { TopCareCard } from "../../components/residents/TopCareCard/TopCareCard";
import { ScreenLayout } from "../../components/layout/ScreenLayout";
import { LoadingState } from "../../components/ui/LoadingState";
import { ErrorState } from "../../components/ui/ErrorState";

export default function ResidentOverviewScreen() {
    const navigate = useNavigate();
    const { resident, isLoading, isError, error, refetch } = useResident();

    const handleBack = (): void => {
        navigate("/");
    };

    const handleViewRoom = (): void => {
        // TODO: Implementar navegación a vista de habitación
        console.log("Navigate to room");
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
            <div style={{ height: 10 }} />

            <ResidentHeader resident={resident} onBack={handleBack} />

            <div style={{ padding: "8px 20px 16px" }}>
                <ViewRoomButton onClick={handleViewRoom} />
            </div>

            <div style={{ overflowY: "auto", paddingBottom: 20 }}>
                <WellnessCard
                    data={{
                        items: resident.wellnessData || [],
                        trend: resident.wellness?.trend,
                        previousTrend: resident.wellness?.previousTrend,
                    }}
                />

                <TopCareCard />
            </div>
        </ScreenLayout>
    );
}
