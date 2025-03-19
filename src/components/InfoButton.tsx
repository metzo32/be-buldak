"use client";

import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { ButtonPlain } from "./Buttons";

export default function InfoButton() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleQuestionClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="relative">
      <button onClick={handleQuestionClick} className="text-2xl text-textHover">
        <BsQuestionCircle />
      </button>
      {isClicked ? (
        <div className="w-[350px] px-10 py-8 rounded-2xl bg-gray-500 flex flex-col gap-10 absolute top-0 right-0 z-2 translate-x-100 -translate-y-48">
          <ul>
            <li>0 ~ 5점 : 맵린이</li>
            <li>6 ~ 12점 : 맵송이</li>
            <li>13점 ~18점 : 맵장인</li>
            <li>19점 이상 : 맵신</li>
          </ul>
          <div className="flex items-center justify-center">
            <ButtonPlain onClick={() => setIsClicked(false)} text="닫기" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
