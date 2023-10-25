import ProfilePic from "./../assets/profilPic.png";
import ProjectImg from "./../assets/exampleImg.png";
import {
  FaLinkedin,
  FaSquareXTwitter,
  FaGithub,
  FaWallet,
} from "react-icons/fa6";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";
import { useUsers } from "../context/userContext";
import { useProjects } from "../context/projectsContext";
import { useState, useEffect } from "react";

export default function Project() {
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const { users } = useUsers();
  const { projects } = useProjects();

  useEffect(() => {
    try {
      const foundProject = projects.find((p) => p.id === id);
      setProject(foundProject || {}); // Fallback to an empty object
      if (foundProject) {
        const foundUser = users[foundProject.userId];
        setUser(foundUser || {}); // Fallback to an empty object
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  }, [projects, users, id]);

  function FullCarousel() {
    return (
      <Carousel
        infiniteLoop={true}
        emulateTouch={true}
        showStatus={false}
        autoPlay={true}
        className="-mt-5 p-10 text-center"
      >
        {project?.preview?.map((previewItem) => (
          <div key={previewItem.img}>
            <img src={previewItem.img} alt="Preview picture" className="" />
          </div>
        ))}
      </Carousel>
    );
  }
  return (
    <div className="relative">
      <div className="">
        <img
          src={project?.image}
          className="absolute -top-32 left-0 right-0 m-auto h-64 w-64 rounded-full border border-2 border-black"
        ></img>
      </div>
      <div className="surveys ml-auto mr-auto mt-11 mt-[160px] flex flex  max-w-[1270px] flex-col flex-wrap  justify-between gap-7 rounded-[45px] border border-solid border-white bg-slate-100 px-24 py-7">
        <h2 className="ml-auto mr-auto mt-28">{project?.name}</h2>
        <Link
          to={`/profile/${project?.userId}`}
          className="-mt-8 text-center text-lg "
        >
          by {user?.name}
        </Link>
        <div className="links ml-auto mr-auto flex w-40 justify-between text-2xl">
          <a href={project?.links?.x}>
            <FaSquareXTwitter />
          </a>
          <a href={project?.links?.github}>
            <FaGithub />
          </a>
          <a href={project?.links?.linkedin}>
            <FaLinkedin />
          </a>
          <a href={project?.links?.walletAddress}>
            <FaWallet />
          </a>
        </div>
        <div className="flex justify-center">
          <span className="-mb-4 -mt-4 w-[850px] text-right text-xl text-green-950">
            <span className="text-2xl font-semibold">
              {project?.funds?.collected}$
            </span>{" "}
            / {project?.funds?.required}$
          </span>
        </div>
        <div className="progress ml-auto mr-auto h-0.5  w-3/4 bg-gray-400">
          <div
            className="inside -mt-[1px] h-1 rounded-[40px] bg-black"
            style={{
              width: `${
                //@ts-ignore
                project?.funds?.collected / project?.funds?.required
              }%`,
            }}
          ></div>
        </div>
        <div className="mx-auto flex w-96 justify-between gap-5">
          <div className="flex h-12 rounded-3xl border border-black ">
            <input
              className="h-full w-full rounded-s-3xl  bg-white  px-8"
              placeholder="10"
            ></input>
            <div className="   flex h-full w-[75px] items-center rounded-e-3xl bg-gray-50 px-4">
              BUSD
            </div>
          </div>
          <button className="h-12 justify-center rounded-3xl border border-black bg-white px-8 shadow">
            Invest
          </button>
        </div>
        <p className="-mt-4 flex justify-center text-xs">
          By continuing, you agree to our<a>Terms of Service</a> and acknowledge
          our <a>Privacy Policy</a>
        </p>
        <p className=" text-justify">{project?.description}</p>
        <div className="">
          <h3 className="overflow-hiddenmb-3">Gallery</h3>
          <div className="">
            <FullCarousel />
          </div>
        </div>
        <div className="">
          <h3 className="mb-3 overflow-hidden">Updates</h3>
          <div className="updateblock block columns-3 gap-7 ">
            {project?.updates?.map((update, index) => (
              <div
                className="slide mb-7 h-min w-[340px] overflow-hidden rounded-[30px] bg-white"
                key={index}
              >
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
  );
}
