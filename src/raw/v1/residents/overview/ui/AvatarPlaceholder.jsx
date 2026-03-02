export function AvatarPlaceholder() {
    return <div style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(180deg, #3E8E7E 0%, #2E6B5E 50%, #1B4A40 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
        {/* Stylized avatar placeholder */}
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="15" r="8" fill="rgba(255,255,255,0.3)"/>
            <ellipse cx="20" cy="35" rx="14" ry="10" fill="rgba(255,255,255,0.2)"/>
        </svg>
    </div>;
}