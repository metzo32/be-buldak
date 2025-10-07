"use client";

import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";

import Modal from "@/components/ui/Modal";
import HomeButton from "@/components/HomeButton";
import { ButtonOutlined, ButtonPlain } from "@/components/ui/Buttons";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../fetch/fetchUsers";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export default function Header() {
  const { isModalOpen, isConfirmed, openModal, closeModal, confirmModal } =
    useModal();
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    console.log("헤더 유저", user) 
  }, [user])

  // const { data: userData, isError } = useQuery({
  //   queryKey: ["currentUser"],
  //   queryFn: getCurrentUser,
  //   retry: false,
  // });

  // if (isError) {
  //   console.log("로그인되지 않음");
  // }

  const handleModalOpen = () => {
    openModal();
  };

  if (isConfirmed) {
    console.log("확인버튼 클릭");
  }

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
        <ButtonPlain text="둘러보기" onClick={() => router.push("/details")} />
        <ButtonPlain text="상세" onClick={() => router.push("/details/1")} />
        <ButtonPlain text="유저" onClick={() => router.push("/user")} />
        <ButtonOutlined
          text={user ? "마이" : "로그인"}
          onClick={() => router.push(user ? "/user" : "/login")}
        />
      </div>
    </header>
  );
}
