export interface Recipe {
  id: number;
  title: string;
  image_path: string;
  description: string;
  ingredients: []; // 재료 ID 배열 (숫자 코드로 내려옴) TODO
  steps: string[];       // 조리 단계 설명
  servings: number;      // 인분 수
  cooking_time: number;  // 조리 시간 (단위는 서버 스펙 확인 필요, 분/초)
  spicy: number;         // 매운 정도 (예: 0~5 스케일)
  saved: number;         // 저장(찜) 수
  views: number;         // 조회 수
  rate: number;          // 평점 (예: 0~5)
  recommend_side_menus: number[]; // 사이드 메뉴 ID 배열
  writer: number;        // 작성자 ID
  comments: number;      // 댓글 수
  created_at: string;    // ISO date string
  updated_at: string;    // ISO date string
}

