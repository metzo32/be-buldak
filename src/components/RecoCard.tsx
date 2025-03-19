import Image from "next/image";
import SaveButton from "./SaveButton";
import type { CardProps } from "@/types/CardProps";

export default function RecoCard({
  spiceRate,
  title,
  starRate,
  image,
  altMessage,
}: CardProps) {
  return (
    <div className="bg-back flex flex-col gap-3 p-5 w-[360px] shadow-2xl">
      <div className="flex justify-between items-center">
        <h5>{spiceRate}</h5>
        <SaveButton />
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
