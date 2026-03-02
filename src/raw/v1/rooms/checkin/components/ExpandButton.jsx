import {ExpandIcon} from "../icons/ExpandIcon.jsx";

export function ExpandButton() {
    return <>
        {/* Expand icon - top right */}
        <button style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 30,
            height: 30,
            borderRadius: 6,
            background: "rgba(0,0,0,0.35)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
        }}>
            <ExpandIcon/>
        </button>
    </>;
}