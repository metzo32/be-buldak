"use client";

import { useRouter } from "next/navigation";
import { ButtonPlain } from "./Buttons";
import LoginButton from "./LoginButton";
import HomeButton from "./HomeButton";
import useModal from "../../public/hooks/useModal";
import Modal from "./Modal";

export default function Header() {
  const { isModalOpen, isConfirmed, openModal, closeModal, confirmModal } =
    useModal();
  const router = useRouter();

  const handleModalOpen = () => {
    openModal()
  };

  if (isConfirmed) {
    console.log("확인버튼 클릭");
  }

  return (
    <header>
      <div className="header-box flex items-start">
        <HomeButton />
      </div>

      <div className="header-box">
        <ButtonPlain text="모달" onClick={handleModalOpen} />
        <Modal
        isModalOpen={isModalOpen}
        title01="잠깐!"
        title02="계속할까요?"
        btnPlainText="취소"
        btnStrongText="확인"
        onClose={closeModal}
        onConfirm={confirmModal}
      />
        <ButtonPlain text="둘러보기" onClick={() => router.push("/search")} />
        <ButtonPlain text="상세" onClick={() => router.push("/details")} />
        <ButtonPlain text="유저" onClick={() => router.push("/user")} />
        <LoginButton />
      </div>
    </header>
  );
}
