"use client";

import { postLogout } from "./fetch/fetchUsers";
import { useRouter } from "next/navigation";

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
    <button onClick={handleSignOut}>로그아웃</button>
  );
}
