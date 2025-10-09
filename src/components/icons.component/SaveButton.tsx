"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa"; //전
import { FaBookmark } from "react-icons/fa"; //후
import { saveRecipe } from "../fetch/fetchRecipies";
import { useRouter } from "next/navigation";
import useModal from "@/hooks/useModal";

export default function SaveButton({ recipeId }: { recipeId: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {openModal} = useModal();
  const [isSaved, setIsSaved] = useState<boolean>(false);


  const { mutate, isPending } = useMutation({
    mutationFn: () => saveRecipe(recipeId),
    onMutate: async () => {
      setIsSaved((prev) => !prev); // optimistic update
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["isSaved", recipeId] });
    },
    // onSuccess: (data) => {
    //   console.log("저장 응답:", data);
    //   setIsSaved((prev) => !prev);

    //   queryClient.invalidateQueries({ queryKey: ["isSaved", recipeId] });
    // },
    onError: (error: any) => {
      console.log("저장 요청 실패:", error);
      setIsSaved(false);

      if (error?.response?.status === 401 || error?.status === 401) {
        console.warn("세션 만료됨 → 재로그인 모달 오픈");
        setIsSaved(false);

        openModal({
          modal: {
            title01: "세션이 만료되었습니다",
            title02: "다시 로그인해주세요",
            content: <p>보안을 위해 자동 로그아웃 되었습니다.</p>,
            onConfirm: () => {
              console.log("확인 클릭됨");
              router.push("/login"); // or 원하는 동작
            },
            onCancel: () => {
              console.log("취소 클릭됨");
            },
            confirmButton: "로그인하기",
            cancelButton: "닫기",
          },
        });
        return;
      }

      alert("요청 실패");
      // 실패 시 optimistic rollback도 고려
      setIsSaved((prev) => !prev);
    },
  });

  const toggleSave = () => {
    mutate();
  };

  return (
    <button
      onClick={toggleSave}
      className="text-xl md:text-3xl text-primary hover:text-primaryHover"
    >
      {isSaved ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}
