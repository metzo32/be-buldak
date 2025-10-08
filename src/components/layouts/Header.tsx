"use client";

import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";

import HomeButton from "@/components/HomeButton";
import { ButtonOutlined, ButtonPlain } from "@/components/ui/Buttons";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../fetch/fetchUsers";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export default function Header() {
  const { openModal } = useModal();
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    console.log("헤더 유저", user);
  }, [user]);

  // const { data: userData, isError } = useQuery({
  //   queryKey: ["currentUser"],
  //   queryFn: getCurrentUser,₩₩
  //   retry: false,
  // });

  // if (isError) {
  //   console.log("로그인되지 않음");
  // }

  const handleModalOpen = () => {
    openModal({
      modal: {
        title01: "모달 열기 테스트",
        title02: "테스트",
        content: "아주 잘 열립니다!",
        onConfirm: () => {
          console.log("확인 클릭됨");
        },
        onCancel: () => {
          console.log("취소 클릭됨");
        },
        confirmButton: "확인",
        cancelButton: "취소",
      },
    });
  };

  return (
    <header>
      <div className="gap-2 2xl:gap-10 flex items-start">
        <HomeButton />
      </div>

      <div className="flex gap-2 2xl:gap-10">
        <ButtonPlain text="모달" onClick={handleModalOpen} />
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
