import React, { useState, useEffect, useRef } from "react";
import styles from "./Trade.module.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import FilterHeader from "../../components/Header/FilterHeader";
import Piece_BottomSheet from "../../components/Bottomsheet/Piece/Piece_BottomSheet";
import Tool_BottomSheet from "../../components/Bottomsheet/Tool/Tool_BottomSheet";
import ArrayBottomSheet from "../../components/Bottomsheet/Array/Array_BottomSheet";
import Footer from "../../components/Footer/Footer";
import TradeContent from "../../components/TradeContent/TradeContent";
import PlusButton from "../../components/Button/PlusButton/PlusButton";
import SearchOverlay from "../../components/SearchBox/SearchOverlay";
import BackIcon from "../../assets/svg/Back_icon.svg";
import { fetchTrades } from "../../api/trade-controller/tradeService";

function Trade() {
  const [filters, setFilters] = useState([
    { label: "작품", type: "v" },
    { label: "도구", type: "v" },
    { label: "정렬", type: "v" },
  ]);

  const [isPieceSheetOpen, setPieceSheetOpen] = useState(false);
  const [isToolSheetOpen, setToolSheetOpen] = useState(false);
  const [isArraySheetOpen, setArraySheetOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const [trades, setTrades] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 3;

  const observerRef = useRef(null);

  // 🔹 검색 초기화 함수
  const handleResetSearch = () => {
    setSearchKeyword("");
    setPage(0);
    setHasMore(true);
    setTrades([]);
  };

  // 🔹 검색 실행 함수
  const handleSearch = (term) => {
    setSearchKeyword(term);
    setPage(0);
    setHasMore(true);
    setTrades([]);
  };

  useEffect(() => {
    getTrades();
  }, [searchKeyword, page]);

  const getTrades = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const params = {
        keyword: searchKeyword,
        page,
        size: itemsPerPage,
        sort: "createdTime,desc",
      };

      const data = await fetchTrades(params);

      if (data.items.length === 0) {
        setHasMore(false);
      }

      const formattedTrades = data.items.map((item) => {
        const calculateDaysAgo = (createdTime) => {
          const createdDate = new Date(createdTime);
          const today = new Date();
          const diffTime = today - createdDate;
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          return diffDays === 0 ? "오늘" : `${diffDays}일 전`;
        };

        return {
          id: item.listItemDto.id,
          title: item.listItemDto.name,
          price: `${item.listItemDto.price.toLocaleString()}원`,
          createdTime: item.listItemDto.createdTime,
          user: item.listItemDto.user.name,
          daysAgo: calculateDaysAgo(item.listItemDto.createdTime),
          image: item.base64Image
            ? `data:image/png;base64,${item.base64Image}`
            : "/images/default.png",
        };
      });

      setTrades((prevTrades) =>
        page === 0 ? formattedTrades : [...prevTrades, ...formattedTrades]
      );

      if (data.pageInfo) {
        const totalElements = data.pageInfo.totalElements;
        const currentTotal = (page + 1) * itemsPerPage;
        if (currentTotal >= totalElements) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("거래 데이터 불러오기 오류:", error);
      setHasMore(false);
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
      <div className={styles.header}>
        <img
          src={BackIcon}
          alt="뒤로 가기"
          className={styles.backIcon}
          onClick={handleResetSearch} // 🔹 검색 초기화
        />
        <div onClick={() => setSearchOpen(true)} className={styles.a}>
          <SearchBar
            placeholder="작품, 제품명을 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onSearch={handleSearch} // 🔹 검색 실행
          />
        </div>
      </div>
      <FilterHeader filters={filters} onFilterClick={handleFilterClick} />

      <div className={styles.content}>
        <TradeContent trades={trades} />
        {loading && <p>로딩 중...</p>}
        <div ref={observerRef} className={styles.scrollTrigger}></div>
      </div>

      <PlusButton />

      <Piece_BottomSheet isOpen={isPieceSheetOpen} onClose={() => setPieceSheetOpen(false)} />
      <Tool_BottomSheet isOpen={isToolSheetOpen} onClose={() => setToolSheetOpen(false)} />
      <ArrayBottomSheet isOpen={isArraySheetOpen} onClose={() => setArraySheetOpen(false)} />

      {/* 🔹 검색 오버레이 추가 */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        type="trade"
        onSearch={handleSearch}
      />

      <Footer />
    </div>
  );
}

export default Trade;
