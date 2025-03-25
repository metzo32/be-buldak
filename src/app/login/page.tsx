"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonStrong, ButtonPlain } from "@/components/Buttons";
import Blur from "@/components/Blur";
import { AiOutlineFire } from "react-icons/ai"; //전
import { AiFillFire } from "react-icons/ai"; //후

export default function LoginPage() {
  const [form, setForm] = useState({ id: "", password: "" });
  const [remember, setRemember] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const savedId = localStorage.getItem("savedUserId");
    if (savedId) {
      setForm((prev) => ({ ...prev, id: savedId }));
      setRemember(true);
    }
    console.log("로컬 아이디:", savedId);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 정보:", form);

    if (remember) {
      localStorage.setItem("savedUserId", form.id);
    } else {
      localStorage.removeItem("savedUserId");
    }
  };

  const handleRoute = () => {
    router.push("/register");
  };

  return (
    <div className="py-24 flex flex-col items-center justify-center gap-24 relative">
      <h1 className="text-4xl relative z-1">로그인</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-24 relative z-1"
      >
        <div className="flex flex-col gap-12">
          <input
            className="w-80 px-4 py-2 border-3 border-primary rounded-2xl"
            type="text"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="아이디"
            required
          />
          <input
            className="w-80  px-4 py-2 border-3 border-primary rounded-2xl"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
          <div className="flex gap-5 items-center justify-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="hidden"
            />
            <span className="text-2xl text-primary">
              {remember ? <AiFillFire /> : <AiOutlineFire />}
            </span>
            <label htmlFor="rememberMe" className="cursor-pointer select-none">
              내 정보 기억하기
            </label>
          </div>
          <ButtonPlain type="button" text="비밀번호를 잊어버렸어요" isSmall />
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="w-[150px] flex flex-col items-stretch">
            <ButtonStrong type="submit" text="로그인" />
          </div>
          <ButtonPlain
            type="button"
            onClick={handleRoute}
            text="가입하기"
            isSmall
          />
        </div>
      </form>
      <Blur />
    </div>
  );
}
