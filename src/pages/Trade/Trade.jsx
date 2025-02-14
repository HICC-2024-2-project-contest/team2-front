import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Trade.module.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import FilterHeader from "../../components/Header/FilterHeader";
import Piece_BottomSheet from "../../components/Bottomsheet/Piece/Piece_BottomSheet";
import Tool_BottomSheet from "../../components/Bottomsheet/Tool/Tool_BottomSheet";
import ArrayBottomSheet from "../../components/Bottomsheet/Array/Array_BottomSheet";
import Footer from "../../components/Footer/Footer";
import TradeContent from "../../components/TradeContent/TradeContent";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import SearchOverlay from "../../components/SearchBox/SearchOverlay";

import sample1 from "../../assets/images/ex1.png";

function Trade() {
  const navigate = useNavigate(); //  페이지 이동 함수

  const [trades, setTrades] = useState([]);
  const [filters, setFilters] = useState([
    { label: "작품", type: "v" },
    { label: "도구", type: "v" },
    { label: "정렬", type: "v" },
  ]);

  const [isPieceSheetOpen, setPieceSheetOpen] = useState(false);
  const [isToolSheetOpen, setToolSheetOpen] = useState(false);
  const [isArraySheetOpen, setArraySheetOpen] = useState(false);

  //  API에서 데이터 가져오기 (현재는 더미 데이터)
  useEffect(() => {
    const fetchData = async () => {
      const data = [
        {
          id: "1",
          image: sample1,
          title: "작품 A",
          price: "50,000원",
          daysAgo: "4일 전",
          user: "김작가",
        },
        {
          id: "2",
          image: sample1,
          title: "작품 B",
          price: "70,000원",
          daysAgo: "5일 전",
          user: "이화백",
        },
        {
          id: "3",
          image: sample1,
          title: "작품 C",
          price: "90,000원",
          daysAgo: "1일 전",
          user: "박예술",
        },
      ];
      setTrades(data);
    };

    fetchData();
  }, []);

  // 필터 버튼 클릭 시 동작
  const handleFilterClick = (filterLabel) => {
    if (filterLabel === "작품") {
      setPieceSheetOpen(true);
    } else if (filterLabel === "도구") {
      setToolSheetOpen(true);
    } else if (filterLabel === "정렬") {
      setArraySheetOpen(true);
    }
  };

  const handleItemClick = (trade) => {
    console.log("이동할 데이터:", trade); // 🔹 디버깅 추가
    navigate(`/trade/detail/${trade.id}`); //  id 추가하여 이동
  };

  const [isSearchOpen, setSearchOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Header />
      <div onClick={() => setSearchOpen(true)}>
        <SearchBar placeholder="작품, 제품명을 입력하세요" />
      </div>
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        {/*  TradeContent에 onItemClick 전달 */}
        <TradeContent trades={trades} onItemClick={handleItemClick} />
      </div>

      {/* 플로팅 버튼 추가 */}
      <PlusButton />

      {/* 작품 BottomSheet */}
      <Piece_BottomSheet isOpen={isPieceSheetOpen} onClose={() => setPieceSheetOpen(false)} />

      {/* 도구 BottomSheet */}
      <Tool_BottomSheet isOpen={isToolSheetOpen} onClose={() => setToolSheetOpen(false)} />

      {/* 정렬 BottomSheet */}
      <ArrayBottomSheet isOpen={isArraySheetOpen} onClose={() => setArraySheetOpen(false)} />

      {/* 검색 오버레이 */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />

      <Footer />
    </div>
  );
}

export default Trade;
