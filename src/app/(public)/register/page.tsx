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
import Input from "@/components/ui/Input";

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
    mode: "onChange",
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

      <div className="py-24 mx-auto w-[600px] px-24 flex flex-col items-center justify-center gap-16 border-2 border-primaryHover rounded-4xl bg-primaryTrans relative backdrop-blur-sm shadow-xl">
        <h1 className="text-4xl relative z-1">가입하기</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-18 relative z-1"
        >
          <div className="w-full flex flex-col gap-3 items-center">
            <div className="w-full flex flex-col">
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

            <div className="w-full flex flex-col">
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

            <div className="w-full flex flex-col">
              <Controller
                name="password_confirmation"
                control={control}
                rules={{
                  required: "비밀번호 확인은 필수입니다.",
                  minLength: { value: 8, message: "8글자 이상 입력해주세요." },
                  pattern: {
                    value: passwordRegex,
                    message: "대소문자, 특수문자를 포함해주세요.",
                  },
                  validate: (value, formValues) =>
                    value === formValues.password ||
                    "비밀번호가 일치하지 않습니다.",
                }}
                render={({ field, fieldState }) => (
                  <Input
                    type="password"
                    label="비밀번호 확인"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>

            <div className="w-full flex flex-col">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "이름은 필수입니다.",
                  // pattern: {
                  //   value: emailRegex,
                  //   message: "이름을 확인해주세요.",
                  // },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    label="이름"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>

            <div className="flex flex-col">
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
          </div>

          <div className="w-full flex flex-col gap-6 items-center ">
            <ButtonStrong
              type="submit"
              text="회원가입"
              disabled={!isValid}
              full
            />

            <div className="flex gap-12 items-center">
              <ButtonPlain
                type="button"
                onClick={handleGoToLogin}
                text="계정이 있어요"
                isSmall
              />
            </div>
          </div>
        </form>
        <Blur />
      </div>
    </>
  );
}
