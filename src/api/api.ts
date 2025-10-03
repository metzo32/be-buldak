export const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 쿠키 가져오기
export function getCookie(key: string): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const value = cookies.find((row) => row.startsWith(`${key}=`))?.split("=")[1];
  return value ? decodeURIComponent(value) : null;
}

// let csrfFetched = false;

// CSRF 토큰 가져오기
export async function _getToken(): Promise<string | null> {
  try {
    console.log("🔄 CSRF 토큰 요청 시작...");

    const csrfRes = await fetch(`${baseURL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    console.log("📡 CSRF 응답 상태:", csrfRes.status, csrfRes.statusText);

    if (!csrfRes.ok) {
      console.error("❌ CSRF 토큰 요청 실패");
      return null;
    }

    // 서버가 쿠키를 심을 시간
    await new Promise((res) => setTimeout(res, 500));

    // Laravel Sanctum: XSRF-TOKEN 쿠키 확인
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    const csrfToken = match ? decodeURIComponent(match[1]) : null;

    console.log("🔑 최종 CSRF 토큰:", csrfToken);

    return csrfToken;
  } catch (err) {
    console.error("❌ CSRF 토큰 요청 중 에러", err);
    return null;
  }
}

// 공통 헤더 세팅
const _getHeader = async (init?: RequestInit): Promise<RequestInit> => {
  let csrfToken = getCookie("XSRF-TOKEN");

  if (!csrfToken) {
    console.warn("⚠️ 쿠키에 XSRF-TOKEN 없음, 재요청 시도");
    csrfToken = await _getToken();
  }

  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
    //TODO 바보야.
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (csrfToken) {
    headers["X-XSRF-TOKEN"] = csrfToken; // ✅ 헤더명은 X-XSRF-TOKEN
    console.log("🚀 요청 헤더에 포함된 CSRF:", headers["X-XSRF-TOKEN"]);
  }

  return {
    ...init,
    headers,
    credentials: "include",
  };
};

// const _getHeader = async (init?: RequestInit): Promise<RequestInit> => {
//   await _getToken();

//   let csrfToken: string | null = null;

//   if (typeof document !== "undefined") {
//     const cookies = document.cookie.split("; ");
//     const getCookie = (key: string) =>
//       cookies.find((row) => row.startsWith(`${key}=`))?.split("=")[1] || null;

//     const rawToken = getCookie("XSRF-TOKEN");
//     csrfToken = rawToken ? decodeURIComponent(rawToken) : null;
//   }

//   const headers: Record<string, string> = {
//     ...(init?.headers as Record<string, string>),
//   };

//   if (csrfToken) {
//     headers["X-CSRF-TOKEN"] = csrfToken;

//     console.log(
//       "🚀 [요청 헤더에 들어가는 X-CSRF-TOKEN]:",
//       headers["X-CSRF-TOKEN"]
//     );
//     console.log(
//       "🔍 [쿠키와 헤더 일치 여부]:",
//       csrfToken === headers["X-CSRF-TOKEN"]
//     );
//   } else {
//     console.log("CSRF 토큰이 쿠키에서 발견되지 않았습니다.");
//   }

//   const finalInit: RequestInit = {
//     ...init,
//     headers,
//     credentials: "include",
//   };

//   return finalInit;
// };

export async function _get<T = any>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${baseURL}${url}`,
    await _getHeader({ ...init, method: "GET" })
  );

  return response.json();
}

export async function _post<T = any>(
  url: string,
  data: any,
  init?: RequestInit
): Promise<T | null> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    await _getHeader({
      method: "POST",
      body: JSON.stringify(data),
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
      credentials: "include",
    })
  );

  if (response.status === 204) {
    // 로그아웃 같은 경우 → No Content
    return null;
  }

  return response.json();
}

export async function _put<T = any>(
  url: string,
  data: any,
  init?: RequestInit
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    await _getHeader({
      method: "PUT",
      body: JSON.stringify(data),
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}

export async function _patch<T = any>(
  url: string,
  data?: any,
  init?: RequestInit
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    await _getHeader({
      method: "PATCH",
      body: JSON.stringify(data),
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}

export async function _deleteCall<T = any>(
  url: string,
  data?: any,
  init?: RequestInit
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    await _getHeader({
      method: "DELETE",
      body: data ? JSON.stringify(data) : undefined,
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}
