// 로그인 요청
export interface LoginRequest {
  email: string;
  password: string;
}

// 회원가입 요청
export interface RegisterRequest {
  email: string;
  name: string;
  birth: string;
  password: string;
  password_confirmation: string;
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

// export interface UserProfileResponse {
//   user_id: number;
//   email: string;
//   birth: string; // "2000-01-01" 형식

//   eaten_recipes: RecipeSummary[];
//   saved_recipes: RecipeSummary[];
//   created_recipes: CreatedRecipe[];
//   comments: Comment[];
//   tier: Tier;
// }

export interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  password: string;
  birth: string; // ISO 8601 형식의 날짜 문자열
  provider: string | null;
  provider_id: string | null;
  tier_id: number;
  created_at: string; // ISO 8601 형식의 타임스탬프
  updated_at: string; // ISO 8601 형식의 타임스탬프
}


export interface UserUpdateData {
  email: string;
  name: string;
  birth: string;
}

export interface PwChangePayload {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}
