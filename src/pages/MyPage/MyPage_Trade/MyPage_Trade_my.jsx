import React, { useState, useEffect } from 'react';
import styles from './MyPage_Trade.module.css';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import TradeContent from "../../../components/TradeContent/TradeContent";
import TradeItemBox_My from "../../../components/TradeItemBox/TradeItemBox_My"; // 수정된 아이템 박스 사용

// 이미지 import
import sample4 from "../../../assets/images/ex1.png";

function MyPage_Trade_my() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // API에서 내가 작성한 거래 데이터 가져오기 (현재는 더미 데이터)
    const fetchMyTradeData = async () => {
      const data = [
        { image: sample4, title: "내 작품 A", price: "30,000원", daysAgo: "1주 전" },
        { image: sample4, title: "내 작품 B", price: "90,000원", daysAgo: "2주 전" },
        { image: sample4, title: "내 작품 C", price: "120,000원", daysAgo: "5일 전" },
      ];
      setTrades(data);
    };

    fetchMyTradeData();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>내가 작성한 거래</h1>
        <TradeContent trades={trades} CustomTradeItemBox={TradeItemBox_My} /> {/* 수정된 아이템 박스 적용 */}
      </div>

      <Footer />
    </div>
  );
}

export default MyPage_Trade_my;
