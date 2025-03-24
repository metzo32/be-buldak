"use client";

import { useState } from "react";
import { ButtonStrong } from "./Buttons";

export default function TriedButton() {
  const [tried, setTried] = useState<boolean>(false);

  const toggleTried = () => {
    setTried(!tried);
  };

  return (
    <ButtonStrong
      text={`${tried ? "먹어봤어요" : "먹어볼래요"}`}
      onClick={toggleTried}
      disabled={tried}
    />
  );
}
