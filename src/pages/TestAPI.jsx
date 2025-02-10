import React, { useState } from "react";
import { fetchExhibitions } from "../api/exhibitionService";

function TestAPI() {
  const [exhibitions, setExhibitions] = useState([]);
  const [message, setMessage] = useState("");

  const testAPIConnection = async () => {
    try {
      const data = await fetchExhibitions();
      setExhibitions(data);
      setMessage("API 응답 성공! 데이터가 로드되었습니다.");
      console.log("전시 데이터:", data);
    } catch (error) {
      setMessage("API 호출 실패! 콘솔을 확인하세요.");
      console.error("API 요청 실패:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>API 테스트</h2>
      <button onClick={testAPIConnection} style={{ padding: "10px", fontSize: "16px" }}>
        전시 데이터 불러오기
      </button>
      {message && <p>{message}</p>}
      {exhibitions.length > 0 && (
        <ul>
          {exhibitions.map((exhibition) => (
            <li key={exhibition.id}>
              {exhibition.name} ({exhibition.startDate} ~ {exhibition.endDate})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TestAPI;
