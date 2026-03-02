export function LiveDotIndicator() {
    return <>
        {/* Live indicator dot */}
        <div style={{
            position: "absolute",
            top: 10,
            left: 12,
            display: "flex",
            alignItems: "center",
            gap: 4,
        }}>
            <div style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ADE80",
                boxShadow: "0 0 6px rgba(74,222,128,0.6)",
            }}/>
        </div>
    </>;
}