export function ResidentsGrid(props) {
    const residents = props.residents || [];
    return <>
        {/* My Residents Grid - 2x2 */}
        <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            padding: "0 16px 16px",
        }}>
            {residents.map(props.callbackfn)}
        </div>
    </>;
}