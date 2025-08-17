import { deleteCall, get, patch, post, put } from "@/api/api";
import type { Recipe } from "@/types/FetchRecipieType";

// 레시피 목록
export async function getRecipies() {
  const data = await get<Recipe[]>("/api/recipies");

  return data;
}

// 레시피 등록
export async function postRecipies({ recipe }: { recipe: Recipe }) {
  const data = await post<Recipe[]>("/api/recipies", recipe);

  return data;
}

// 레시피 상세
export async function getRecipieDetails(recipeId: number) {
  const data = await get<Recipe[]>(`/api/recipies/${recipeId}`);

  return data;
}

// 레시피 수정
export async function editRecipe({
  recipeId,
  newData,
}: {
  recipeId: number;
  newData: Recipe;
}) {
  const data = await put<Recipe[]>(`/api/recipies/${recipeId}`, newData);

  return data;
}

// 레시피 삭제
export async function deleteRecipe(recipeId: number) {
  return deleteCall(`/api/users/${recipeId}`);
}

// 조회수 +1
export async function addViewCount(recipeId: number) {
  const data = await patch(`/api/recipes/${recipeId}/view`);

  return data;
}

// 저장 토글
export async function saveRecipe(recipeId: number) {
  const data = await patch(`/api/recipes/${recipeId}/save`);

  return data;
}

// 먹음 토글
export async function triedRecipe(recipeId: number) {
  const data = await patch(`/api/recipes/${recipeId}/eat`);

  return data;
}

// 특정 유저가 작성한 레시피 목록
export async function getRecipiesPostesByUser(userId: number) {
  const data = await get<Recipe[]>(`/api/users/${userId}/recipes`);

  return data;
}

// 특정 유저가 저장한 레시피 목록
export async function getRecipiesSavedByUser(userId: number) {
  const data = await get<Recipe[]>(`/api/users/${userId}/saved-recipes`);

  return data;
}

// 특정 유저가 먹은 레시피 목록
export async function getRecipiesTriedByUser(userId: number) {
  const data = await get<Recipe[]>(`/api/users/${userId}/eaten-recipes`);

  return data;
}
