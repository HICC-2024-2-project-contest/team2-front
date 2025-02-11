import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Field_BottomSheet.module.css";
import Basic from "../Basic";
import FilterHeader from "../../Header/FilterHeader";
import SelectButton from "../../Button/SelectButton/SelectButton";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const FieldBottomSheet = ({ isOpen, onClose }) => {
  // 선택된 필터 상태
  const [selectedPainting, setSelectedPainting] = useState("전체");
  const [selectedDesign, setSelectedDesign] = useState("전체");
  const [selectedSculpture, setSelectedSculpture] = useState("전체");

  // 회화, 디자인, 조형 필터 리스트
  const paintingFilters = ["전체", "동양화", "서양화", "서예"];
  const designFilters = ["전체", "시각디자인", "산업디자인", "패션디자인", "실내디자인"];
  const sculptureFilters = ["전체", "판화", "도예", "금속", "가구", "조소", "목조"];

  // 필터 선택 핸들러
  const handlePaintingClick = (filterLabel) => setSelectedPainting(filterLabel);
  const handleDesignClick = (filterLabel) => setSelectedDesign(filterLabel);
  const handleSculptureClick = (filterLabel) => setSelectedSculpture(filterLabel);

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>분야</h2>
        <img src={XIconURL} alt="닫기" className={styles.closeIcon} onClick={onClose} />
      </div>

      <div className={styles.content}>
        {/* 회화 */}
        <h3 className={styles.subtitle}>회화</h3>
        <FilterHeader
          filters={paintingFilters.map((label) => ({
            label,
            type: label === selectedPainting ? "selected" : "default",
          }))}
          onFilterClick={handlePaintingClick}
          className={styles.bottomSheetFilterHeader}
        />

        {/* 디자인 */}
        <h3 className={styles.subtitle}>디자인</h3>
        <FilterHeader
          filters={designFilters.map((label) => ({
            label,
            type: label === selectedDesign ? "selected" : "default",
          }))}
          onFilterClick={handleDesignClick}
          className={styles.bottomSheetFilterHeader}
        />

        {/* 조형 */}
        <h3 className={styles.subtitle}>조형</h3>
        <FilterHeader
          filters={sculptureFilters.map((label) => ({
            label,
            type: label === selectedSculpture ? "selected" : "default",
          }))}
          onFilterClick={handleSculptureClick}
          className={styles.bottomSheetFilterHeader}
        />
      </div>

      <div className={styles.buttonContainer}>
        <SelectButton label="선택 완료" onClick={onClose} />
      </div>
    </Basic>
  );
};

FieldBottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FieldBottomSheet;
