import {ResidentHeader} from "./ResidentHeader.jsx";
import {ViewRoomButton} from "./ViewRoomButton.jsx";
import {WellnessCard} from "../../components/residents/WellnessCard/WellnessCard.jsx";
import {resident, wellnessData} from "../../domain/overview.js";
import {TopCareCard} from "../../components/residents/TopCareCard/TopCareCard.jsx";

export default function ResidentOverviewScreen() {
    const handleBack = () => {
        console.log("Navigate back");
    };

    const handleViewRoom = () => {
        console.log("Navigate to room");
    };

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
                items: wellnessData,
                trend: resident.wellness.trend,
                previousTrend: resident.wellness.previousTrend,
            }}/>

            <TopCareCard/>
        </div>
    );
}
