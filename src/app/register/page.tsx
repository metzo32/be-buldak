"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { RegisterRequest } from "@/types/FetchUserTypes";
import Blur from "@/components/Blur";
import { ButtonPlain, ButtonStrong } from "@/components/ui/Buttons";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CustomizedDatePicker from "@/components/ui/CustomizedDatePicker";
import { formatDateToString } from "@/components/modules/formatDate";

export default function RegisterPage() {
  const [pickedDate, setPickedDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    console.log(pickedDate?.toString());
  }, [pickedDate]);

  const [registerForm, setRegisterForm] = useState<RegisterRequest>({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
    birthdate: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setPickedDate(newValue);
    setRegisterForm((prev) => ({
      ...prev,
      birthdate: newValue ? newValue.format("YYYY-MM-DD") : "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 정보:", registerForm);

    if (registerForm.password !== registerForm.password_confirmation) {
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
      <form onSubmit={handleSubmit} className="user-form">
        <input
          className="outlined-input"
          type="text"
          name="email"
          value={registerForm.email}
          onChange={handleChange}
          placeholder="이메일"
          required
        />

        <input
          className="outlined-input"
          type="text"
          name="name"
          value={registerForm.name}
          onChange={handleChange}
          placeholder="이름"
          required
        />

        <input
          className="outlined-input"
          type="password"
          name="password"
          value={registerForm.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />

        <input
          className="outlined-input"
          type="password"
          name="password_confirmation"
          value={registerForm.password_confirmation}
          onChange={handleChange}
          placeholder="비밀번호 확인"
          required
        />

        <CustomizedDatePicker
          label="생년월일"
          selectedDate={pickedDate}
          onChange={handleDateChange}
        />

        <div className="flex flex-col gap-6 items-center">
          <ButtonStrong type="submit" text="가입하기" />
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
