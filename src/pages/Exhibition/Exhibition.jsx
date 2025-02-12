import React, { useState, useEffect } from "react";
import styles from "./Exhibition.module.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import FilterHeader from "../../components/Header/FilterHeader";
import Footer from "../../components/Footer/Footer";
import ExhibitionList from "../../components/ExhibitionList/ExhibitionList";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import Region_BottomSheet from "../../components/Bottomsheet/Region/Region_BottomSheet";
import Date_BottomSheet from "../../components/Bottomsheet/Date/Date_BottomSheet";
import Field_BottomSheet from "../../components/Bottomsheet/Field/Field_BottomSheet";
import SearchOverlay from "../../components/SearchBox/SearchOverlay";

function Exhibition() {
  const [filters, setFilters] = useState([
    { label: "지역", type: "v" },
    { label: "날짜", type: "v" },
    { label: "분야", type: "v" },
  ]);

  const [isRegionSheetOpen, setRegionSheetOpen] = useState(false);
  const [isDateSheetOpen, setDateSheetOpen] = useState(false);
  const [isFieldSheetOpen, setFieldSheetOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    // 더미 데이터 사용 (추후 API 연동 가능)
    const fetchExhibitionData = async () => {
      const data = [
        {
          id: "1",
          title: "홍익대학교 동양학과 전시",
          location: "서울특별시 마포구",
          date: "2024.11.04 ~ 2024.11.09",
          poster: "/images/ex1.png",
          count: 23,
        },
        {
          id: "2",
          title: "서울예술대학교 조형전",
          location: "서울특별시 종로구",
          date: "2024.12.01 ~ 2024.12.15",
          poster: "/images/ex2.png",
          count: 12,
        },
        {
          id: "3",
          title: "국립현대미술관 특별전",
          location: "경기도 과천시",
          date: "2025.01.10 ~ 2025.02.20",
          poster: "/images/ex3.png",
          count: 30,
        },
      ];
      setExhibitions(data);
    };

    fetchExhibitionData();
  }, []);

  // 필터 버튼 클릭 시 동작
  const handleFilterClick = (filterLabel) => {
    if (filterLabel === "지역") {
      setRegionSheetOpen(true);
    } else if (filterLabel === "날짜") {
      setDateSheetOpen(true);
    } else if (filterLabel === "분야") {
      setFieldSheetOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div onClick={() => setSearchOpen(true)}>
        <SearchBar placeholder="전시명을 입력하세요" />
      </div>
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        <ExhibitionList exhibitions={exhibitions} />
      </div>

      {/* 플로팅 버튼 추가 */}
      <PlusButton />

      {/* 지역 BottomSheet */}
      <Region_BottomSheet isOpen={isRegionSheetOpen} onClose={() => setRegionSheetOpen(false)} />

      {/* 날짜 BottomSheet */}
      <Date_BottomSheet isOpen={isDateSheetOpen} onClose={() => setDateSheetOpen(false)} />

      {/* 분야 BottomSheet */}
      <Field_BottomSheet isOpen={isFieldSheetOpen} onClose={() => setFieldSheetOpen(false)} />

      {/* 검색 오버레이 */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />

      <Footer />
    </div>
  );
}

export default Exhibition;
