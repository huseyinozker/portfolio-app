import React, { useContext, useEffect, useState,useRef} from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import CustomTag from "../components/customtag";
import ImageLibrary from "../components/imagelibrary";
import { ApiContext } from "../contexts/apicontext";
import { Toast } from "primereact/toast";
const AddAreaPage = () => {

    const toast = useRef<any>(null);
    const[warningMessage,setWarningMessage] = useState<any>("");

    const {addArea,fetchTechs} = useContext(ApiContext);
    //to show image library
    const [displayLibrary,setDisplayLibrary] = useState(false);
    // to show library for cover image
    const [displayCover,setDisplayCover] = useState(false);

    const [areaImages,setAreaImages] = useState<any>([]);
    const [coverImage,setCoverImg] = useState<any>([]);

    const [techs, setTechs] = useState([]);
    const [areaTechs,setAreaTechs] = useState<any>([]);
    const [selectedTech, setSelectedTech] = useState<any>(null);

    useEffect(() => {
        fetchTechs().then((result: any) => {
            setTechs(result.data);
        });
    }, [])

    useEffect(()=>{
        if(warningMessage!==""){
            toast.current.show({severity: 'warn', summary: 'Uyarı', detail:`${warningMessage}`});
        }
    },[warningMessage])

    const onTechChange = (e: { value: any }) => {
        setSelectedTech(e.value);
    }

    const techHandle = () => {
        if(!(areaTechs.indexOf(selectedTech) > -1)){
            setAreaTechs([...areaTechs,selectedTech]);
        }
    }
    const removeTechHandle = (removeName:any) => {
        setAreaTechs(areaTechs.filter((item:any) => item.tech_name !==removeName));
    }

    const submitHandle = (e:any) => {
        e.preventDefault();
        let submitOk=1;
        if(areaTechs.length<1){
            submitOk=0;
            setWarningMessage("Lütfen tech seçiniz.");
            return false;
        }
        if(coverImage.length<1){
            submitOk=0;
            setWarningMessage("Lütfen servis için kapak resmi seçiniz.");
            return false;
        }
        if(areaImages.length<1){
            submitOk=0;
            setWarningMessage("Lütfen servis için resimleri seçiniz");
            return false;
        }
        
        if(submitOk===1){
            addArea(e.target.areaName.value,e.target.areaBody.value,areaTechs,areaImages,coverImage[0]
                ).then((res:any)=>{
                    console.log(res.data);
            });
        }
        
    }
    return (
        <>
        <Toast ref={toast} />
        <div className="p-grid">
            <h2>Add New Work Area</h2>
            <div className="p-col-12 p-fluid">
                <form onSubmit={submitHandle}>
                    <div className="p-formgroup-inline">
                        <div className="p-col-8">
                            <label htmlFor="areaName">Area Name</label>
                            <InputText id="areaName" type="text" placeholder="work area" required />
                        </div>
                        <div className="p-col-12 p-grid">
                            <div className="p-col-4 p-d-flex p-jc-between">
                            <Dropdown style={{width:"80%"}} id={"techName"} value={selectedTech} options={techs} onChange={onTechChange} optionLabel="tech_name" placeholder="Select a Tech" />
                            <Button type="button" icon="pi pi-plus" onClick={techHandle}/>
                            </div>
                            <div className="p-col-8 p-d-flex p-jc-center p-ai-center">
                                {areaTechs?.map((n:any,i:any) => {
                                    return <CustomTag key={i} tagLabel={n.tech_name} onRemove={removeTechHandle}/>
                                })}
                            </div>

                        </div>
                        <div className="p-col-12">
                            <Button type="button"  label="Select Cover Image from Library"  onClick={e=> setDisplayCover(true)}
                            className="p-my-3"  />
                            <ImageLibrary  displayLibrary={displayCover} setDisplayLibrary={setDisplayCover}
                                        projectImages={coverImage} setProjectImages={setCoverImg} />
                        </div>
                        <div className="p-col-12">
                            <label htmlFor="areaBody">Work Description</label>
                            <InputTextarea id="areaBody" rows={8} autoResize required/>

                            <Button type="button"  label="Select Images from Library"  onClick={e=> setDisplayLibrary(true)}
                            className="p-my-3"  />
                            <ImageLibrary  displayLibrary={displayLibrary} setDisplayLibrary={setDisplayLibrary}
                                    projectImages={areaImages} setProjectImages={setAreaImages} />
                        </div>
                        
                    </div>    
                    <Button type="submit" label="add" />
                </form>

            </div>

        </div>
        </>
    );
}
export default AddAreaPage;