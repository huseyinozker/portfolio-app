import React,{useContext, useEffect} from "react";
import AdminMenu from "../components/adminmenu";
import CategoryPage from "./categorypage";
import AddWorkPage from "./addworkpage";
import { ApiContext } from "../contexts/apicontext";

import TechPage from "./techpage";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom"
import { withRouter, useHistory, useLocation} from "react-router-dom";
import SkillPage from "./skillpage";
import AddAreaPage from "./addareapage";
import ExperiencesPage from "./experiencespage";
import WorkList from "./admin/worklist";
import DashBoard from "./admin/dashboard";

const AdminPage = () => {

    const{isLogin} = useContext(ApiContext);

    let history = useHistory();
    let location = useLocation();
    
    useEffect(()=>{
        if(!isLogin() && location.pathname!=='/login'){
            history.push("/login");
        }
    },[])

    

    return(
        
        
        <div className="p-grid" style={{width:"100vw",height:"100%",minHeight:"100vh"}}>
            <div className="p-col-2 p-p-0 p-shadow-5" >
                <AdminMenu />
            </div>
            
            <div className="p-col-10 p-px-0" style={{backgroundColor:"#f5f5f5"}}>
                <div className="p-p-2" style={{backgroundColor:"var(--surface-200)"}}>
                    <span style={{fontWeight:"bold",fontSize:"36px"}}>Title</span>
                </div>
                    <Switch>
                    <Route exact path="/admin">
                            <DashBoard />
                        </Route>
                        <Route exact path="/admin/categories">
                            <CategoryPage />
                        </Route>
                        <Route exact path="/admin/add-work">
                            <AddWorkPage />
                        </Route>
                        <Route exact path="/admin/work-list">
                            <WorkList />
                        </Route>
                        <Route path="/admin/add-work/:work_id" component={AddWorkPage} />
                        <Route exact path="/admin/techs">
                            <TechPage />
                        </Route>
                        <Route exact path="/admin/skills">
                            <SkillPage />
                        </Route>
                        <Route exact path="/admin/experiences">
                            <ExperiencesPage />
                        </Route>
                        <Route exact path = "/admin/add-workarea">
                            <AddAreaPage />
                        </Route>
                    </Switch>
                
            </div>
           
        </div>
        
    );
}
export default withRouter(AdminPage);