import { ReactNode, useCallback, useState } from "react";
import { ButtonPlain, ButtonStrong } from "@/components/ui/Buttons";
import { ModalContext } from "@/context/ModalContext";

interface ModalProps {
  title01?: string;
  title02?: string;
  content: ReactNode | null;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButton?: string;
  cancelButton?: string;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export default function ModalProvider({ children }: ModalProviderProps) {
  const initialModal: ModalProps = {
    title01: "",
    title02: "",
    content: null,
    onConfirm: () => {},
    onCancel: () => {},
    confirmButton: "확인",
    cancelButton: "취소",
  };

  const [modalContent, setModalContent] = useState(initialModal);
  const [open, setOpen] = useState(false);

  const openModal = useCallback(({ modal }: { modal: ModalProps }) => {
    setModalContent(modal);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setModalContent(initialModal);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {open && (
        // 모달 디자인
        <div className="bg-overlay fixed top-0 left-0 min-w-[325px] w-screen h-screen z-30 flex justify-center items-center">
          <div className="w-[300px] h-[200px] md:w-[450px] md:h-[300px] p-5 bg-secondary flex flex-col items-center gap-5 justify-between py-10 shadow-xl rounded-xl">
            <div className="flex flex-col items-center">
              <h2 className="text-primary text-lg font-bold">
                {modalContent.title01}
              </h2>
              <h1 className="font-medium text-lg">{modalContent.title02}</h1>
            </div>

            {modalContent.content}
            <div className="flex gap-5 md:gap-10">
              {modalContent.cancelButton && (
                <ButtonPlain
                  text={modalContent.cancelButton}
                  onClick={() => {
                    modalContent.onCancel?.();
                    closeModal();
                  }}
                  isSmall
                />
              )}
              {modalContent.confirmButton && (
                <ButtonStrong
                  text={modalContent.confirmButton}
                  onClick={() => {
                    modalContent.onConfirm?.();
                    closeModal();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
