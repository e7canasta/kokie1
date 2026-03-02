export function TableHeader() {
    return <>
        {/* Table Header */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 0.8fr",
            padding: "0 0 10px 0",
        }}>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333"}}>Activity</span>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333"}}>Initiated</span>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333"}}>Uninitiated</span>
            <span style={{fontSize: 13, fontWeight: 700, color: "#333", textAlign: "right"}}>Total</span>
        </div>
    </>;
}