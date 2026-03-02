import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {ResidentHeader} from "./ResidentHeader.jsx";
import {ViewRoomButton} from "./ViewRoomButton.jsx";
import {WellnessCard} from "../../components/residents/WellnessCard/WellnessCard.jsx";
import {TopCareCard} from "../../components/residents/TopCareCard/TopCareCard.jsx";

export default function ResidentOverviewScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const residentId = id || "";

    const { data: resident, isLoading, error } = useQuery({
        queryKey: ["resident", residentId],
        queryFn: async () => {
            if (!residentId || residentId === "undefined") throw new Error("No resident ID");
            const res = await fetch(`/api/residents/${residentId}`);
            if (!res.ok) throw new Error("Failed to fetch resident");
            return res.json();
        },
        enabled: Boolean(residentId) && residentId !== "undefined",
    });

    const handleBack = () => {
        navigate("/");
    };

    const handleViewRoom = () => {
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
