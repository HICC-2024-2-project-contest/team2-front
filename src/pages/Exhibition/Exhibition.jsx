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
  // 필터 데이터 초기화
  const [filters, setFilters] = useState([
    { label: "지역", type: "v" },
    { label: "날짜", type: "v" },
    { label: "분야", type: "v" },
  ]);

  // 바텀시트 및 검색창 상태 관리
  const [isRegionSheetOpen, setRegionSheetOpen] = useState(false);
  const [isDateSheetOpen, setDateSheetOpen] = useState(false);
  const [isFieldSheetOpen, setFieldSheetOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  // 전시 데이터 및 검색 상태 관리
  const [exhibitions, setExhibitions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 이상 불러올 데이터가 있는지 여부
  const itemsPerPage = 4;

  // Intersection Observer를 위한 ref
  const observerRef = useRef(null);

  // 검색 초기화 함수
  const handleResetSearch = () => {
    setSearchKeyword("");
    setPage(0);
    setHasMore(true);
    setExhibitions([]);
  };

  // 전시 데이터 가져오기 (페이지나 검색어가 변경될 때 실행)
  useEffect(() => {
    getExhibitions();
  }, [searchKeyword, page]);

  const getExhibitions = async () => {
    if (loading || !hasMore) return; // 중복 요청 방지 및 데이터가 없을 경우 중단
    setLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0];

      const params = {
        startDate: "2000-01-01",
        endDate: "2100-01-01",
        keyword: searchKeyword,
        fieldId: null,
        page,
        size: itemsPerPage,
        sort: "startDate,asc",
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

      // 기존 전시 목록과 새 데이터를 합쳐서 저장
      setExhibitions((prevExhibitions) =>
        page === 0 ? validExhibitions : [...prevExhibitions, ...validExhibitions]
      );

      // 더 이상 불러올 데이터가 없을 경우 hasMore 상태 변경
      if (data.exhibitions.length < itemsPerPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("전시 데이터를 불러오는 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer를 사용하여 스크롤이 끝에 도달하면 페이지 번호 증가
  useEffect(() => {
    if (!hasMore) return; // 추가 데이터가 없으면 실행하지 않음

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

  // 필터 버튼 클릭 시 바텀시트 열기
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
        {/* 뒤로 가기 버튼 클릭 시 검색 초기화 */}
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
      <Field_BottomSheet isOpen={isFieldSheetOpen} onClose={() => setFieldSheetOpen(false)} />
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
