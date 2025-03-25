import SearchCard from "@/components/SearchCard";
import { buldakdData } from "../../../public/assets/fakeData/fakeData";
import FilterOptions from "@/components/FilterOptions";

export default function SearchPage() {
  return (
    <section className="comment-section">
      <div className="flex items-end justify-between">
        <h2 className="text-xl lg:text-3xl 2xl:text-4xl">둘러보기</h2>
        <FilterOptions />
      </div>
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
    </section>
  );
}
