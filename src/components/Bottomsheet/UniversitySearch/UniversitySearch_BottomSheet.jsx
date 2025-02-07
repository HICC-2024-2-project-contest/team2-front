import React from "react";
import PropTypes from "prop-types";
import styles from "./UniversitySearch_BottomSheet.module.css";
import Basic from "../Basic";  // 상위 폴더에서 불러오기
import SearchBarNonicon from "../../Header/SearchBar_nonicon"; // Header 폴더에서 불러오기
import BackIcon from "../../../assets/svg/Back_icon.svg";

const UniversitySearch_BottomSheet = ({ isOpen, onClose }) => {
  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {/* 상단 바 */}
        <div className={styles.header}>
          <img 
            src={BackIcon} 
            alt="뒤로 가기" 
            className={styles.backIcon} 
            onClick={onClose} 
          />
          <SearchBarNonicon placeholder="대학을 검색하세요" />
        </div>

        {/* 검색 결과 영역 */}
        <div className={styles.results}>
        </div>
      </div>
    </Basic>
  );
};

UniversitySearch_BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UniversitySearch_BottomSheet;
