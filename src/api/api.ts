export const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 쿠키 가져오기
export function getCookie(key: string): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split("; ");
  const value = cookies.find((row) => row.startsWith(`${key}=`))?.split("=")[1];
  return value ? decodeURIComponent(value) : null;
}

let csrfFetched = false;

export async function _getToken(): Promise<string | null> {
  // Reset the flag to allow refetching
  csrfFetched = false;

  try {
    console.log("🔄 CSRF 토큰 요청 시작...");

    const csrfRes = await fetch(`${baseURL}/sanctum/csrf-cookie`, {
      credentials: "include", // 쿠키 주고받기 가능
    });

    console.log("📡 CSRF 응답 상태:", csrfRes.status, csrfRes.statusText);
    console.log("🍪 응답 쿠키:", csrfRes.headers.get("set-cookie"));

    if (!csrfRes.ok) {
      console.error(
        "❌ CSRF 토큰 요청 실패:",
        csrfRes.status,
        csrfRes.statusText
      );
      return null;
    }

    await new Promise((res) => setTimeout(res, 1000)); // 서버가 쿠키 세팅할 시간 주기

    // XSRF-TOKEN: CSRF 보호용 토큰이 들어 있는 쿠키
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    // URL 인코딩 되어있을 수 있으므로 decodeURIComponent로 디코딩
    const csrfToken = match ? decodeURIComponent(match[1]) : "";

    console.log("🔍 전체 쿠키:", document.cookie);
    console.log("🎯 XSRF-TOKEN 매치:", match);
    console.log("🔑 디코딩된 CSRF 토큰:", csrfToken);

    if (!csrfToken) {
      console.error("❌ 쿠키에서 CSRF 토큰을 찾을 수 없습니다");
      return null;
    }

    console.log("✅ CSRF 토큰 성공적으로 가져옴:", csrfToken);
    return csrfToken;
    
  } catch (err) {
    console.error("❌ CSRF 토큰 요청 중 에러", err);
    return null;
  }
}

// 공통 헤더 추출
const _getHeader = async (init?: RequestInit): Promise<RequestInit> => {
  let csrfToken = getCookie("XSRF-TOKEN");

  // console.log("🔍 초기 CSRF 토큰 확인:", csrfToken);

  if (!csrfToken) {
    console.warn(
      "⚠️ 쿠키에서 CSRF 토큰을 찾지 못했습니다. 토큰을 요청합니다..."
    );
    await _getToken();
    csrfToken = getCookie("XSRF-TOKEN");
    console.log("🔄 토큰 요청 후 CSRF 토큰:", csrfToken);
  }

  // console.log("🟡 현재 쿠키에서 가져온 XSRF-TOKEN:", csrfToken);

  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
  };

  if (csrfToken) {
    headers["X-XSRF-TOKEN"] = csrfToken;
    // console.log("🚀 [요청 헤더에 들어가는 X-CSRF-TOKEN]:", csrfToken);
    console.log(
      "🔍 [쿠키와 헤더 일치 여부]:",
      csrfToken === headers["X-XSRF-TOKEN"]
    );
    console.log("📋 최종 요청 헤더:", headers);
  } else {
    console.log("⚠️ CSRF 토큰을 가져올 수 없습니다.");
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
