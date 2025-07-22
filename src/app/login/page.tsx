"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Blur from "@/components/Blur";
import { AiOutlineFire } from "react-icons/ai"; //전
import { AiFillFire } from "react-icons/ai"; //후
import { useUserStore } from "@/stores/useUserStore";
import { getToken, postLogin } from "@/components/fetch/fetchUsers";
import { ButtonPlain, ButtonStrong } from "@/components/ui/Buttons";
// import CsrfFetcher from "./fetcher";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState<boolean>(false);
  const router = useRouter();
  const { setUserInfo } = useUserStore();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedUserEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
    console.log("로컬 이메일:", savedEmail);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 토큰이 expire date가 있으니, 토큰 기간이 만료된 뒤 유저가 api를 요청했을 때- CSRF토큰 갱신 요청 함수 추가하여
  // 기간이 만료됐는지 안됐는지 확인 후 해당 값을 header에 다시 넣어주는 페칭함수
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const { email, password } = formData;

    const csrfToken = await getToken();
    if (!csrfToken) throw new Error("CSRF 토큰 발급 실패");

    const res = await postLogin(formData);
    const userData = res.user;

    setUserInfo(userData);

    if (remember) {
      localStorage.setItem("savedUserEmail", email);
    } else {
      localStorage.removeItem("savedUserEmail");
    }

    alert("로그인 성공");
    router.push("/user");
  } catch (err) {
    console.error("로그인 실패:", err);
    alert("로그인 요청 중 오류가 발생했습니다.");
  }
};


  const handleRoute = () => {
    router.push("/register");
  };

  return (
    // <CsrfFetcher />
    <div className="py-24 flex flex-col items-center justify-center gap-24 relative">
      <h1 className="text-4xl relative z-1">로그인</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          className="outlined-input"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="아이디"
          required
        />

        <input
          className="outlined-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />

        <div className="flex gap-3 md:gap-5 items-center justify-center">
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
