import Image from "next/image";
import type { CardProps } from "@/types/CardProps";
import SaveButton from "./icons.component/SaveButton";
import SpiceRate from "./icons.component/SpiceRate";
import Star from "./icons.component/StarRate";

export default function SearchCard({
  spiceRate,
  title,
  starRate,
  image,
  altMessage,
  description,
}: CardProps) {
  return (
    <div className="bg-secondary flex w-full shadow-2xl h-300px">
      <div className="w-[300px] h-[180px] lg:w-[600px] lg:h-[300px] relative">
        <Image
          src={image}
          alt={altMessage}
          fill
          className="bg-strong object-cover"
        />
      </div>
      <div className="w-full p-5 lg:p-10 flex flex-col justify-between">
        <div className="flex flex-col gap-2 lg:gap-5">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <h4 className="text-xl lg:text-3xl">{title}</h4>
              <span className="hidden lg:block">
                <SpiceRate spiceRate={spiceRate} />
              </span>
            </div>

            <SaveButton />
          </div>
          <span className="block lg:hidden">
            <SpiceRate spiceRate={spiceRate} />
          </span>
          <Star star={starRate} />
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
}
