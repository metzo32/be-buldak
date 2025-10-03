import { _deleteCall, _get, _patch, _post, _put } from "@/api/api";
import type { Recipe } from "@/types/FetchRecipeType";

// 레시피 목록
export async function getRecipes() {
  const res = await _get<{ data: Recipe[] }>("/api/recipes");

  return res.data;
}

// 레시피 등록
export async function postRecipes({ recipe }: { recipe: Recipe }) {
  const data = await _post<Recipe[]>("/api/recipes", recipe);

  return data;
}

// 레시피 상세
export async function getRecipeDetails(recipeId: number) {
  const data = await _get(`/api/recipes/${recipeId}`);

  console.log("레시피 상세", data.data)
  return data.data;
}

// 레시피 수정
export async function editRecipe({
  recipeId,
  newData,
}: {
  recipeId: number;
  newData: Recipe;
}) {
  const data = await _put<Recipe[]>(`/api/recipes/${recipeId}`, newData);

  return data;
}

// 레시피 삭제
export async function deleteRecipe(recipeId: number) {
  return _deleteCall(`/api/users/${recipeId}`);
}

// 조회수 +1
export async function addViewCount(recipeId: number) {
  const data = await _patch(`/api/recipes/${recipeId}/view`);

  return data;
}

// 저장 토글
export async function saveRecipe(recipeId: number) {
  const data = await _patch(`/api/recipes/${recipeId}/save`);

  return data;
}

// 먹음 토글
export async function triedRecipe(recipeId: number) {
  const data = await _patch(`/api/recipes/${recipeId}/eat`);

  return data;
}

// 특정 유저가 작성한 레시피 목록
export async function getRecipesPostesByUser(userId: number) {
  const data = await _get<Recipe[]>(`/api/users/${userId}/recipes`);

  return data;
}

// 특정 유저가 저장한 레시피 목록
export async function getRecipesSavedByUser(userId: number) {
  const data = await _get<Recipe[]>(`/api/users/${userId}/saved-recipes`);

  return data;
}

// 특정 유저가 먹은 레시피 목록
export async function getRecipesTriedByUser(userId: number) {
  const data = await _get<Recipe[]>(`/api/users/${userId}/eaten-recipes`);

  return data;
}
