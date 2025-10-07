"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useUserStore } from "@/stores/useUserStore";
import { postLogin } from "@/components/fetch/fetchUsers";
import type { LoginRequest } from "@/types/FetchUserTypes";

import { ButtonPlain, ButtonStrong } from "@/components/ui/Buttons";
import Input from "@/components/ui/Input";
import Blur from "@/components/ui/Blur";
import { AiOutlineFire } from "react-icons/ai"; //전
import { AiFillFire } from "react-icons/ai"; //후
import { emailRegex, passwordRegex } from "@/lib/regex";
import Loading from "@/components/ui/Loading/Loading";

export default function LoginPage() {
  const { isLoading, user, setUserInfo } = useUserStore();
  const router = useRouter();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginRequest>({ mode: "onChange" });

  const [remember, setRemember] = useState<boolean>(false);

  // if (user) return null;

  // if (isLoading) {
  // return <Loading/>
  // }

  // useEffect(() => {
  //   if (user) {
  //     console.log(user);
  //     router.push("/user");
  //   }
  // }, [isLoading, user]);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRemember(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const { email } = data;
  
      const res = await postLogin(data);
      const userData = res?.user;
  
      if (!userData) {
        alert("로그인 실패: 사용자 정보가 없습니다.");
        return;
      }
  
      setUserInfo(userData);
  
      if (remember) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }
  
      alert("로그인 성공");
  
      await new Promise((resolve) => setTimeout(resolve, 150));
  
      router.replace("/user");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인 실패: 다시 시도해주세요.");
    }
  };
  

  // 토큰이 expire date가 있으니, 토큰 기간이 만료된 뒤 유저가 api를 요청했을 때- CSRF토큰 갱신 요청 함수 추가하여
  // 기간이 만료됐는지 안됐는지 확인 후 해당 값을 header에 다시 넣어주는 페칭함수

  const handleGoToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="py-24 mx-auto w-[600px] px-24 flex flex-col items-center justify-center gap-24 border-2 border-primaryHover rounded-4xl bg-primaryTrans relative backdrop-blur-sm shadow-xl">
      <h1 className="text-4xl relative z-1">로그인</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-18 relative z-1"
      >
        <div className="w-full flex flex-col gap-2 items-center">
          <div className="w-full flex flex-col gap-2">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "이메일은 필수입니다.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식을 확인해주세요.",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  label="이메일"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "비밀번호는 필수입니다.",
                minLength: { value: 8, message: "8글자 이상 입력해주세요." },
                pattern: {
                  value: passwordRegex,
                  message: "대소문자, 특수문자를 포함해주세요.",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  type="password"
                  label="비밀번호"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <div className="flex gap-3 md:gap-3 items-center justify-center">
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
              <label
                htmlFor="rememberMe"
                className="text-[16px] cursor-pointer select-none text-disabeldText hover:text-textHover"
              >
                기억하기
              </label>
            </div>

            <ButtonPlain type="button" text="비밀번호 찾기" isSmall />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 items-center ">
          <ButtonStrong type="submit" text="로그인" disabled={!isValid} full />

          <div className="flex gap-12 items-center">
            <ButtonPlain
              type="button"
              onClick={handleGoToRegister}
              text="가입하기"
              isSmall
            />
          </div>
        </div>
      </form>
      <Blur />
    </div>
  );
}
