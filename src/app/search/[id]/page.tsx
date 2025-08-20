import Image from "next/image";
import Section from "@/components/Section";
import Comments from "@/components/comments/Comments";
import Recommend from "@/components/Recommend";
import TitleComp from "@/components/TitleComp";
import SaveButton from "@/components/icons.component/SaveButton";
import StarIcon from "@/components/icons.component/StarIcon";
import SpiceRate from "@/components/icons.component/SpiceRate";
import TriedButton from "@/components/TriedButton";
import Youtube from "@/components/Youtube";
import SearchNotFound from "@/components/SearchCard/SearchNotFound";
import { buldakdData } from "../../../../public/assets/fakeData/fakeData";

interface DetailPageProps {
  params: {
    id: string;
  };
}

export default async function SearchItemPage({ params }: DetailPageProps) {
  const { id } = params;
  const numerId = Number(id);
  const data = buldakdData.find((item) => item.id === numerId);
  console.log(id, data);

  // const ingredients = [
  //   "불닭볶음면 1봉",
  //   "슬라이스 치즈 1장",
  //   "우유 1컵",
  //   "마늘 약간",
  //   "달걀 1개",
  //   "후추",
  // ];

  return data ? (
    <>
      <TitleComp
        title={data.title}
        subTitle={data.description}
        image={data.image}
        alt={data.title}
        option={
          <>
            <div className="flex gap-3 md:gap-10">
              <StarIcon rate={Number(data.starRate)} large />
              <SpiceRate spicy={data.spiceRate} large />
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
          {data.ingredient.map((item, index) => (
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

      <span className="pb-12 md:pb-24 flex items-center justify-center">
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
          {data.step.map((item, index) => (
            <div key={index} className="flex gap-5 items-start">
              <span className="recipie-process">{index + 1}.</span>
              <p className="py-2">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="추천 조합">
        <div className="flex justify-around">
          {data.sides.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          {/* <div className="w-48 h-48 bg-strong" />
          <div className="w-48 h-48 bg-strong" />
          <div className="w-48 h-48 bg-strong" /> */}
        </div>
      </Section>
      <Comments />
      <Youtube />
      <Recommend />
    </>
  ) : (
    <SearchNotFound/>
  );
}
