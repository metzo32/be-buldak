"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, fetchUserInfo } = useUserStore();
  const router = useRouter()
  const pathname = useSearchParams();
  
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
    console.log("유저", user)
    if (user === null) {
      router.push("/login");
    }
  }, [user, pathname]);

  

  return <>{children}</>;
}
