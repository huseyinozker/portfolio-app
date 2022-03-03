import React, { useContext,useState,useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ApiContext } from "../contexts/apicontext";


const TechPage = () => {

    const {fetchTechs,addTech} = useContext(ApiContext);

    const [newTech,setNewTech] = useState("");
    const [techs,setTechs] = useState([]);
    

    const addTechHandle = () => {
        addTech(newTech).then((res:any)=>{
            console.log(res);
            fetchTechs().then((result:any) => {
                setTechs(result.data);
            })
        });
        
    }

    useEffect(()=>{
        fetchTechs().then((res:any)=>{
            console.log(res.data);
            setTechs(res.data);
        })
    },[])

    return(
        <>
            <h2>Techs</h2>
            <div className="p-grid">
                <div className="p-col-4">
                    <div className="p-formgroup-inline">
                        <div className="p-field">
                            <label htmlFor="techName" className="p-sr-only">Tech Name</label>
                            <InputText id="techName" type="text" placeholder="tech name" onChange={(e) => setNewTech(e.target.value)} />
                        </div>
                        <Button type="button" label="add" onClick={addTechHandle} />
                    </div>
                </div>
                <div className="p-col-8">
                    <div className="card">
                        <DataTable value={techs}>
                            <Column field="tech_id" header="id"></Column>
                            <Column field="tech_name" header="tech name"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>


        </>
    );
}
export default TechPage;