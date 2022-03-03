import React from "react";
import linkedin_icon from "../assets/linkedin_icon.svg";
import youtube_icon from "../assets/youtube_icon.svg";
import facebook_icon from "../assets/facebook_icon.svg";
import telegram_icon from "../assets/telegram_icon.svg";
import { Link } from "react-router-dom";

function Footer (){
    return (
        <footer className="p-col-12 p-m-0 p-px-0">
            <div className="p-d-flex p-jc-between p-ai-center p-px-3 p-py-5" style={{backgroundColor:"#C4C4C4"}}>
                <div>
                    <ul className="footer-list" style={{listStyle:"none",color:"white",margin:"0px"}}>
                        <li><Link to={"/about"} style={{textDecoration:"inherit",color:"inherit"}}>about me</Link></li>    
                        <li><Link to={"/works"} style={{textDecoration:"inherit",color:"inherit"}}>works</Link></li>    
                        <li><Link to={"/services"} style={{textDecoration:"inherit",color:"inherit"}}>services</Link></li>    
                        <li><Link to={"/contact"} style={{textDecoration:"inherit",color:"inherit"}}>contact</Link></li>    
                    </ul>
                </div>
                <div>
                    <div className="p-d-flex p-flex-column">
                        <div className="p-d-flex p-jc-around">
                            <img src={linkedin_icon}/>
                            <img src={youtube_icon}/>
                            <img src={facebook_icon}/>
                            <img src={telegram_icon}/>
                        </div>
                        <p>Copyright all right reserved. 2021</p>
                    </div>
                    
                </div>
                
            </div>
        </footer>
        
    );
}
export default Footer;