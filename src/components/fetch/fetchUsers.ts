import { get, post, put, deleteCall } from "@/api/api";
import type {
  LoginRequest,
  RegisterRequest,
  UserProfileResponse,
  UserUpdateData,
} from "@/types/FetchUserTypes";

export async function getToken(): Promise<boolean> {
  console.log("getToken 호출");

  try {
    const response = await fetch("http://localhost:8080/sanctum/csrf-cookie", {
      credentials: "include",
    });

    console.log("fetch 완료", response.status); // 204

    if (!response.ok) throw new Error();

    console.log("✅ CSRF 쿠키 생성 성공!", response);
    return true;
  } catch (error) {
    console.error("❌ CSRF 쿠키 요청 실패:", error);
    return false;
  }
}

export async function postLogin(userData: LoginRequest) {
  const ok = await getToken();
  if (!ok) throw new Error("CSRF 토큰 발급 실패");

  const data = await post("/api/auth/login", userData);
  return {
    user: data,
  };
}

export async function postRegister(userData: RegisterRequest): Promise<void> {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(userData), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("회원가입 실패:", response.status, errorText);
      throw new Error(`회원가입 실패 (status: ${response.status})`);
    }

    console.log("회원가입 성공");
  } catch (error) {
    console.error("네트워크 오류 또는 처리 중 에러:", error);
    throw error;
  }
}

export async function postLogout() {
  const ok = await getToken();
  if (!ok) throw new Error("CSRF 토큰 발급 실패");

  return post("/api/auth/logout", {});
}

export async function getUserDetail(userId: number) {
  const data = await get<UserProfileResponse>(`/api/users/${userId}`);
  return data;
}

export async function deleteUser(userId: number) {
  const ok = await getToken();
  if (!ok) throw new Error("CSRF 토큰 발급 실패");

  return deleteCall(`/api/users/${userId}`);
}

export async function updateUser(userId: number, userData: UserUpdateData) {
  const ok = await getToken();
  if (!ok) throw new Error("CSRF 토큰 발급 실패");

  return put(`/api/users/${userId}`, userData);
}
