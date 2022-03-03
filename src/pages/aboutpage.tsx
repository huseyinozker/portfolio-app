import React, { useContext, useEffect, useState } from "react";
import { Panel } from "primereact/panel";
import { Divider } from "primereact/divider";
import portraitImg2 from "../assets/Photo2.png"
import pageBackground from "../assets/pagebanner.jpg";
import SkillBar from "../components/skillbar";
import { ApiContext } from "../contexts/apicontext";
import Footer from "../components/footer";
import HeaderMenu from "../components/headermenu";
import { Link } from "react-router-dom";
function AboutPage() {

    const { fetchSkills, fetchAreas, fetchExperiences } = useContext(ApiContext);

    const [skills, setSkills] = useState<any>([]);
    const [areas, setAreas] = useState<any>([]);
    const [experiences,setExperiences] = useState<any>([]);

    useEffect(() => {
        fetchSkills().then((res: any) => {
            setSkills(res.data);
        })
        fetchAreas().then((res: any) => {
            setAreas(res.data);
        })
        fetchExperiences().then((res:any)=>{
            setExperiences(res.data);
            console.log(res.data);
        })
    }, [])

    /* <div className="p-my-2 p-d-flex p-ai-center">
                                <div className="p-d-inline-block" style={{ height: "8px", width: "8px", borderRadius: "50%", backgroundColor: "#2ECC71", flexShrink: 0 }}></div>
                                <div style={{fontSize:"18px"}}>{n.area_name}</div>
                            </div> */

    return (
        <>
            <div className="outContainer p-shadow-2">

            <div className="container">
                    <HeaderMenu />       
            </div>
                <hr style={{ color: "var(--green)", border: "0.5px solid" }}></hr>

                <div className="p-col-12 p-px-0 headerTitleDiv" style={{
                    backgroundColor: "var(--green)",
                    color: "white", fontWeight: "bold",
                    fontSize: "48px"
                }}>
                    <div className="container p-text-center p-text-md-left">
                        About Me
                    </div>

                </div>
                <div className="container">
                    <section id="aboutSection" className="p-col-12 p-mt-5" style={{ padding: "0px", backgroundColor: "white" }} >
                        <div>
                            <div className="p-col-12 p-grid p-px-0">

                                <div className="p-col-12 p-md-6 p-d-flex p-flex-column p-jc-center p-p">
                                    <h2 className="p-my-2 p-text-center p-text-md-left" style={{ fontSize: "48px", fontWeight: "bold", color: "var(--green)" }}>Who Am I?</h2>
                                    <div className="p-text-justify p-text-md-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nec feugiat in fermentum posuere urna nec tincidunt praesent. Elit eget gravida cum sociis natoque penatibus et. Proin fermentum leo vel orci porta non pulvinar neque.

                                    </div>
                                </div>
                                <div className="hide-mobile p-col-12 p-md-6 p-d-flex p-ai-center p-jc-center">
                                    <img src={portraitImg2} style={{ width: "50%" }} alt="portrait" />
                                </div>
                                <div className="p-col-12">
                                    <div>
                                        <span style={{ color: "var(--green)", fontSize: "32px", fontWeight: "bold" }}>Work Experience</span>
                                        <Divider />
                                        {
                                            experiences?.map((n:any,i:any)=>{
                                                return <div className="p-mt-0">
                                                    <span className="p-d-block p-ml-3">HAVELSAN A.Ş</span>
                                                    <span className="p-d-block p-ml-5 p-mt-1">2017-2019</span>
                                                </div>
                                            })
                                        }
                                        
                                    </div>
                                </div>
                                <div className="p-col-12">
                                    <div>
                                        <span style={{ color: "var(--green)", fontSize: "32px", fontWeight: "bold" }}>Education</span>
                                        <Divider />
                                        <div className="p-mt-0">
                                            <span className="p-d-block p-ml-3">Ankara University</span>
                                            <span className="p-d-block p-ml-5 p-mt-1">GABNO:3.58</span>
                                        </div>
                                        <Divider />
                                        <div className="p-mt-0">
                                            <span className="p-d-block p-ml-3">XXX Highschool</span>
                                            <span className="p-d-block p-ml-5 p-mt-1">2015-2017</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-col-12">
                                    <h2 className="p-mt-2 p-mb-0" style={{ fontSize: "32px", fontWeight: "bold", color: "var(--green)" }}>My Skills</h2>
                                    <div className="p-grid" style={{ margin: "0px" }}>
    
                                            {
                                                skills.map((n: any, i: any) => {
                                                    if (i < skills.length)

                                                        return <div className="p-col-12">
                                                            <SkillBar skill_name={n.skill_name} skill_value={n.skill_point} /></div>
                                                })
                                            }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>



        </>
    )
}
export default AboutPage;