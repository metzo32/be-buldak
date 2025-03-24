"use client";

import { ButtonStrong } from "./Buttons";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleRouteLogin = () => {
    router.push("/login");
  };

  //로그인 상태일때는 텍스트 "로그아웃"으로 바꾸기.
  return (
    <>
      {/* <ButtonStrong onClick={handleRouteLogin} text="로그인" /> */}
      <ButtonStrong text="로그아웃" disabled/>
    </>
  );
}
