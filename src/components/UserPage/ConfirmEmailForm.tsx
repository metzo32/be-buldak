import { Controller, useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { useUserStore } from "@/stores/useUserStore";
import { ButtonOutlined } from "../ui/Buttons";
import { emailRegex } from "@/lib/regex";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, pwResetRequest } from "../fetch/fetchUsers";
import { useRouter } from "next/navigation";

export default function ConfirmEmailForm() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      const res = await pwResetRequest({ email: data.email });

      if (res) {
        console.log("폼 제출 성공:", data);
        setIsSuccess(true);
      } else {
        console.log("요청 실패 또는 null 반환");
      }
    } catch (err) {
      console.log("에러 발생:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void
  ) => {
    onChange(e);
    if (errors.email) clearErrors("email");
    setIsSuccess(false);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 items-center"
    >
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
            onChange={(e) => handleEmailChange(e, field.onChange)}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <ButtonOutlined
        text={
          isSuccess
            ? "코드 전송 완료!"
            : isLoading
            ? "전송 중..."
            : "인증 코드 보내기"
        }
        type="submit"
        disabled={isSuccess || isLoading}
      />
    </form>
  );
}
