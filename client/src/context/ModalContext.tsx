// ModalContext.tsx
import React, { createContext, useContext, useState } from "react";
import Register from "../views/Register";

type ModalType = "login" | "register" | null;

interface ModalContextType {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC = ({ children }) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
      {/* {modalType === 'login' && <LoginModal />} */}
      {modalType === "register" && <Register />}
    </ModalContext.Provider>
  );
};
