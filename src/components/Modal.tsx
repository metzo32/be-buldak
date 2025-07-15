"use client";

import { ButtonPlain, ButtonStrong } from "./ui/Buttons";


interface ModalProps {
  isModalOpen: boolean;
  title01: string;
  title02: string;
  btnStrongText?: string;
  btnPlainText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function Modal({
  isModalOpen,
  title01,
  title02,
  btnStrongText,
  btnPlainText,
  onClose,
  onConfirm,
}: ModalProps) {
  if (!isModalOpen) return null;

  return (
    <div className="bg-overlay fixed top-0 left-0 w-screen h-screen z-30 flex justify-center items-center">
      <div className="w-[300px] h-[200px] md:w-[600px] md:h-[400px] p-5 md:p-10 bg-secondary flex flex-col justify-between md:justify-center items-center gap-5 md:gap-20 shadow-xl rounded-xl">
        <h2 className="text-primary text-lg md:text-3xl font-bold">{title01}</h2>
        <h1 className="font-medium text-lg md:text-4xl">{title02}</h1>
        <div className="flex gap-5 md:gap-10">
          {btnPlainText && (
            <ButtonPlain text={btnPlainText} onClick={onClose} isSmall />
          )}
          {btnStrongText && (
            <ButtonStrong text={btnStrongText} onClick={onConfirm} />
          )}
        </div>
      </div>
    </div>
  );
}
