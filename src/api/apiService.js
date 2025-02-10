import api from "./api";

// 1. GET 요청 - 아이템 목록 조회
export const fetchItems = async () => {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    console.error("아이템 목록 조회 실패:", error);
    throw error;
  }
};

// 2. POST 요청 - 새로운 아이템 등록
export const createItem = async (itemData) => {
  try {
    const response = await api.post("/items", itemData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("아이템 등록 실패:", error);
    throw error;
  }
};
