import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { ApiContext } from "../contexts/apicontext";

const SingleAreaPage = () => {


    const {area_id} = useParams<any>();
    const [area,setArea] = useState<any>({});
    const [techs,setTechs] = useState<any>([]);
    const [images,setImages] = useState<any>([]);
    
    const {getArea,getAreaTech,getAreaImage} = useContext(ApiContext);

    useEffect(()=>{
        getArea(area_id).then((result:any) => {
            setArea(result.data);
        })
        getAreaTech(area_id).then((result:any)=>{
            setTechs(result.data);
            console.log(result.data);
        })
        getAreaImage(area_id).then((result:any)=>{
            setImages(result.data);
        })
        console.log(process.env.REACT_APP_SERVER_URL);
    },[])


    return(
        <>
            <div className="p-grid p-p-5 p-m-0" style={{backgroundColor:"#F5F5F5"}}>
                <div className="p-col-8">
                    <h2>{area.area_name}</h2>
                    <p>{area.area_body}</p>
                    <div className="p-col-4">
                            <h3>Used Techs</h3>
                            <ul style={{listStyle:"none",padding:"0px"}}>
                                {
                                    techs?.map((n:any,i:any)=>{
                                        return <li key={n.tech_id}>{n.tech_name}</li>
                                    })
                                }
                            </ul>
                        </div>
                </div>
                <div className="p-col-4 p-d-flex p-flex-column p-jc-center" style={{overflow:"hidden"}}>
                    
                        {images.map((n:any,i:any)=>{
                            return <img src={`${process.env.REACT_APP_SERVER_URL}${n.img_path}`} alt={n.img_name} width="100%" className="p-my-3"  />
                        })}
                    
                </div>

            </div>
        </>
    );
}
export default SingleAreaPage;