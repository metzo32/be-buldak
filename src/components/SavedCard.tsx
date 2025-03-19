import Image from "next/image";
import type { CardProps } from "@/types/CardProps";

export default function SavedCard({
  spiceRate,
  title,
  starRate,
  image,
  altMessage,
}: CardProps) {
  return (
    <div className="bg-secondary flex flex-col gap-3 p-5 w-[280px] shadow-2xl relative">
      <button className="w-[40px] h-[40px] bg-close flex items-center justify-center absolute top-0 right-0">
        <Image src="/assets/icons/Delete.svg" alt="X" width={20} height={20} />
      </button>
      <div className="flex justify-between items-center">
        <h5>{spiceRate}</h5>
      </div>
      <h4 className="text-2xl">{title}</h4>
      <h6>{starRate}</h6>
      <Image
        src={image}
        alt={altMessage}
        width={320}
        height={250}
        className="bg-strong"
      />
    </div>
  );
}
