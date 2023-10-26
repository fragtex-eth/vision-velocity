import DefaultUser from "./../assets/defaultUserImg.webp";
import ProjectImg from "./../assets/exampleImg.png";
import {
  FaLinkedin,
  FaSquareXTwitter,
  FaGithub,
  FaWallet,
} from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUsers } from "../context/userContext";
import { useProjects } from "../context/projectsContext";
import { useState, useEffect } from "react";
import { useLogin } from "../context/loginContext";
import { useModal } from "../context/modalContext";
export default function Profile() {
  const { openModal } = useModal();
  const { id } = useParams();
  const { users } = useUsers();
  const { projects } = useProjects();
  const { isLoggedIn } = useLogin();
  const [user, setUser] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [userInvestments, setUserInvestments] = useState([]);
  console.log(isLoggedIn);
  useEffect(() => {
    const foundUser = users[id];
    console.log(foundUser);
    setUser(foundUser);

    if (foundUser) {
      let foundUserProjects = null;
      if (foundUser.projects) {
        foundUserProjects = projects.filter(
          (project) => foundUser.id === project.userId,
        );
      }
      let foundUserInvestments = null;
      if (foundUser.investments) {
        foundUserInvestments = projects.filter(
          (project) => foundUser.id === project.userId,
        );
      }
      console.log(foundUserProjects);
      setUserProjects(foundUserProjects || []);
      setUserInvestments(foundUserInvestments || []);
    }
  }, [id, users]);

  if (!users) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="relative">
      <img
        src={user?.image || DefaultUser}
        className="border-1 absolute -top-32 left-0 right-0 m-auto h-64 w-64 overflow-hidden rounded-full border border-black"
      ></img>
      <div className="surveys ml-auto mr-auto mt-11 mt-[160px] flex flex  max-w-[1270px] flex-col flex-wrap justify-between gap-7 rounded-[45px] border border-solid border-white bg-slate-100 px-24 py-7">
        <h2 className="ml-auto mr-auto mt-28">{user?.name}</h2>
        {isLoggedIn.id == user.id && (
          <span
            className="m-0 -mt-8 ml-auto mr-auto text-sm"
            onClick={() => openModal("editProfile")}
          >
            Edit Profile
          </span>
        )}
        <div className="links ml-auto mr-auto flex w-40 justify-between text-2xl">
          <a href={user?.links?.x} target="_blank" rel="noopener noreferrer">
            <FaSquareXTwitter />
          </a>
          <a
            href={user?.links?.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href={user?.links?.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <span title={user?.links?.walletAddress}>
            <FaWallet />
          </span>
        </div>
        <p className=" text-justify">{user?.description}</p>
        <div className="">
          <h3 className="mb-2">Projects</h3>
          <div className="flex flex-wrap gap-7 ">
            {userProjects.map((project) => (
              <Link
                to={`/project/${project.id}`}
                key={project.id}
                className="h-[170px] w-[248px] overflow-hidden rounded-[25px] border border-neutral-100 bg-white shadow"
              >
                <img
                  className="mb-1 h-[132px] w-[248px]  object-cover"
                  src={project.image}
                  alt={project?.name}
                ></img>
                <span className="px-5">{project.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="">
          <h3 className="mb-2 mt-10">Investments</h3>
          <div className="flex flex-wrap gap-7 ">
            {userInvestments &&
              userInvestments.map((investment) => (
                <Link
                  to={`/project/${investment.id}`}
                  key={investment.id}
                  className="h-[170px] w-[248px] overflow-hidden rounded-[25px] border border-neutral-100 bg-white shadow"
                >
                  <img
                    className="mb-1 h-[132px] w-[248px]  object-cover"
                    src={investment.image}
                    alt={investment.name}
                  ></img>
                  <span className="px-5">{investment.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
