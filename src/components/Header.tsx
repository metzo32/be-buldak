"use client";

import { useRouter } from "next/navigation";
import { ButtonPlain } from "./Buttons";
import LoginButton from "./LoginButton";

export default function Header() {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <header className="px-48 py-10 flex justify-between">
      <div className="flex gap-20">
        <button onClick={handleHome} className="text-3xl font-bold">
          불닭이되
        </button>
        <div className="flex gap-10">
          <ButtonPlain text="검색" onClick={() => router.push("/search")}/>
          <ButtonPlain text="버튼" />
          <ButtonPlain text="버튼" />
        </div>
      </div>
      <div className="flex gap-10">
        <ButtonPlain
          text="상세페이지"
          onClick={() => router.push("/details")}
        />
        <ButtonPlain onClick={() => router.push("/user")} text="유저페이지" />
        <ButtonPlain onClick={() => router.push("/register")} text="회원가입" />
        <LoginButton />
      </div>
    </header>
  );
}
