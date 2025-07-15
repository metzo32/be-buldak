"use client"


import { postLogout } from "./fetch/fetchUsers";
import { useRouter } from "next/navigation";
import { ButtonPlain } from "./ui/Buttons";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await postLogout("", "");
      //   resetUser();
      router.push("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    } finally {
    }
  };

  return <ButtonPlain text="로그아웃" onClick={handleSignOut} />;
}
