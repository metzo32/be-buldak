"use client";

import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRecipes } from "@/components/fetch/fetchRecipies";
import SearchCard from "@/components/SearchCard/SearchCard";
import FilterOptions from "@/components/FilterOptions";
import SearchCardSkeleton from "@/components/SearchCard/SearchCard.skeleton";

function RecipeList() {
  const { data: recipes } = useSuspenseQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    retry: false,
  });

  return (
    <>
      {recipes.map((item) => (
        <SearchCard
          key={item.id}
          id={item.id}
          spicy={item.spicy}
          title={item.title}
          rate={item.rate}
          image={item.image_path}
          altMessage={item.title}
          description={item.description || ""}
        />
      ))}
    </>
  );
}

export default function SearchPage() {
  return (
    <section
      className="px-10 py-10 mb-24 flex flex-col gap-15 relative z-1
    md:px-24 md:py-12 2xl:px-72 xl:py-24"
    >
      <div className="flex items-end justify-between">
        <h2 className="text-xl lg:text-3xl 2xl:text-4xl">둘러보기</h2>
        <FilterOptions />
      </div>

      <Suspense fallback={<SearchCardSkeleton />}>
        <RecipeList />
      </Suspense>
    </section>
  );
}
