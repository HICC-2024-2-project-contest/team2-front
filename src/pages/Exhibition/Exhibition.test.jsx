import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ useNavigate 추가
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
import SearchOverlay from "../../components/SearchBox/SearchOverlay";

function Exhibition() {
  const navigate = useNavigate(); // ✅ 네비게이션 훅 추가

  const [filters, setFilters] = useState([
    { label: "지역", type: "v" },
    { label: "날짜", type: "v" },
    { label: "분야", type: "v" },
  ]);

  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [isSearchOpen, setSearchOpen] = useState(false); // ✅ isSearchOpen 상태 추가

  const [isAreaSheetOpen, setAreaSheetOpen] = useState(false);
  const [isDateSheetOpen, setDateSheetOpen] = useState(false);
  const [isFieldSheetOpen, setFieldSheetOpen] = useState(false);

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

      {/* ✅ 검색 바 추가 */}
      <div onClick={() => setSearchOpen(true)}>
        <SearchBar placeholder="전시, 대학명을 검색하세요" />
      </div>

      {/* ✅ 필터 헤더 추가 */}
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        {selectedExhibition ? (
          <DetailExhibition exhibition={selectedExhibition} onClose={handleCloseDetail} />
        ) : (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>추천 전시</h2>
            <ExhibitionBox onSelect={handleSelectExhibition} />
          </div>
        )}
      </div>

      {/* 지역 BottomSheet */}
      <Area_BottomSheet isOpen={isAreaSheetOpen} onClose={() => setAreaSheetOpen(false)} />

      {/* 날짜 BottomSheet */}
      <Date_BottomSheet isOpen={isDateSheetOpen} onClose={() => setDateSheetOpen(false)} />

      {/* 분야 BottomSheet */}
      <Field_BottomSheet isOpen={isFieldSheetOpen} onClose={() => setFieldSheetOpen(false)} />

      {/* ✅ 플로팅 버튼 - RegisterExhibition 페이지로 이동 */}
      <button className={styles.floatingButton} onClick={() => navigate("/register")}>
        +
      </button>

      <Footer />

      {/* ✅ 검색 오버레이 추가 */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default Exhibition;
