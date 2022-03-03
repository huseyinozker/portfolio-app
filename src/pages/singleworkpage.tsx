import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../contexts/apicontext";
import { useParams } from "react-router";
import HeaderMenu from "../components/headermenu";
import { Link } from "react-router-dom";
import Footer from "../components/footer";
const SingleWorkPage = () => {

    const serverURL = "portfolio-admin/";


    const { work_id } = useParams<any>();
    const [work, setWork] = useState<any>({});
    const [categories, setCategories] = useState<any>([]);
    const [techs, setTechs] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [mainImage, setMainImage] = useState<any>({});
    const { getWork, getCategory, getTech, getWorkImage } = useContext(ApiContext);

    useEffect(() => {
        getWork(work_id).then((result: any) => {
            setWork(result.data);
        })
        getCategory(work_id).then((result: any) => {
            setCategories(result.data);
        })
        getTech(work_id).then((result: any) => {
            setTechs(result.data);
        })
        getWorkImage(work_id).then((result: any) => {
            setImages(result.data);
            console.log(result.data);
            setMainImage(images[0]);
        })

    }, [])

    const changeImage = (index: any) => {
        setMainImage(images[index]);
    }


    return (
        <>
            <div className="outContainer p-shadow-2" >
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
                    {work.work_name}
                    </div>

                </div>

                <div className="container">
                <section className="" > 
                    <div className="p-col-12 p-grid p-m-0 p-px-0" >
                        {/* <div className="p-col-12 headerTitleDiv" style={{
                            backgroundColor: "var(--green)", color: "white", fontWeight: "bold",
                            fontSize: "48px"
                        }}>{work.work_name}
                        </div> */}
                        <div className="p-col-12 p-grid p-m-0 p-px-0">
                            <div className="p-col-12 p-md-8"/*  style={{ height: "500px" }} */>
                                {mainImage !== undefined ?
                                    <img src={`../${process.env.REACT_APP_SERVER_URL}${mainImage.img_path}`} alt={mainImage.img_name}  width="100%" height="100%" style={{objectFit:"cover"}}  />
                                    : <img src={`../${process.env.REACT_APP_SERVER_URL}${images[0].img_path}`} alt={images[0].img_name} width="100%" height="100%" style={{objectFit:"cover"}} />
                                }
                            </div>
                            <div className="p-col-12 p-md-4 p-grid p-m-0 p-p-0">
                                    {
                                        images?.map((n: any, i: any) => {
                                            return <img src={`../${process.env.REACT_APP_SERVER_URL}${images[i].img_path}`} alt={images[i].img_name}
                                                width="100%" className="p-col-6 grid-nogutter" onClick={(e: any) => changeImage(i)} />
                                        })
                                    }
                                </div>
                            <div className="p-col-12 p-md-12 p-d-flex p-flex-column p-jc-between">
                                
                                <table className="infoTable " style={{ fontSize: "24px" }}>
                                    <tr className="p-my-md-5">
                                        <td><span style={{ fontWeight: "bold" }}>Project Name</span></td>
                                        <td>{work.work_name}</td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ fontWeight: "bold" }}>Used Techs</span></td>
                                        <td>
                                            {
                                                techs?.map((n: any, i: any) => {
                                                    return n.tech_name
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ fontWeight: "bold" }}>Category</span></td>
                                        <td>
                                            {
                                                categories?.map((n: any, i: any) => {
                                                    return n.category_name
                                                })
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ fontWeight: "bold" }}>Period</span></td>
                                        <td>{work.work_finish}</td>
                                    </tr>
                                    {/* <tr>
                                        <td><span style={{ fontWeight: "bold" }}>Project Link</span></td>
                                        <td>
                                            <Link to="/#">
                                                <button type="button" className="customBtn p-mr-5 p-shadow-2">View Project</button>
                                            </Link>
                                        </td>
                                    </tr> */}
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="p-grid" >
                        <div className="p-col-12 p-grid">
                            <div className="p-col-12">
                                <h2 style={{ fontSize: "48px", fontWeight: "bold", margin: "0 auto", padding: "0 0" }}>
                                    <span style={{ color: "var(--green)" }}>{work.work_name}</span>
                                </h2>
                                <p className="p-text-justify">{work.work_body}</p>
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
export default SingleWorkPage;