import React, { useContext, useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ApiContext } from "../contexts/apicontext";
import { withRouter, useHistory, useLocation} from "react-router-dom";


const LoginPage = () => {

    const toast = useRef<any>(null);

    let history = useHistory();
    let location = useLocation();

    const [userMail, setUserEmail] = useState<any>(null);
    const [userPassword, setUserPassword] = useState<any>(null);
    const { login, isLogin, logout} = useContext(ApiContext);

    const showToast = (toastType: string, summeryType: string, content: string) => {
        toast.current.show({ severity: toastType, summary: summeryType, detail: content, life: 3000 });
    }

    useEffect(()=>{
        if(isLogin() && location.pathname!=='/admin'){
            history.push("/admin");
        }
    },[]) 

    const handleLogin = (e:any) => {
        e.preventDefault();
        const userData = {
            email: userMail,
            password: userPassword
        }
        login(userData).then(
            (response: any) => {

                if (response.status === 200 && response.data.jwt && response.data.expireAt) {
                    let jwt = response.data.jwt;
                    let expire_at = response.data.expireAt;

                    localStorage.setItem("access_token", jwt);
                    localStorage.setItem("expire_at", expire_at);

                    showToast('success','Login Message','Success Login');


                    console.log("Giriş Başarılı");

                    if(isLogin() && location.pathname!=='/admin'){
                        console.log("aa");
                        history.push("/admin");
                    }

                } else {
                    showToast('error', 'Login Message', 'Error Login');
                    console.log("giriş yok");
                    console.log(response);
                }


            }
        ).catch((e: any) => {
            console.log(e);
        })
    }

    return (
        <>

            <Toast ref={toast} />
            <div className="p-d-flex p-jc-center p-p-5" style={{height:"100vh",backgroundColor:"var(--lightgreen)"}}>
                <form onSubmit={handleLogin}>
                    <div className="p-formgroup">
                        <div className="p-field p-grid">
                            <label htmlFor="userMail" className="p-col-12" style={{ width: '100px' }}>Email</label>
                            <div className="p-col-12">
                                <InputText id="userMail" type="email" onChange={(e) => { setUserEmail(e.target.value) }} />
                            </div>
                        </div>
                        <div className="p-field p-grid">
                            <label htmlFor="userPassword" className="p-col-12" style={{ width: '100px' }}>Password</label>
                            <div className="p-col-12">
                                <Password id="userPassword" onChange={(e) => { setUserPassword(e.target.value) }} feedback={false} />
                            </div>
                        </div>

                        <Button className="customBtn" type="submit" label="Login" />
{/*                         <Button type="button" label="Logout" onClick={logout} />
 */}                    </div>
                </form>




            </div>
        </>
    );
}
export default withRouter(LoginPage);