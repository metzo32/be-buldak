"use client"

import { ButtonStrong } from "../ui/Buttons"
import { useRouter } from "next/navigation"

export default function SearchNotFound() {
    const router = useRouter()
    
    const handleClick = () => {
        router.push("/search")
    }

  return (
    <div className="py-56 flex flex-col items-center justify-center gap-20">
        <p className="text-5xl">어라? 이 맛은...</p>
        <p className="text-2xl text-textHover">등록되지 않은 레시피예요.</p>
        <ButtonStrong onClick={handleClick} text="다른 매운맛 찾으러 가기"/>
    </div>
  )
}
