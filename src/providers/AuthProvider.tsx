"use client";

import useModal from "@/hooks/useModal";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, fetchUserInfo } = useUserStore();
  const router = useRouter();
  const pathname = useSearchParams();
  const { openModal } = useModal();

  useEffect(() => {
    const handleExpired = () => {
      console.log("세션 만료. 유저 상태 초기화");
      useUserStore.getState().resetUser();
      // 여기서 로그인 모달 열거나 라우팅도 가능
      // setShowLogin(true);
    };

    window.addEventListener("session-expired", handleExpired);
    return () => window.removeEventListener("session-expired", handleExpired);
  }, []);

  useEffect(() => {
    console.log("유저", user);
    if (user === null) {
      openModal({
        modal: {
          title01: "앗!",
          title02: "인증이 필요한 페이지입니다.",
          content: <p>로그인 페이지로 이동합니다.</p>,
          onConfirm: () => {
            console.log("확인 클릭됨");
            router.push("/login");
          },
          onCancel: () => {
            console.log("취소 클릭됨");
          },
          confirmButton: "로그인하기",
        },
      });
    }
  }, [user, pathname]);

  return <>{children}</>;
}
