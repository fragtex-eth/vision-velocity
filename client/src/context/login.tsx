import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context value type
interface LoginContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const useLogin = (): LoginContextType => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
};

interface LoginProviderProps {
    children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};
