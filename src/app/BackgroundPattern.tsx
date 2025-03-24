import Image from "next/image";

export default function BackgroundPattern() {
  return (
    <Image
      src="/assets/pattern/pattern.svg"
      alt=""
      className="fixed -z-1 top-0 left-0 scale-[3] origin-center opacity-5 rotate-45 select-none"
      width={1024}
      height={1024}
    />
  );
}
