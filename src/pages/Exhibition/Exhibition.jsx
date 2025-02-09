import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate(); //  페이지 이동 함수

  //  전시 선택 시 상세 페이지로 이동
  const handleSelectExhibition = (exhibition) => {
    if (!exhibition || !exhibition.id) {
      console.error(
        "⚠️ 선택된 전시 데이터가 없거나 ID가 없습니다!",
        exhibition
      );
      return;
    }
    console.log(" 선택된 전시:", exhibition);
    navigate(`/exhibition/${exhibition.id}`); //  클릭 시 상세 페이지로 이동
  };

  //  필터 버튼 클릭 핸들러 (BottomSheet 열기)
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

  //  필터가 하나라도 열려 있으면 FloatingButton 숨기기
  const isAnyFilterOpen =
    isAreaSheetOpen || isDateSheetOpen || isFieldSheetOpen;

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>추천 전시</h2>
          <ExhibitionBox onSelect={handleSelectExhibition} />{" "}
          {/*  클릭 이벤트 전달 */}
        </div>
      </div>

      {/*  필터 모달 (BottomSheets) */}
      <Area_BottomSheet
        isOpen={isAreaSheetOpen}
        onClose={() => setAreaSheetOpen(false)}
      />
      <Date_BottomSheet
        isOpen={isDateSheetOpen}
        onClose={() => setDateSheetOpen(false)}
      />
      <Field_BottomSheet
        isOpen={isFieldSheetOpen}
        onClose={() => setFieldSheetOpen(false)}
      />

      {/* 플로팅 버튼 */}
      {!isAnyFilterOpen && (
        <button
          className={styles.floatingButton}
          onClick={() => navigate("/register")}
        >
          +
        </button>
      )}

      <Footer />
    </div>
  );
}

export default Exhibition;
