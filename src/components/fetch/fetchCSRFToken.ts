import { get } from "@/api/api";

export default async function fetchCSRFToken() {
  const token = await get(`/api/auth/csrf-token`);

  return token;
}
