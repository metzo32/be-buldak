import Image from "next/image";
import type { CardProps } from "@/types/CardProps";
import SpiceRate from "./icons.component/SpiceRate";
import StarRate from "./icons.component/StarRate";
import SaveButton from "./icons.component/SaveButton";

export default function SavedCard({
  spiceRate,
  title,
  starRate,
  image,
  altMessage,
}: CardProps) {
  return (
    <div className="shrink-0 bg-secondary flex flex-col justify-between p-5 w-[200px] h-[280px] md:w-[280px] md:h-[380px] shadow-2xl relative">
      {/* <button className="w-[40px] h-[40px] bg-close flex items-center justify-center absolute top-0 right-0">
        <Image src="/assets/icons/Delete.svg" alt="X" width={20} height={20} />
      </button> */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <SpiceRate spiceRate={spiceRate} />
          <SaveButton />
        </div>
        <h4 className="text-lg md:text-2xl">{title}</h4>
        <StarRate star={starRate} />
      </div>
      <div className="relative w-[170px] h-[120px] md:w-[240px] md:h-[200px]">
        <Image src={image} alt={altMessage} fill className="bg-strong object-cover" />
      </div>
    </div>
  );
}
