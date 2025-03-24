import Image from "next/image";
import InfoButton from "@/components/InfoButton";
import Blur from "@/components/Blur";
import Section from "@/components/Section";
import SavedCard from "@/components/SavedCard";
import { buldakdData } from "../../../public/assets/fakeData/fakeData";
import { ButtonPlain } from "@/components/Buttons";

export default function UserPage() {
  return (
    <>
      <section className="py-48 flex flex-col items-center gap-12">
        <div className="flex gap-5 items-center relative z-2">
          <h2 className="text-4xl">나의 맵티어는...</h2>
          <InfoButton />
        </div>
        <div className="relative w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px]">
          <Image
            src={"/assets/images/level_test.png"}
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
        <h6>내가 작성한 레시피</h6>
      </Section>
      <Section title={"저장한 레시피"} isTrans={true}>
        <div className="grid grid-cols-5 gap-12">
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

      <Section title={"이미 먹어본 레시피"} isTrans={true}>
        <div className="grid grid-cols-5 gap-12">
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
    </>
  );
}
