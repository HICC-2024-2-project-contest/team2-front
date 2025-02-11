import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ExhibitionBox.module.css";
import PropTypes from "prop-types";
import BookmarkIcon from "../../assets/svg/Bookmark.svg?url";
import BookmarkCIcon from "../../assets/svg/BookmarkC.svg?url";

const ExhibitionItem = ({ exhibition, onSelect }) => {
  const navigate = useNavigate(); // 상세 페이지 이동을 위한 useNavigate()
  const [bookmarked, setBookmarked] = React.useState(() => {
    return JSON.parse(localStorage.getItem(`bookmark-${exhibition.title}`)) || false;
  });

  //  상세 페이지 이동 함수
  const handleClick = () => {
    if (!exhibition.id) {
      console.error("⚠️ 전시 ID가 존재하지 않습니다!", exhibition);
      return;
    }
    onSelect(exhibition); //  onSelect 실행
    navigate(`/exhibition/${exhibition.id}`); //  클릭 시 해당 전시 상세 페이지로 이동
  };

  //  북마크 버튼 클릭 시 동작
  const handleBookmarkClick = (e) => {
    e.stopPropagation(); //  북마크 클릭 시 상세 페이지 이동 방지
    const newBookmarkState = !bookmarked;
    setBookmarked(newBookmarkState);
    localStorage.setItem(`bookmark-${exhibition.title}`, JSON.stringify(newBookmarkState));
  };

  return (
    <div className={styles.exhibitionItem} onClick={handleClick}>
      <div className={styles.exhibitionThumbnail}>
        <img src={exhibition.poster} className={styles.posterImage} alt="전시 포스터" />
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

ExhibitionItem.propTypes = {
  exhibition: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

// 더미 데이터 (전시 리스트)
const exhibitions = [
  {
    id: "1", //  id를 문자열로 저장
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
      {exhibitions.map((exhibition) => (
        <ExhibitionItem
          key={exhibition.id}
          exhibition={exhibition}
          onSelect={onSelect} //  클릭 이벤트 전달
        />
      ))}
    </div>
  );
};

ExhibitionBox.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default ExhibitionBox;
