import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./TradeContent.module.css";
import TradeItemBox from "../TradeItemBox/TradeItemBox";

function TradeContent({ trades, onItemClick }) {
  const navigate = useNavigate();

  const handleItemClick = (trade) => {
    console.log(" TradeContent에서 클릭된 아이템:", trade); // 🔹 디버깅 추가
    if (onItemClick) {
      onItemClick(trade);
    } else {
      navigate(`/trade/detail/${trade.id}`);
    }
  };

  return (
    <div className={styles.container}>
      {trades.map((trade, index) => (
        <div
          key={index}
          onClick={() => {
            console.log(" 클릭 이벤트 실행");
            handleItemClick(trade);
          }}
          className={styles.tradeItem}
        >
          <TradeItemBox
            image={trade.image}
            title={trade.title}
            price={trade.price}
            daysAgo={trade.daysAgo}
            user={trade.user}
          />
        </div>
      ))}
    </div>
  );
}

TradeContent.propTypes = {
  trades: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      daysAgo: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func,
};

export default TradeContent;
