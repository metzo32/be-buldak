export const baseURL = process.env.NEXT_PUBLIC_API_URL; // 기본 경로

import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const axios = Axios.create({ baseURL, withCredentials: true }); // baseURL을 항상 가지고 있는 인스턴스 생성


// 기본 config에 Authorization헤더가 있다면 자동 추가하기 (쿠키)
const _getHeader = (config?: AxiosRequestConfig) => {
  let csrfToken: string | null = null;

  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const getCookie = (key: string) =>
      cookies.find((row) => row.startsWith(`${key}=`))?.split("=")[1] || null;

      csrfToken = getCookie("csrf_token"); 
  }

  const headers: Record<string, string> = {};


  if (csrfToken) {
    headers["X-CSRF-TOKEN"] = csrfToken; // CSRF 토큰을 X-CSRF-TOKEN 헤더로 추가하는 부분
  }

  console.log("최종 헤더:", headers);

  return {
    ...(config || {}),
    headers: {
      ...(config?.headers || {}),
      ...headers, // 최종 헤더에 넣기
    },
  };
};


// 매번 axios.get()을 쓰지 않고, 자동으로 토큰 헤더 추가
export function get<T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const options = _getHeader(config); // config가 있다면 추가해서 getHeader함수 사용
  return axios.get(url, options); // 실제 GET 요청 보내기
}

export function post<T = any>(
  url: string, // 요청 주소
  data: any, // 서버에 보낼 데이터. POST body
  options?: any // 그외 params, timeout, headers 등
): Promise<AxiosResponse> {
  const baseHeaders = _getHeader()["headers"]; // 헤더 중 Authorization 프로퍼티 가져오기
  const extraHeaders = options?.["headers"] ?? {}; //전달한 option에 headers 항목이 있다면 헤더에 추가, 없다면 빈 객체
  const headers = { ...baseHeaders, ...extraHeaders }; //헤더 합치기
  return axios.post(url, data, { ...options, headers });
}

export function patch<T = any>(
  url: string,
  data: any
): Promise<AxiosResponse<T>> {
  const options = _getHeader();
  return axios.patch(url, data, options);
}

export const deleteCall = (url: string, data?: any) => {
  const options = _getHeader();
  return axios.delete(url, { ...options, data });
};

export function put<T = any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  const options = _getHeader(config); // Authorization 등 포함된 헤더 세팅
  return axios.put(url, data, options); // PUT 요청
}
