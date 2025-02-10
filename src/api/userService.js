import api from "./api";

// 사용자 생성 API 호출
export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("사용자 생성 실패:", error.response?.data || error.message);
    throw error;
  }
};
