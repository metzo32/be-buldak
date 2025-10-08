// src/context/ModalContext.ts
import { createContext, useContext } from "react";

interface ModalContextProps {
    openModal: ({ modal }: { modal: any }) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps>({
    openModal: () => {},
  closeModal: () => {},
});

export const useModal = () => useContext(ModalContext);
