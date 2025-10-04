import { cookies } from "next/headers";
export async function isLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const xsrf = cookieStore.get("XSRF-TOKEN");
  const session = cookieStore.get("laravel_session");

  return !!(xsrf || session);
}
