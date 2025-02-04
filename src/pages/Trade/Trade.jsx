import React, { useState } from 'react';
import styles from './Trade.module.css';
import Header from "../../components/Header/Header";
import SearchBar from '../../components/Header/SearchBar';
import FilterHeader from '../../components/Header/FilterHeader';
import Piece_BottomSheet from '../../components/Bottomsheet/Piece/Piece_BottomSheet';
import Tool_BottomSheet from '../../components/Bottomsheet/Tool/Tool_BottomSheet';
import ArrayBottomSheet from "../../components/Bottomsheet/Array/Array_BottomSheet";
import Footer from "../../components/Footer/Footer";
import TradeContent from "../../components/TradeContent/TradeContent";

function Trade() {
  const [filters, setFilters] = useState([
    { label: "작품", type: "v" },
    { label: "도구", type: "v" },
    { label: "정렬", type: "v" },
  ]);

  const [isPieceSheetOpen, setPieceSheetOpen] = useState(false);
  const [isToolSheetOpen, setToolSheetOpen] = useState(false);
  const [isArraySheetOpen, setArraySheetOpen] = useState(false);

  // 필터 버튼 클릭 시 동작
  const handleFilterClick = (filterLabel) => {
    console.log(`${filterLabel} 클릭됨`);

    if (filterLabel === "작품") {
      setPieceSheetOpen(true);
    } else if (filterLabel === "도구") {
      setToolSheetOpen(true); 
    } else if (filterLabel === "정렬") { 
      setArraySheetOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar placeholder="작품, 제품명을 입력하세요"/>
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        <TradeContent />
      </div>

      {/* 작품 BottomSheet */}
      <Piece_BottomSheet isOpen={isPieceSheetOpen} onClose={() => setPieceSheetOpen(false)} />

      {/* 도구 BottomSheet */}
      <Tool_BottomSheet isOpen={isToolSheetOpen} onClose={() => setToolSheetOpen(false)} /> 
      
      {/* 정렬 BottomSheet */}
      <ArrayBottomSheet isOpen={isArraySheetOpen} onClose={() => setArraySheetOpen(false)} />
      
      <Footer />
    </div>
  );
}

export default Trade;
