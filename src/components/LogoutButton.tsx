"use client";

import { postLogout } from "./fetch/fetchUsers";
import { useRouter } from "next/navigation";
import { ButtonPlain } from "./ui/Buttons";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await postLogout();
  };

  return <ButtonPlain text="로그아웃" onClick={handleSignOut} />;
}
