import Image from "next/image";
import { ButtonStrong } from "@/components/Buttons";
import Blur from "@/components/Blur";
import Recommend from "@/components/Recommend";

export default function HomePage() {
  return (
    <>
      <section className="px-80 py-40 mb-24 relative z-1 flex justify-between items-center">
        <div className="flex flex-col gap-12 ">
          <h1 className="text-8xl font-bold">불닭이되</h1>
          <h2 className="text-4xl text-primary">
            세상의 모든 불닭볶음면 레시피
          </h2>
          <div className="flex gap-20 relative z-1">
            <ButtonStrong text="버튼" />
            <ButtonStrong text="버튼" />
          </div>
        </div>
        <Image src={"/assets/images/image_main.png"} alt="불닭볶음면 이미지" width={650} height={400}/>
        <Blur />
      </section>

      <Recommend/>
    </>
  );
}
