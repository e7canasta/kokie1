import {WellnessHeaderSection} from "./WellnessHeaderSection.jsx";
import {WellnessTable} from "./WellnessTable.jsx";

export function WellnessCard(props) {
    return <>
        {/* Wellness Card */}
        <div style={{
            margin: "0 20px",
            background: "#FFFFFF",
            borderRadius: 12,
            border: "1px solid #E8E8E8",
            overflow: "hidden",
        }}>
            <WellnessHeaderSection/>

            {/* Divider */}
            <div style={{height: 1, background: "#ECECEC", margin: "0 16px"}}/>

            <WellnessTable callbackfn={props.callbackfn}/>
        </div>
    </>;
}