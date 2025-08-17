"use client";

import SearchCard from "@/components/SearchCard";
import { buldakdData } from "../../../public/assets/fakeData/fakeData";
import FilterOptions from "@/components/FilterOptions";
import { useEffect, useState } from "react";
import { getRecipes } from "@/components/fetch/fetchRecipies";
import type { Recipe } from "@/types/FetchRecipeType";

export default function SearchPage() {

  const [recipesArr, setRecipesArr] = useState<Recipe[]>([])

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await getRecipes();
      console.log(recipes); 

      setRecipesArr(recipes)
    }

    fetchRecipes();
  }, []);

  return (
    <section className="comment-section">
      <div className="flex items-end justify-between">
        <h2 className="text-xl lg:text-3xl 2xl:text-4xl">둘러보기</h2>
        <FilterOptions />
      </div>
      {recipesArr.map((item) => (
        <SearchCard
          key={item.id}
          spicy={item.spicy}
          title={item.title}
          rate={item.rate.toString()} // TODO
          image={item.image_path}
          altMessage={item.title}
          description={item.description || ""}
        />
      ))}
    </section>
  );
}
