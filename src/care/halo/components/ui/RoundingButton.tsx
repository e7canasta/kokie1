import {ExternalLinkIcon} from "../../icons/ExternalLinkIcon";

export function RoundingButton() {
    return <>
        {/* START ROUNDING Button */}
        <div style={{padding: "0 16px 10px"}}>
            <button style={{
                width: "100%",
                padding: "12px 0",
                background: "linear-gradient(135deg, #1A6356, #257D6E)",
                color: "white",
                border: "none",
                borderRadius: 26,
                fontSize: 12.5,
                fontWeight: 750,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                letterSpacing: "1px",
                boxShadow: "0 4px 14px rgba(26,99,86,0.3)",
            }}>
                <ExternalLinkIcon/>
                START ROUNDING
            </button>
        </div>
    </>;
}
