import Image from "next/image";
import SaveButton from "../icons.component/SaveButton";
import SpiceRate from "../icons.component/SpiceRate";
import StarIcon from "../icons.component/StarIcon";

type CardProps = {
  spicy: number;
  title: string;
  rate: number;
  image: string;
  altMessage: string;
  description: string;
};

export default function SearchCardContent({
  spicy,
  title,
  rate,
  image,
  altMessage,
  description,
}: CardProps) {
  return (
    <div className="bg-secondary flex flex-col md:flex-row w-full shadow-2xl h-[300px]">
      <div className="w-full h-[180px] lg:w-[600px] lg:h-[300px] relative">
        <Image
          src={`/${image}`}
          alt={altMessage}
          fill
          className="bg-strong object-cover"
        />
      </div>

      <div className="w-full p-5 lg:p-10 flex flex-col justify-between gap-2 lg:gap-5">
        <div className="flex flex-col gap-2 lg:gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <h4 className="text-xl lg:text-3xl">{title}</h4>
              <span className="hidden lg:block">
                <SpiceRate spicy={spicy} />
              </span>
            </div>
            <SaveButton />
          </div>

          <div className="flex gap-2">
            <StarIcon rate={rate} />
            <span className="block lg:hidden">
              <SpiceRate spicy={spicy} />
            </span>
          </div>
        </div>

        <p className="2xl:mt-10">{description}</p>
      </div>
    </div>
  );
}
