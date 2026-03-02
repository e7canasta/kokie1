import {wellnessData} from "./data.js";

export function WellnessTable(props) {
    return <>
        {/* Wellness Rows */}
        {wellnessData.map(props.callbackfn)}
    </>;
}