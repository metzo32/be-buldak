import Image from "next/image";
import Section from "@/components/Section";
import Comments from "@/components/comments/Comments";
import Recommend from "@/components/Recommend";
import TitleComp from "@/components/TitleComp";
import SaveButton from "@/components/icons.component/SaveButton";
import StarIcon from "@/components/icons.component/StarIcon";
import SpiceRate from "@/components/icons.component/SpiceRate";
import TriedButton from "@/components/TriedButton";
import { fakeRecipe } from "../../../public/assets/fakeData/fakeRecipe";
import Youtube from "@/components/Youtube";

export default function DetailPage() {
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
            <div className="flex gap-3 md:gap-10">
              <StarIcon rate={4.5} large />
              <SpiceRate spicy={5} large />
            </div>
            <div className="flex gap-10 lg:gap-20 relative z-1">
              <TriedButton />
              <SaveButton />
            </div>
          </>
        }
      />
      <Section title="재료" hasSub subText="n인분 기준">
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
        <div className="flex flex-col gap-5 md:gap-10">
          {fakeRecipe.map((item, index) => (
            <div key={index} className="flex gap-5 items-start">
              <span className="text-primary text-xl
    md:text-2xl">{index + 1}.</span>
              <p className="py-2">{item}</p>
            </div>
          ))}
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
      <Youtube />
      <Recommend />
    </>
  );
}
