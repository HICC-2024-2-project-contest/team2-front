import api from "../api"; // Axios 기본 설정 파일 임포트

/**
 * 전시 정보 검색 API 호출
 * @param {Object} params - 검색 파라미터 (startDate, endDate, keyword, fieldId, page, size, sort)
 * @returns {Promise<Object>} - 검색 결과 (exhibitions 리스트 및 pageInfo 포함)
 */
export const fetchExhibitions = async (params) => {
  try {
    const response = await api.get("/exhibitions/search", {
      params: {
        startDate: params.startDate || "2000-01-01", // 기본값 설정
        endDate: params.endDate || "3000-01-01",
        keyword: params.keyword || "",
        fieldId: params.fieldId || null,
        page: params.page || 0,
        size: params.size || 8,
        sort: params.sort || "endDate",
      },
    });
    return response.data; // 검색 결과 반환
  } catch (error) {
    console.error("전시 검색 API 오류:", error);
    throw error; // 호출한 쪽에서 처리할 수 있도록 오류 던지기
  }
};
