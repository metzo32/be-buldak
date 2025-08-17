import { get } from "@/api/api";
import type { Ingredients } from "@/types/FetchIngredientsType";

// 재료 목록
export async function getIngredients() {
  const data = await get<Ingredients[]>("/api/ingredients");

  return data;
}

// 재료 상세
export async function getIngredientsDetails(ingredientId: number) {
  const data = await get<Ingredients>(
    `/api/ingredients/${ingredientId}`
  );

  return data;
}
