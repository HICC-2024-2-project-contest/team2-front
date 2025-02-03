import React from "react";
import styles from "./ExhibitionBox.module.css";
import PropTypes from "prop-types";
import BookmarkIcon from "../../assets/svg/Bookmark.svg?url";
import BookmarkCIcon from "../../assets/svg/BookmarkC.svg?url";

const ExhibitionItem = ({ exhibition, onSelect }) => {
  const [bookmarked, setBookmarked] = React.useState(() => {
    return (
      JSON.parse(localStorage.getItem(`bookmark-${exhibition.title}`)) || false
    );
  });

  const handleBookmarkClick = (e) => {
    e.stopPropagation(); // ✅ 북마크 클릭 시 상세 페이지 이동 방지
    const newBookmarkState = !bookmarked;
    setBookmarked(newBookmarkState);
    localStorage.setItem(
      `bookmark-${exhibition.title}`,
      JSON.stringify(newBookmarkState)
    );
  };

  return (
    <div
      className={styles.exhibitionItem}
      onClick={() => {
        if (!exhibition) {
          console.error("⚠️ 전시 데이터가 없습니다!");
          return;
        }
        console.log(" 선택된 전시:", exhibition);
        onSelect(exhibition);
      }}
    >
      <div className={styles.exhibitionThumbnail}>
        <img
          src={exhibition.poster} // ✅ 개별 전시의 포스터 이미지 적용
          className={styles.posterImage}
        />
        <span className={styles.exhibitionBadge}>D-1</span>
      </div>

      <div className={styles.exhibitionInfo}>
        <h3 className={styles.exhibitionTitle}>{exhibition.title}</h3>
        <p className={styles.exhibitionLocation}>{exhibition.location}</p>
        <p className={styles.exhibitionDate}>{exhibition.date}</p>
        <p className={styles.exhibitionCount}>
          판매 작품 수: {exhibition.count}건
        </p>
      </div>

      <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
        <img
          src={bookmarked ? BookmarkCIcon : BookmarkIcon}
          alt="Bookmark Icon"
        />
      </button>
    </div>
  );
};

ExhibitionItem.propTypes = {
  exhibition: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const exhibitions = [
  {
    title: "홍익대학교 동양학과",
    location: "서울특별시 마포구",
    date: "2024.11.04 ~ 2024.11.09",
    poster: "/images/ex1.png",
    count: 23,
  },
];

const ExhibitionBox = ({ onSelect }) => {
  return (
    <div className={styles.container}>
      {exhibitions.map((exhibition, index) => (
        <ExhibitionItem
          key={index}
          exhibition={exhibition}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

ExhibitionBox.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default ExhibitionBox;
