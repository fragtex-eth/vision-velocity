// usersContext.tsx

import React, { createContext, useContext, ReactNode } from "react";

type UserType = {
  // Define the structure of your user data here
  name: string;
  image: string;
  email: string;
  // ... other fields
};

type UsersContextType = {
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = React.useState<UserType[]>([]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
