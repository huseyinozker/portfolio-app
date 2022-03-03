import React, { useRef, useState } from "react";
import DashboardImg from "../assets/dashBoard.png";
import { TieredMenu } from 'primereact/tieredmenu';
import { PanelMenu } from "primereact/panelmenu";
import {
    useHistory,
    withRouter
} from "react-router-dom"
const AdminMenu = () => {

    const menu  = useRef<any>(null);

    const history = useHistory();

    const [a,setA] = useState<any>(true);

    const items = [
        {
            label: "Dashboard",
            icon:"pi pi-home",
            className:"adminmenu-item",
            command: (event:any) => {
                history.push("/admin/");
               
            }
        },
        {
            label: "Personal",
            className:"adminmenu-item",
            icon:"pi pi-user",
            items:[
                {
                    label: 'Skill List',
                    expanded:true,
                    command: (event:any) => {
                        history.push("/admin/skills");
                       
                    }
        
                },
                {
                    label: 'Experiences',
                    expanded:true,
                    command: (event:any) => {
                        history.push("/admin/experiences");
                       
                    }
        
                }
            ]
        },
        {
            label: 'Works',
            expanded:true,
            icon:"pi pi-briefcase",
            className:"adminmenu-item",
            items: [
                {
                    label: 'Work List',
                    icon: 'pi pi-fw pi-list',
                    command: () => {
                        history.push("/admin/work-list");
                    }
                },
                {
                    label: 'Add New Work',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        history.push("/admin/add-work");
                    }
                }

            ]
        },
        {
            label: 'Categories',
            className:"adminmenu-item",
            icon:"pi pi-list",
            command: () => {
                history.push("/admin/categories");
            }
        },
        {
            label: 'Techs',
            className:"adminmenu-item",
            icon:"pi pi-list",
            command: () => {
                history.push("/admin/techs");
            }
        },
        {
            label: 'Work Areas',
            className:"adminmenu-item",
            icon:"pi pi-th-large",
            items: [
                {
                    label: 'Work Areas List',
                    icon: 'pi pi-fw pi-list',
                    command: () => {
                        history.push("/admin/workareas");
                    }
                },
                {
                    label: 'Add New Work Area',
                    icon: 'pi pi-fw pi-plus',
                    command: () => {
                        history.push("/admin/add-workarea");
                    }
                }

            ]

        },
        {
            label: 'Contact Messages',
            className:"adminmenu-item",
            icon:"pi pi-envelope"

        }
    ]

    document.addEventListener("sideMenu",(event:any) => {
        event.preventDefault();
    })

    return (

        <div className="p-shadow-2" style={{ backgroundColor: "var(--surface-200)", height: "100%" }}>

            <div style={{ width: "100%",height:"100%" }}>
                <div className="p-py-5 p-d-flex p-ai-center p-jc-center">
                    <img src={DashboardImg} alt="dashb" style={{maxWidth:"30%"}} />
                </div>
                <TieredMenu ref={menu} id="sideMenu" model={items} style={{ width: "100%" }} className="sideMenu" />
            </div>


        </div>

    );
}
export default withRouter(AdminMenu);