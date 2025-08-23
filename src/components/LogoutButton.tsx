"use client";

import { postLogout } from "./fetch/fetchUsers";
import { useRouter } from "next/navigation";
import { ButtonPlain } from "./ui/Buttons";

export default function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
 try {
    await postLogout();
  } catch (err) {
    console.error("handleSignOut 에서 에러:", err);
  }
  };

  return (
    // <ButtonPlain text="로그아웃" onClick={handleSignOut} />
    <button onClick={handleSignOut}>로그아아아아웃</button>
  );
}
