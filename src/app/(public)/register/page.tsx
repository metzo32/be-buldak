"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { RegisterRequest } from "@/types/FetchUserTypes";
import { postRegister } from "@/components/fetch/fetchUsers";
import useModal from "@/hooks/useModal";
import { Dayjs } from "dayjs";

import CustomizedDatePicker from "@/components/ui/CustomizedDatePicker";
import Blur from "@/components/ui/Blur";
import { ButtonPlain, ButtonStrong } from "@/components/ui/Buttons";
import Modal from "@/components/ui/Modal";
import { useForm, Controller } from "react-hook-form";
import { emailRegex, passwordRegex } from "@/lib/regex";

// RHF에서는 Date로 쓰고, 서버에는 string으로 전달
interface RegisterFormValues extends Omit<RegisterRequest, "birth"> {
  birth: Dayjs | null;
}

export default function RegisterPage() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, errors },
    watch,
  } = useForm<RegisterFormValues>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      birth: null,
    },
  });

  const handleConfirm = () => {
    closeModal();
    router.push("/");
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };
  

  const onSubmit = async (data: RegisterFormValues) => {
    const payload: RegisterRequest = {
      ...data,
      birth: data.birth ? data.birth.format("YYYY-MM-DD") : "",
    };
  
    const isSuccess = await postRegister(payload);
  
    if (isSuccess) {
      openModal(); 
    } else {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };
  

  const password = watch("password");

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        title01="회원가입 성공!"
        title02="초기 화면으로 이동합니다."
        btnStrongText="확인"
        onClose={closeModal}
        onConfirm={handleConfirm}
      />

      <div className="py-24 flex flex-col items-center justify-center gap-24 relative">
        <h1 className="text-4xl relative z-1">회원가입</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 relative z-1"
        >
          {/* 이메일 */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
              placeholder="이메일"
              className="w-full px-4 py-2 border-3 border-primaryHover focus:border-primary rounded-2xl"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                pattern: {
                  value: passwordRegex,
                  message: "대소문자, 특수문자를 포함해주세요.",
                },
              })}
              placeholder="비밀번호"
              className="w-full px-4 py-2 border-3 border-primaryHover focus:border-primary  rounded-2xl"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2">
            <input
              type="password"
              {...register("password_confirmation", {
                required: "비밀번호를 확인해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
              placeholder="비밀번호 확인"
              className="w-full px-4 py-2 border-3 border-primaryHover focus:border-primary  rounded-2xl"
            />
            {errors.password_confirmation && (
              <p className="error">{errors.password_confirmation.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="text"
              {...register("name", {
                required: "이름을 입력해주세요.",
              })}
              placeholder="이름"
              className="w-full px-4 py-2 border-3 border-primaryHover focus:border-primary  rounded-2xl"
            />
            {errors.email && <p className="error">{errors.name?.message}</p>}
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-2">
            <Controller
              name="birth"
              control={control}
              rules={{ required: "생년월일을 선택해주세요." }}
              render={({ field }) => (
                <CustomizedDatePicker
                  label="생년월일"
                  selectedDate={field.value ? field.value : null}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            {errors.birth && <p className="error">{errors.birth.message}</p>}
          </div>

          {/* 버튼 */}
          <div className="flex flex-col gap-6 items-center">
            <ButtonStrong type="submit" text="가입하기" />
            <ButtonPlain
              type="button"
              onClick={handleGoToLogin}
              text="이미 계정이 있어요"
              isSmall
            />
          </div>
        </form>

        <Blur />
      </div>
    </>
  );
}
