export function Tabs(props) {
    return <>
        {/* Tabs */}
        <div style={{
            display: "flex",
            background: "#F3F3F3",
            borderRadius: 25,
            padding: 3,
            marginBottom: 16,
        }}>
            {props.strings.map(props.callbackfn)}
        </div>
    </>;
}