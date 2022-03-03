import React,{useContext,useState,useEffect} from "react";
import Frame from "../components/frame";
import HeaderMenu from "../components/headermenu";
import { DataView } from "primereact/dataview";
import { DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { ApiContext } from "../contexts/apicontext";
import Footer from "../components/footer";

const WorksPage = () => {

    const {fetchWorks,getWork} = useContext(ApiContext);

    const [works,setWorks] = useState<any>([]);

    const [sortKey, setSortKey] = useState<any>(null);
    const [sortOrder, setSortOrder] = useState<any>(null);
    const [sortField, setSortField] = useState<any>(null);
    const sortOptions = [
        {label: 'Price High to Low', value: '!price'},
        {label: 'Price Low to High', value: 'price'},
    ];
    

    useEffect(()=>{
        fetchWorks().then((result:any) => {
            setWorks(result.data);
            console.log(result.data);
            
        }).catch((err:any) => {
            
        });


    },[])

    const itemTemplate = (work:any) =>{
        return(
            <Frame title={work.work_name} description={(`${work.work_body}`.substring(0,300) + "...")} id={work.work_id} />
        );
    }
    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6">
                <h2 style={{fontSize:"48px",fontWeight:"bold",margin:"0 auto",padding:"0 0"}}>
                        <span style={{color:"var(--green)"}}>Works</span>
                </h2>
                </div>
                
                <div className="p-col-6 p-d-flex p-flex-row-reverse p-ai-center" style={{textAlign: 'right'}}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange}/>
                </div>
                
            </div>
        );
    } 
    const onSortChange = (event:any) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    return (
        <>
        <div className="outContainer p-shadow-2">
            <div className="container">
                <HeaderMenu />
            </div>
            <hr style={{color:"var(--green)",border:"0.5px solid"}}></hr>
            <div className="container">  
                <section className="p-mt-5">
                <DataView header={renderHeader()} value={works} layout={"list"} itemTemplate={itemTemplate}
                paginator rows={9} sortOrder={sortOrder} sortField={sortField}></DataView>
                </section>
            </div>
            <Footer />
        </div>
        
        {/* <section className="p-col-12" style={{ padding: "0px", backgroundColor: "white",height:"100%"}}>
            <div>
                {
                    works?.map((n:any,i:any) => {
                        return <Frame title={n.work_name} description={(`${n.work_body}`.substring(0,300) + "...")} id={n.work_id} />
                    })
                }
            </div>
        </section> */}
        </>
    );

}
export default WorksPage;