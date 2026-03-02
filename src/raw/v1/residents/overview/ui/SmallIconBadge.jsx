export function SmallIconBadge() {
    return <>
        {/* Small icon badge */}
        <div style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#4DB6AC",
            border: "2px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                <rect x="1" y="3" width="8" height="1.5" rx="0.5"/>
                <rect x="1" y="5.5" width="5" height="1.5" rx="0.5"/>
            </svg>
        </div>
    </>;
}