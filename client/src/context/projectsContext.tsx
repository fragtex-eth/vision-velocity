import React, { createContext, useContext, ReactNode } from "react";

type ProjectType = {
  image: string;
  userId: string;
  // Missing parameters
};
type ProjectsContextType = {
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

type Props = {
  children: ReactNode;
};

export const ProjectsProvider: React.FC<Props> = ({ children }) => {
  const [projects, setProjects] = React.useState<ProjectType[]>([]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
