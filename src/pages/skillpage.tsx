import React, { useState,useEffect,useContext,useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ApiContext } from "../contexts/apicontext";
import axios from "axios";
import { Toast } from "primereact/toast";

const SkillPage = () => {

    const {fetchSkills,addSkill,updateSkill,removeSkill} = useContext(ApiContext);

    const [newSkill, setNewSkill] = useState("");
    const [skillPoint,setSkillPoint] = useState<any>(0);
    const [skills,setSkills] = useState<any>([]);

    
    const toast = useRef<any>(null);
    


    useEffect(()=>{
        fetchSkills().then((res:any) =>{
            setSkills(res.data);
        } );
    },[])

    useEffect(()=>{
        console.log(skills);
    },[skills])


    const handleSkill = () =>{
        addSkill(newSkill,skillPoint).then((res:any)=>{
            console.log(res);
        }).catch((err:any)=>{
            console.log(err.response);
            toast.current.show({severity: 'warn', summary: 'Warning!', detail: `${err.response.data}`});

        })
    }

    const onEditorValueChange = (props:any, value:any,rowData:any) => {
        let updatedSkills = [...props.value];
        updatedSkills[props.rowIndex][props.field] = value;
        setSkills(updatedSkills);
        updateSkill(parseInt(rowData.skill_id),rowData.skill_name,rowData.skill_point).then((res:any)=>{
            console.log(res);
        });
    }

    const inputTextEditor = (props:any, field:any) => {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(props, e.target.value,props.rowData)} />;
    }

    const skillNameEditor = (props:any) => {
        return inputTextEditor(props, 'skill_name');
    }

    const removeHandle = (id:any) => {
        removeSkill(id).then((res:any)=>{
            window.location.reload();
        })
    }

    const removeBodyTemplate = (rowData:any) => {
        const id = rowData.skill_id;
        return (
            <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={e=>removeHandle(id)}></Button>
        );
    }

    return (
        <>
            <Toast ref={toast} />
            <h2>Categories</h2>
            <div className="p-grid">
                <div className="p-col-4">
                    <div className="p-formgroup-inline">
                        <div className="p-field">
                            <InputText id="skillName" type="text" placeholder="skill name" onChange={(e) => setNewSkill(e.target.value)} />
                            <InputText id="skillPoint" type="number" placeholder="skill point" onChange={(e) => setSkillPoint(e.target.value)} />
                        </div>
                        <Button type="button" label="add" onClick={handleSkill} />
                    </div>
                </div>
                <div className="p-col-8">
                    <div className="card">
                        <DataTable value={skills}>
                            <Column field="skill_id" header="id"></Column>
                            <Column field="skill_name" header="skill name" editor={skillNameEditor}></Column>
                            <Column field="skill_point" header="skill point"></Column>
                            <Column body={removeBodyTemplate} header="remove">x</Column>
                        </DataTable>
                    </div>
                </div>
            </div>


        </>
    );
}
export default SkillPage;