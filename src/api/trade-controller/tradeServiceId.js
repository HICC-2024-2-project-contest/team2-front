import api from "../api"; // Axios 설정 파일을 임포트

/**
 * 특정 거래 아이템 조회 API
 * @param {number} itemId - 조회할 아이템 ID
 * @returns {Promise<Object>} - 아이템 상세 정보 반환
 */
export const fetchTradeItemById = async (itemId) => {
  try {
    const response = await api.get(`/items/${itemId}`);
    return response.data; // API 응답 데이터 반환
  } catch (error) {
    console.error("거래 아이템 상세 조회 API 오류:", error);
    throw error; // 오류 발생 시 예외 처리
  }
};
