import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchOverlay.module.css";
import SearchBar from "../Header/SearchBar";
import BackIcon from "../../assets/svg/Back_icon.svg";
import RecentSearch from "./RecentSearch";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 실행 시 검색어 저장
  const handleSearch = (term) => {
    if (!term.trim()) return;

    // 최근 검색어 저장 (RecentSearch에서 처리)
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    const updatedSearches = [term, ...storedSearches].slice(0, 10);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    console.log("검색 실행:", term);
    setSearchTerm("");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <img
          src={BackIcon}
          alt="뒤로 가기"
          className={styles.backIcon}
          onClick={onClose}
        />
        <SearchBar
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch(searchTerm)}
        />
      </div>
      
      {/* 최근 검색어 목록  */}
      <RecentSearch onSearch={handleSearch} />

      {/* 검색 결과 표시 공간 (추후 추가 가능) */}
      <div className={styles.results}></div>
    </div>
  );
};

SearchOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchOverlay;
