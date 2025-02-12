import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailExhibition.module.css";
import { fetchExhibitionById } from "../../../api/exhibition-controller/exhibitionServiceId";
import Footer from "../../../components/Footer/Footer";
import BookmarkIcon from "../../../assets/svg/Bookmark.svg";
import BookmarkCIcon from "../../../assets/svg/BookmarkC.svg";
import BackIcon from "../../../assets/svg/Back_icon.svg";

const DetailExhibition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      loadExhibitionDetails(id);
    }
  }, [id]);

  const loadExhibitionDetails = async (exhibitionId) => {
    try {
      const data = await fetchExhibitionById(exhibitionId);
      setExhibition({
        id: data.exhibitionDto.id,
        name: data.exhibitionDto.name,
        university: data.exhibitionDto.university.name,
        location: data.exhibitionDto.location || "위치 정보 없음",
        field: data.exhibitionDto.field.name,
        description: data.exhibitionDto.description || "전시 설명 없음",
        start: data.exhibitionDto.startDate,
        end: data.exhibitionDto.endDate,
        poster: data.base64Image ? `data:image/png;base64,${data.base64Image}` : "/images/ex1.png",
      });
    } catch (error) {
      console.error("전시 상세 정보 불러오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  if (loading) {
    return <p className={styles.loading}>로딩 중...</p>;
  }

  if (!exhibition) {
    return (
      <div className={styles.container}>
        <h2>전시 정보를 불러올 수 없습니다.</h2>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          🔙 돌아가기
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* ✅ 푸터를 하단에 고정하기 위해 감싸는 div 추가 */}
        {/* ✅ 상단 헤더 */}
        <div className={styles.exhibitionHeader}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="Back Icon" className={styles.backIcon} />
          </button>

          <div className={styles.posterContainer}>
            <img src={exhibition.poster} className={styles.posterImage} alt="Exhibition Poster" />
          </div>

          <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
            <img
              src={isBookmarked ? BookmarkCIcon : BookmarkIcon}
              alt="Bookmark Icon"
              className={styles.bookmarkIcon}
            />
          </button>

          <div className={styles.exhibitionInfo}>
            <h2 className={styles.exhibitionTitle}>{exhibition.name}</h2>
            <p className={styles.university}>{exhibition.university}</p>
            <p className={styles.field}>분야: {exhibition.field}</p>
            <p className={styles.exhibitionDate}>{`${exhibition.start} ~ ${exhibition.end}`}</p>
          </div>
        </div>
        {/* ✅ 전시 소개 */}
        <div className={styles.section}>
          <h3>전시 소개</h3>
          <p>{exhibition.description}</p>
        </div>
        {/* ✅ 위치 정보 */}
        <div className={styles.section}>
          <h3>위치</h3>
          <p>{exhibition.location}</p>
        </div>
      </div>

      {/* ✅ 푸터 추가 */}
      <Footer />
    </div>
  );
};

export default DetailExhibition;
