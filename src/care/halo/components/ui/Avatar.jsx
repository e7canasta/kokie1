// Avatar component with unique colors per person
export const Avatar = ({name, size = 42, colors}) => {
    const initials = name.split(" ").map(n => n[0]).join("");
    return (
        <div style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: `2px solid ${colors[2] || "rgba(255,255,255,0.3)"}`,
            overflow: "hidden",
            position: "relative",
        }}>
            {/* Simulated photo feel */}
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}>
                <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="14" r="7" fill="rgba(255,255,255,0.35)"/>
                    <ellipse cx="20" cy="34" rx="13" ry="9" fill="rgba(255,255,255,0.25)"/>
                </svg>
            </div>
        </div>
    );
};