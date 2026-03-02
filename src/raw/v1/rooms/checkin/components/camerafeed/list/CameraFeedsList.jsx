import {CameraFeedListItem} from "./CameraFeedListItem.jsx";

export function CameraFeedsList() {
    return <>
        {/* Camera Feeds */}
        <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
        }}>
            <CameraFeedListItem
                label="Sitting Area"
                time="Today at 9:41am"
                furniture="sitting"
            />
            <CameraFeedListItem
                label="Bedside"
                time="Today at 9:41am"
                furniture="bedside"
            />
            <CameraFeedListItem
                label="Hallway"
                time="Today at 9:41am"
                furniture="hallway"
            />
        </div>
    </>;
}