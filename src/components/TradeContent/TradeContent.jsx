import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; //  페이지 이동을 위한 훅 추가
import styles from "./TradeContent.module.css";
import TradeItemBox from "../TradeItemBox/TradeItemBox";

function TradeContent({ trades, CustomTradeItemBox }) {
  const navigate = useNavigate(); //  네비게이션 함수 사용
  const TradeBoxComponent = CustomTradeItemBox || TradeItemBox; // 기본값은 일반 TradeItemBox

  const handleItemClick = (trade) => {
    console.log("클릭된 아이템:", trade); // 🔹 디버깅을 위해 추가
    if (onItemClick) {
      onItemClick(trade);
    } else {
      navigate("/trade/detail", { state: { trade } });
    }
  };

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
          onClick={() => handleItemClick(trade)} // ✅ 클릭 시 이벤트 실행
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
