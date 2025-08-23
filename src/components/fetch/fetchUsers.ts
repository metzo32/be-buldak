import { get, post, put, deleteCall } from "@/api/api";
import type {
  LoginRequest,
  RegisterRequest,
  UserProfileResponse,
  UserUpdateData,
} from "@/types/FetchUserTypes";

export async function postLogout() {
  try {
    await post("/api/auth/logout", null);
    console.log("로그아웃 성공");
    return;
  } catch (err) {
    console.log("헉! 로그아웃 에러", err);
  }
}

export async function postLogin(userData: LoginRequest) {
  try {
    const data = await post("/api/auth/login", userData);
    return { user: data };
  } catch (err) {
    console.log("로그인 에러", err);
  }
}

export async function postRegister(userData: RegisterRequest): Promise<void> {
  try {
    const { status, ok } = await post("/api/users", userData);

    if (!ok) {
      if (status === 409 || status === 422) {
        console.error("중복된 이메일입니다.");
      } else if (status === 400) {
        console.error("잘못된 요청입니다.");
      } else if (status === 500) {
        console.error("서버 오류가 발생했습니다.");
      }
      return;
    }

    console.log("회원가입 성공");
  } catch (error) {
    console.error("네트워크 오류:", error);
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
