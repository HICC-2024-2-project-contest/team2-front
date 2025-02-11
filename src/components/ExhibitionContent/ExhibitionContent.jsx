import React, { useState, useEffect } from "react";
import styles from "./ExhibitionContent.module.css";
import { fetchExhibitions } from "../../api/exhibition-controller/exhibitionService";

function Exhibition() {
  const [exhibitions, setExhibitions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const getExhibitions = async () => {
      try {
        const params = {
          startDate: "2000-01-01",
          endDate: "3000-01-01",
          keyword: "",
          fieldId: null,
          page: 0,
          size: 4,
          sort: "startDate,asc", // 시작 날짜 기준 오름차순 정렬
        };

        const data = await fetchExhibitions(params);

        // API 응답 데이터를 변환하여 exhibitions 배열로 저장
        const formattedExhibitions = data.exhibitions.map((item) => ({
          id: item.exhibitionDto.id,
          image: `data:image/png;base64,${item.base64Image}`,
          name: item.exhibitionDto.name,
          start: item.exhibitionDto.startDate,
          end: item.exhibitionDto.endDate,
        }));

        setExhibitions(formattedExhibitions);
      } catch (error) {
        console.error("전시 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    getExhibitions();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % exhibitions.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? exhibitions.length - 1 : prevIndex - 1));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>현재 전시</h1>
      <div className={styles.slider}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          disabled={loading || exhibitions.length === 0}
        >
          {"<"}
        </button>
        <div className={styles.imageContainer}>
          {loading ? (
            <div className={styles.placeholder} /> // 로딩 중일 때 회색 박스 표시
          ) : (
            <img
              src={exhibitions[currentIndex]?.image}
              alt={exhibitions[currentIndex]?.name}
              className={styles.image}
            />
          )}
        </div>
        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={loading || exhibitions.length === 0}
        >
          {">"}
        </button>
      </div>
      {loading ? null : exhibitions.length > 0 ? (
        <div className={styles.info}>
          <h3>{exhibitions[currentIndex].name}</h3>
          <p>
            {exhibitions[currentIndex].start} ~ {exhibitions[currentIndex].end}
            <span className={styles.chip}>
              {currentIndex + 1} / {exhibitions.length}
            </span>
          </p>
        </div>
      ) : (
        <p>현재 예정된 전시가 없습니다.</p>
      )}
    </div>
  );
}

export default Exhibition;
