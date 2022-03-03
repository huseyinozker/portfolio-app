import React,{useContext,useEffect,useState} from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { ApiContext } from "../contexts/apicontext";
function Frame(props:any){

    const {getWorkImage,getCategory} = useContext(ApiContext);
    const [imgUrl,setImgUrl] = useState<any>(null);
    const [category,setCategory] = useState<any>(null);
    const {title,description,id} = props;
    const toUrl = `/works/${id}`;

    useEffect(()=>{
        getWorkImage(id).then((res:any)=>{
            if(res.data.length>0){
                setImgUrl(res.data[0].img_path);
            }
        })
        getCategory(id).then((res:any)=>{
            if(res.data.length>0){
                setCategory(res.data[0].category_name);
            }
        })
    },[])

    return (
        <div className="generalFrame p-grid p-mx-0 p-shadow-3 p-my-5" style={{width:"100%"}}>
            <div className="p-md-8 p-order-2 p-order-md-1  p-d-flex p-flex-column p-jc-center">
                <div className="p-pl-0 p-px-3 p-px-md-0 p-pl-md-5">
                    <div className="p-grid p-mx-0 p-ai-center p-jc-center">
                        <div className="p-col-12 p-md-6 p-p-0 p-text-center p-text-md-left">
                            <span className="frameTitle hoverWhite">{title}</span>
                        </div>
                        
                        <div className="p-col-12 p-md-6 p-p-0 p-text-center p-text-md-left">
                            <span className="dot p-mx-2" style={{backgroundColor:"var(--green)"}}></span>
                            <span className="hoverWhite">{category}</span>
                        </div>
                        
                    </div>
                    <div className="p-text-justify p-mt-2 p-mt-md-0">
                        <span className="frameDescription hoverWhite ">{description}</span>
                    </div>
                    <div className="p-mt-3 p-mt-md-2 p-d-flex p-jc-center p-jc-md-end">
                        <Link to={toUrl}>
                            <button type="button" className="customBtn p-mx-0 p-mr-md-5 p-shadow-2" 
                                style={{padding:"6px 10px",fontWeight:"normal",fontSize:"16px"}}>more details</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="p-md-4 p-order-1 p-order-md-2 p-d-flex p-jc-center p-ai-center">
                <div className="p-d-flex p-jc-center p-ai-center p-p-1" style={{backgroundColor:"var(--green)",borderRadius:"10px"}}>
                    <img src={`${process.env.REACT_APP_SERVER_URL}${imgUrl}`} style={{maxHeight:"200px",maxWidth:"100%",borderRadius:"10px"}}/>
                </div>
                
            </div>
        </div>
    );
}
export default Frame;