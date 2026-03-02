import {CloseIcon} from "../../icons/CloseIcon";

export function HeaderRow() {
    return <>
        {/* Header Row */}
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px 4px",
            flexShrink: 0,
        }}>
            <h1 style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1A1A1A",
                margin: 0,
                letterSpacing: "-0.3px",
            }}>
                Check In – Room 203
            </h1>
            <button style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
            }}>
                <CloseIcon/>
            </button>
        </div>
    </>;
}