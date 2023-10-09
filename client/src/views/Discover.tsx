
import projects from "./../utils/mockData/projects";
import users from "./../utils/mockData/users";
import { Link } from 'react-router-dom';

export default function DiscoverView() {
    // Sort projects by recency
    const sortedProjects = projects.sort((a, b) => 
        new Date(b.creationDate.split(".").reverse().join("-")).getTime() - 
        new Date(a.creationDate.split(".").reverse().join("-")).getTime()
    );

    return (
        <div className="text-center mt">
            <h1>Discover</h1>
            <div className="content-start gap-7 justify-between p-7 surveys flex flex-wrap bg-red-50 border border-solid mt-11 border-white max-w-[1270px] rounded-[45px] ml-auto mr-auto">

                {sortedProjects.map((project) => {
                    const fundingPercentage = (project.funds.collected / project.funds.required) * 100;
                    //@ts-ignore
                    const userImage = users[project.userId].image;
                    return (
                        <Link to={`/project/${project.userId}`} key={project.userId}>
                        <div className="card w-96 bg-white min-h-full rounded-[35px] overflow-hidden" key={project.userId}>
                            <div className="top relative">
                                <img src={project.image} alt={project.name} className="w-full h-[200px] object-cover"/>
                                <div className="flex px-3 -mt-[70px] items-end justify-between">
                                    <button className=" px-8 h-12 bg-white rounded-3xl shadow border border-black justify-center">Invest</button>
                                    
                                    <img src={userImage} alt={//@ts-ignore
                                    users[project.userId].name} className="w-[50px] h-[50px] rounded-full border border-black object-cover mt-1"  />
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
                                    {project.description}
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