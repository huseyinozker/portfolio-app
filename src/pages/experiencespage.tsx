import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { useContext, useEffect, useState } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { ApiContext } from "../contexts/apicontext";
import { Column } from 'primereact/column';



const ExperiencesPage = () => {

    const {fetchExperiences,addExperience} = useContext(ApiContext);

    const[experiences,setExperiences] = useState<any>();

    const [expNameInput,setExpNameInput] = useState<any>();
    const [expDesInput,setExpDesInput] = useState<any>();
    const [displayDialog,setDisplayDialog] = useState(false);

    useEffect(()=>{
        fetchExperiences().then((res:any)=>{
            setExperiences(res.data);
        })
    })

    const hideDialog = () => {
        setDisplayDialog(false);
    }

    const handleExperience = () => {
        addExperience(expNameInput,expDesInput).then((result:any) => {
            setDisplayDialog(false);
        }).catch((err:any) => {
            console.log(err.response);
        });
    }


    const dialogFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => hideDialog()} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => hideDialog()} autoFocus />
            </div>
        );
    }

    return(
        <>
            <div className="container p-m-0">
                <h2>Experiences</h2>
                <Button label="Add Experience" className="p-button-success" icon="pi pi-plus" onClick={()=> setDisplayDialog(true)} />
                
                <DataTable value={experiences}>
                    <Column field="exp_name" header="Experience"></Column>
                    <Column field="exp_des" header="Description"></Column>
                </DataTable>

                <Dialog header="Add New Experience Info" visible={displayDialog} style={{ width: '50vw' }} onHide={() => hideDialog()}>
                        <div className="p-field">
                            <label htmlFor="expname" className="p-d-block">Experience Name</label>
                            <InputText id="expname" aria-describedby="expname-help"  style={{width:"100%"}} value={expNameInput} onChange={(e) => setExpNameInput(e.target.value)} />
                        </div>
                        <div className="p-field" >
                            <label htmlFor="expdes" className="p-d-block">Experience Description</label>
                            <InputTextarea id="expdes" aria-describedby="expdes-help" style={{width:"100%"}} className="p-d-block" value={expDesInput} onChange={(e) => setExpDesInput(e.target.value)} autoResize />
                        </div>
                        <div className="p-field">
                            <Button className="p-button-success" onClick={handleExperience}>Add</Button>
                        </div>

                </Dialog>

            </div>

        </>
    );
}
export default ExperiencesPage;