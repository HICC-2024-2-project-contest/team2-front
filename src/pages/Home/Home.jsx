import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/Header/SearchBar";
import ContentSwitch from "../../components/ContentSwitch/ContentSwitch";
import ExhibitionContent from "../../components/ExhibitionContent/ExhibitionContent";
import TradeContent from "../../components/TradeContent/TradeContent";

import sample1 from "../../assets/images/ex1.png";

function Home() {
  const [activeTab, setActiveTab] = useState("exhibition"); // 초기값 전시
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    // API에서 거래 데이터 가져오기 (현재는 더미 데이터)
    const fetchTradeData = async () => {
      const data = [
        { image: sample1, title: "작품 A", price: "50,000원", daysAgo: "3일 전", user: "김작가" },
        { image: sample1, title: "작품 B", price: "70,000원", daysAgo: "5일 전", user: "이화백" },
        { image: sample1, title: "작품 C", price: "90,000원", daysAgo: "1일 전", user: "박예술" },
      ];
      setTrades(data);
    };

    fetchTradeData();
  }, []);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <Header />
      <ContentSwitch activeTab={activeTab} onTabSwitch={handleTabSwitch} />
      <SearchBar placeholder="검색어를 입력하세요"/>
      <div className={styles.content}>
        {activeTab === "exhibition" ? <ExhibitionContent /> : <TradeContent trades={trades} />}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
