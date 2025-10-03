"use client";

import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";
import HomeButton from "./HomeButton";
import useModal from "../../public/hooks/useModal";
import Modal from "./Modal";
import { ButtonPlain } from "./ui/Buttons";
import { useEffect } from "react";
import { getCurrentUser } from "./fetch/fetchUsers";

export default function Header() {
  const { isModalOpen, isConfirmed, openModal, closeModal, confirmModal } =
    useModal();
  const router = useRouter();

  const handleModalOpen = () => {
    openModal();
  };

  if (isConfirmed) {
    console.log("확인버튼 클릭");
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <header>
      <div className="gap-2 2xl:gap-10 flex items-start">
        <HomeButton />
      </div>

      <div className="flex gap-2 2xl:gap-10">
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
