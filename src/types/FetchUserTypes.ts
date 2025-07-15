// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답
export interface LoginResponse {
  user_id: number;
  access_token: string;
  token_type: "Bearer";
}

// 회원가입 요청
export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation: string;
  name: string;
  birthdate: string;
}

// 회원가입 응답
export interface RegisterResponse {
  access_token: string;
  token_type: "Bearer";
}

// 유저 상세정보 관련
export interface RecipeSummary {
  name: string;
  description: string;
  image: string;
  created_at: string; // ISO 8601 형식
}

export interface CreatedRecipe extends RecipeSummary {
  views: number;
  saves: number;
}

export interface Comment {
  recipe_name: string;
  comment: string;
  created_at: string;
}

export interface Tier {
  name: string;
  image: string;
}

export interface UserProfileResponse {
  user_id: number;
  email: string;
  birthdate: string; // "2000-01-01" 형식

  eaten_recipes: RecipeSummary[];
  saved_recipes: RecipeSummary[];
  created_recipes: CreatedRecipe[];
  comments: Comment[];
  tier: Tier;
}

export interface UserUpdateData {
  email: string;
  name: string;
  birthdate: string;
}
