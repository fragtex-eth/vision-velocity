import { useEffect, useState } from "react";
import projects from "./../utils/mockData/projects";

import { Link } from "react-router-dom";
import { fetchProjects } from "../services/project/FetchProjects";
import DefaultUserImg from "../assets/defaultUserImg.webp";
import { useProjects } from "../context/projectsContext";
import { useUsers } from "../context/userContext";
import { useModal } from "../context/modalContext";
type Project = {
  id: string;
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
  const { projects } = useProjects();
  const { users } = useUsers();
  const { openModal } = useModal();

  return (
    <div className="text-center ">
      <h1>Discover</h1>
      <div className="surveys ml-auto mr-auto mt-11 flex max-w-[1270px] flex-wrap content-start justify-between gap-7 rounded-[45px] border border-solid border-[#50695319] border-white bg-white p-7">
        {projects &&
          projects.map((project) => {
            const fundingPercentage =
              (project.funds.collected / project.funds.required) * 100;
            const userImage = users[project.userId]?.image
              ? users[project.userId]?.image
              : DefaultUserImg;
            return (
              <Link to={`/project/${project.id}`} key={project.userId}>
                <div
                  className="elemShadow card min-h-full w-96 overflow-hidden rounded-[35px] bg-white "
                  key={project.userId}
                >
                  <div className="top relative">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-[140px] w-full object-cover"
                    />
                    <div className="-mt-[70px] flex items-end justify-between px-3">
                      <button className=" h-12 justify-center rounded-3xl border border-black bg-white px-8 shadow">
                        Invest
                      </button>

                      <img
                        src={userImage}
                        alt={
                          //@ts-ignore
                          users?.name
                        }
                        className="mt-1 h-[50px] w-[50px] rounded-full border border-black object-cover"
                      />
                    </div>
                  </div>
                  <div className="btm p-5 text-left">
                    <div className="title flex justify-between">
                      <span className="font-semibold text-green-950">
                        {project.name}
                      </span>
                      <span>
                        <span className="text-lg font-semibold">
                          {project.funds.collected}$
                        </span>{" "}
                        / {project.funds.required}$
                      </span>
                    </div>
                    <div className="loadingbarOS relative my-1 h-0.5 rounded-full bg-neutral-400">
                      <div
                        className="loadingbarIS absolute -mt-[1px] h-1 rounded-full bg-black"
                        style={{ width: `${fundingPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-justify text-base leading-5">
                      {project?.description.length > 100
                        ? project?.description.substring(0, 100) + "..."
                        : project?.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
