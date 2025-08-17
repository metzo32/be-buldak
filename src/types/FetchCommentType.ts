export interface CommentReq {
  recipe_id: number;
  score: number;
  context: string;
}

export interface CommentRes {
  id: number;
  recipe_id: number;
  user_id: number;
  score: number;
  context: string;
  created_at: string; // ISO 8601 날짜 문자열
  updated_at: string; // ISO 8601 날짜 문자열
}
