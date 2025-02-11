import api from "../api"; // Axios 기본 설정 파일 임포트

/**
 * 특정 전시 ID로 전시 정보를 가져오는 함수
 * @param {number} exhibitionId - 조회할 전시 ID
 * @returns {Promise<Object>} - 전시 정보 반환
 */
export const fetchExhibitionById = async (exhibitionId) => {
  try {
    const response = await api.get(`/exhibitions/${exhibitionId}`);
    return response.data; // API에서 반환된 데이터 반환
  } catch (error) {
    console.error(`전시 ID ${exhibitionId} 데이터 불러오기 오류:`, error);
    throw error; // 호출한 쪽에서 처리할 수 있도록 오류 던지기
  }
};
