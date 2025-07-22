"use client"

import { useState } from "react"
import { ButtonPlain } from "./ui/Buttons"

export default function ViewAllButton() {
    const [isClicked, setIsClicked] = useState<boolean>(false)

    const handleClick = () => {
        setIsClicked(!isClicked)
    }
  return (
    <ButtonPlain text={isClicked ? "간략히" : "펼치기"} onClick={handleClick}/>
  )
}
