import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useContext, useState } from "react";
import { ApiContext } from "../contexts/apicontext";
const ContactForm = () => {

    const {sendMessage} = useContext(ApiContext);

    const [nameInp,setNameInp] = useState<string>();
    const [mailInp,setMailInp] = useState<any>();
    const [msgInp,setMsgInp] = useState<any>();

    function validateEmail (email:any) {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
      }

    const handleMessage = () =>{
        console.log(validateEmail(mailInp));
        if(nameInp !== "" && validateEmail(mailInp) && msgInp !== ""){
            sendMessage(nameInp,mailInp,msgInp).then((result:any) => {
                
            }).catch((err:any) => {
                console.log(err.response);
            });;
        }
    }

    return (
        <div className="p-fluid p-formgrid p-grid">
        <div className="p-field p-col-12 p-md-6 p-pl-0 ">
            <label htmlFor="firstname6">Firstname</label>
            <InputText value={nameInp} onChange={(e) => setNameInp(e.target.value)} id="firstname6" type="text" required/>
        </div>
        <div className="p-field p-col-12 p-md-6 p-pl-0 ">
            <label htmlFor="lastname6">E-Mail</label>
            <InputText value={mailInp} onChange={(e)=> setMailInp(e.target.value)} id="lastname6" type="mail" required />
        </div>
        <div className="p-field p-col-12 p-pl-0">
            <label htmlFor="address">Message</label>
            <InputTextarea value={msgInp} onChange={(e)=>setMsgInp(e.target.value)} id="address"  rows={4} autoResize />
        </div>
        <div className="p-field">
            <Button label="Send Message" className="p-button-success" onClick={handleMessage} />
        </div>
       
    
    </div>
    );
}
export default ContactForm;