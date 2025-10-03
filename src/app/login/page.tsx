"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUserStore } from "@/stores/useUserStore";
import { postLogin } from "@/components/fetch/fetchUsers";
import Blur from "@/components/ui/Blur";
import { AiOutlineFire } from "react-icons/ai"; //전
import { AiFillFire } from "react-icons/ai"; //후
import { ButtonPlain, ButtonStrong } from "@/components/ui/Buttons";
import type { LoginRequest } from "@/types/FetchUserTypes";
import { noKoreanRegex, passwordRegex } from "@/lib/regex";
import { useQuery } from "@tanstack/react-query";
import { _get } from "@/api/api";

export default function LoginPage() {
  const { setUserInfo } = useUserStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<LoginRequest>({ mode: "onChange" });
  const [remember, setRemember] = useState<boolean>(false);

  // 로그인 쿠키 있는 경우 로그인페이지 진입 불가

  const fetchUser = async () => {
    const res = await _get("/api/auth/user");

    return res.data?.data
  }

  const {data: userData, isLoading, isError} = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
  })

  useEffect(() => {
    if (!isLoading) {
      if (userData) {
        // 로그인 상태라면 → /user 로 이동
        router.push("/user");
      } else if (isError) {
        // 401 같은 에러 → 로그인 안 된 상태, 현재 페이지에 머무름
      }
    }

    console.log("로그인 여부", !!userData)
  }, [userData, isLoading, isError, router]);
  
  

  useEffect(() => {
    const savedId = localStorage.getItem("savedId");
    if (savedId) {
      // setFormData((prev) => ({ ...prev, id: savedId }));
      setRemember(true);
    }
  }, []);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const { id, password } = data;

      const res = await postLogin(data);
      const userData = res?.user;

      setUserInfo(userData);

      if (remember) {
        localStorage.setItem("savedUserId", id);
      } else {
        localStorage.removeItem("savedUserId");
      }

      alert("로그인 성공");
      router.push("/user");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인 요청 중 오류가 발생했습니다.");
    }
  };

  // 토큰이 expire date가 있으니, 토큰 기간이 만료된 뒤 유저가 api를 요청했을 때- CSRF토큰 갱신 요청 함수 추가하여
  // 기간이 만료됐는지 안됐는지 확인 후 해당 값을 header에 다시 넣어주는 페칭함수

  const handleChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.value = e.target.value.replace(noKoreanRegex, "");
    const cleaned = e.target.value.replace(noKoreanRegex, "");
    setValue("id", cleaned, { shouldValidate: true });
  };

  const handleRoute = () => {
    router.push("/register");
  };

  return (
    <div className="py-24 flex flex-col items-center justify-center gap-24 relative">
      <h1 className="text-4xl relative z-1">로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 relative z-1">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            {...register("id", {
              pattern: {
                value: noKoreanRegex,
                message: "한글은 입력할 수 없습니다",
              },
              required: "아이디를 입력해주세요",
            })}
            placeholder="아이디"
            className="w-full px-4 py-2 border-3 border-primary rounded-2xl"
          />
          {errors.id?.message && <p className="error">{errors.id?.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            placeholder="비밀번호"
            className="w-full px-4 py-2 border-3 border-primary rounded-2xl"
          />
          {errors.password?.message && (
            <p className="error">{errors.password?.message}</p>
          )}
        </div>

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
            <ButtonStrong type="submit" text="로그인" disabled={!isValid} />
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
