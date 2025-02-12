import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Date_BottomSheet.module.css";
import Basic from "../Basic";
import FilterHeader from "../../Header/FilterHeader";
import SelectButton from "../../Button/SelectButton/SelectButton";
import PriceFilter from "../PriceFilter";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const DateDetail = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState("전체");
  const [startDate, setStartDate] = useState("2025.01.25");
  const [endDate, setEndDate] = useState("2025.01.25");
  const typeFilters = ["전체", "일주일", "1개월", "3개월"];

  const handleTypeClick = (filterLabel) => setSelectedType(filterLabel);

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>날짜</h2>
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

      <h3 className={styles.subtitle}>직접 선택</h3>
      <div className={styles.datePickerContainer}>
        <input
          type="date"
          value={startDate}
          className={styles.dateInput}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span className={styles.separator}>—</span>
        <input
          type="date"
          value={endDate}
          className={styles.dateInput}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className={styles.buttonContainer}>
        <SelectButton label="선택" onClick={onClose} />
      </div>
    </Basic>
  );
};

DateDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DateDetail;
