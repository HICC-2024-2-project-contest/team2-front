import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailTrade.module.css";
import { fetchTradeItemById } from "../../../api/trade-controller/tradeServiceId";
import Footer from "../../../components/Footer/Footer";
import BackIcon from "../../../assets/svg/Back_icon.svg";
import BookmarkIcon from "../../../assets/svg/Bookmark.svg";
import BookmarkCIcon from "../../../assets/svg/BookmarkC.svg";

const DetailTrade = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tradeItem, setTradeItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      loadTradeDetails(id);
    }
  }, [id]);

  const loadTradeDetails = async (tradeId) => {
    try {
      const data = await fetchTradeItemById(tradeId);
      setTradeItem({
        id: data.itemDto?.id || 0,
        name: data.itemDto?.name || "상품명 없음",
        location: data.itemDto?.location || "거래 위치 정보 없음",
        price: data.itemDto?.price || "가격 정보 없음",
        description: data.itemDto?.description || "상품 소개 없음",
        createdTime: data.itemDto?.createdTime || "등록일 정보 없음",
        poster: (data.base64Images || [])[0]
          ? `data:image/png;base64,${data.base64Images[0]}`
          : "/images/default.png",
      });
    } catch (error) {
      console.error("거래 상세 정보 불러오기 오류:", error);
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

  if (!tradeItem) {
    return (
      <div className={styles.container}>
        <h2>거래 정보를 불러올 수 없습니다.</h2>
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
        {/* ✅ 상단 헤더 */}
        <div className={styles.tradeHeader}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <img src={BackIcon} alt="뒤로 가기" className={styles.backIcon} />
          </button>

          <div className={styles.posterContainer}>
            <img src={tradeItem.poster} className={styles.posterImage} alt="Trade Item" />
          </div>

          <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
            <img
              src={isBookmarked ? BookmarkCIcon : BookmarkIcon}
              alt="Bookmark Icon"
              className={styles.bookmarkIcon}
            />
          </button>

          <div className={styles.tradeInfo}>
            <h2 className={styles.tradeTitle}>{tradeItem.name}</h2>
            <p className={styles.price}>{tradeItem.price}원</p>
            <p className={styles.createdTime}>등록일: {tradeItem.createdTime.split("T")[0]}</p>
          </div>
        </div>

        {/* ✅ 상품 소개 */}
        <div className={styles.section}>
          <h3>상품 소개</h3>
          <p>{tradeItem.description}</p>
        </div>

        {/* ✅ 거래 위치 */}
        <div className={styles.section}>
          <h3>거래 위치</h3>
          <p>{tradeItem.location}</p>
        </div>
      </div>

      {/* ✅ 푸터 추가 */}
      <Footer />
    </div>
  );
};

export default DetailTrade;
