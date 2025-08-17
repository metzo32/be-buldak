export interface Recipe {
  id: number;
  title: string;
  image_path: string;
  description: string;
  ingredients: number[];
  steps: string[];
  servings: number;
  cooking_time: number;
  spicy: number;
  saved: number;
  views: number;
  rate: number;
  recommend_side_menus: number[];
  writer: number;
  comments: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
