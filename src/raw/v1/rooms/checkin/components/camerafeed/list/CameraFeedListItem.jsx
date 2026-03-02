import {scenes} from "../../../demo/scenes.jsx";
import {LiveDotIndicator} from "../../LiveDotIndicator.jsx";
import {ExpandButton} from "../../ExpandButton.jsx";

export const CameraFeedListItem = ({label, time, hue, brightness, angle, furniture}) => {


    return (
        <div style={{
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            height: 142,
            background: "#111",
        }}>
            {/* Camera scene */}
            {scenes[furniture]}

            {/* Label overlay - bottom left */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "20px 12px 10px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
            }}>
        <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#FFFFFF",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        }}>
          {label} - {time}
        </span>
            </div>

            <ExpandButton/>

            <LiveDotIndicator/>

        </div>
    );
};