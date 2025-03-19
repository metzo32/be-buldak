"use client";

import { useState } from "react";
import SearchCard from "@/components/SearchCard";
import { buldakdData } from "../../../public/assets/fakeData/fakeData";
import { ButtonPlain } from "@/components/Buttons";

export default function SearchPage() {
  const [isByDate, setIsByDate] = useState<boolean>(false);

  return (
    <div className="p-48 flex flex-col gap-12">
      <h2 className="text-4xl">둘러보기</h2>
      <div className="py-12 text-2xl flex items-center justify-center gap-48">
        <ButtonPlain
          text={isByDate ? "최신순" : "오래된순"}
          onClick={() => setIsByDate(!isByDate)}
        />
        <ButtonPlain text="매운순" />
        <ButtonPlain text="별점순" />
      </div>
      {buldakdData.map((item) => (
        <SearchCard
          key={item.id}
          spiceRate={item.spiceRate}
          title={item.title}
          starRate={item.starRate}
          image={item.image}
          altMessage={item.altMessage}
          description={item.description || ""}
        />
      ))}
    </div>
  );
}
