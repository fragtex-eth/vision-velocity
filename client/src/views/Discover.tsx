import { useEffect, useState } from "react";
import projects from "./../utils/mockData/projects";
import ProjectPrev from "../components/Common/ProjectPrev";
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
          projects.map((project) => (
            <ProjectPrev key={project?.id} project={project} users={users} />
          ))}
      </div>
    </div>
  );
}
