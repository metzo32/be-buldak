import Section from "./Section";
import RecoCard from "./RecoCard";
import { buldakdData } from "../../public/assets/fakeData/fakeData";

export default function Recommend() {
  return (
    <Section title={"오늘의 추천"}>
      <div className="flex justify-between">
        {buldakdData.slice(0, 4).map((item) => (
          <RecoCard
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
  );
}
