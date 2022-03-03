import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../contexts/apicontext";
import { Divider } from "primereact/divider";
import HeaderMenu from "../components/headermenu";
import Footer from "../components/footer";
import Frame from "../components/frame";
const AreasPage = () => {

    const { fetchAreas, getArea, getAreaImage } = useContext(ApiContext);

    const [areas, setAreas] = useState<any>([]);
    const [areaImages, setAreaImages] = useState<any>([]);


    useEffect(() => {
        fetchAreas().then((result: any) => {
            let fetchedAreas = result.data;
            setAreas(fetchedAreas);
            fetchedAreas.map((n: any) => {
                getAreaImage(n.area_id).then((res: any) => {
                    setAreaImages((oldArr: any) => [...oldArr, res.data]);
                })
            })
            console.log(areaImages);
        }).catch((err: any) => {
        });
    }, [])

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
                        Services
                    </div>

                </div>
                <div className="container">
                    
                    
                    <section>
                        <div className="p-grid p-m-0 p-jc-center p-px-md-5">
                            {
                                areas?.map((n: any, i: any) => {
                                    return (
                                        <div className="p-col-12 p-my-5 p-my-2 p-grid p-mx-0 p-ai-center p-shadow-2" style={{ backgroundColor: "var(--surface-50)" }}>
                                            <div className="p-col-12 p-md-3">
                                                <div className="p-d-flex p-jc-center">
                                                    <img src={`${process.env.REACT_APP_SERVER_URL}${n?.cover_img}`} alt="" style={{ maxWidth: "80%" }} />
                                                </div>

                                            </div>
                                            <div className="p-col-12 p-md-9 p-grid p-mx-0 ">
                                                <div className="p-col-12">
                                                    <div className="p-text-center p-text-md-left" style={{fontSize:"24px",fontWeight:"bold",color:"var(--green)"}}>{n.area_name}</div>
                                                    <div className="p-text-center p-text-md-left">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                                    </div>
                                                </div>
                                                <Divider />
                                                <div className="p-col-12 p-grid p-ai-center p-mx-0 ">
                                                    {
                                                        areaImages[i]?.map((n: any) => {
                                                            return (
                                                            <div className="p-col-12 p-md-4">
                                                                <img src={`${process.env.REACT_APP_SERVER_URL}${n.img_path}`} alt={n.img_name} className="p-mx-0" style={{maxWidth:"100%"}} />
                                                            </div>)
                                                        })
                                                    }
                                                </div>
                                            </div>


                                        </div>
                                    );
                                })
                            }



                        </div>
                    </section>
                </div>
                <Footer />
            </div>

        </>
    );
}
export default AreasPage;