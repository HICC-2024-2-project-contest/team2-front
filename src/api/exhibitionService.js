import api from "./api";

// 전시 리스트 가져오기 (최대 4개)
export const fetchExhibitions = async () => {
  try {
    const response = await api.get("/exhibitions?limit=4"); // 최대 4개만 가져오기
    return response.data;
  } catch (error) {
    console.error("전시 목록 불러오기 실패:", error);
    throw error;
  }
};
