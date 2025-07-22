export const baseURL = process.env.NEXT_PUBLIC_API_URL;

// 공통 헤더 추출
const _getHeader = (init?: RequestInit): RequestInit => {
  let csrfToken: string | null = null;

  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const getCookie = (key: string) =>
      cookies.find((row) => row.startsWith(`${key}=`))?.split("=")[1] || null;

    const rawToken = getCookie("XSRF-TOKEN");
    csrfToken = rawToken ? decodeURIComponent(rawToken) : null;

    console.log("🍪 [쿠키에서 가져온 XSRF-TOKEN]:", csrfToken);
  }

  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
  };

  if (csrfToken) {
    headers["X-CSRF-TOKEN"] = csrfToken;

    console.log("🚀 [요청 헤더에 들어가는 X-CSRF-TOKEN]:", headers["X-CSRF-TOKEN"]);
    console.log("🔍 [쿠키와 헤더 일치 여부]:", csrfToken === headers["X-CSRF-TOKEN"]);
  } else {
    console.warn("⚠️ CSRF 토큰이 쿠키에서 발견되지 않았습니다.");
  }

  const finalInit: RequestInit = {
    ...init,
    headers,
    credentials: "include",
  };

  return finalInit;
};



export async function get<T = any>(
  url: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${baseURL}${url}`,
    _getHeader({ ...init, method: "GET" })
  );

  return response.json();
}

export async function post<T = any>(
  url: string,
  data: any,
  init?: RequestInit
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    _getHeader({
      method: "POST",
      body: JSON.stringify(data),
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}

export async function put<T = any>(
  url: string,
  data: any,
  init?: RequestInit
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    _getHeader({
      method: "PUT",
      body: JSON.stringify(data),
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}

export async function patch<T = any>(
  url: string,
  data: any,
  init?: RequestInit
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    _getHeader({
      method: "PATCH",
      body: JSON.stringify(data),
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}

export async function deleteCall<T = any>(
  url: string,
  data?: any,
  init?: RequestInit
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(
    `${baseURL}${url}`,
    _getHeader({
      method: "DELETE",
      body: data ? JSON.stringify(data) : undefined,
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}
