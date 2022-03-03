import { Menubar } from 'primereact/menubar';
import {
    Link,
    useHistory,
    withRouter
} from "react-router-dom"
const HeaderMenu = () =>{
    let history = useHistory();
    const menuItems = [
        {
            label:"Home",
            command: () => {
                history.push("/");
            }
        },
        {
            label:"About",
            command: () => {
                history.push("/about");
            }
        },
        {
            label:"Works",
            command: () => {
                history.push("/works");
            }
        },
        {
            label:"Services",
            command: () => {
                history.push("/services");
            }
        },
        {
            label:"Contact",
            command: () => {
                window.location.replace("/#contact");
            }
        }
    ]

    const logo = (
        <Link to={"/"} style={{textDecoration:"inherit",color:"inherit"}}>
        <span style={{fontWeight:"bold",fontSize:"48px",color:"var(--green)"}}>Hso</span>
        <span style={{fontWeight:"bold",fontSize:"48px"}}>dev+</span>
        </Link>
    );

    return(
        <>
        <nav>
            <Menubar className="headermenu p-jc-between" start={logo} model={menuItems}
            style={{backgrounColor:"white"}}/>
        </nav>
        </>
    );
}
export default HeaderMenu;