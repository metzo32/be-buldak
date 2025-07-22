import { get, post, put, deleteCall } from "@/api/api";
import type {
  LoginRequest,
  RegisterRequest,
  UserProfileResponse,
  UserUpdateData,
} from "@/types/FetchUserTypes";

export async function getToken(): Promise<string | null> {
  try {
    const csrfRes = await fetch("http://localhost:8080/sanctum/csrf-cookie", {
      credentials: "include",
    });

    if (!csrfRes.ok) {
      console.error("CSRF 토큰 요청 실패");
      return null;
    }

    await new Promise((res) => setTimeout(res, 50));

    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    const csrfToken = match ? decodeURIComponent(match[1]) : "";

    if (!csrfToken) {
      console.error("쿠키에서 CSRF 토큰을 찾을 수 없습니다");
      return null;
    }

    return csrfToken;
  } catch (err) {
    console.error("CSRF 토큰 요청 중 에러", err);
    return null;
  }
}

export async function postLogout() {
const csrfToken = await getToken();
  if (!csrfToken) throw new Error("CSRF 토큰 발급 실패");

  try {
    const response = await fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-XSRF-TOKEN": csrfToken,
      },
    });

    if (!response.ok) {
      console.log("로그아웃 실패");
    }
  } catch (err) {
    console.log("로그아웃 에러", err);
  }
}

export async function postLogin(userData: LoginRequest) {
  const csrfToken = await getToken();
  if (!csrfToken) throw new Error("CSRF 토큰 발급 실패");

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": csrfToken,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("로그인 실패:", errText);
      throw new Error("로그인 실패");
    }

    const data = await response.json();
    return { user: data };
  } catch (err) {
    console.error("로그인 에러", err);
    throw err;
  }
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
