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

export default function RegisterPage() {
  const { isModalOpen, openModal, closeModal } = useModal();

  const [pickedDate, setPickedDate] = useState<Dayjs | null>(null);

  const [registerForm, setRegisterForm] = useState<RegisterRequest>({
    email: "",
    name: "",
    birth: "",
    password: "",
    password_confirmation: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    setPickedDate(newValue);
    setRegisterForm((prev) => ({
      ...prev,
      birth: newValue ? newValue.format("YYYY-MM-DD") : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 정보:", registerForm);

    if (registerForm.password !== registerForm.password_confirmation) {
      alert("비밀번호를 확인해주세요");
      return;
    }

    try {
      postRegister(registerForm);
      // openModal();
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const handleConfirm = () => {
    closeModal();
    router.push("/");
  };

  const handleRoute = () => {
    router.push("/login");
  };

  return (
    <>
      <Modal
        isModalOpen={isModalOpen}
        title01="회원가입 성공!"
        title02="초기 화면으로 이동합니다."
        btnStrongText="확인"
        onClose={closeModal}
        onConfirm={handleConfirm} // <-- 여기서 라우팅 실행
      />

      <div className="py-24 flex flex-col items-center justify-center gap-24 relative">
        <h1 className="text-4xl relative z-1">회원가입</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-1">
          <input
            className="w-full px-4 py-2 border-3 border-primary rounded-2xl"
            type="text"
            name="email"
            value={registerForm.email}
            onChange={handleChange}
            placeholder="이메일"
            required
          />

          <input
            className="w-full px-4 py-2 border-3 border-primary rounded-2xl"
            type="text"
            name="name"
            value={registerForm.name}
            onChange={handleChange}
            placeholder="이름"
            required
          />

          <input
            className="w-full px-4 py-2 border-3 border-primary rounded-2xl"
            type="password"
            name="password"
            value={registerForm.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />

          <input
            className="w-full px-4 py-2 border-3 border-primary rounded-2xl"
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
    </>
  );
}
