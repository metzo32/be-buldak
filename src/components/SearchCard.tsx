import Image from "next/image";
import type { CardProps } from "@/types/CardProps";
import SaveButton from "./SaveButton";

export default function SearchCard({
  spiceRate,
  title,
  starRate,
  image,
  altMessage,
  description,
}: CardProps) {
  return (
    <div className="bg-secondary flex w-full shadow-2xl">
      <Image
        src={image}
        alt={altMessage}
        width={640}
        height={320}
        className="bg-strong"
      />
      <div className="w-full p-10 flex flex-col justify-between">
        <div className="flex flex-col gap-5 ">
          <div className="flex justify-between items-center">
            <div className="flex gap-10 items-center">
              <h4 className="text-3xl">{title}</h4>
              <h5>{spiceRate}</h5>
            </div>
            <SaveButton />
          </div>
          <h6 className="text-primary">★{starRate}</h6>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
