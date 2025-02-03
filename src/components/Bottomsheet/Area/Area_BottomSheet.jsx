import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Area_BottomSheet.module.css";
import Basic from "../Basic";
import SelectButton from "../../Button/SelectButton/SelectButton";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const Region_BottomSheet = ({ isOpen, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState("전체");

  const regionFilters = [
    "전체",
    "서울",
    "경기",
    "인천",
    "부산",
    "제주",
    "울산",
    "경남",
    "대구",
    "경북",
    "강원",
    "대전",
    "충남",
    "충북",
    "세종",
    "전남",
    "광주",
    "전북",
  ];

  // ✅ 지역 버튼 클릭 핸들러
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h2 className={styles.title}>지역</h2>
        <img
          src={XIconURL}
          alt="닫기"
          className={styles.closeIcon}
          onClick={onClose}
        />
      </div>

      {/* 필터 목록 */}
      <div className={styles.content}>
        <div className={styles.filterContainer}>
          {regionFilters.map((region) => (
            <button
              key={region}
              className={`${styles.regionButton} ${selectedRegion === region ? styles.selected : ""}`}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* 선택 완료 버튼 */}
      <div className={styles.buttonContainer}>
        <SelectButton label="선택 완료" onClick={onClose} />
      </div>
    </Basic>
  );
};

Region_BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Region_BottomSheet;
