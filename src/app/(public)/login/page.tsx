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
import { emailRegex, passwordRegex } from "@/lib/regex";
import { useQuery } from "@tanstack/react-query";
import { _get } from "@/api/api";
import TextField from "@mui/material/TextField";

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
  const getUser = async () => {
    const res = await _get("/api/auth/user");

    return res.data?.data;
  };

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
  });

  // if (isLoading) {
  //   return <p>로딩 중...</p>
  // }

  // if (isError) {
  //   return <p>에러가 발생했습니다.</p>
  // }

  useEffect(() => {
    const savedId = localStorage.getItem("savedId");
    if (savedId) {
      // setFormData((prev) => ({ ...prev, id: savedId }));
      setRemember(true);
    }
  }, []);

  const onSubmit = async (data: LoginRequest) => {
    try {
      const { email, password } = data;

      const res = await postLogin(data);
      const userData = res?.user;

      setUserInfo(userData);

      if (remember) {
        localStorage.setItem("savedUserId", email);
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

  const handleRoute = () => {
    router.push("/register");
  };

  return (
    <div className="py-24 mx-auto w-[600px] px-24 flex flex-col items-center justify-center gap-24 border-2 border-primaryHover rounded-4xl bg-primaryTrans relative backdrop-blur-sm">
      <h1 className="text-4xl relative z-1">로그인</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-18 relative z-1"
      >
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="w-full flex flex-col gap-2">
            <TextField
              label="이메일"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "9999px",
                  paddingLeft: "20px", 
                  paddingRight: "20px",
           
                  "& fieldset": {
                    borderWidth: "2px",
                    borderColor: "var(--color-primaryHover)",
                    paddingLeft: "20px",  
                    paddingRight: "20px",
            
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--color-primary)",
                    paddingLeft: "20px", 
                    paddingRight: "20px",
                  },
                  
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--color-primary)",
                    paddingLeft: "20px", 
                    paddingRight: "20px",
                  },

                  "&.Mui-focused legend": {
                    padding: "3px",
                  },
                },

                "& .MuiOutlinedInput-input": {
                  color: "var(--color-text)",
                },

                "& .MuiInputLabel-root": {
                  color: "var(--color-disabled)", 
                  paddingLeft: "20px",   
                  paddingRight: "20px",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "var(--color-primary)", 
                  paddingLeft: "20px", 
                  paddingRight: "20px",
                },
                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                  color: "var(--color-primary)",
                },
                "& legend": {
                  padding: "0px",
                },
                "& .MuiInputLabel-shrink ~ .MuiOutlinedInput-root legend": {
                  padding: "3px",
                },
              }}
            />

            {/* <input
              type="text"
              {...register("email", {
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
                required: "이메일을 입력해주세요.",
              })}
              placeholder="이메일"
              className="w-full px-4 py-3 border-3 border-primaryHover focus:border-primary rounded-full"
            />
            {errors.email?.message && (
              <p className="error">{errors.email?.message}</p>
            )} */}
          </div>

          <div className="w-full flex flex-col gap-2">
            <input
              type="password"
              {...register("password", {
                pattern: {
                  value: passwordRegex,
                  message: "대소문자, 특수문자를 포함해주세요.",
                },
                minLength: {
                  value: 8,
                  message: "8글자 이상 입력해주세요.",
                },
                required: "비밀번호를 입력해주세요.",
              })}
              placeholder="비밀번호"
              className="w-full px-4 py-3 border-3 border-primaryHover focus:border-primary rounded-full"
            />
            {errors.password?.message && (
              <p className="error">{errors.password?.message}</p>
            )}
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
              onClick={handleRoute}
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
