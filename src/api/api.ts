export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function getToken(): Promise<string | null> {
  try {
    const csrfRes = await fetch(`${baseURL}/sanctum/csrf-cookie`, {
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

// 공통 헤더 추출
const _getHeader = async (init?: RequestInit): Promise<RequestInit> => {
  await getToken();

  let csrfToken: string | null = null;

  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const getCookie = (key: string) =>
      cookies.find((row) => row.startsWith(`${key}=`))?.split("=")[1] || null;

    const rawToken = getCookie("XSRF-TOKEN");
    csrfToken = rawToken ? decodeURIComponent(rawToken) : null;
  }

  const headers: Record<string, string> = {
    ...(init?.headers as Record<string, string>),
  };

  if (csrfToken) {
    headers["X-CSRF-TOKEN"] = csrfToken;

    // console.log(
    //   "🚀 [요청 헤더에 들어가는 X-CSRF-TOKEN]:",
    //   headers["X-CSRF-TOKEN"]
    // );
    // console.log(
    //   "🔍 [쿠키와 헤더 일치 여부]:",
    //   csrfToken === headers["X-CSRF-TOKEN"]
    // );
  } else {
    console.warn("CSRF 토큰이 쿠키에서 발견되지 않았습니다.");
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
    await _getHeader({ ...init, method: "GET" })
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
    await _getHeader({
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
    await _getHeader({
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
    await _getHeader({
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
    await _getHeader({
      method: "DELETE",
      body: data ? JSON.stringify(data) : undefined,
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
    })
  );

  return response.json();
}
