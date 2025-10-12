import { Controller, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { useUserStore } from "@/stores/useUserStore";
import { ButtonOutlined } from "../ui/Buttons";
import { emailRegex } from "@/lib/regex";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, pwResetRequest } from "../fetch/fetchUsers";

export default function ConfirmEmailForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const { data: currUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
  });

  const currUserEmail = currUser?.email;

  const onSubmit = (data: { email: string }) => {
    const res = pwResetRequest(data.email)
    console.log("폼 제출 성공:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Controller
        name="email"
        control={control}
        rules={{
          required: "현재 이메일을 입력해주세요.",
          pattern: {
            value: emailRegex,
            message: "이메일 형식을 확인해주세요.",
          },
          validate: (value) =>
            value === currUserEmail ||
            "현재 로그인된 이메일과 일치하지 않습니다.",
        }}
        render={({ field, fieldState }) => (
          <Input
            type="text"
            label="이메일"
            value={field.value}
            onChange={(e) => {
              field.onChange(e);
              if (errors.email) {
                clearErrors("email");
              }
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <ButtonOutlined text="인증 코드 받기" type="submit" />
    </form>
  );
}
