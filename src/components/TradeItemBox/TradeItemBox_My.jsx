import React from "react";
import PropTypes from "prop-types";
import styles from "./TradeItemBox_My.module.css";
import DotOptionIcon from "../../assets/svg/Dot_option.svg"; // 옵션 버튼 추가

function TradeItemBox_my({ image, title, price, daysAgo }) {
  return (
    <div className={styles.tradeItemBox}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.priceDetails}>
          <span className={styles.price}>{price}</span>
          <img src={DotOptionIcon} alt="옵션" className={styles.dotOption} /> {/* Dot 옵션 아이콘 추가 */}
        </div>
        <h3 className={styles.title}>{title}</h3> {/* 유저 이름 대신 타이틀 이동 */}
        <span className={styles.daysAgo}>{daysAgo}</span> {/* 기존 타이틀 자리에 daysAgo 이동 */}
      </div>
    </div>
  );
}

TradeItemBox_my.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  daysAgo: PropTypes.string.isRequired,
};

export default TradeItemBox_my;
