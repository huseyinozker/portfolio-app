import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useContext, useEffect, useState } from 'react'
import { ApiContext } from '../../contexts/apicontext';

function DashBoard() {

    const {updateHome,fetchHome} = useContext(ApiContext);


    const [homeTitle, setHomeTitle] = useState<any>("");
    const [homeTitle2, setHomeTitle2] = useState<any>("");
    const [homeDescription, setHomeDescription] = useState<any>("");
    const [aboutDescription, setAboutDescription] = useState<any>("");
    const [aboutMail, setAboutMail] = useState<any>("");
    const [aboutTel, setAboutTel] = useState<any>("");

    useEffect(()=>{
        fetchHome().then((res:any)=>{
            setHomeTitle(res.data[0].setting_value);
            setHomeTitle2(res.data[1].setting_value);
            setHomeDescription(res.data[2].setting_value);
            setAboutDescription(res.data[3].setting_value);
            setAboutMail(res.data[5].setting_value);
            setAboutTel(res.data[4].setting_value);
        })
            
    },[])

    const handleHome = () => {
        updateHome(homeTitle,homeTitle2,homeDescription,aboutDescription,aboutMail,aboutTel).then((res:any)=>{
            console.log(res);
        });
    }

    return (
        <>
            <div className='p-px-5'>
                <div className="p-grid">
                <div className='p-col-6'>
                    <h3>Home Title</h3>
                    <InputTextarea rows={1} cols={60} value={homeTitle} onChange={(e) => setHomeTitle(e.target.value)} autoResize />
                    <h3>Home Title2</h3>
                    <InputTextarea rows={1} cols={60} value={homeTitle2} onChange={(e) => setHomeTitle2(e.target.value)} autoResize />
                </div>
                <div className="p-col-6">
                    <h3>Home Description</h3>
                    <InputTextarea rows={5} cols={60} value={homeDescription} onChange={(e) => setHomeDescription(e.target.value)} autoResize />
                </div>
                <div className="p-col-6">
                    <h3>About Description</h3>
                    <InputTextarea rows={4} cols={60} value={aboutDescription} onChange={(e) => setAboutDescription(e.target.value)} autoResize />
                </div>
                <div className="p-col-6 p-d-flex p-ai-center">
                    <div className='p-mr-5'>
                        <h3>About Mail</h3>
                        <InputText value={aboutMail} onChange={(e) => setAboutMail(e.target.value)} />
                    </div>
                    <div className='p-ml-5'>
                        <h3>About Tel</h3>
                        <InputText value={aboutTel} onChange={(e) => setAboutTel(e.target.value)} />
                    </div>
                </div>
                </div>
                <Button label="Submit" onClick={handleHome} />

            </div>

        </>

    )
}

export default DashBoard