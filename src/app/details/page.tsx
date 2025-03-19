import { ButtonStrong } from "@/components/Buttons";
import Blur from "@/components/Blur";
import Image from "next/image";
import Section from "@/components/Section";
import Comments from "@/components/Comments";
import Recommend from "@/components/Recommend";

export default function page() {
  return (
    <>
      <section className="px-80 py-40 relative z-1 flex justify-between items-center">
        <div className="flex flex-col gap-12 ">
          <h1 className="text-8xl font-bold">레시피 이름</h1>
          <h2 className="text-4xl text-primary">이 레시피에 대한 키워드</h2>
          <div className="flex gap-10 text-2xl">
            <p>🔥🔥🔥</p>
            <p>★ 4.5</p>
          </div>
          <div className="flex gap-20 relative z-1">
            <ButtonStrong text="먹어봤어요" />
            <ButtonStrong text="버튼" />
          </div>
        </div>
        <Image
          src={"/assets/images/image_detail.png"}
          alt="조리 이미지"
          width={650}
          height={400}
        />
        <Blur />
      </section>

      <Section title="재료">
        <div className="flex items-center justify-between text-2xl">
          <p>불닭볶음면 1봉</p>
          <p>슬라이스 치즈 1장</p>
          <p>우유 1컵</p>
          <p>마늘 약간</p>
        </div>
      </Section>

      <span className="pb-24 flex items-center justify-center">
        <Image
          src="/assets/icons/ramen.svg"
          alt="라면 아이콘"
          width={100}
          height={100}
        />
      </span>

      <Section title="만드는 법">
        <div className="flex flex-col gap-10 text-2xl">
          <div className="flex gap-5 items-end">
            <span className="text-primary text-4xl">1.</span>
            <p>만드는 과정</p>
          </div>
          <div className="flex gap-5 items-end">
            <span className="text-primary text-4xl">2.</span>
            <p>만드는 과정</p>
          </div>
          <div className="flex gap-5 items-end">
            <span className="text-primary text-4xl">3.</span>
            <p>만드는 과정</p>
          </div>
          <div className="flex gap-5 items-end">
            <span className="text-primary text-4xl">4.</span>
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

      <Recommend/>
    </>
  );
}
