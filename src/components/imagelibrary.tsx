import { useContext, useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { ApiContext } from '../contexts/apicontext';
import { Button } from 'primereact/button';
import axios from 'axios';
const ImageLibrary = (props:any) => {
    const {fetchImages} = useContext(ApiContext);

    const serverURL = "http://localhost/portfolio-app/";

    //to display on dataview
    const [libraryImages,setLibraryImages] = useState<any>([]);
    const displayLibrary = props.displayLibrary;
    const setDisplayLibrary = props.setDisplayLibrary;
    const selectLimit = props.selectLimit;


    //for uploads
    const [selectedImage,setSelectedImage] = useState<any>();
    //to addwork
    const [tempImages,setTempImages] = useState<any>([]);
    const projectImages = props.projectImages;
    const setProjectImages = props.setProjectImages;

    useEffect(()=>{
        fetchImages().then((res:any)=>{
            setLibraryImages(res.data);
        }).catch((err:any)=>{console.log(err.response.data)})
    },[displayLibrary])

    useEffect(()=>{
        setTempImages(projectImages);
    },[props.projectImages])
    const hideLibrary = () => {
        setDisplayLibrary(false);
    }


    const clickHandle = (e:any,data:any) =>{
        if(tempImages.length<selectLimit){
            if(tempImages.some((item:any)=> item.img_name === data.img_name)===false){
                setTempImages((old:any) => [...old,data]);
            }
        }
        
    }

    const itemTemplate = (data:any) => {
        
        return (
            <div  className="p-md-4 p-d-flex p-ai-center p-jc-center itemDiv" onClick={(e:any) => clickHandle(e,data)} >
                
                    <img src={`${serverURL}${data.img_path}`} key={data.img_id} alt={data.img_name} width="100%"/>
                
            </div>
        );
    }

    const selectImages = () =>{
        setProjectImages(tempImages);
        setDisplayLibrary(false);
    }

    const imageItemClick = (e:any,tempImage:any) =>{
        setTempImages(tempImages.filter((n:any)=>n.img_name !== tempImage.img_name));
    }

    const imageItem = (tempImage:any) => {
        return  (
                <div className="p-d-inline-flex p-ai-center">
                <Button onClick={e=>imageItemClick(e,tempImage)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />
                <span style={{fontSize:"12px"}}>{tempImage.img_name}</span>
                </div>
        );
    }
    

    const header = (
        <div className="p-p-0" style={{backgroundColor:"var(--surface-200)"}}>
            Image Library
        </div>
    );

    const footer = (
        <div className="p-p-2" >
            {tempImages.length>0 ? <>
                        {tempImages?.map((n:any,i:any) => {
                            return imageItem(n)
                        })}
                        </> : "No Images Selected for Project" }
            <Button type="button" onClick={selectImages}>Select Images</Button>
        </div>
    );

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
        }).then((res:any)=>{
            fetchImages().then((res:any)=>{
                setLibraryImages(res.data);
            })
        }).catch((err:any) => console.log(err));
    }
    return(
        <>
            <Dialog className="libraryDialog" header={header} footer={footer} visible={displayLibrary} style={{ width: '60vw' }}  onHide={hideLibrary}>
                <div className="">
                    
                                <form method="post" onSubmit={uploadSubmit} encType="multipart/form-data">
                                    <input type="file" onChange={e=>uploadImageHandle(e)} multiple required />
                                    <input type="submit"  onClick={uploadSubmit}/>
                                </form>
                                {libraryImages.length>0 ? <DataView value={libraryImages} layout='grid' itemTemplate={itemTemplate} rows={9} ></DataView>
                    : "There are no images in library"}
                    
                </div>
            </Dialog>
        </>
    );
    
}
export default ImageLibrary;