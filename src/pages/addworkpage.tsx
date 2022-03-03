import React, { useContext, useEffect, useState,useRef} from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import CustomTag from "../components/customtag";
import ImageLibrary from "../components/imagelibrary";
import { ApiContext } from "../contexts/apicontext";
import { useParams } from "react-router";
import axios from "axios";
const AddWorkPage = () => {

    //editlerken gerekli normalde gereksiz.
    const {work_id} = useParams<any>();
    const [work,setWork] = useState<any>();
    const [editMode,setEditMode] = useState<any>(false);

    //inputText value textleri
    const [workText,setWorkText] = useState<string>("");
    const [periodText,setPeriodText] = useState<string>("");
    const [bodyText,setBodyText] = useState<string>("");

    const toast = useRef<any>(null);
    const[warningMessage,setWarningMessage] = useState<any>("");

    const { fetchCategories, fetchTechs,addWork,
           getWork,getCategory,getTech,getWorkImage,getImage,updateWork } = useContext(ApiContext);

    const [selectedImage,setSelectedImage] = useState<any>();

    const [categories, setCategories] = useState([]);
    const [projectCategories,setProjectCategories] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const [techs, setTechs] = useState([]);
    const [projectTechs,setProjectTechs] = useState<any>([]);
    const [selectedTech, setSelectedTech] = useState<any>(null);

    const [projectImages,setProjectImages] = useState<any>([]);
    const [coverImage,setCoverImage] = useState<any>([]);


    const [displayLibrary,setDisplayLibrary] = useState(false);
    const [displayCover,setDisplayCover] = useState(false);

    //sayfa ilk yüklendiğinde seçmek için kullanıan verileri fetch etme kısmı
    useEffect(() => {
        fetchCategories().then((res: any) => {
            setCategories(res.data);
        });
        fetchTechs().then((result: any) => {
            setTechs(result.data);
        });
        //work editleme amacı ile gelindiyse sayfaya
        if(work_id !== undefined){
            setEditMode(true);
            getWork(work_id).then((res:any)=>{
                setWork(res.data);
                setWorkText(res.data.work_name);
                setPeriodText(res.data.work_finish);
                setBodyText(res.data.work_body);
                getImage(res.data.cover_img).then((res:any)=>{
                    setCoverImage((oldArr:any)=>[...oldArr,res.data]);
                })
            })
            getCategory(work_id).then((res:any)=>{
                setProjectCategories(res.data);
            })
            getTech(work_id).then((res:any)=>{
                setProjectTechs(res.data);
            })
            getWorkImage(work_id).then((res:any)=>{
                console.log(res.data);
                setProjectImages(res.data);
            })
        }
        
    }, [])

    //uyarı ve onay mesajları için
    useEffect(()=>{
        if(warningMessage!==""){
            toast.current.show({severity: 'warn', summary: 'Uyarı', detail:`${warningMessage}`});
        }
        
    },[warningMessage])

    
    
    const onCategoryChange = (e: { value: any }) => {
        setSelectedCategory(e.value);
    }

    const onTechChange = (e: { value: any }) => {
        setSelectedTech(e.value);
    }

    

    const categoryHandle = () => {
        if(!(projectCategories.indexOf(selectedCategory) > -1)){
            setProjectCategories([...projectCategories,selectedCategory]);
        }
    }
    const removeCategoryHandle = (removeName:any) => {
        setProjectCategories(projectCategories.filter((item:any) => item.category_name !== removeName)) 
    }

    const techHandle = () => {
        if(!(projectTechs.indexOf(selectedTech) > -1)){
            setProjectTechs([...projectTechs,selectedTech]);
        }
    }
    const removeTechHandle = (removeName:any) => {
        setProjectTechs(projectTechs.filter((item:any) => item.tech_name !==removeName));
    }

    

    const uploadImageHandle = (e:any) => {
        setSelectedImage({file:e.target.files});
        
    }
    const uploadSubmit = async(e:any) => {
        e.preventDefault();
        const formData = new FormData();
        
        for(let i=0;i<selectedImage.file.length;i++){
            formData.append('image[]',selectedImage.file[i]);
            
        }
        
        
        return await axios.post("/upload.php",formData,{
            headers:{
                'content-type': 'multipart/form-data'
            }
        }).then((res:any)=>{console.log(res)}).catch((err:any) => console.log(err));
    }

    const showLibrary = () => {
        setDisplayLibrary(true);
    }

    const warningRemoveHandle = () =>{
        setWarningMessage("");
    }

    //form submit edilme işlemi
    const submitHandle = (e:any) => {
        e.preventDefault();
        if(editMode===false){
            let submitOk = 1;
            if(projectCategories.length<1){
                submitOk=0;
                setWarningMessage("Lütfen proje için kategori seçiniz.");
                return false;   
            }
            if(projectTechs.length<1){
                submitOk=0;
                setWarningMessage("Lütfen proje için tech seçiniz.");
                return false;   
            }
            if(coverImage.length<1){
                submitOk=0;
                setWarningMessage("Lütfen proje için kapak resmi seçiniz.");
                return false;
            }
            if(projectImages.length<1){
                submitOk=0;
                setWarningMessage("Lütfen proje için resim seçiniz.");   
                return false;
            }
            if(submitOk===1){
                addWork(e.target.workName.value,e.target.workBody.value,
                    e.target.finishPeriod.value,projectCategories,projectTechs,projectImages,coverImage[0]
                    ).then((res:any)=>{
                        console.log(res.data);
                });
            }
        }else{
            console.log(projectImages);
            updateWork(work_id,e.target.workName.value,e.target.workBody.value,
                e.target.finishPeriod.value,projectCategories,projectTechs,projectImages,coverImage[0]
                ).then((res:any)=>{
                    console.log(res.data);
            });
        }
    }

    return (
        <>
        <Toast ref={toast} onRemove={warningRemoveHandle} />
        <div className="p-grid p-m-0">
            <h2>Add Work</h2>
            <div className="p-col-12 p-fluid">
                <form onSubmit={submitHandle}>
                    <div className="p-formgroup-inline">
                        <div className="p-col-8">
                            <label htmlFor="workName" className="p-sr-only">Work Name</label>
                            <InputText id="workName" type="text" placeholder="work name"
                            value={workText} onChange={e=>setWorkText(e.target.value)} required/>
                        </div>
                        <div className="p-col-4">
                            <label htmlFor="finishPeriod" className="p-sr-only">Finish Period</label>
                            <InputText id="finishPeriod" type="text" placeholder="finish period"
                             value={periodText} onChange={e=>setPeriodText(e.target.value)} required />
                        </div>
                        <div className="p-col-12 p-grid">
                            <div className="p-col-4 p-d-flex p-jc-between">
                                <Dropdown style={{width:"80%"}} id={"categoryName"} value={selectedCategory} options={categories} onChange={onCategoryChange} optionLabel="category_name" placeholder="Select a Category" />
                                <Button type="button" icon="pi pi-plus" onClick={categoryHandle}/>
                            </div>
                            <div className="p-col-8 p-d-flex p-jc-center p-ai-center">
                                {projectCategories?.map((n:any,i:any) => {
                                    return <CustomTag key={i} tagLabel={n.category_name} onRemove={removeCategoryHandle}/>
                                })}
                            </div>
                        </div>
                        <div className="p-col-12 p-grid">
                            <div className="p-col-4 p-d-flex p-jc-between">
                            <Dropdown style={{width:"80%"}} id={"techName"} value={selectedTech} options={techs} onChange={onTechChange} optionLabel="tech_name" placeholder="Select a Tech" />
                            <Button type="button" icon="pi pi-plus" onClick={techHandle}/>
                            </div>
                            <div className="p-col-8 p-d-flex p-jc-center p-ai-center">
                                {projectTechs?.map((n:any,i:any) => {
                                    return <CustomTag key={i} tagLabel={n.tech_name} onRemove={removeTechHandle}/>
                                })}
                            </div>

                        </div>
                        <div className="p-col-12">
                        <Button type="button"  label="Select Cover Image from Library" onClick={e=>setDisplayCover(true)} />
                        <ImageLibrary displayLibrary={displayCover} setDisplayLibrary={setDisplayCover}
                                    projectImages={coverImage} setProjectImages={setCoverImage} selectLimit={2}/>
                        </div>
                        <div className="p-col-12">
                            <label htmlFor="workBody">Work Description</label>
                            <InputTextarea id="workBody" rows={8} 
                            value={bodyText} onChange={e=>setBodyText(e.target.value)} autoResize required/>
                        </div>
                        <Button type="button"  label="Select Images from Library" onClick={showLibrary} />
                        <ImageLibrary displayLibrary={displayLibrary} setDisplayLibrary={setDisplayLibrary}
                                    projectImages={projectImages} setProjectImages={setProjectImages}
                                    selectLimit={3}/>
                        <div className="p-col-12">
                            
                        </div>
                        {/* <div className="p-col-6">
                            <form method="post" onSubmit={uploadSubmit} encType="multipart/form-data">
                                <input type="file" onChange={e=>uploadImageHandle(e)} multiple required />
                                <input type="submit"  onClick={uploadSubmit}/>
                            </form>
                        </div> */}
                    </div>
                    <Button type="submit" label="add" />
                    <label></label>
                </form>

            </div>

        </div>
        </>
    );
}
export default AddWorkPage;