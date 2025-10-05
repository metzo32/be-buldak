import React from "react";
import UserClient from "./UserClient";
import { isLoggedIn } from "@/lib/getCookie";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const loggedIn = isLoggedIn();

  if (!loggedIn) {
    console.log("로그아웃 상태. login페이지로 이동")
    redirect("/user");
  }

  return <UserClient />;
}
