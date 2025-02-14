import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Piece_BottomSheet.module.css";
import Basic from "../Basic";
import FilterHeader from "../../Header/FilterHeader";
import SelectButton from "../../Button/SelectButton/SelectButton";
import PriceFilter from "../PriceFilter";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const PieceDetail = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState(["전체"]);
  const [selectedMaterial, setSelectedMaterial] = useState(["전체"]);
  const [selectedSize, setSelectedSize] = useState(["전체"]);
  const [priceRange, setPriceRange] = useState({ minPrice: "", maxPrice: "" });

  const typeFilters = [
    "전체",
    "회화",
    "조각",
    "조각/입체",
    "사진",
    "드로잉 일러스트",
    "설치 미술",
  ];
  const sizeFilters = ["전체", "소형(A4이하)", "중형(A3-A2)", "대형(A1이상)"];
  const materialFilters = ["전체", "캔버스", "종이", "나무", "금속"];

  // ✅ 카테고리별 필터 선택 핸들러 (전체는 단일 선택, 나머지는 복수 선택 가능)
  const handleFilterClick = (
    category,
    label,
    selectedState,
    setSelectedState
  ) => {
    setSelectedState((prev) => {
      if (label === "전체") {
        return ["전체"]; // ✅ "전체" 선택 시 기존 선택 초기화
      } else {
        const isSelected = prev.includes(label);
        const newSelection = isSelected
          ? prev.filter((item) => item !== label) // ✅ 선택 해제
          : [...prev.filter((item) => item !== "전체"), label]; // ✅ "전체" 해제 후 추가

        return newSelection.length === 0 ? ["전체"] : newSelection; // ✅ 최소 한 개는 선택 유지
      }
    });
  };

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>작품</h2>
        <img
          src={XIconURL}
          alt="닫기"
          className={styles.closeIcon}
          onClick={onClose}
        />
      </div>

      <div className={styles.content}>
        {/* ✅ 작품 종류 */}
        <h3 className={styles.subtitle}>작품 종류</h3>
        <FilterHeader
          filters={typeFilters.map((label) => ({
            label,
            type: selectedType.includes(label) ? "selected" : "default",
          }))}
          onFilterClick={(label) =>
            handleFilterClick("type", label, selectedType, setSelectedType)
          }
          className={styles.bottomSheetFilterHeader}
        />

        {/* ✅ 크기 */}
        <h3 className={styles.subtitle}>크기</h3>
        <FilterHeader
          filters={sizeFilters.map((label) => ({
            label,
            type: selectedSize.includes(label) ? "selected" : "default",
          }))}
          onFilterClick={(label) =>
            handleFilterClick("size", label, selectedSize, setSelectedSize)
          }
          className={styles.bottomSheetFilterHeader}
        />

        {/* ✅ 재료 */}
        <h3 className={styles.subtitle}>재료</h3>
        <FilterHeader
          filters={materialFilters.map((label) => ({
            label,
            type: selectedMaterial.includes(label) ? "selected" : "default",
          }))}
          onFilterClick={(label) =>
            handleFilterClick(
              "material",
              label,
              selectedMaterial,
              setSelectedMaterial
            )
          }
          className={styles.bottomSheetFilterHeader}
        />

        {/* ✅ 가격 필터 */}
        <PriceFilter onPriceChange={setPriceRange} />
      </div>

      {/* ✅ 선택 버튼 */}
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
