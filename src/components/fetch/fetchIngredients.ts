import { get } from "@/api/api";
import type { IngredientsResponse } from "@/types/FetchIngredientsType";

export async function getIngredients() {
  const { data } = await get<IngredientsResponse>("/api/ingredients");

  return data;
}
