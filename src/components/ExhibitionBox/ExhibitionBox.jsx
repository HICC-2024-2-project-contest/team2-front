import React from "react";
import styles from "./ExhibitionBox.module.css";
import PropTypes from "prop-types";
import BookmarkIcon from "../../assets/svg/Bookmark.svg";
import BookmarkCIcon from "../../assets/svg/BookmarkC.svg";

const ExhibitionItem = ({ title, location, date, count }) => {
  const [bookmarked, setBookmarked] = React.useState(false);

  return (
    <div className={styles.exhibitionItem}>
      <div className={styles.exhibitionThumbnail}>
        <img
          src="/images/poster1.png"
          className={styles.posterImage}
          alt="Exhibition Poster"
        />
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
        {bookmarked ? <BookmarkCIcon /> : <BookmarkIcon />}
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

const exhibitions = Array(1).fill({
  title: "홍익대학교 동양학과",
  location: "서울특별시 마포구",
  date: "2024.11.04 ~ 2024.11.09",
  count: 23,
});

const ExhibitionList = () => {
  return (
    <div className={styles.container}>
      {exhibitions.map((exhibition, index) => (
        <ExhibitionItem key={index} {...exhibition} />
      ))}
    </div>
  );
};

export default ExhibitionList;
