import React, { useContext, useEffect, useState } from "react";
import headerImg from "../assets/header.png"
import portraitImg from "../assets/Photo.png";
import portraitImg2 from "../assets/Photo2.png";
import heroBackground from "../assets/Hero.jpg";
import Frame from "../components/frame";
import Footer from "../components/footer";
import { ApiContext } from "../contexts/apicontext";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import InfoCard from "../components/infocard";
import HeaderMenu from "../components/headermenu";
import ContactForm from "../components/contactform";

function Homepage() {



    const [works,setWorks] = useState<any>([]);
    const [areas,setAreas] = useState<any>([]);
    const [homeInfos,setHomeInfos] = useState<any>([]);
    const [title1,setTitle1] = useState<any>("");
    const [title2,setTitle2] = useState<any>("");
    const [homeDes,setHomeDes] = useState<any>("");
    const [aboutDes,setAboutDes] = useState<any>("");
    const [aboutMail,setMail] = useState<any>("");
    const [aboutTel,setTel] = useState<any>("");
    const {fetchAreas,fetchWorks,fetchHome} = useContext(ApiContext);

    useEffect(()=>{
        fetchWorks().then((res:any)=>{
            console.log(res.data);
            console.log(res);
            console.log(works,"x");
            setWorks(res.data);
        })
        fetchAreas().then((res:any)=>{
            setAreas(res.data);
        })
        fetchHome().then((res:any)=>{
            setHomeInfos(homeInfos);
            console.log(res.data);
            setTitle1(res.data[0].setting_value);
            setTitle2(res.data[1].setting_value);
            setHomeDes(res.data[2].setting_value);
            setAboutDes(res.data[3].setting_value);
            setMail(res.data[5].setting_value);
            setTel(res.data[4].setting_value);
        })
    },[])

    return (
        <>
        <div className="container">
            
            <HeaderMenu />

        </div>
        

        <div className="p-grid" style={{backgroundColor:"var(--surface-0)",margin:"0 auto"}}>
            <section id="heroSection" className="p-col-12 p-px-0" style={{backgroundColor:"var(--lightgreen)"}}>
                <div className="p-col-12  p-grid p-justify-center container" style={{backgroundColor:"var(--lightgreen)",
                    padding:"0px 30px"}}>
                    <div className="p-col-12 p-md-6 p-d-flex p-flex-column p-jc-md-center p-ai-center p-ai-md-start">
                        <div className="p-text-center p-text-md-left">
                            <span className="bolderText" >{title1}<br></br></span>
                            <span className="bolderText" style={{color:"var(--green)"}}>{title2}</span>
                        </div>
                        <div className="p-text-center p-text-md-left">
                            <span style={{fontSize:"18px",fontWeight:"normal",fontFamily:"Roboto,sans-serif"}}>{homeDes}</span>
                        </div>
                        <div className="p-mt-3 p-d-flex p-flex-column p-flex-md-row p-ai-center p-jc-center">
                            <div className="p-my-2 p-my-md-0">
                                <Link to="/about"><button type="button" className="customBtn p-mr-md-5 p-shadow-2">About Me</button></Link>
                            </div>
                            <div className="p-my-2 p-my-md-0">
                                <Link to="/works"><button type="button" className="customBtn p-shadow-2">Projects</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="hide-mobile p-col-6 p-d-flex p-jc-center p-ai-center">
                        <img src={portraitImg} style={{width:"50%"}} alt="portrait" />
                    </div>
                </div>
            </section>
            <section id="aboutSection" className="p-col-12 p-px-0 p-py-5">
                <div className="p-col-12 p-grid p-justify-center container">
                    <h2 style={{fontSize:"48px",fontWeight:"bold",margin:"0 auto"}} className="p-mb-5">
                        <span>About </span>
                        <span style={{color:"var(--green)"}}>Me</span>
                    </h2>
                    <div className="p-col-12 p-grid">
                        <div className="p-col-12 p-md-6 p-d-flex p-ai-center p-jc-center">
                            <img src={portraitImg2} style={{width:"50%"}} alt="portrait" />
                        </div>
                        <div className="p-col-12 p-md-6 p-d-flex p-flex-column p-jc-center p-ai-center">
                            <div style={{fontSize:"36px",fontWeight:"bold"}}>I am Huseyin</div>
                            <div className="p-text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. Elit eget gravida cum sociis natoque penatibus et. Proin fermentum leo vel orci porta non pulvinar neque.</div>
                            <div><i className="pi pi-phone p-mr-3 p-mt-2"></i>{aboutTel}</div>
                            <div><i className="pi pi-envelope p-mr-3 p-mt-1"></i>{aboutMail}</div>
                            <div className="p-mt-3 p-d-flex p-flex-column p-flex-md-row p-ai-center p-jc-center">
                                <div className="p-my-2 p-my-md-0">
                                    <Link to="/#">
                                    <button type="button" className="customBtn p-mr-md-5 p-shadow-2">Download CV</button>
                                    </Link>
                                </div>
                                <div className="p-my-2 p-my-md-0">
                                    <Link to="/#">
                                        <button type="button" className="customBtn p-mr-md-5 p-shadow-2">Hire Me</button>
                                    </Link>
                                </div>
                               
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </section>
           <section id="worksSection" style={{backgroundColor:"var(--lightgreen)"}} className="p-py-5 p-px-0 p-col-12">
               <div className="p-col-12 p-grid p-justify-center container">
                    <h2 style={{fontSize:"48px",fontWeight:"bold",margin:"0 auto"}}>
                        <span>Last </span>
                        <span style={{color:"var(--green)"}}>Works</span>
                    </h2>
                    <div className="p-col-12">
                    {
                        works.length>0 ? works.map((n:any,i:any)=>{
                            if(i>works.length-3){
                                return <Frame id={n.work_id} title={n.work_name} description={(`${n.work_body}`.substring(0,250) + "...")}/>

                            }
                                
                        }) : <div className="">There are no works to list</div> 
                    }
                    </div>
                    
               </div>
               
           </section>
           <section className="p-col-12 p-mb-5 p-px-0 p-py-5" id="servicesSection">
               <div className="p-col-12 p-grid p-mx-0 p-justify-center container">
                    <h2 style={{fontSize:"48px",fontWeight:"bold",margin:"0 auto"}}>
                        <span>My</span>
                        <span style={{color:"var(--green)"}}> Services</span>
                    </h2>
                    <div className="p-col-12 p-mt-5 p-grid p-mx-0 p-jc-center">
                    {
                    areas.length>0 ? areas.map((n:any,i:any)=>{
                        if(i>=areas.length-3){
                            return (
                                <div className="p-col-9 p-md-4 p-sm-8 p-md-offset-0 p-lg-4 p-d-flex p-jc-center p-px-lg-5 p-px-md-4 p-px-sm-5 p-my-3">
                                    <InfoCard id={n.area_id} title={n.area_name} imgUrl={n.cover_img} description={(`${n.area_body}`.substring(0,100) + "...")}/>
                                </div>
                            )
                        }
                    }) : <div>There are no services to list</div>
                    }
                    </div>
               </div>
           
                
                
           </section>
            <section id="contact" style={{backgroundColor:"var(--lightgreen)"}} className="p-col-12 p-px-0 p-mb-5 p-py-5">
                <div className="p-col-12 p-grid p-justify-center container">
                    <h2 style={{fontSize:"48px",fontWeight:"bold",margin:"0 auto"}}>
                            <span>Contact</span>
                            <span style={{color:"var(--green)"}}> Me</span>
                    </h2>
                    <div className="p-col-12 p-mt-5 p-d-flex p-jc-center">
                        <ContactForm/>
                    </div>
                    
                </div>
                
            </section>
            {/*  */}
            <Footer />
        </div>
        </>
    );

}
export default Homepage;