import React, { useState,useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

const CategoryPage = () => {


    const [newCategory, setNewCategory] = useState("");
    const [categories,setCategories] = useState([]);

    
    
    const addCategory = () => {
        axios.post("/index.php", { newCategory: newCategory, action: 'addCategory' }, {

        }).then(res => {
            console.log(res);
            fetchCategories();
        }).catch(err => {
            console.log(err);
        })
    }

    const fetchCategories = () => {
        axios.post("/index.php",{action:'fetchCategories'}).then(res => {
            console.log(res);
            setCategories(res.data);
        })
    }

    useEffect(()=>{
        fetchCategories();
    },[])

    return (
        <>
            <h2>Categories</h2>
            <div className="p-grid">
                <div className="p-col-4">
                    <div className="p-formgroup-inline">
                        <div className="p-field">
                            <label htmlFor="categoryName" className="p-sr-only">Category Name</label>
                            <InputText id="categoryName" type="text" placeholder="category name" onChange={(e) => setNewCategory(e.target.value)} />
                        </div>
                        <Button type="button" label="add" onClick={addCategory} />
                    </div>
                </div>
                <div className="p-col-8">
                    <div className="card">
                        <DataTable value={categories}>
                            <Column field="category_id" header="id"></Column>
                            <Column field="category_name" header="category name"></Column>
                        </DataTable>
                    </div>
                </div>
            </div>


        </>
    );
}
export default CategoryPage;