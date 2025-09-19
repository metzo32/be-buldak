import { _get } from "@/api/api";
import type { SideDishesResponse } from "@/types/FetchSideDishesTypes";

export async function getSideDishes() {
  const data = await _get<SideDishesResponse>("/api/side_dishes");

  return data;
}
