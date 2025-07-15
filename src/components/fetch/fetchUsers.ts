// 로그인
import { axios, deleteCall, get, post, put } from "@/api/api";
import type {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  UserProfileResponse,
  UserUpdateData,
} from "@/types/FetchUserTypes";

// CSRF 토큰 받아오기
export async function getToken() {
  try {
    const response = await axios.get(
      "http://localhost:8080/sanctum/csrf-cookie",
      {
        withCredentials: true,
      }
    );

    console.log("CSRF 쿠키 생성 성공!", response);

    return true;
  } catch (error) {
    console.log("CSRF 토큰 요청 실패", error);
    return false;
  }
}

// 회원가입
export async function postRegister(
  userData: RegisterRequest
): Promise<RegisterResponse> {
  const { data } = await post("/api/auth/register", userData);

  return data;
}

export async function postLogin(userData: LoginRequest) {
  // return post("/api/auth/login", csrfToken, userData);

  const response = await post("/api/auth/login", userData);
  const token = response.data?.accessToken; // 유저 토큰 추출하기
  const userInfo = response.data;

  if (token) {
    localStorage.setItem("accessToken", token);
  }

  return {
    accessToken: token,
    user: userInfo,
  };
}

// 로그아웃
export async function postLogout(jwtToken: string, csrfToken: string) {
  return post("/api/auth/logout", jwtToken, csrfToken);
}

// 유저 상세정보 조회
export async function getUserDetail(userId: number) {
  const { data } = await get<UserProfileResponse>(`/api/users/${userId}`);

  return data;
}

// 회원 탈퇴
export async function deleteUser(userId: number) {
  return deleteCall(`/api/users/${userId}`);
}

// 유저 정보 수정
export async function updateUser(userId: number, userData: UserUpdateData) {
  return put(`/api/users/${userId}`, userData);
}
