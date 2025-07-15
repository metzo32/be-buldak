// getRecipe 관련
export interface RecipeSummary {
  id: string;
  title: string;
  description: string;
  image: string;
  spicy: number;
  rate: number;
  views: number;
  saved: number;
  writer: string;
  created_at: string; // ISO 8601 문자열
}

export interface GetRecipeResponse {
  data: RecipeSummary[];
}

// createRecipe 관련
export interface CreateRecipeResponse {
  title: string;
  description: string;
  image?: string;
  spicy: number;
  servings: number;
  cooking_time: number;
}

// updateRecipe 는 createRecipe와 같은 타입
export type UpdateRecipeRequest = CreateRecipeResponse

// getRecipeDetail 관련
export interface Ingredient {
  name: string;
  description: string;
  image: string;
}

export interface Comment {
  context: string;
  writer: string;
  created_at: string; // ISO 형식 문자열
}

export interface RecipeDetail {
  title: string;
  description: string;
  image: string;
  spicy: number;
  rate: number;
  views: number;
  saved: number;
  writer: string;
  ingredient_list: Ingredient[];
  servings: number;
  cooking_time: number;
  comment_list: Comment[];
  created_at: string; // ISO 형식 문자열
}

export interface RecipeDetailResponse {
  data: RecipeDetail[];
}
