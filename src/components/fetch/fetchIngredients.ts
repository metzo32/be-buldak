import { _get } from "@/api/api";
import type { Ingredients } from "@/types/FetchIngredientsType";

// 재료 목록
export async function getIngredients() {
  const data = await _get<Ingredients[]>("/api/ingredients");

  console.log("재료", data)

  return data;
}

// 재료 상세
export async function getIngredientsDetails(ingredientId: number) {
  const data = await _get<Ingredients>(
    `/api/ingredients/${ingredientId}`
  );

  console.log("재료 상세", data)

  return data;
}
