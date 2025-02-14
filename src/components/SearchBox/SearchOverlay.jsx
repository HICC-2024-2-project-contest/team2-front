import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SearchOverlay.module.css";
import SearchBar from "../Header/SearchBar";
import BackIcon from "../../assets/svg/Back_icon.svg";
import RecentSearch from "./RecentSearch";

const SearchOverlay = ({ isOpen, onClose, type }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // 검색 실행 시 API 호출
  const handleSearch = async (term) => {
    if (!term.trim()) return;

    const storedSearches = JSON.parse(localStorage.getItem(`recentSearches-${type}`)) || [];
    const updatedSearches = [term, ...storedSearches].slice(0, 10);
    localStorage.setItem(`recentSearches-${type}`, JSON.stringify(updatedSearches));

    console.log(`${type} 검색 실행:`, term);

    if (type === "exhibition") {
      console.log("전시 검색 API 호출");
    } else if (type === "trade") {
      console.log("거래 검색 API 호출");
    }

    setSearchTerm("");
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
          onKeyPress={(e) => e.key === "Enter" && handleSearch(searchTerm)}
        />
      </div>

      <RecentSearch onSearch={handleSearch} />
      <div className={styles.results}></div>
    </div>
  );
};

SearchOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["exhibition", "trade"]).isRequired,
};

export default SearchOverlay;
