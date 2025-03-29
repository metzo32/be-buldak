import Image from "next/image";
import SaveButton from "./icons.component/SaveButton";
import type { CardProps } from "@/types/CardProps";
import SpiceRate from "./icons.component/SpiceRate";
import StarIcon from "./icons.component/StarIcon";

export default function RecoCard({
  spiceRate,
  title,
  starRate,
  details,
  image,
  altMessage,
}: CardProps) {
  return (
    <div className="cursor-pointer bg-back flex flex-col justify-between gap-3 p-5 w-[270px] h-[405px] lg:w-[300px] lg:h-[450px] shadow-2xl">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <SpiceRate spiceRate={spiceRate} />
          <SaveButton />
        </div>
        <h4 className="text-lg lg:text-2xl break-keep">{title}</h4>
        <StarIcon star={starRate} />
      </div>
      <p className="text-sm md:text-base text-disabled">{details}</p>

      <Image
        src={image}
        alt={altMessage}
        width={320}
        height={250}
        className="bg-strong object-cover"
      />
    </div>
  );
}
