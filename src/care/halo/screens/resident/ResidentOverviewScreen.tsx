import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {ResidentHeader} from "./ResidentHeader";
import {ViewRoomButton} from "./ViewRoomButton";
import {WellnessCard} from "../../components/residents/WellnessCard/WellnessCard";
import {TopCareCard} from "../../components/residents/TopCareCard/TopCareCard";
import type { Resident } from "../../types/resident.types";

export default function ResidentOverviewScreen() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const residentId: string = id || "";

    const { data: resident, isLoading, error } = useQuery<Resident>({
        queryKey: ["resident", residentId],
        queryFn: async (): Promise<Resident> => {
            if (!residentId || residentId === "undefined") {
                throw new Error("No resident ID");
            }
            const res = await fetch(`/api/residents/${residentId}`);
            if (!res.ok) {
                throw new Error("Failed to fetch resident");
            }
            const data = await res.json();
            console.log("Fetched resident data:", data);
            console.log("WellnessData:", data.wellnessData);
            return data;
        },
        enabled: Boolean(residentId) && residentId !== "undefined",
        staleTime: 0, // Forzar refetch siempre
        cacheTime: 0, // No cachear
    });

    const handleBack = (): void => {
        navigate("/");
    };

    const handleViewRoom = (): void => {
        console.log("Navigate to room");
    };

    if (isLoading) {
        return (
            <div style={{ padding: 40, textAlign: "center" }}>
                Loading...
            </div>
        );
    }

    if (error || !resident) {
        return (
            <div style={{ padding: 40, textAlign: "center", color: "red" }}>
                Error loading resident
            </div>
        );
    }

    return (
        <div style={{
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            minHeight: "100vh",
            minWidth: "100vw",
            background: "#FFFFFF",
            overflow: "hidden",
            position: "relative",
        }}>
            <div style={{height: 10}}/>

            <ResidentHeader resident={resident} onBack={handleBack}/>

            <div style={{padding: "8px 20px 16px"}}>
                <ViewRoomButton onClick={handleViewRoom}/>
            </div>

            <WellnessCard data={{
                items: resident.wellnessData || [],
                trend: resident.wellness?.trend,
                previousTrend: resident.wellness?.previousTrend,
            }}/>

            <TopCareCard/>
        </div>
    );
}
