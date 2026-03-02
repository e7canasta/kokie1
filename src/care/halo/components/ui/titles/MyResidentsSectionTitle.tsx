export function MyResidentsSectionTitle() {
    return <>
        {/* My Residents Section */}
        <div style={{padding: "4px 18px 6px"}}>
            <div style={{display: "flex", alignItems: "center", gap: 6}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#1A1A1A" stroke="none">
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span style={{fontSize: 17, fontWeight: 700, color: "#1A1A1A", letterSpacing: "-0.01em"}}>My Residents</span>
            </div>
        </div>
    </>;
}
