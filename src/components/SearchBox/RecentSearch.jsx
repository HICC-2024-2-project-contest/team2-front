import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./RecentSearch.module.css";
import FilterButton from "../Button/FilterButton/FilterButton";

const RecentSearch = ({ onSearch }) => {
  const [recentSearches, setRecentSearches] = useState([]);

  // 로컬 스토리지에서 검색어 불러오기
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  // 검색어 추가 (새로운 검색어가 저장될 때 호출)
  const addSearchTerm = (term) => {
    if (!term.trim() || recentSearches.includes(term)) return;
    
    const updatedSearches = [term, ...recentSearches].slice(0, 10); // 최근 검색어 최대 10개 저장
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // 검색어 개별 삭제
  const removeSearchTerm = (term) => {
    const updatedSearches = recentSearches.filter((item) => item !== term);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // 모든 검색어 삭제
  const clearAllSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div className={styles.recentSearchContainer}>
      <div className={styles.header}>
        <span className={styles.title}>최근 검색어</span>
        <button className={styles.clearAll} onClick={clearAllSearches}>
            전체 삭제
        </button>
        
      </div>
      <div className={styles.searchList}>
        {recentSearches.map((term) => (
          <FilterButton key={term} label={term} type="x" onClick={() => removeSearchTerm(term)} />
        ))}
      </div>
    </div>
  );
};

RecentSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default RecentSearch;
