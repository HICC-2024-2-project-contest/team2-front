import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./TradeHeader.module.css";
import sample1 from "../../../assets/images/ex1.png";
import BookmarkIcon from "../../../assets/svg/Bookmark.svg";
import BookmarkCIcon from "../../../assets/svg/BookmarkC.svg";
import BackIcon from "../../../assets/svg/Back_icon.svg";

const TradeHeader = ({ trade }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <div className={styles.tradeHeader}>
      {/* ✅ 뒤로 가기 버튼 */}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src={BackIcon} alt="Back Icon" className={styles.backIcon} />
      </button>

      {/* ✅ 포스터 이미지 & D-day */}
      <div className={styles.posterContainer}>
        <img src={sample1} className={styles.posterImage} alt="Trade Poster" />
        <span className={styles.dday}>D-{trade.dday}</span>{" "}
        {/* ✅ D-day 우측 하단 배치 */}
      </div>

      {/* ✅ 북마크 버튼 */}
      <button className={styles.bookmarkButton} onClick={handleBookmarkClick}>
        <img
          src={isBookmarked ? BookmarkCIcon : BookmarkIcon}
          alt="Bookmark Icon"
          className={styles.bookmarkIcon}
        />
      </button>

      {/* ✅ 거래 정보 */}
      <div className={styles.tradeInfo}>
        <h2 className={styles.tradeTitle}>{trade.title}</h2>
        <div className={styles.sellerContainer}>
          <img
            src={trade.sellerLogo ?? "/images/default_logo.png"}
            className={styles.sellerLogo}
            alt="Seller Logo"
          />
          <div className={styles.sellerInfo}>
            <p className={styles.sellerName}>{trade.seller}</p>
            <p className={styles.tradeDate}>{trade.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

TradeHeader.propTypes = {
  trade: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sellerLogo: PropTypes.string,
    seller: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    dday: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default TradeHeader;
