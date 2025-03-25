"use client"

import { useRouter } from "next/navigation";
import { ButtonStrong } from "./Buttons";

export default function GoToSearchButton() {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/search");
  };
  return (
    <div className="w-1/2">
      <ButtonStrong text="먹으러 가기" onClick={handleRoute} />
    </div>
  );
}
