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
import { fetchExhibitions } from "../../api/exhibition-controller/exhibitionService";

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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    getExhibitions();
  }, [searchKeyword, page]); // 🔹 page가 변경될 때만 API 요청 실행

  const getExhibitions = async () => {
    if (loading) return; // 🔹 중복 요청 방지
    setLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0]; // 오늘 날짜

      const params = {
        startDate: "2000-01-01",
        endDate: "2100-01-01",
        keyword: searchKeyword, //
        fieldId: null,
        page,
        size: itemsPerPage,
        sort: "startDate,asc", // 시작 날짜 기준 오름차순 정렬
      };

      const data = await fetchExhibitions(params);

      // 종료일이 오늘 이후인 전시만 필터링
      const validExhibitions = data.exhibitions
        .map((item) => ({
          id: item.exhibitionDto.id,
          name: item.exhibitionDto.name,
          location: item.exhibitionDto.location || "위치 정보 없음",
          start: item.exhibitionDto.startDate,
          end: item.exhibitionDto.endDate,
          poster: item.base64Image
            ? `data:image/png;base64,${item.base64Image}`
            : "/images/ex1.png",
        }))
        .filter((exhibition) => exhibition.end >= today);

      setExhibitions((prevExhibitions) =>
        page === 0 ? validExhibitions : [...prevExhibitions, ...validExhibitions]
      );
    } catch (error) {
      console.error("전시 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 "더 보기" 버튼 클릭 시 page 상태 증가 (중복 로드 방지)
  const loadMoreExhibitions = () => {
    if (!loading) setPage((prevPage) => prevPage + 1);
  };

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
        {loading && <p>로딩 중...</p>}
        {!loading && exhibitions.length > 0 && (
          <button className={styles.loadMoreButton} onClick={loadMoreExhibitions}>
            더 보기
          </button>
        )}
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
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        type="exhibition"
        onSearch={setSearchKeyword}
      />

      <Footer />
    </div>
  );
}

export default Exhibition;
