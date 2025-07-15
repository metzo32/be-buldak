import Image from "next/image";
import Blur from "./Blur";
import { ReactNode } from "react";

interface TitleCompProps {
  title: string;
  subTitle: string;
  image: string;
  alt: string;
  option?: ReactNode;
}

export default function TitleComp({
  title,
  subTitle,
  image,
  alt,
  option
}: TitleCompProps) {
  return (
    <section className="w-full px-10 md:px-40 md:py-20 2xl:px-80 2xl:py-45 mb-24 relative z-1 flex justify-center 2xl:justify-between items-center gap-2">
      <div className="w-1/2 flex flex-col gap-3 md:gap-8 lg:gap-12">
        <h1 className="text-3xl md:text-3xl 2xl:text-5xl font-bold">{title}</h1>
        <h2 className="md:text-2xl 2xl:text-3xl text-primary break-keep">
          {subTitle}
        </h2>
       {option}
      </div>
      <div className="w-1/2">
        <Image src={image} alt={alt} width={650} height={400} />
      </div>
      <Blur />
    </section>
  );
}
