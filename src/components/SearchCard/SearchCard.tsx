"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";

type SearchCardProps = {
  id: number;
  children: ReactNode;
};

export default function SearchCard({ id, children }: SearchCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-[180px] lg:h-[300px] cursor-pointer bg-secondary flex flex-col md:flex-row shadow-2xl"
    >
      {children}
    </div>
  );
}
