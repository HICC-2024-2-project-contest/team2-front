import React from "react";
import PropTypes from "prop-types";
import styles from "./TradeContent.module.css";
import TradeItemBox from "../TradeItemBox/TradeItemBox";

function TradeContent({ trades, CustomTradeItemBox }) {
  const TradeBoxComponent = CustomTradeItemBox || TradeItemBox; // 기본값은 일반 TradeItemBox

  console.log("📢 TradeContent에서 받은 trades 데이터:", trades);

  return (
    <div className={styles.container}>
      {trades.map((trade, index) => {
        console.log(`🔍 개별 trade 데이터:`, trade); // 🔍 각 아이템 로그 확인
        return (
          <TradeBoxComponent
            key={trade.id} // 🔹 key를 trade.id로 설정
            id={trade.id} // 🔹 id를 명확하게 전달!
            image={trade.image}
            title={trade.title}
            price={trade.price}
            daysAgo={trade.daysAgo}
            user={trade.user}
          />
        );
      })}
    </div>
  );
}

TradeContent.propTypes = {
  trades: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // 🔹 id를 필수값으로 추가
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
