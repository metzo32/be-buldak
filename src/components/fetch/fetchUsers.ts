import { _get, _post, _put, _deleteCall } from "@/api/api";
import type {
  LoginRequest,
  RegisterRequest,
  UserProfileResponse,
  UserUpdateData,
} from "@/types/FetchUserTypes";

// 로그인
export async function postLogin(userData: LoginRequest) {
  try {
    const data = await _post("/api/auth/login", userData);
    return { user: data };
  } catch (err) {
    console.log("로그인 에러", err);
    throw err;
  }
}

// 로그아웃
export async function postLogout() {
  try {
    await _post("/api/auth/logout", null);

    document.cookie = "XSRF-TOKEN=; Max-Age=0; path=/";
    // document.cookie = "laravel_session=; Max-Age=0; path=/";

    console.log("로그아웃 성공", "현재 쿠키:", document.cookie);
    return;
  } catch (err) {
    console.log("헉! 로그아웃 에러", err);
  }
}

// 회원가입
export async function postRegister(userData: RegisterRequest): Promise<boolean> {
  try {
    const data = await _post("/api/users", userData);

    if (!data) {
      console.error("회원가입 실패: 응답 없음");
      return false;
    }

    console.log("회원가입 성공");
    return true;
  } catch (error) {
    console.error("네트워크 오류:", error);
    return false; 
  }
}


export async function getCurrentUser() {
  try {
    const res = await _get("/api/auth/user");
    console.log("유저", res)

    if (res.message === "Unauthenticated.") {
      return null;
    }

    return res;
  } catch (err) {
    console.log("사용자 찾을 수 없음", err);
    return null;
  }
}

export async function getUserDetail(userId: number) {
  const data = await _get<UserProfileResponse>(`/api/users/${userId}`);
  return data;
}

export async function deleteUser(userId: number) {
  return _deleteCall(`/api/users/${userId}`);
}

export async function updateUser(userId: number, userData: UserUpdateData) {
  return _put(`/api/users/${userId}`, userData);
}
