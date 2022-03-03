import { createContext } from "react";
import axios from "axios";
export const ApiContext = createContext<any>(null);

const ApiContextProvider = (props: any) => {

    const fetchCategories = async () => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`, { action: 'fetchCategories' });
    }
    const fetchTechs = async () => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`, { action: 'fetchTechs' });
    }
    const fetchWorks = async () => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{action : 'fetchWorks'});
    }
    const fetchAreas = async () => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{action : 'fetchAreas'});
    }
    const fetchSkills = async () => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{action:'fetchSkills'});
    }
    const fetchExperiences = async () => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{action:'fetchExperiences'});
    }
    const fetchHome =async () => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{action:'fetchHome'});
    }
    const getWork = (_workId:number) => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getWork',
            workId:_workId
        }})
    }
    const getArea = (_areaId:number) => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getArea',
            areaId:_areaId
        }})
    }
    const getImage= async (_imageId:number) => {
        return await axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getImage',
            imageId:_imageId
        }})
    }
    const getCategory = (_workId:number) => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getCategory',
            workId:_workId
        }})
    }
    const getTech = (_workId:number) => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getTech',
            workId:_workId
        }})
    }
    const getAreaTech = (_areaId:number) => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getAreaTech',
            areaId:_areaId
        }})
    }
    const getWorkImage = (_workId:Number) => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getWorkImage',
            workId:_workId
        }})
    }
    const getAreaImage = (_areaId:Number) => {
        return axios.get(`${process.env.REACT_APP_SERVER_URL}/index.php`,{params:{
            action:'getAreaImage',
            areaId:_areaId
        }})
    }

    const addTech = (_newTech: any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`, { newTech: _newTech, action: 'addTech' }
        )
    }

    const addWork = (_workName: any, _workBody: any, _workFinish: any, _workCategories: any,
         _workTech:any,_workImages:any,_coverImage:any ) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`, {
            workName: _workName, workBody: _workBody, workFinish: _workFinish, workCategories: _workCategories,
            workTech:_workTech,workImages:_workImages,coverImage:_coverImage, action: 'addWork'
        });
    }
    const updateWork =async (_workId:any,_workName: any, _workBody: any, _workFinish: any, _workCategories: any,
        _workTech:any,_workImages:any,_coverImage:any) =>{
            return await axios.post(`${process.env.REACT_APP_SERVER_URL}/update.php`,{
                workId:_workId,workName: _workName, workBody: _workBody, workFinish: _workFinish, workCategories: _workCategories,
                workTech:_workTech,workImages:_workImages,coverImage:_coverImage, action: 'updateWork'
            });
    }
    const updateSkill = async (skillId:any,newSkill:any,skillPoint:any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/update.php`, { skillId: skillId, newSkill: newSkill, skillPoint:skillPoint,action: 'updateSkill' })
    }
    const updateHome = async (homeTitle:any,homeTitle2:any,homeDescription:any,aboutDescription:any,aboutMail:any,aboutTel:any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/update.php`, { homeTitle: homeTitle, homeTitle2: homeTitle2, homeDescription: homeDescription, aboutDescription: aboutDescription,
                                        aboutMail: aboutMail, aboutTel: aboutTel , action:'updateHome'
                    })
    }
    const addArea = async (_areaName:any,_areaBody:any,_areaTech:any,_areaImages:any,_coverImage:any) => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{
            areaName: _areaName, areaBody:_areaBody, areaTech:_areaTech, areaImages:_areaImages, coverImage:_coverImage,
            action:'addArea'
        });
    }
    const addWorkCategory = (_workId:any,_categoryId:any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{
            newWorkId:_workId,
            newCategoryId:_categoryId,
            action : 'addWorkCategory'
        })
    }
    const addSkill = (newSkill:any,skillPoint:any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`, { newSkill: newSkill, skillPoint:skillPoint,action: 'addSkill' })}

    const addExperience = (newExp:any, expDescription:any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`, { newExp: newExp, expDescription:expDescription,action: 'addExperience' })}

    const sendMessage = async (name:any,mail:any,msg:any) => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,{name:name,mail:mail,msg:msg,action:'sendMessage'});
    }

    const removeSkill = (skillId:any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/delete.php`,{
            skillId:skillId , action: 'removeSkill'
        })
    }
    const removeWork = (workId:any) => {
        return axios.post(`${process.env.REACT_APP_SERVER_URL}/delete.php`,{
            workId:workId , action: 'removeWork'
        })
    }

    const login = async (userData:any) => {

        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/login.php`, userData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer <token_here>'
            }
        })/* .then(
            (response: any) => {

                if (response.status === 200 && response.data.jwt && response.data.expireAt) {
                    let jwt = response.data.jwt;
                    let expire_at = response.data.expireAt;

                    localStorage.setItem("access_token", jwt);
                    localStorage.setItem("expire_at", expire_at);
                    
                }else if(response.status === 401) {

                }

                res = response;
            }
        ).catch((e: any) => {
            res = e;
        })
        return res; */
    }

    const logout =  () => {
        
        localStorage.removeItem("access_token");
        localStorage.removeItem("expire_at");
    }

    const checkExpiry = () => {
        if(localStorage['expire_at']){
            var _expireTime = localStorage['expire_at'];
            var expireTime: number = +_expireTime;
            var dateNow = new Date();

            if (expireTime < dateNow.getTime() / 1000) {
                console.log("login degil");
                logout();
                return "expired"
            } else if (expireTime > dateNow.getTime() / 1000) {
                return "notexpired";
            }
        }
        
    }

    const isLogin = () => {
        if(localStorage['access_token']){
           
            if(checkExpiry() === "notexpired"){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
        
    }

    const uploadImage = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/index.php`,)
    }

    const fetchImages = async() => {
        return await axios.post(`${process.env.REACT_APP_SERVER_URL}/retrieve.php`);
    }
 
    return (
        <ApiContext.Provider 
        value={{ fetchCategories, fetchTechs, fetchWorks, fetchImages, fetchSkills,fetchExperiences, fetchHome,
        addTech, addWork, addSkill, addArea, addExperience,
        getWork, getCategory, getTech, getWorkImage, getImage,
        getAreaImage, getArea, getAreaTech, fetchAreas,
        addWorkCategory,
        removeSkill, removeWork,
        updateWork,updateSkill,updateHome,
        sendMessage,
        login,logout,checkExpiry,isLogin}}>
            {props.children}
        </ApiContext.Provider>
    );
}
export default ApiContextProvider;