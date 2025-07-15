import { post } from "@/api/api";
import type {
  PasswordChangeRequest,
  VerifyCodeRequest,
} from "@/types/FetchPasswordTypes";

export async function resetPassword(userEmail: string) {
  return post("/api/password/reset", userEmail);
}

export async function verifyCode(data: VerifyCodeRequest) {
  return post("/api/password/verify-code", data);
}

export async function changePassword(updatePassword: PasswordChangeRequest) {
  return post("/api/password/change", updatePassword);
}
