"use client";

import { useRouter } from "next/navigation";
import { ButtonPlain } from "./Buttons";
import LoginButton from "./LoginButton";
import HomeButton from "./HomeButton";

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <div className="header-box">
        <HomeButton />
      </div>

      <div className="header-box">
        <ButtonPlain text="둘러보기" onClick={() => router.push("/search")} />
        <ButtonPlain text="상세" onClick={() => router.push("/details")} />
        <ButtonPlain text="유저" onClick={() => router.push("/user")} />
        <LoginButton />
      </div>
    </header>
  );
}
