"use client";

import ChangePwForm from "@/components/UserPage/ChangePwForm";
import ConfirmEmailForm from "@/components/UserPage/ConfirmEmailForm";
import { useSearchParams } from "next/navigation";

export default function PwResetPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  console.log("토큰", token, email);

  return (
    <div className="h-[500px] flex flex-col justify-center items-center gap-24">
      <h2 className="text-xl lg:text-3xl 2xl:text-3xl">비밀번호 재설정</h2>

      {token && email ? <ChangePwForm /> : <ConfirmEmailForm />}
      {/* <ChangePwForm /> */}
    </div>
  );
}
