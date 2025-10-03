import Section from "./ui/Section";
import RecoCard from "./RecoCard";
import { buldakdData } from "../../public/assets/fakeData/fakeData";

export default function Recommend() {
  
  return (
    <Section title={"오늘의 추천"}>
      <div className="w-full flex items-center justify-center 2xl:justify-start">

      <div className="grid grid-rows-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2 2xl:flex 2xl:justify-between 2xl:w-full gap-10 ">
        {buldakdData.slice(0, 4).map((item) => (
          <RecoCard
            key={item.id}
            spiceRate={item.spiceRate}
            title={item.title}
            starRate={item.starRate}
            details={item.description}
            image={item.image}
            altMessage={item.title}
            description={item.description || ""}
          />
        ))}
      </div>
      </div>
    </Section>
  );
}
