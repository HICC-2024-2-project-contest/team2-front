import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ExhibitionBox.module.css";
import PropTypes from "prop-types";
import BookmarkIcon from "../../assets/svg/Bookmark.svg?url";
import BookmarkCIcon from "../../assets/svg/BookmarkC.svg?url";

const ExhibitionBox = ({ exhibition }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = React.useState(() => {
    return JSON.parse(localStorage.getItem(`bookmark-${exhibition.id}`)) || false;
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
    localStorage.setItem(`bookmark-${exhibition.id}`, JSON.stringify(newBookmarkState));
  };

  return (
    <div className={styles.exhibitionItem} onClick={handleClick}>
      {/* ✅ 포스터 및 D-day 뱃지 */}
      <div className={styles.exhibitionThumbnail}>
        <img
          src={exhibition.poster || "/images/ex1.png"}
          className={styles.posterImage}
          alt="전시 포스터"
        />
        <span className={styles.exhibitionBadge}>
          {`D-${Math.max(0, Math.floor((new Date(exhibition.end) - new Date()) / (1000 * 60 * 60 * 24)))}`}
        </span>
      </div>

      {/* ✅ 전시 정보 */}
      <div className={styles.exhibitionInfo}>
        <h3 className={styles.exhibitionTitle}>{exhibition.name}</h3>
        <p className={styles.exhibitionLocation}>{exhibition.location || "위치 정보 없음"}</p>
        <p className={styles.exhibitionDate}>{`${exhibition.start} ~ ${exhibition.end}`}</p>
      </div>

      {/* ✅ 북마크 버튼 */}
      <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
        <img src={bookmarked ? BookmarkCIcon : BookmarkIcon} alt="Bookmark Icon" />
      </button>
    </div>
  );
};

ExhibitionBox.propTypes = {
  exhibition: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    university: PropTypes.string,
    field: PropTypes.string,
    location: PropTypes.string,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    poster: PropTypes.string, // 기본값이 있을 수 있으므로 필수 X
  }).isRequired,
};

export default ExhibitionBox;
