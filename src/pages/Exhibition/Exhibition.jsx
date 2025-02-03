import { useState } from "react";
import styles from "./Exhibition.module.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import FilterHeader from "../../components/Header/FilterHeader";
import Footer from "../../components/Footer/Footer";
import ExhibitionBox from "../../components/ExhibitionBox/ExhibitionBox";
import DetailExhibition from "./DetailExhibition/DetailExhibition";
import Area_BottomSheet from "../../components/Bottomsheet/Area/Area_BottomSheet";
import Date_BottomSheet from "../../components/Bottomsheet/Date/Date_BottomSheet";
import Field_BottomSheet from "../../components/Bottomsheet/Field/Field_BottomSheet";

function Exhibition() {
  const [filters, setFilters] = useState([
    { label: "지역", type: "v" },
    { label: "날짜", type: "v" },
    { label: "분야", type: "v" },
  ]);

  const [selectedExhibition, setSelectedExhibition] = useState(null); // ✅ 선택된 전시 저장

  // ✅ 필터 버튼 클릭 핸들러 (BottomSheet 열기)
  const [isAreaSheetOpen, setAreaSheetOpen] = useState(false);
  const [isDateSheetOpen, setDateSheetOpen] = useState(false);
  const [isFieldSheetOpen, setFieldSheetOpen] = useState(false);

  // 필터 버튼 클릭 시 동작
  const handleFilterClick = (filterLabel) => {
    console.log(`${filterLabel} 클릭됨`);

    if (filterLabel === "지역") {
      setAreaSheetOpen(true);
    } else if (filterLabel === "날짜") {
      setDateSheetOpen(true);
    } else if (filterLabel === "분야") {
      setFieldSheetOpen(true);
    }
  };

  // ✅ 전시 선택 핸들러
  const handleSelectExhibition = (exhibition) => {
    if (!exhibition) {
      console.error("⚠️ 선택된 전시 데이터가 없습니다.", exhibition);
      return;
    }
    console.log("✅ 선택된 전시:", exhibition);
    setSelectedExhibition(exhibition);
  };

  // ✅ 상세 페이지 닫기 핸들러
  const handleCloseDetail = () => {
    console.log("🔙 상세 페이지 닫기");
    setSelectedExhibition(null);
  };

  // ✅ 필터가 하나라도 열려 있으면 FloatingButton 숨기기
  const isAnyFilterOpen =
    isAreaSheetOpen || isDateSheetOpen || isFieldSheetOpen;

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        {selectedExhibition ? (
          // ✅ 선택된 전시가 있을 경우 상세 페이지를 표시
          <DetailExhibition
            exhibition={selectedExhibition}
            onClose={handleCloseDetail}
          />
        ) : (
          // ✅ 선택된 전시가 없으면 전시 리스트를 표시
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>추천 전시</h2>
            <ExhibitionBox onSelect={handleSelectExhibition} />
          </div>
        )}
      </div>

      {/* 지역 BottomSheet */}
      <Area_BottomSheet
        isOpen={isAreaSheetOpen}
        onClose={() => setAreaSheetOpen(false)}
      />

      {/* 날짜 BottomSheet */}
      <Date_BottomSheet
        isOpen={isDateSheetOpen}
        onClose={() => setDateSheetOpen(false)}
      />

      {/* 분야 BottomSheet */}
      <Field_BottomSheet
        isOpen={isFieldSheetOpen}
        onClose={() => setFieldSheetOpen(false)}
      />

      {/* ✅ 플로팅 버튼 - 필터가 열려있으면 숨김 */}
      {!isAnyFilterOpen && (
        <button
          className={styles.floatingButton}
          onClick={() => alert("추가 버튼 클릭!")}
        >
          +
        </button>
      )}

      <Footer />
    </div>
  );
}

export default Exhibition;
