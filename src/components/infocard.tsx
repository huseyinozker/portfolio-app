import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../contexts/apicontext";

const InfoCard = (props:any) => {

    const {id,title,description,imgUrl} = props;


    return (
        <div className="p-grid p-shadow-3 p-mx-lg-5" style={{borderRadius:"10px",backgroundColor:"var(--framewhite)",maxHeight:"317px"}}>
            <div className="p-col-12 p-d-flex p-jc-center p-ai-center" style={{backgroundColor:"var(--lightgreen)",borderRadius:"10px",height:"132px"}}>
                <img src={`${process.env.REACT_APP_SERVER_URL}${imgUrl}`} style={{maxWidth:"96px",maxHeight:"96px"}}/>
            </div>
            <div className="p-col-12 p-d-flex p-flex-column p-ai-center ">
                <div style={{fontSize:"20px",fontWeight:"bold",color:"var(--green)",textAlign:"center"}}>{title}</div>
                <div style={{textAlign:"center"}}>{description}</div>

                <Link to="/services">
                    <button type="button" className="customBtn p-mr-5 p-shadow-2 p-mx-auto p-mt-3" 
                                style={{padding:"6px 10px",fontWeight:"normal",fontSize:"16px"}}>more details</button>
                </Link>
            </div>
        </div>
    );
}
export default InfoCard;