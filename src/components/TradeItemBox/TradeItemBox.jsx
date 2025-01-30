import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TradeItemBox.module.css";
import HeartEmpty from "../../assets/svg/Hearth_empty.svg";
import HeartFull from "../../assets/svg/Hearth_full.svg";

function TradeItemBox({ image, title, price, daysAgo, user }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.tradeItemBox}>
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
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  daysAgo: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default TradeItemBox;
