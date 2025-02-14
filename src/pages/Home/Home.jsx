import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SearchBar from "../../components/Header/SearchBar";
import ContentSwitch from "../../components/ContentSwitch/ContentSwitch";
import ExhibitionContent from "../../components/ExhibitionContent/ExhibitionContent";
import TradeContent from "../../components/TradeContent/TradeContent";
import SearchOverlay from "../../components/SearchBox/SearchOverlay";
import ExhibitionCalendar from "../../components/ExhibitionCalendar/ExhibitionCalendar";

import sample1 from "../../assets/images/ex1.png";

function Home() {
  const [activeTab, setActiveTab] = useState("exhibition"); // 초기값: 전시
  const [isSearchOpen, setSearchOpen] = useState(false); // 검색창 상태
  const [trades, setTrades] = useState([]);
  const [exhibitions, setExhibitions] = useState([]); // 전시 데이터 상태

  useEffect(() => {
    // 거래 데이터 불러오기
    const fetchTradeData = async () => {
      const data = [
        {
          image: sample1,
          title: "작품 A",
          price: "50,000원",
          daysAgo: "3일 전",
          user: "김작가",
        },
        {
          image: sample1,
          title: "작품 B",
          price: "70,000원",
          daysAgo: "5일 전",
          user: "이화백",
        },
        {
          image: sample1,
          title: "작품 C",
          price: "90,000원",
          daysAgo: "1일 전",
          user: "박예술",
        },
      ];
      setTrades(data);
    };

    // 전시 데이터 불러오기
    const fetchExhibitionData = async () => {
      const data = [
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
      setExhibitions(data);
    };

    fetchTradeData();
    fetchExhibitionData();
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
        {/* 전시 캘린더 (전시 탭에서만 보이도록 수정) */}
        {activeTab === "exhibition" && (
          <div className={styles.content}>
            <h2 className={styles.sectionTitle}>나만의 전시 캘린더</h2>
            <div className={styles.exhibitionCalendarContainer}>
              <ExhibitionCalendar exhibitions={exhibitions} />
            </div>
          </div>
        )}

        {/* 전시/거래 콘텐츠 */}
        {activeTab === "exhibition" ? <ExhibitionContent /> : <TradeContent trades={trades} />}
      </div>

      <Footer />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default Home;
