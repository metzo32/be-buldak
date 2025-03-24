import SearchCard from "@/components/SearchCard";
import { buldakdData } from "../../../public/assets/fakeData/fakeData";
import Section from "@/components/Section";

export default function SearchPage() {
  return (

    <Section title="둘러보기" isTrans hasFilter>

      {buldakdData.map((item) => (
        <SearchCard
          key={item.id}
          spiceRate={item.spiceRate}
          title={item.title}
          starRate={item.starRate}
          image={item.image}
          altMessage={item.title}
          description={item.description || ""}
        />
      ))}
      </Section>

  );
}
