import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/Header/SearchBar";
import ContentSwitch from "../../components/ContentSwitch/ContentSwitch";
import ExhibitionContent from "../../components/ExhibitionContent/ExhibitionContent";
import TradeContent from "../../components/TradeContent/TradeContent";
import SearchOverlay from "../../components/SearchBox/SearchOverlay";
import { fetchTrades } from "../../api/trade-controller/tradeService"; // API 함수 추가

function Home() {
  const [activeTab, setActiveTab] = useState("exhibition");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTradeData = async () => {
      setLoading(true);
      try {
        const params = {
          keyword: "",
          page: 0,
          size: 8,
          sort: "createdTime,desc",
        };
        const data = await fetchTrades(params);

        const formattedTrades = data.items.map((item) => ({
          id: item.listItemDto.id,
          title: item.listItemDto.name,
          price: `${item.listItemDto.price.toLocaleString()}원`,
          daysAgo: (() => {
            const createdDate = new Date(item.listItemDto.createdTime);
            const today = new Date();
            const diffTime = today - createdDate;
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            return diffDays === 0 ? "오늘" : `${diffDays}일 전`;
          })(),
          user: item.listItemDto.user.name,
          image: item.base64Image
            ? `data:image/png;base64,${item.base64Image}`
            : "/images/default.png",
        }));

        setTrades(formattedTrades);
      } catch (error) {
        console.error("거래 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    getTradeData();
  }, []);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <Header />
      <ContentSwitch activeTab={activeTab} onTabSwitch={handleTabSwitch} />
      <div onClick={() => setSearchOpen(true)}>
        <SearchBar placeholder="검색어를 입력하세요" />
      </div>
      <div className={styles.content}>
        {activeTab === "exhibition" ? (
          <ExhibitionContent />
        ) : loading ? (
          <p>거래 데이터를 불러오는 중...</p>
        ) : (
          <TradeContent trades={trades} />
        )}
      </div>
      <Footer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default Home;
