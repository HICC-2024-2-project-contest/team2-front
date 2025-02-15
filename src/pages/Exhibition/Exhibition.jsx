import React, { useState, useEffect, useRef } from "react";
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
import BackIcon from "../../assets/svg/Back_icon.svg";
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
  const [selectedFieldIds, setSelectedFieldIds] = useState([]); // ✅ 선택한 분야 ID 상태 추가
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 4;
  const observerRef = useRef(null);

  const handleResetSearch = () => {
    setSearchKeyword("");
    setSelectedFieldIds([]); // ✅ 필터 초기화
    setPage(0);
    setHasMore(true);
    setExhibitions([]);
  };

  useEffect(() => {
    getExhibitions();
  }, [searchKeyword, page, selectedFieldIds]); // ✅ 선택한 분야 ID 변경 시 재요청

  const getExhibitions = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const params = {
        startDate: "2000-01-01",
        endDate: "2100-01-01",
        keyword: searchKeyword,
        fieldIds: selectedFieldIds.length > 0 ? selectedFieldIds.join(",") : null, // ✅ 선택된 분야 적용
        page,
        size: itemsPerPage,
        sort: "startDate,asc",
      };

      const data = await fetchExhibitions(params);

      const validExhibitions = data.exhibitions
        .map((item) => ({
          id: item.exhibitionDto.id,
          name: item.exhibitionDto.name,
          location: item.exhibitionDto.location || "위치 정보 없음",
          start: item.exhibitionDto.startDate,
          end: item.exhibitionDto.endDate,
          fieldId: item.exhibitionDto.field ? item.exhibitionDto.field.id : null, // ✅ 필터링을 위한 필드 ID 포함
          poster: item.base64Image
            ? `data:image/png;base64,${item.base64Image}`
            : "/images/ex1.png",
        }))
        .filter(
          (exhibition) =>
            selectedFieldIds.length === 0 ||
            (exhibition.fieldId !== null && selectedFieldIds.includes(exhibition.fieldId))
        );

      setExhibitions((prevExhibitions) =>
        page === 0 ? validExhibitions : [...prevExhibitions, ...validExhibitions]
      );

      if (data.exhibitions.length < itemsPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("전시 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

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
      <div className={styles.header}>
        <img
          src={BackIcon}
          alt="뒤로 가기"
          className={styles.backIcon}
          onClick={handleResetSearch}
        />
        <div onClick={() => setSearchOpen(true)} className={styles.a}>
          <SearchBar
            placeholder="전시명을 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onSearch={handleResetSearch}
          />
        </div>
      </div>
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        <ExhibitionList exhibitions={exhibitions} />
        {loading && <p>로딩 중...</p>}
        <div ref={observerRef} className={styles.scrollTrigger}></div>
      </div>

      <PlusButton />

      <Region_BottomSheet isOpen={isRegionSheetOpen} onClose={() => setRegionSheetOpen(false)} />
      <Date_BottomSheet isOpen={isDateSheetOpen} onClose={() => setDateSheetOpen(false)} />
      <Field_BottomSheet
        isOpen={isFieldSheetOpen}
        onClose={() => setFieldSheetOpen(false)}
        onFieldSelect={setSelectedFieldIds} // ✅ 선택한 필드 ID 업데이트
      />
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
