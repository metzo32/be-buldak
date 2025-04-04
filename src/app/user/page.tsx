import Image from "next/image";
import InfoButton from "@/components/InfoButton";
import Blur from "@/components/Blur";
import Section from "@/components/Section";
import SavedCard from "@/components/SavedCard";
import { buldakdData } from "../../../public/assets/fakeData/fakeData";
import { ButtonPlain } from "@/components/Buttons";
import ViewAllButton from "@/components/ViewAllButton";

export default function UserPage() {
  const spiceSum = 3;
  let spiceLevString = "";

  switch (true) {
    case spiceSum < 6:
      spiceLevString = "01";
      break;
    case spiceSum < 12:
      spiceLevString = "02";
      break;
    case spiceSum < 18:
      spiceLevString = "03";
      break;
    case spiceSum < 24:
      spiceLevString = "04";
      break;
    default:
      spiceLevString = "05";
  }

  return (
    <>
      <section className="py-48 flex flex-col items-center gap-12">
        <div className="flex gap-5 items-center relative z-2">
          <h2 className="text-4xl">나의 맵티어는...</h2>
          <InfoButton />
        </div>
        <div className="relative w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px]">
          <Image
            src={`/assets/images/spice_level/level${spiceLevString}.png`}
            alt={"티어이미지"}
            fill
            className="relative z-1"
          />
        </div>
        <Blur />
      </section>
      <Section title="내 정보" isTrans>
        <div>
          <ButtonPlain text="내 정보 바꾸기" />
          <ButtonPlain text="비밀번호 바꾸기" />
          <ButtonPlain text="탈퇴하기" />
          <ButtonPlain text="로그아웃" />
        </div>
      </Section>

      <Section
        title={"저장한 레시피"}
        isTrans
        option
        optionElement={<ViewAllButton />}
      >
        {/* <div className="grid grid-cols-5 gap-12"> */}
        <div className="flex gap-5 md:gap-10 overflow-x-scroll scroll-hide">
          {buldakdData.map((item) => (
            <SavedCard
              key={item.id}
              spiceRate={item.spiceRate}
              title={item.title}
              starRate={item.starRate}
              image={item.image}
              altMessage={item.title}
              description={item.description || ""}
            />
          ))}
        </div>
      </Section>

      <Section title={"이미 먹어본 레시피"} isTrans hasSub subText="내 점수: 5">
        <div className="flex gap-5 md:gap-10 overflow-x-scroll">
          {buldakdData.map((item) => (
            <SavedCard
              key={item.id}
              spiceRate={item.spiceRate}
              title={item.title}
              starRate={item.starRate}
              image={item.image}
              altMessage={item.title}
              description={item.description || ""}
            />
          ))}
        </div>
      </Section>

      <Section title={"내가 작성한 레시피"} isTrans>
        <div className="flex gap-5 md:gap-10 overflow-x-scroll">
          {buldakdData.slice(3, 7).map((item) => (
            <SavedCard
              key={item.id}
              spiceRate={item.spiceRate}
              title={item.title}
              starRate={item.starRate}
              image={item.image}
              altMessage={item.title}
              description={item.description || ""}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
