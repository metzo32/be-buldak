import Image from "next/image";

interface SpiceRateProps {
  spiceRate: number;
  large?: boolean;
}

export default function SpiceRate({ spiceRate, large }: SpiceRateProps) {
  return (
    <span className="flex w-[100px] md:w-[150px] items-center">
      {Array.from({ length: spiceRate }, (_, index) => (
        <div
          key={index}
          className={`relative ${
            large ? "w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] " : "w-[20px] h-[20px]"
          }`}
        >
          <Image src={"/assets/icons/fire.svg"} alt="맵기레벨" fill />
        </div>
      ))}
    </span>
  );
}
