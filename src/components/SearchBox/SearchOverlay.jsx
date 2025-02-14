import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchOverlay.module.css";
import SearchBar from "../Header/SearchBar";
import BackIcon from "../../assets/svg/Back_icon.svg";
import RecentSearch from "./RecentSearch";

const SearchOverlay = ({ isOpen, onClose, type, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 실행 시 API 호출 및 검색어 저장
  const handleSearch = async (term) => {
    if (!term.trim()) return;

    // 최근 검색어 저장
    const storedSearches = JSON.parse(localStorage.getItem(`recentSearches-${type}`)) || [];
    const updatedSearches = [term, ...storedSearches].slice(0, 10);
    localStorage.setItem(`recentSearches-${type}`, JSON.stringify(updatedSearches));

    // 검색어 전달
    onSearch(term);

    setSearchTerm("");
    onClose(); // 검색 후 오버레이 닫기
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.header}>
        <img src={BackIcon} alt="뒤로 가기" className={styles.backIcon} onClick={onClose} />
        <SearchBar
          placeholder={
            type === "exhibition" ? "전시명을 입력하세요" : "작품명 또는 제품명을 입력하세요"
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={() => handleSearch(searchTerm)} // 🔹 검색 버튼 클릭 시 실행
          onKeyPress={(e) => e.key === "Enter" && handleSearch(searchTerm)}
        />
      </div>

      <RecentSearch onSearch={handleSearch} />
    </div>
  );
};

SearchOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["exhibition", "trade"]).isRequired,
  onSearch: PropTypes.func.isRequired, // 🔹 검색 실행 시 호출할 함수
};

export default SearchOverlay;
