export function ResidentsList(props) {
    const residents = props.residents || [];
    return <>
        {/* All Residents List */}
        <div style={{background: "#FFFFFF", margin: "0 0px"}}>
            {residents.map(props.prop)}
        </div>
    </>;
}