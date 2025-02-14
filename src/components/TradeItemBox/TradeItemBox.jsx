import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import PropTypes from "prop-types";
import styles from "./TradeItemBox.module.css";
import HeartEmpty from "../../assets/svg/Hearth_empty.svg";
import HeartFull from "../../assets/svg/Hearth_full.svg";

function TradeItemBox({ id, image, title, price, daysAgo, user }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate(); // ✅ 페이지 이동을 위한 useNavigate 추가

  const toggleLike = (e) => {
    e.stopPropagation(); // ✅ 부모 클릭 이벤트 방지
    setLiked(!liked);
  };

  // ✅ 거래 상세 페이지로 이동
  const handleClick = () => {
    if (!id) {
      console.error("⚠️ 거래 ID가 존재하지 않습니다!", title);
      return;
    }
    navigate(`/trade/${id}`);
  };

  return (
    <div className={styles.tradeItemBox} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
        <button className={styles.likeButton} onClick={toggleLike}>
          <img src={liked ? HeartFull : HeartEmpty} alt="like icon" className={styles.icon} />
        </button>
      </div>
      <div className={styles.info}>
        <div className={styles.priceDetails}>
          <span className={styles.price}>{price}</span>
          <span className={styles.daysAgo}>{daysAgo}</span>
        </div>
        <span className={styles.user}>{user}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
}

TradeItemBox.propTypes = {
  id: PropTypes.number.isRequired, // ✅ ID 추가
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  daysAgo: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default TradeItemBox;
