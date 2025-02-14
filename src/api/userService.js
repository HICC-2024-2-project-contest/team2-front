import axios from "axios";

// ✅ 사용자 정보 요청 API 호출 (파라미터 없음)
export const fetchUserInfo = async () => {
  try {
    const response = await axios.post(
      "https://your-backend.com/api/users",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // ✅ access_token 포함
        },
      }
    );

    return response.data; // ✅ { id, name, email } 응답 받음
  } catch (error) {
    console.error("사용자 정보 요청 실패:", error);
    throw error;
  }
};
