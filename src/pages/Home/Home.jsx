import React, { useState } from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/Header/SearchBar";
import ContentSwitch from "../../components/ContentSwitch/ContentSwitch";
import ExhibitionContent from "../../components/ExhibitionContent/ExhibitionContent";
import TradeContent from "../../components/TradeContent/TradeContent";

function Home() {
  const [activeTab, setActiveTab] = useState("exhibition"); // 초기값 전시

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <Header />
      <ContentSwitch activeTab={activeTab} onTabSwitch={handleTabSwitch} />
      <SearchBar placeholder="검색어를 입력하세요"/>
      <div className={styles.content}>
        {activeTab === "exhibition" ? <ExhibitionContent /> : <TradeContent />}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
