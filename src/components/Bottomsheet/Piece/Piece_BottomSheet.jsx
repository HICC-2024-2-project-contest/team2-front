import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Piece_BottomSheet.module.css";
import Basic from "../Basic";
import FilterHeader from "../../Header/FilterHeader";
import SelectButton from "../../Button/SelectButton/SelectButton";
import PriceFilter from "../PriceFilter";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const PieceDetail = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState("전체");
  const [selectedMaterial, setSelectedMaterial] = useState("전체");
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });

  const typeFilters = ["전체", "회화", "조각", "조각/입체", "사진", "드로잉 일러스트", "설치 미술"];
  const materialFilters = ["전체", "종이", "나무", "금속", "돌", "캔버스", "석고", "찰흙"];

  const handleTypeClick = (filterLabel) => setSelectedType(filterLabel);
  const handleMaterialClick = (filterLabel) => setSelectedMaterial(filterLabel);
  const handleSizeClick = (filterLabel) => setSelectedSize(filterLabel);
  const handlePriceApply = (range) => setPriceRange(range);

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>작품</h2>
        <img src={XIconURL} alt="닫기" className={styles.closeIcon} onClick={onClose} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.subtitle}>작품 종류</h3>
        <FilterHeader
          filters={typeFilters.map((label) => ({
            label,
            type: label === selectedType ? "selected" : "default",
          }))}
          onFilterClick={handleTypeClick}
          className={styles.bottomSheetFilterHeader}
        />

        <h3 className={styles.subtitle}>재료</h3>
        <FilterHeader
          filters={materialFilters.map((label) => ({
            label,
            type: label === selectedMaterial ? "selected" : "default",
          }))}
          onFilterClick={handleMaterialClick}
          className={styles.bottomSheetFilterHeader}
        />

        {/* 가격 필터 추가 */}
        <PriceFilter onPriceChange={setPriceRange} />
      </div>

      <div className={styles.buttonContainer}>
        <SelectButton label="선택" onClick={onClose} />
      </div>
    </Basic>
  );
};

PieceDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PieceDetail;
