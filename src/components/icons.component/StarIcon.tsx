import Image from "next/image";

interface StarProps {
  star: string;
  large?: boolean;
}

export default function StarIcon({ star, large }: StarProps) {
  return (
    <span className={`flex items-center ${large ? "gap-1 md:gap-2" : "gap-1"}`}>
      <div
        className={`relative ${
          large ? "w-[15px] h-[15px] md:w-[25px] md:h-[25px]" : "w-[15px] h-[15px]"
        }`}
      >
        <Image src={"/assets/icons/star_strong.svg"} alt="별점" fill />
      </div>
      <h6
        className={`text-primary ${
          large ? "text-lg lg:text-3xl" : "text-base lg:text-lg"
        }`}
      >
        {star}
      </h6>
    </span>
  );
}
