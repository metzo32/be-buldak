"use client"

import { ButtonStrong } from "./Buttons";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleRouteLogin = () => {
    router.push("/login")
  }

  return <ButtonStrong onClick={handleRouteLogin} text="로그인" />;
}
