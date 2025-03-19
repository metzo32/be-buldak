"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonStrong, ButtonPlain } from "@/components/Buttons";
import Blur from "@/components/Blur";

export default function RegisterPage() {
  const [form, setForm] = useState({ id: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("로그인 정보:", form);
  };

  const handleRoute = () => {
    router.push("/login");
  };

  return (
    <div className="py-24 flex flex-col items-center justify-center gap-24 relative">
      <h1 className="text-4xl relative z-1">가입하기</h1>
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

          <input
            className="w-80  px-4 py-2 border-3 border-primary rounded-2xl"
            type="passwordConfirm"
            name="passwordConfirm"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호 확인"
            required
          />
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="w-[150px] flex flex-col items-stretch">
            <ButtonStrong type="submit" text="가입하기" />
          </div>
          <ButtonPlain type="button" onClick={handleRoute} text="이미 계정이 있어요" />
        </div>
      </form>
      <Blur />
    </div>
  );
}
