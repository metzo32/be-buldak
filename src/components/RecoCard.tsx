import Image from "next/image";
import SaveButton from "./icons.component/SaveButton";
import type { CardProps } from "@/types/CardProps";
import SpiceRate from "./icons.component/SpiceRate";
import StarRate from "./icons.component/StarRate";

export default function RecoCard({
  spiceRate,
  title,
  starRate,
  image,
  altMessage,
}: CardProps) {
  return (
    <div className="cursor-pointer bg-back flex flex-col justify-between gap-3 p-5 w-[280px] lg:w-[300px] shadow-2xl">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <SpiceRate spiceRate={spiceRate} />
          <SaveButton />
        </div>
        <h4 className="text-lg lg:text-2xl break-keep">{title}</h4>
          <StarRate star={starRate}/>
      </div>

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
