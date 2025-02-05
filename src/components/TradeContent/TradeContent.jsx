import React from "react";
import PropTypes from "prop-types";
import styles from "./TradeContent.module.css";
import TradeItemBox from "../TradeItemBox/TradeItemBox";

function TradeContent({ trades, CustomTradeItemBox }) {
  const TradeBoxComponent = CustomTradeItemBox || TradeItemBox; // 기본값은 일반 TradeItemBox

  return (
    <div className={styles.container}>
      {trades.map((trade, index) => (
        <TradeBoxComponent
          key={index}
          image={trade.image}
          title={trade.title}
          price={trade.price}
          daysAgo={trade.daysAgo}
          user={trade.user}
        />
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
  CustomTradeItemBox: PropTypes.elementType, // 선택적으로 다른 TradeItemBox를 사용할 수 있도록 설정
};

export default TradeContent;
