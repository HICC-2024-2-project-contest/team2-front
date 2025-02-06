import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TradeItemBox_my.module.css";
import DotOptionIcon from "../../assets/svg/Dot_option.svg";
import OptionBottomSheet from "../Bottomsheet/OptionBottomSheet/OptionBottomSheet"; // 옵션 바텀시트 추가

function TradeItemBox_my({ image, title, price, daysAgo }) {
  const [isOptionOpen, setOptionOpen] = useState(false);

  return (
    <div className={styles.tradeItemBox}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.priceDetails}>
          <span className={styles.price}>{price}</span>
          <img 
            src={DotOptionIcon} 
            alt="옵션" 
            className={styles.dotOption} 
            onClick={() => setOptionOpen(true)} 
          />
        </div>
        <span className={styles.title}>{title}</span>
        <span className={styles.daysAgo}>{daysAgo}</span>
      </div>

      {/* 옵션 바텀시트 */}
      <OptionBottomSheet 
        isOpen={isOptionOpen} 
        onClose={() => setOptionOpen(false)}
        onEdit={() => console.log("수정하기 클릭됨")} // TODO: 수정 기능 추가
        onDelete={() => console.log("삭제하기 클릭됨")} // TODO: 삭제 기능 추가
      />
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
