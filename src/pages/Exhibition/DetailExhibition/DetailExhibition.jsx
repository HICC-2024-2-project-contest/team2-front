import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailExhibition.module.css";
import TradeContent from "../../../components/TradeContent/TradeContent";
import Footer from "../../../components/Footer/Footer";
import sample1 from "../../../assets/images/ex1.png";
import BookmarkIcon from "../../../assets/svg/Bookmark.svg";
import BookmarkCIcon from "../../../assets/svg/BookmarkC.svg";
import BackIcon from "../../../assets/svg/Back_icon.svg";

const exhibitions = {
  1: {
    id: "1",
    title: "홍익대학교 동양학과 졸업전시",
    location: "서울특별시 마포구 홍대입구역 2번 출구",
    date: "2024.11.04 ~ 2024.11.09",
    description:
      "2023 홍익대학교 산업디자인학과 졸업 전시, DESIGN•A에 초대합니다. 이번 전시에서는 산업디자인학과 117명의 학생이 제품, 공간, 운송, 그리고 인터랙션 4가지의 분야에서 다양한 졸업 작품을 선보입니다.",
    poster: "/images/ex1.png",
    school: "홍익대학교",
    trades: [
      {
        id: "1",
        image: "/images/art1.png",
        title: "작품 A",
        price: "50,000원",
        daysAgo: "4일 전",
        user: "김작가",
      },
      {
        id: "2",
        image: "/images/art2.png",
        title: "작품 B",
        price: "70,000원",
        daysAgo: "5일 전",
        user: "이화백",
      },
      {
        id: "3",
        image: "/images/art3.png",
        title: "작품 C",
        price: "90,000원",
        daysAgo: "1일 전",
        user: "박예술",
      },
    ],
  },
};

const DetailExhibition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState(null);
  const [trades, setTrades] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      const selectedExhibition = exhibitions[id.toString()] || null;
      setExhibition(selectedExhibition);

      if (selectedExhibition) {
        setTrades(selectedExhibition.trades || []);
      }
    }
  }, [id]);

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

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {/* ✅ 헤더 정보 (기존 ExhibitionHeader.jsx 내용) */}
      <div className={styles.exhibitionHeader}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <img src={BackIcon} alt="Back Icon" className={styles.backIcon} />
        </button>

        <div className={styles.posterContainer}>
          <img
            src={exhibition.poster || sample1}
            className={styles.posterImage}
            alt="Exhibition Poster"
          />
          <span className={styles.dday}>D-1</span>
        </div>

        <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
          <img
            src={isBookmarked ? BookmarkCIcon : BookmarkIcon}
            alt="Bookmark Icon"
            className={styles.bookmarkIcon}
          />
        </button>

        <div className={styles.exhibitionInfo}>
          <h2 className={styles.exhibitionTitle}>{exhibition.title}</h2>
          <div className={styles.schoolContainer}>
            <div className={styles.schoolInfo}>
              <p className={styles.schoolName}>{exhibition.school}</p>
              <p className={styles.exhibitionDate}>{exhibition.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ 전시 소개 */}
      <div className={styles.section}>
        <h3>전시 소개</h3>
        <p>{exhibition.description?.trim() || "설명이 없습니다."}</p>
      </div>

      {/* ✅ 구매 가능한 작품 */}
      <div className={styles.section}>
        <h3>구매 가능한 작품</h3>
        <div className={styles.tradeScrollContainer}>
          <TradeContent trades={trades} />
        </div>
      </div>

      {/* ✅ 위치 정보 */}
      <div className={styles.section}>
        <h3>위치</h3>
        <p>{exhibition.location?.trim() || "위치 정보 없음"}</p>
      </div>

      <Footer className={styles.footer} />
    </div>
  );
};

export default DetailExhibition;
