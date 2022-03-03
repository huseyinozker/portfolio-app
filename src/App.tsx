import React, { useContext } from 'react';
import Homepage from './pages/homepage';
import AboutPage from './pages/aboutpage';
import WorksPage from './pages/workspage';
import AdminPage from './pages/adminpage';
import SideMenu from './components/sidemenu';
import ApiContextProvider, { ApiContext } from './contexts/apicontext';
import 'primeflex/primeflex.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom"
import { createBrowserHistory } from 'history';
import LoginPage from './pages/loginpage';
import SingleWorkPage from './pages/singleworkpage';
import SingleAreaPage from './pages/singleareapage';
import AreasPage from './pages/areaspage';
import './App.css';



function App() {

  const { isLogin } = useContext(ApiContext);
  

  

  return (
    
    <Router  >
      <Switch>
        <Route path="/login">
          <ApiContextProvider>
            <LoginPage />
          </ApiContextProvider>
        </Route>
        <Route path="/admin">
          
            <ApiContextProvider>
              {/* {isLogin() ?
                <AdminPage />
                : <Redirect to="/login" />} */}
                <AdminPage />
            </ApiContextProvider>
        </Route>

        <Route path="/">
          <div>
            <div className="App" style={{margin:"0 auto"}}>
              <div className="p-grid p-m-0">
                {/* <div className="p-col-3" style={{padding:"0px"}}>
                  <SideMenu />
                </div> */}
                <div className="p-col-12" style={{padding:"0px"}}>
                  <Switch>
                    <Route exact path="/">
                      <Homepage />
                    </Route>
                    <Route exact path="/about">
                      <AboutPage />
                    </Route>
                    <Route exact path="/works">
                      <WorksPage />
                    </Route>
                    <Route exact path="/services">
                      <AreasPage />
                    </Route>
                    <Route path="/works/:work_id" component={SingleWorkPage}/>
                    
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          
        </Route>

      </Switch>



    </Router>


  );

}

export default App;
