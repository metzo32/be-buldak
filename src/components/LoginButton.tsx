"use client";

import { useRouter } from "next/navigation";
import { ButtonOutlined } from "./ui/Buttons";

export default function LoginButton() {
  const router = useRouter();

  const handleRouteLogin = () => {
    router.push("/login");
  };

  //TODO 로그인 상태일때는 텍스트 "로그아웃"으로 바꾸기.
  return (
    <>
      <ButtonOutlined onClick={handleRouteLogin} text="로그인" />
      {/* <ButtonStrong text="로그아웃" disabled/> */}
    </>
  );
}
