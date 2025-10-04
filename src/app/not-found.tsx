"use client"

import { ButtonStrong } from "@/components/ui/Buttons"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {
    const router = useRouter()
    
    const handleRoute = () => {
        router.push("/details")
    }

  return (
    <div className="py-56 flex flex-col items-center justify-center gap-20">
        <p className="text-5xl">으으... 이 맛이 아니야!</p>
        <p className="text-2xl text-textHover">잘못된 페이지예요.</p>
        <ButtonStrong onClick={handleRoute} text="다른 매운맛 찾으러 가기"/>
    </div>
  )
}
