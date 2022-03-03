import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ApiContext } from '../../contexts/apicontext';

function WorkList() {
    const { fetchWorks, getWork, removeWork } = useContext(ApiContext);
    const [works, setWorks] = useState<any>([]);


    useEffect(() => {
        fetchWorks().then((result: any) => {
            setWorks(result.data);
            console.log(result.data);
        })
    }, [])

    
    const removeHandle = (id:any) => {
        removeWork(id).then((res:any)=>{
            window.location.reload();
        })
    }

    const removeBodyTemplate = (rowData:any) => {
        const id = rowData.work_id;
        return (
            <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={e=>removeHandle(id)}></Button>
        );
    }

    const editBodyTemplate = (rowData:any) => {
        const id = rowData.work_id;
        return (
            <Link to={`add-work/${id}`}>
                <Button type="button" icon="pi pi-pencil" className="p-button-primary"></Button>
            </Link>
        );
    }

    return (
        <div>
            <DataTable value={works}>
                <Column field="work_id" header="work id"></Column>
                <Column field="work_name" header="work name"></Column>
                <Column body={editBodyTemplate} header="edit">x</Column>
                <Column body={removeBodyTemplate} header="remove">x</Column>
            </DataTable>
        </div>
    )
}

export default WorkList