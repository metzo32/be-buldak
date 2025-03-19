import Image from "next/image";
import InfoButton from "@/components/InfoButton";
import Blur from "@/components/Blur";
import Section from "@/components/Section";
import SavedCard from "@/components/SavedCard";
import { buldakdData } from "../../../public/assets/fakeData/fakeData";

export default function UserPage() {
  return (
    <>
      <section className="py-48 flex flex-col items-center gap-12">
        <div className="flex gap-5 items-center relative z-2">
          <h2 className="text-4xl">나의 맵티어는...</h2>
          <InfoButton />
        </div>
        <Image
          src={"/assets/images/level_test.png"}
          alt={"티어이미지"}
          width={500}
          height={250}
          className="relative z-1"
        />
        <Blur />
      </section>

      <Section title={"저장한 레시피"} isTrans={true}>
        <div className="grid grid-cols-5 gap-12">
          {buldakdData.map((item) => (
            <SavedCard
              key={item.id}
              spiceRate={item.spiceRate}
              title={item.title}
              starRate={item.starRate}
              image={item.image}
              altMessage={item.altMessage}
              description={item.description || ""}
            />
          ))}
        </div>
      </Section>

      <Section title={"이미 먹어본 레시피"} isTrans={true}>
        엥
      </Section>
    </>
  );
}
