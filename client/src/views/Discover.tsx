import { useEffect, useState } from "react";
import projects from "./../utils/mockData/projects";

import { Link } from 'react-router-dom';
import { fetchProjects } from "../api/project/FetchProjects";
import DefaultUserImg from "../assets/defaultUserImg.webp"
import { useProjects } from "../context/projectsContext";
import { useUsers } from "../context/userContext";
import { useModal } from "../context/ModalContext";
type Project = {
    id:string;
    userId: string;
    image: string;
    name: string;
    funds: {
        collected: number;
        required: number;
    };
    description: string;
};

type User = {
    image: string;
    name: string;
};

type ProjectsResponse = Project[];


export default function DiscoverView() {
    //const [loading, setLoading] = useState<boolean>(true);
    //const [error, setError] = useState<Error | null>(null);

    const { projects } = useProjects();
    const { users } = useUsers();
    const {openModal} =useModal();
    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div>Error fetching projects. Please try again later.</div>;
    // }


    return (
        <div className="text-center ">
            <h1>Discover</h1>
            <button onClick={()=> openModal('createProject')}>Create Project</button>
            <div className="content-start gap-7 justify-between p-7 surveys flex flex-wrap bg-white border border-solid border-[#50695319] mt-11 border-white max-w-[1270px] rounded-[45px] ml-auto mr-auto">

                {projects && projects.map((project) => {
                    const fundingPercentage = (project.funds.collected / project.funds.required) * 100;
                    const userImage = users[project.userId]?.image ? users[project.userId]?.image : DefaultUserImg;
                    return (
                        <Link to={`/project/${project.id}`} key={project.userId}>
                        <div className="elemShadow card w-96 bg-white min-h-full rounded-[35px] overflow-hidden " key={project.userId}>
                            <div className="top relative">
                                <img src={project.image} alt={project.name} className="w-full h-[140px] object-cover"/>
                                <div className="flex px-3 -mt-[70px] items-end justify-between">
                                    <button className=" px-8 h-12 bg-white rounded-3xl shadow border border-black justify-center">Invest</button>
                                    
                                    <img src={userImage} alt={//@ts-ignore
                                    users?.name} className="w-[50px] h-[50px] rounded-full border border-black object-cover mt-1"  />
                                </div>
                            </div>
                            <div className="btm p-5 text-left">
                                <div className="title flex justify-between">
                                    <span className="text-green-950 font-semibold">{project.name}</span>
                                    <span><span className="font-semibold text-lg">{project.funds.collected}$</span> / {project.funds.required}$</span>
                                </div>
                                <div className="loadingbarOS h-0.5 bg-neutral-400 rounded-full my-1 relative">
                                    <div className="loadingbarIS h-1 bg-black rounded-full -mt-[1px] absolute" style={{width: `${fundingPercentage}%`}}></div>
                                </div>
                                <p className="text-base text-justify leading-5">
                                {project?.description.length > 100 
                                ? project?.description.substring(0, 100) + '...' 
                                : project?.description}
                                </p>
                            </div>
                        </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}