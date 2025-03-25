"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonStrong, ButtonPlain } from "@/components/Buttons";
import Blur from "@/components/Blur";

export default function RegisterPage() {
  const [form, setForm] = useState<{
    id: string;
    password: string;
    passwordConfirm: string;
    emailCode: string;
  }>({ id: "", password: "", passwordConfirm: "", emailCode: "" });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 정보:", form);

    if (form.password !== form.passwordConfirm) {
      alert("비밀번호를 확인해주세요");
      return;
    }

    console.log("회원가입 성공!");
  };

  const handleRoute = () => {
    router.push("/login");
  };

  return (
    <div className="py-24 flex flex-col items-center justify-center gap-24 relative">
      <h1 className="text-4xl relative z-1">회원가입</h1>
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
            type="password"
            name="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="비밀번호 확인"
            required
          />

          <div className="flex gap-5">
            <input
              className="w-60 px-4 py-2 border-3 border-primary rounded-2xl"
              type="email"
              name="emailConfirm"
              value={form.emailCode}
              onChange={handleChange}
              placeholder="이메일 인증"
              required
            />
            <button type="button">인증하기</button>
          </div>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="w-[150px] flex flex-col items-stretch">
            <ButtonStrong type="submit" text="가입하기" />
          </div>
          <ButtonPlain
            type="button"
            onClick={handleRoute}
            text="이미 계정이 있어요"
            isSmall
          />
        </div>
      </form>
      <Blur />
    </div>
  );
}
