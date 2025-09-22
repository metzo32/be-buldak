import { _get } from "@/api/api";
import type { SideMenus } from "@/types/SideMenusTypes";

export async function getSideMenus() {
  const data = await _get<SideMenus>("/api/side_dishes");

  return data;
}
