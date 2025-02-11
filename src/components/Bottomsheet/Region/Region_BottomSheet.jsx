import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Region_BottomSheet.module.css";
import Basic from "../Basic";
import FilterHeader from "../../Header/FilterHeader";
import SelectButton from "../../Button/SelectButton/SelectButton";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const ToolDetail = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState("전체");

  const typeFilters = [
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

  const handleTypeClick = (filterLabel) => setSelectedType(filterLabel);

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>지역</h2>
        <img src={XIconURL} alt="닫기" className={styles.closeIcon} onClick={onClose} />
      </div>

      <div className={styles.content}>
        <FilterHeader
          filters={typeFilters.map((label) => ({
            label,
            type: label === selectedType ? "selected" : "default",
          }))}
          onFilterClick={handleTypeClick}
          className={styles.bottomSheetFilterHeader}
        />
      </div>

      <div className={styles.buttonContainer}>
        <SelectButton label="선택" onClick={onClose} />
      </div>
    </Basic>
  );
};

ToolDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToolDetail;
