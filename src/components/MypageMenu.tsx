"use client";

import { useState } from "react";

export default function MypageMenu() {
  const [selected, setSelected] = useState<string>("A");

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setSelected("A")}>컴포넌트 A</button>
        <button onClick={() => setSelected("B")}>컴포넌트 B</button>
        <button onClick={() => setSelected("C")}>컴포넌트 C</button>
      </div>

      {selected === "A" && <ServerComponentA />}
      {selected === "B" && <ServerComponentB />}
      {selected === "C" && <ServerComponentC />}
    </div>
  );
}
