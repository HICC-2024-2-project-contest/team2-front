import React, { useState } from 'react';
import styles from './Trade.module.css';
import Header from "../../components/Header/Header";
import SearchBar from '../../components/Header/SearchBar';
import FilterHeader from '../../components/Header/FilterHeader';
import Piece_BottomSheet from '../../components/Bottomsheet/Piece/Piece_BottomSheet'; // ✅ 작품 바텀시트 추가
import Footer from "../../components/Footer/Footer";
import TradeContent from "../../components/TradeContent/TradeContent";

function Trade() {
  const [filters, setFilters] = useState([
    { label: "작품", type: "v" },
    { label: "도구", type: "v" },
    { label: "최신순", type: "v" },
  ]);

  const [isPieceSheetOpen, setPieceSheetOpen] = useState(false); // BottomSheet 상태 추가

  // 필터 버튼 클릭 시 동작
  const handleFilterClick = (filterLabel) => {
    console.log(`${filterLabel} 클릭됨`);

    if (filterLabel === "작품") {
      setPieceSheetOpen(true); // "작품" 버튼을 클릭하면 BottomSheet 열기
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        <TradeContent />
      </div>

      {/* 작품 BottomSheet 추가 */}
      <Piece_BottomSheet isOpen={isPieceSheetOpen} onClose={() => setPieceSheetOpen(false)} />

      <Footer />
    </div>
  );
}

export default Trade;
