"use client";

import { useState } from "react";
import { ButtonStrong } from "./ui/Buttons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { triedRecipe } from "./fetch/fetchRecipies";

export default function TriedButton({ recipeId }: { recipeId: number }) {
  const [tried, setTried] = useState<boolean>(false);
  const queryClient = useQueryClient();

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
    onError: (err) => {
      console.error("먹어봤어요 요청 실패:", err);
      alert("요청 실패");
    },
  });

  const toggleTried = () => {
    mutate();
  };

  return (
    <ButtonStrong
      text={`${tried ? "먹어봤어요" : "먹어볼래요"}`}
      onClick={toggleTried}
      disabled={isPending}
    />
  );
}
