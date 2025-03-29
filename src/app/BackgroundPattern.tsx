"use client";
import Image from "next/image";

export default function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 opacity-5 select-none">
      <Image
        src="/assets/pattern/pattern.svg"
        alt="background pattern"
        fill
        className="object-cover relative"
        priority
      />
    </div>
  );
}
