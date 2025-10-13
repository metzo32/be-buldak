import Input from "../ui/Input";
import { Controller, useForm } from "react-hook-form";
import { ButtonOutlined } from "../ui/Buttons";

export default function ChangePwForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form className="flex flex-col gap-3 items-center">
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <Input
            type="password"
            label="새 비밀번호"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password_confirmation"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <Input
            type="password"
            label="새 비밀번호 확인"
            value={field.value}
            onChange={field.onChange}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <ButtonOutlined text="비밀번호 바꾸기" />
    </form>
  );
}
