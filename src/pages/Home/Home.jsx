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
import ExhibitionCalendar from "../../components/ExhibitionCalendar/ExhibitionCalendar";

function Home() {
  const [activeTab, setActiveTab] = useState("exhibition");
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exhibitions, setExhibitions] = useState([]);

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
    const fetchExhibitionData = () => {
      const data2 = [
        {
          date: "2025-02-01",
          title: "홍익대학교 졸업전시",
          location: "서울 마포구",
          dateRange: "2025.02.01 ~ 2025.02.07",
        },
        {
          date: "2025-02-04",
          title: "서울예대 디자인전",
          location: "서울 성북구",
          dateRange: "2025.02.04 ~ 2025.02.10",
        },
        {
          date: "2025-02-04",
          title: "이화여대 조형예술전",
          location: "서울 서대문구",
          dateRange: "2025.02.04 ~ 2025.02.08",
        },
        {
          date: "2025-02-08",
          title: "한예종 조각과전",
          location: "서울 성동구",
          dateRange: "2025.02.08 ~ 2025.02.15",
        },
      ];
      setExhibitions(data2); // 데이터 상태 업데이트
    };

    fetchExhibitionData();
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
        {activeTab === "exhibition" && (
          <div className={styles.content}>
            <h2 className={styles.sectionTitle}>전시 캘린더</h2>
            <div className={styles.exhibitionCalendarContainer}>
              <ExhibitionCalendar exhibitions={exhibitions} />
            </div>
          </div>
        )}
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
