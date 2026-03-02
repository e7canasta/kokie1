import {HeaderRow} from "../components/sections/HeaderRow.jsx"
import {CameraFeedsList} from "../components/camerafeed/list/CameraFeedsList.jsx";

export default function CheckInRoomScreen() {
  return (
    <>
        {/* Phone Frame */}
        <div style={{
            fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            width: "100%",
            minWidth: "100vw",
            minHeight: "100vh",
            background: "#FFFFFF",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
        }}>

            <HeaderRow/>

            <CameraFeedsList/>

            {/* Home Indicator */}
            <div style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                width: 100,
                height: 4,
                borderRadius: 2,
                background: "#1A1A1A",
                opacity: 0.15,
            }}/>
        </div>
    </>
  );
}
