"use client"

import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa"; //전
import { FaBookmark } from "react-icons/fa"; //후

export default function SaveButton() {
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleClick = () => {
    setIsSaved(!isSaved);
  };
  return (
    <button
      onClick={handleClick}
      className="text-3xl text-primary hover:text-primaryHover"
    >
      {isSaved ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}
