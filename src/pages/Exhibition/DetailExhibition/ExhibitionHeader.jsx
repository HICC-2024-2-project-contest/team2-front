import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ExhibitionHeader.module.css";
import sample1 from "../../../assets/images/ex1.png";
import BookmarkIcon from "../../../assets/svg/Bookmark.svg";
import BookmarkCIcon from "../../../assets/svg/BookmarkC.svg";
import BackIcon from "../../../assets/svg/Back_icon.svg";

const ExhibitionHeader = ({ exhibition }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className={styles.exhibitionHeader}>
      {/* ✅ 뒤로 가기 버튼 */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={BackIcon} alt="Back Icon" className={styles.backIcon} />
      </button>

      {/* ✅ 포스터 이미지 & D-day */}
      <div className={styles.posterContainer}>
        <img src={sample1} className={styles.posterImage} alt="Exhibition Poster" />
        <span className={styles.dday}>D-1{exhibition.dday}</span> {/* ✅ D-day 우측 하단 배치 */}
      </div>

      {/* ✅ 북마크 버튼 */}
      <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
        <img
          src={isBookmarked ? BookmarkCIcon : BookmarkIcon}
          alt="Bookmark Icon"
          className={styles.bookmarkIcon}
        />
      </button>

      {/* ✅ 전시 정보 */}
      <div className={styles.exhibitionInfo}>
        <h2 className={styles.exhibitionTitle}>{exhibition.title}</h2>
        <div className={styles.schoolContainer}>
          <img
            src={exhibition.schoolLogo ?? "/images/default_logo.png"}
            className={styles.schoolLogo}
            alt="School Logo"
          />
          <div className={styles.schoolInfo}>
            <p className={styles.schoolName}>{exhibition.school}</p>
            <p className={styles.exhibitionDate}>{exhibition.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ExhibitionHeader.propTypes = {
  exhibition: PropTypes.shape({
    title: PropTypes.string.isRequired,
    schoolLogo: PropTypes.string,
    school: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    dday: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExhibitionHeader;
