import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ExhibitionBox.module.css";
import PropTypes from "prop-types";
import BookmarkIcon from "../../assets/svg/Bookmark.svg?url";
import BookmarkCIcon from "../../assets/svg/BookmarkC.svg?url";
import ex1 from "../../assets/images/ex2.png"; // 임시 이미지 추가

const ExhibitionBox = ({ exhibition }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = React.useState(() => {
    return JSON.parse(localStorage.getItem(`bookmark-${exhibition.title}`)) || false;
  });

  // 상세 페이지 이동
  const handleClick = () => {
    if (!exhibition.id) {
      console.error("⚠️ 전시 ID가 존재하지 않습니다!", exhibition);
      return;
    }
    navigate(`/exhibition/${exhibition.id}`);
  };

  // 북마크 버튼 클릭 시 동작
  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    const newBookmarkState = !bookmarked;
    setBookmarked(newBookmarkState);
    localStorage.setItem(`bookmark-${exhibition.title}`, JSON.stringify(newBookmarkState));
  };

  return (
    <div className={styles.exhibitionItem} onClick={handleClick}>
      <div className={styles.exhibitionThumbnail}>
        <img src={ex1} className={styles.posterImage} alt="전시 포스터" />
        <span className={styles.exhibitionBadge}>D-1</span>
      </div>

      <div className={styles.exhibitionInfo}>
        <h3 className={styles.exhibitionTitle}>{exhibition.title}</h3>
        <p className={styles.exhibitionLocation}>{exhibition.location}</p>
        <p className={styles.exhibitionDate}>{exhibition.date}</p>
        <p className={styles.exhibitionCount}>판매 작품 수: {exhibition.count}건</p>
      </div>

      <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
        <img src={bookmarked ? BookmarkCIcon : BookmarkIcon} alt="Bookmark Icon" />
      </button>
    </div>
  );
};

ExhibitionBox.propTypes = {
  exhibition: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    poster: PropTypes.string, // `poster`가 없을 수도 있으므로 `isRequired` 제거
  }).isRequired,
};

export default ExhibitionBox;
