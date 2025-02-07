import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ExhibitionHeader.module.css";
import BookmarkIcon from "../../../assets/svg/Bookmark.svg?url";
import BookmarkCIcon from "../../../assets/svg/BookmarkC.svg?url";

const ExhibitionHeader = ({ exhibition }) => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className={styles.exhibitionHeader}>
      <img
        src={exhibition.poster}
        className={styles.posterImage}
        alt="Exhibition Poster"
      />
      <button
        className={styles.bookmarkButton}
        onClick={() => setBookmarked(!bookmarked)}
      >
        {bookmarked ? <BookmarkCIcon /> : <BookmarkIcon />}
      </button>
      <div className={styles.exhibitionInfo}>
        <h2>{exhibition.title}</h2>
        <img
          src={exhibition.schoolLogo ?? "/images/default_logo.png"} //  기본 로고 설정
          className={styles.schoolLogo}
          alt="School Logo"
        />
        <p>{exhibition.school}</p>
        <p>{exhibition.date}</p>
        <span className={styles.dday}>D-{exhibition.dday}</span>
      </div>
    </div>
  );
};

ExhibitionHeader.propTypes = {
  exhibition: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    schoolLogo: PropTypes.string,
    school: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    dday: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExhibitionHeader;
