import ProfilePic from "./../assets/profilPic.png"
import ProjectImg from "./../assets/exampleImg.png"
import { FaLinkedin , FaSquareXTwitter, FaGithub,FaWallet} from 'react-icons/fa6';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from "react-router-dom";
import { useUsers } from "../context/userContext";
import { useProjects } from "../context/projectsContext";
import { useState, useEffect } from "react";

export default function Project(){
    const[project, setProject] = useState(null);
    const[user, setUser] = useState(null);
    const { id } = useParams();
    const {users} = useUsers();
    const {projects} = useProjects();

    useEffect(() => {
        try {
            const foundProject = projects.find(p => p.id === id);
            setProject(foundProject || {});  // Fallback to an empty object
            if (foundProject) {
                const foundUser = users[foundProject.userId];
                setUser(foundUser || {});  // Fallback to an empty object
            }
        } catch (err) {
            console.error("Error fetching projects:", err);
        }
    }, [projects, users, id]);


    function FullCarousel(){

        return(
            <Carousel infiniteLoop={true} emulateTouch={true} showStatus={false} autoPlay={true} className="text-center -mt-5 p-10" >
                {project?.preview?.map((previewItem) => (
                    <div key={previewItem.img}>
                        <img src={previewItem.img} alt="Preview picture" className="" />
                    </div>
                ))}
            </Carousel>
        )
    }
    return (
        <div className="relative">
            <div className="">
                <img src={project?.image} className="absolute left-0 right-0 w-64 h-64 rounded-full border-2 border border-black m-auto -top-32"></img>
            </div>
            <div className="flex flex-col gap-7 justify-between py-7 px-24 mt-[160px]  surveys flex flex-wrap  bg-slate-100 border border-solid mt-11 border-white max-w-[1270px] rounded-[45px] ml-auto mr-auto">
                <h2 className="ml-auto mr-auto mt-28">{project?.name}</h2>
                <Link to={`/profile/${project?.userId}`} className="text-center -mt-8 text-lg ">
                by {user?.name}
                </Link>
                <div className="links flex justify-between w-40 text-2xl ml-auto mr-auto">
                    <a href={project?.links?.x}>
                        <FaSquareXTwitter/>
                    </a>
                    <a href={project?.links?.github}>
                        <FaGithub/>
                        </a>
                    <a href={project?.links?.linkedin}>
                        <FaLinkedin/>
                    </a>
                    <a href={project?.links?.walletAddress}>
                    <FaWallet/>
                    </a>
                </div>
                <div className="flex justify-center">
                    <span className="-mt-4 -mb-4 text-right w-[850px] text-green-950 text-xl"><span className="font-semibold text-2xl">{project?.funds?.collected}$</span> / {project?.funds?.required}$</span>
                </div>
                <div className="progress h-0.5 w-3/4 bg-gray-400  ml-auto mr-auto">
                    
                    <div className="inside h-1 bg-black -mt-[1px] rounded-[40px]" style={{width: `${//@ts-ignore
                    (project?.funds?.collected/project?.funds?.required)}%`}}></div>
                </div>
                <div className="mx-auto w-96 flex justify-between gap-5">
                    <div className="h-12 flex border border-black rounded-3xl ">
                        <input className="bg-white h-full w-full  rounded-s-3xl  px-8" placeholder="10"></input>
                        <div className="   bg-gray-50 h-full w-[75px] rounded-e-3xl flex items-center px-4">BUSD</div>
                    </div>
                    <button className="px-8 h-12 bg-white rounded-3xl shadow border border-black justify-center">Invest</button>
                </div>
                <p className="flex justify-center text-xs -mt-4">By continuing, you agree to our<a>Terms of Service</a> and acknowledge our <a>Privacy Policy</a></p>
                <p className=" text-justify">
                {project?.description}</p>
                <div className="">
                <h3 className="overflow-hiddenmb-3">Gallery</h3>
                     <div className="">
                    <FullCarousel/>
                    </div>
                </div>
                <div className="">
                    <h3 className="overflow-hidden mb-3">Updates</h3>
                    <div className="gap-7 columns-3 block updateblock ">
                    {project?.updates?.map((update, index) => (
                        <div className="slide w-[340px] bg-white rounded-[30px] overflow-hidden h-min mb-7" key={index}>
                            <img src={ProjectImg} alt="Update Image"></img>
                            <div className="p-4">
                                <p>{update?.category}</p>
                                <p>Update: {new Date().toDateString()}</p> 
                                <h3>{update?.name}</h3> 
                                <p>Focus: {update?.focus}</p>
                                <p>Status: {update?.status}</p>
                                <p>{update?.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}