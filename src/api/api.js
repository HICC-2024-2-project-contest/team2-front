import axios from "axios";

// 환경변수를 사용하여 API URL 설정
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://13.209.249.144:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: JWT 토큰 자동 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 로깅 처리
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 요청 에러:", error.response);
    return Promise.reject(error);
  }
);

export default api;
