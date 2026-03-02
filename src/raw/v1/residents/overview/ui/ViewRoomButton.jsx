import {ExternalLinkIcon2} from "../../../../care/halo/icons/ExternalLinkIcon2.jsx";

export function ViewRoomButton() {
    return <button style={{
        width: "100%",
        padding: "14px 0",
        background: "#2E7D6F",
        color: "white",
        border: "none",
        borderRadius: 28,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        letterSpacing: "0.5px",
    }}>
        <ExternalLinkIcon2/>
        VIEW ROOM
    </button>;
}