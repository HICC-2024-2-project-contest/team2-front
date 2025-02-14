import api from "../api"; // Axios 기본 설정 파일 임포트

/**
 * 거래 검색 API 호출
 * @param {Object} params - 검색 파라미터 (keyword, artworkTypeId, materialId, toolId, status, minPrice, maxPrice, pageable)
 * @returns {Promise<Object>} - 검색 결과 (거래 목록 및 페이지 정보 포함)
 */
export const fetchTrades = async (params) => {
  try {
    const validStatus = ["NEW", "USED"];
    const statusValue = validStatus.includes(params.status) ? params.status : null;

    const response = await api.get("/items/search", {
      params: {
        keyword: params.keyword || "", // 기본값 설정
        artworkTypeId: params.artworkTypeId || null,
        materialId: params.materialId || null,
        toolId: params.toolId || null,
        status: statusValue, // "NEW" 또는 "USED"만 허용
        minPrice: params.minPrice || null,
        maxPrice: params.maxPrice || null,
        page: params.page || 0,
        size: params.size || 10,
        sort: params.sort || "",
      },
    });
    return response.data; // 검색 결과 반환
  } catch (error) {
    console.error("거래 검색 API 오류:", error);
    throw error; // 호출한 쪽에서 처리할 수 있도록 오류 던지기
  }
};
