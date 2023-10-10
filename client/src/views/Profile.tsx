import ProfilePic from "./../assets/profilPic.png"
import ProjectImg from "./../assets/exampleImg.png"
import { FaLinkedin , FaSquareXTwitter, FaGithub,FaWallet} from 'react-icons/fa6';
import projects from "./../utils/mockData/projects"; 
import users from "../utils/mockData/users";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Profile(){

    const { id } = useParams();
    let user = users[id];
    const userProjects = projects.filter(project => user.projects.includes(project.userId));
    const userInvestments = projects.filter(project => user.investments.includes(project.userId));
    

    return (
        <div className="relative">
            <img src={ user.image} className="absolute left-0 right-0 w-64 h-64 rounded-full border border-black border-1 m-auto -top-32 overflow-hidden"></img>
            <div className="flex flex-col gap-7 justify-between py-7 px-24 mt-[160px]  surveys flex flex-wrap  bg-red-50 border border-solid mt-11 border-white max-w-[1270px] rounded-[45px] ml-auto mr-auto">
                <h2 className="ml-auto mr-auto mt-28">{user.name}</h2>
                <div className="links flex justify-between w-40 text-2xl ml-auto mr-auto">
                    <a href={user.links.x} target="_blank" rel="noopener noreferrer"><FaSquareXTwitter/></a>
                    <a href={user.links.github} target="_blank" rel="noopener noreferrer"><FaGithub/></a>
                    <a href={user.links.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin/></a>
                    <span title={user.links.walletAddress}><FaWallet/></span>
                </div>
                <p className=" text-justify">{user.description}</p>
                <div className="">
                <h3 className="mb-2">Projects</h3>
                <div className="flex gap-7 flex-wrap ">
                    {userProjects.map((project) => (
                        <Link to={`/project/${project.userId}`} key={project.userId} className="w-[248px] h-[170px] bg-white shadow border border-neutral-100 rounded-[25px] overflow-hidden">
                            <img className="mb-1 w-[248px] h-[132px]  object-cover" src={project.image} alt={project.name}></img>
                            <span className="px-5">{project.name}</span>
                        </Link>
                    ))}
                </div>
                </div>
                <div className="">
                <h3 className="mt-10 mb-2">Investments</h3>
                <div className="flex gap-7 flex-wrap ">
                    {userInvestments.map((investment) => (
                        <Link to={`/project/${investment.userId}`} key={investment.userId} className="w-[248px] h-[170px] bg-white shadow border border-neutral-100 rounded-[25px] overflow-hidden">
                            <img className="mb-1 w-[248px] h-[132px]  object-cover" src={investment.image} alt={investment.name}></img>
                            <span className="px-5">{investment.name}</span>
                        </Link>
                    ))}
                </div>
                </div>
            </div>
        </div>
    )
}