import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
import styles from "./Exhibition.module.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import FilterHeader from "../../components/Header/FilterHeader";
import Footer from "../../components/Footer/Footer";
import ExhibitionBox from "../../components/ExhibitionBox/ExhibitionBox";
import DetailExhibition from "./DetailExhibition/DetailExhibition";
import Piece_BottomSheet from "../../components/Bottomsheet/Piece/Piece_BottomSheet";
import Tool_BottomSheet from "../../components/Bottomsheet/Tool/Tool_BottomSheet";
import ArrayBottomSheet from "../../components/Bottomsheet/Array/Array_BottomSheet";

function Exhibition() {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 추가

  const [filters, setFilters] = useState([
    { label: "지역", type: "v" },
    { label: "날짜", type: "v" },
    { label: "분야", type: "v" },
  ]);

  const [selectedExhibition, setSelectedExhibition] = useState(null);

  const [isPieceSheetOpen, setPieceSheetOpen] = useState(false);
  const [isToolSheetOpen, setToolSheetOpen] = useState(false);
  const [isArraySheetOpen, setArraySheetOpen] = useState(false);

  const handleFilterClick = (filterLabel) => {
    console.log(`${filterLabel} 클릭됨`);

    if (filterLabel === "지역") {
      setPieceSheetOpen(true);
    } else if (filterLabel === "날짜") {
      setToolSheetOpen(true);
    } else if (filterLabel === "분야") {
      setArraySheetOpen(true);
    }
  };

  const handleSelectExhibition = (exhibition) => {
    if (!exhibition) {
      console.error("⚠️ 선택된 전시 데이터가 없습니다.", exhibition);
      return;
    }
    console.log("✅ 선택된 전시:", exhibition);
    setSelectedExhibition(exhibition);
  };

  const handleCloseDetail = () => {
    console.log("🔙 상세 페이지 닫기");
    setSelectedExhibition(null);
  };

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        {selectedExhibition ? (
          <DetailExhibition
            exhibition={selectedExhibition}
            onClose={handleCloseDetail}
          />
        ) : (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>추천 전시</h2>
            <ExhibitionBox onSelect={handleSelectExhibition} />
          </div>
        )}
      </div>

      {/* 지역 BottomSheet */}
      <Piece_BottomSheet
        isOpen={isPieceSheetOpen}
        onClose={() => setPieceSheetOpen(false)}
      />

      {/* 날짜 BottomSheet */}
      <Tool_BottomSheet
        isOpen={isToolSheetOpen}
        onClose={() => setToolSheetOpen(false)}
      />

      {/* 분야 BottomSheet */}
      <ArrayBottomSheet
        isOpen={isArraySheetOpen}
        onClose={() => setArraySheetOpen(false)}
      />

      {/* ✅ 플로팅 버튼 - RegisterExhibition 페이지로 이동 */}
      <button
        className={styles.floatingButton}
        onClick={() => navigate("/register")}
      >
        +
      </button>

      <Footer />
    </div>
  );
}

export default Exhibition;
