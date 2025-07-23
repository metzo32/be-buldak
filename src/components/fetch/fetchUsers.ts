import { get, post, put, deleteCall } from "@/api/api";
import type {
  LoginRequest,
  RegisterRequest,
  UserProfileResponse,
  UserUpdateData,
} from "@/types/FetchUserTypes";

export async function postLogout() {
  try {
    const response = await post("/api/auth/logout", null); // post할 두번째 인자가 없음

    if (!response.ok) {
      console.log("로그아웃 실패");
    }
  } catch (err) {
    console.log("로그아웃 에러", err);
  }
}

export async function postLogin(userData: LoginRequest) {
  try {
    const data = await post("/api/auth/login", userData);
    return { user: data };
  } catch (err) {
    console.error("로그인 에러", err);
    throw err;
  }
}

export async function postRegister(userData: RegisterRequest): Promise<void> {
  try {
    const response = await post("/api/users", userData);

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
  return deleteCall(`/api/users/${userId}`);
}

export async function updateUser(userId: number, userData: UserUpdateData) {
  return put(`/api/users/${userId}`, userData);
}
