import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ExhibitionContent.module.css";
import { fetchExhibitions } from "../../api/exhibition-controller/exhibitionService";

// ✅ SVG 아이콘을 URL로 가져오기
import LeftIcon from "../../assets/svg/Left.svg?url";
import RightIcon from "../../assets/svg/Right.svg?url";

function ExhibitionContent() {
  const [exhibitions, setExhibitions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate 추가

  useEffect(() => {
    const getExhibitions = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];

        const params = {
          startDate: "2025-02-01",
          endDate: "3000-01-01",
          keyword: "",
          fieldId: null,
          page: 0,
          size: 10,
          sort: "startDate,asc",
        };

        const data = await fetchExhibitions(params);

        const validExhibitions = data.exhibitions
          .map((item) => ({
            id: item.exhibitionDto.id,
            image: `data:image/png;base64,${item.base64Image}`,
            name: item.exhibitionDto.name,
            start: item.exhibitionDto.startDate,
            end: item.exhibitionDto.endDate,
          }))
          .filter((exhibition) => exhibition.end >= today);

        setExhibitions(validExhibitions.slice(0, 4));
      } catch (error) {
        console.error("전시 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
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

  // ✅ 전시 이미지 클릭 시 상세 페이지로 이동
  const handleImageClick = () => {
    if (exhibitions[currentIndex]?.id) {
      navigate(`/exhibition/${exhibitions[currentIndex].id}`);
    } else {
      console.error("⚠️ 전시 ID가 존재하지 않습니다!", exhibitions[currentIndex]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>현재 전시</h1>
      <div className={styles.slider}>
        {/* ✅ 왼쪽 이동 버튼 */}
        <button
          className={styles.navButton}
          onClick={handlePrev}
          disabled={loading || exhibitions.length === 0}
        >
          <img src={LeftIcon} alt="왼쪽 이동" className={styles.navIcon} />
        </button>

        <div className={styles.imageContainer} onClick={handleImageClick}>
          {loading ? (
            <div className={styles.placeholder} />
          ) : (
            exhibitions.length > 0 && (
              <img
                src={exhibitions[currentIndex]?.image}
                alt={exhibitions[currentIndex]?.name}
                className={styles.image}
              />
            )
          )}
        </div>

        {/* ✅ 오른쪽 이동 버튼 */}
        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={loading || exhibitions.length === 0}
        >
          <img src={RightIcon} alt="오른쪽 이동" className={styles.navIcon} />
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

export default ExhibitionContent;
