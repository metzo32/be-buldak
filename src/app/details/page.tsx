import { ButtonStrong } from "@/components/Buttons";
import Image from "next/image";
import Section from "@/components/Section";
import Comments from "@/components/Comments";
import Recommend from "@/components/Recommend";
import TitleComp from "@/components/TitleComp";
import SaveButton from "@/components/icons.component/SaveButton";
import StarRate from "@/components/icons.component/StarRate";
import SpiceRate from "@/components/icons.component/SpiceRate";

export default function page() {
  const ingredients = [
    "불닭볶음면 1봉",
    "슬라이스 치즈 1장",
    "우유 1컵",
    "마늘 약간",
    "달걀 1개",
    "후추",
  ];

  return (
    <>
      <TitleComp
        title={"레시피 이름"}
        subTitle={"이 레시피에 대한 키워드"}
        image={"/assets/images/image_detail.png"}
        alt={"레시피 이름"}
        option={
          <>
            <div className="flex gap-10 text-2xl">
              <SpiceRate spiceRate={3} large />
              <StarRate star="4.5" large />
            </div>
            <div className="flex gap-10 lg:gap-20 relative z-1">
              <ButtonStrong text="먹어봤어요" />
              <SaveButton />
            </div>
          </>
        }
      />
      <Section title="재료" hasSub>
        <div className="w-full flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-10">
          {ingredients.map((item, index) => (
            <p
              key={index}
              className={
                index % 4 === 0
                  ? "text-left"
                  : index % 4 === 3
                  ? "text-left md:text-right"
                  : "text-left md:text-center"
              }
            >
              {item}
            </p>
          ))}
        </div>
      </Section>
      <span className="pb-24 flex items-center justify-center">
        <div className="relative w-[50px] h-[50px] lg:w-[100px] lg:h-[100px]">
          <Image
            src="/assets/icons/ramen.svg"
            alt="라면 아이콘"
            fill
            className="object-contain"
          />
        </div>
      </span>
      <Section title="만드는 법">
        <div className="flex flex-col gap-10">
          <div className="flex gap-5 items-end">
            <span className="recipie-process">1.</span>
            <p>만드는 과정</p>
          </div>
          <div className="flex gap-5 items-end">
            <span className="recipie-process">2.</span>
            <p>만드는 과정</p>
          </div>
          <div className="flex gap-5 items-end">
            <span className="recipie-process">3.</span>
            <p>만드는 과정</p>
          </div>
          <div className="flex gap-5 items-end">
            <span className="recipie-process">4.</span>
            <p>만드는 과정</p>
          </div>
        </div>
      </Section>
      <Section title="추천 조합">
        <div className="flex justify-around">
          <div className="w-48 h-48 bg-strong" />
          <div className="w-48 h-48 bg-strong" />
          <div className="w-48 h-48 bg-strong" />
        </div>
      </Section>
      <Comments />
      유튜브링크
      <Recommend />
    </>
  );
}
