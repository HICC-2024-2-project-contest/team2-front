// components/TradeContent/TradeContent.jsx
import React from "react";
import styles from "./TradeContent.module.css";
import TradeItemBox from "../../components/TradeItemBox/TradeItemBox";
import ex1 from "../../assets/images/ex1.png";

const trades = Array(8).fill({
  image: ex1,
  title: "전시물품",
  user: "홍길동",
  price: "1000원",
  daysAgo: "3일 전",
});

function TradeContent() {
  return (
    <div className={styles.container}>
      {trades.map((trade, index) => (
        <TradeItemBox
          key={index}
          image={trade.image}
          title={trade.title}
          user={trade.user}
          price={trade.price}
          daysAgo={trade.daysAgo}
        />
      ))}
    </div>
  );
}

export default TradeContent;
