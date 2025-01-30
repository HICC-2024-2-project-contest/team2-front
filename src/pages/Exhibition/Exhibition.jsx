import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Exhibition.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// 검색 아이콘 (SVG)
const SearchIcon = () => (
  <svg
    className={styles.searchIcon}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5Z"
      fill="black"
    />
  </svg>
);

// 북마크 아이콘 (SVG)
const BookmarkIcon = ({ isActive }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ cursor: "pointer" }}
  >
    <path
      d="M18.75 1.5H5.25L4.5 2.25V21.75L5.808 22.2525L12 15.3705L18.192 22.2525L19.5 21.75V2.25L18.75 1.5Z"
      fill={isActive ? "#5A91FF" : "none"}
      stroke="#5a91ff"
      strokeWidth="1.6"
    />
  </svg>
);

BookmarkIcon.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

// 아래 화살표 아이콘 (SVG)
const ArrowDownIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="#767676"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 추천 전시 아이템 컴포넌트
const ExhibitionItem = ({ title, location, date, count }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className={styles.exhibitionItem}>
      <div className={styles.exhibitionThumbnail}>
        <img src="/images/poster1.png" className={styles.posterImage} />
        <span className={styles.exhibitionBadge}>D-1</span>
      </div>

      <div className={styles.exhibitionInfo}>
        <h3 className={styles.exhibitionTitle}>{title}</h3>
        <p className={styles.exhibitionLocation}>{location}</p>
        <p className={styles.exhibitionDate}>{date}</p>
        <p className={styles.exhibitionCount}>판매 작품 수: {count}건</p>
      </div>

      <button
        className={styles.bookmarkButton}
        onClick={() => setBookmarked(!bookmarked)}
      >
        <BookmarkIcon isActive={bookmarked} />
      </button>
    </div>
  );
};

ExhibitionItem.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

function Exhibition() {
  const exhibitions = [
    {
      title: "홍익대학교 동양학과",
      location: "서울특별시 마포구",
      date: "2024.11.04 ~ 2024.11.09",
      count: 23,
    },
    {
      title: "홍익대학교 동양학과",
      location: "서울특별시 마포구",
      date: "2024.11.10 ~ 2024.11.15",
      count: 15,
    },
  ];

  return (
    <div className={styles.container}>
      <Header />

      {/* 🔥 검색창 & 필터 버튼 (상단 고정) */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <input type="text" placeholder="전시, 대학명을 검색하세요" />
          <SearchIcon />
        </div>
        <div className={styles.filterButtons}>
          <button>
            <span>지역/대학</span>
            <ArrowDownIcon />
          </button>
          <button>
            <span>날짜</span>
            <ArrowDownIcon />
          </button>
          <button>
            <span>분야</span>
            <ArrowDownIcon />
          </button>
        </div>
      </div>

      {/* 🔥 스크롤 가능한 전시 리스트 */}
      <div className={styles.content}>
        <h2 className={styles.recommendedTitle}>추천 전시</h2>

        <div className={styles.exhibitionList}>
          {exhibitions.map((exhibition, index) => (
            <ExhibitionItem key={index} {...exhibition} />
          ))}
        </div>
      </div>

      {/* 플로팅 버튼 */}
      <button
        className={styles.floatingButton}
        onClick={() => alert("추가 버튼 클릭!")}
      >
        +
      </button>

      <Footer />
    </div>
  );
}

export default Exhibition;
