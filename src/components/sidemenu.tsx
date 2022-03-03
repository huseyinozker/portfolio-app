import React from "react";
import {Menu} from 'primereact/menu';
import pp from "../assets/pp.png"
import {
    useHistory,
    withRouter
  } from "react-router-dom"
const SideMenu = () => {

    const history = useHistory();

    const items = [
        {
            label: 'Home',
            command:() =>{
                history.push("/");
            }
        },
        {
            label: 'About Me',
            command:() =>{
                history.push("/about");
            }
        },
        {
            label: 'Works',
            command:() => {
                history.push("/works");
            }
        },
        {
            label: 'Work Areas',
            command:() => {
                history.push("/work-areas");
            }
        },
        {
            label: 'Contact',
            command:() => {
                history.push("/contact");
            }
        }
            
        ]

    return(
        
        <div style={{backgroundColor:"var(--surface-100)",height:"100%"}}>
            <div className="photo-circle p-p-2 p-d-flex p-jc-center" style={{borderRadius:'50%'}}>
                <img className="p-p-5" src={pp} alt="asd" style={{width:"100%"}} />
            </div>
            <div className="infoDiv p-d-flex p-flex-column  p-px-5">
                <h2>Huseyin S. Ozker</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis nisl rhoncus mattis rhoncus urna neque.</p>
               
            </div>
            <div className="p-mt-5">
                <Menu model={items} style={{width:"100%"}} className="sideMenu" />
            </div>
            
            
        </div>
        
    );
}
export default withRouter(SideMenu);