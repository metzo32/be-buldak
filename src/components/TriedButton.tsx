"use client";

import { useState } from "react";
import { ButtonStrong } from "./ui/Buttons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { triedRecipe } from "./fetch/fetchRecipies";
import useModal from "@/hooks/useModal";
import { useRouter } from "next/navigation";

export default function TriedButton({ recipeId }: { recipeId: number }) {
  const [tried, setTried] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { openModal } = useModal();

  const { mutate, isPending } = useMutation({
    mutationFn: () => triedRecipe(recipeId),
    onMutate: async () => {
      setTried((prev) => !prev); // optimistic update
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tried", recipeId] });
    },
    // onSuccess: (data) => {
    //   console.log("먹어봤어요 응답:", data);
    //   setTried((prev) => !prev);

    //   queryClient.invalidateQueries({ queryKey: ["tried", recipeId] });
    // },
    onError: (error: any) => {
      console.log("먹어봤어요 요청 실패:", error);
      setTried(false);

      if (error?.response?.status === 401 || error?.status === 401) {
        console.warn("세션 만료됨 → 재로그인 모달 오픈");
        setTried(false);

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
      setTried((prev) => !prev);
    },
  });

  const toggleTried = () => {
    mutate();
  };

  return (
    <ButtonStrong
      text={`${tried ? "먹어봤어요" : "먹어볼래요"}`}
      deactive={tried}
      onClick={toggleTried}
      disabled={isPending}
    />
  );
}
