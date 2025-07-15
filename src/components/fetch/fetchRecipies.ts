import { deleteCall, get, post, put } from "@/api/api";
import type {
  GetRecipeResponse,
  CreateRecipeResponse,
  RecipeDetailResponse,
  UpdateRecipeRequest,
} from "@/types/FetchRecipeTypes";

export async function getRecipe(userId: number) {
  const { data } = await get<GetRecipeResponse>("api/recipe");

  return data;
}

export async function createRecipe(recipe: CreateRecipeResponse) {
  return post("api/recipe", recipe);
}

export async function getRecipeDetail(targetId: number) {
  const { data } = await get<RecipeDetailResponse>(`api/recipe/${targetId}`);

  return data;
}

export async function updateRecipe(
  targetId: number,
  options: UpdateRecipeRequest
) {
  return put(`api/recipe/${targetId}`, options);
}

export async function deleteRecipe(targetId: number) {
  return deleteCall(`api/recipe/${targetId}`);
}
