import { _get } from "@/api/api";

export default async function fetchCSRFToken() {
  const token = await _get(`/api/auth/csrf-token`);

  return token;
}
