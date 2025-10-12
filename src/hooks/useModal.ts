import { ModalContext } from "@/context/ModalContext";
import { useContext } from "react";

export default function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("모달 컨텍스트가 없습니다.");
  }
  return context;
}
