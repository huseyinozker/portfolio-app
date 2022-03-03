import React from "react";
import { ProgressBar } from "primereact/progressbar";

const SkillBar = (props:any) => {
    const displayValueTemplate = (value:any) => {
        return (
            <div className="">
                {value}/<b>100</b>
            </div>
        );
    }
    return(
        <div className="p-my-3 p-grid p-ai-center">
            <div className="p-col-3 p-md-1" style={{color:"var(--green)" ,fontWeight:"bold", fontSize:"18px"}}>{props.skill_name}</div>
            <div className="p-col-12 p-md-10">
            <ProgressBar value={props.skill_value} color="var(--green)" />

            {/* <ProgressBar className="p-shadow-2" showValue={true} value={props.skill_value}  color="var(--green)" 
                style={{height:"6px",fontSize:"8px"}}>
            </ProgressBar> */}
            </div>
            
        </div>
    )
}
export default SkillBar;