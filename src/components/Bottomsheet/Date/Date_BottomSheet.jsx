import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Date_BottomSheet.module.css";
import Basic from "../Basic";
import SelectButton from "../../Button/SelectButton/SelectButton";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const Date_BottomSheet = ({ isOpen, onClose }) => {
  const [selectedDateRange, setSelectedDateRange] = useState("전체");
  const [startDate, setStartDate] = useState("2025.01.25");
  const [endDate, setEndDate] = useState("2025.01.25");

  const dateFilters = ["전체", "일주일", "1개월", "3개월"];

  // ✅ 날짜 버튼 클릭 핸들러
  const handleDateClick = (range) => {
    setSelectedDateRange(range);
  };

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h2 className={styles.title}>날짜</h2>
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
          {dateFilters.map((range) => (
            <button
              key={range}
              className={`${styles.dateButton} ${selectedDateRange === range ? styles.selected : ""}`}
              onClick={() => handleDateClick(range)}
            >
              {range}
            </button>
          ))}
        </div>

        {/* 직접 선택 */}
        <h3 className={styles.subtitle}>직접 선택</h3>
        <div className={styles.datePickerContainer}>
          <input
            type="date"
            value={startDate}
            className={styles.dateInput}
            onChange={(e) => setStartDate(e.target.value)} // ✅ 날짜 변경 핸들러 추가
          />
          <span className={styles.separator}>—</span>
          <input
            type="date"
            value={endDate}
            className={styles.dateInput}
            onChange={(e) => setEndDate(e.target.value)} // ✅ 날짜 변경 핸들러 추가
          />
        </div>
      </div>

      {/* 선택 완료 버튼 */}
      <div className={styles.buttonContainer}>
        <SelectButton label="선택 완료" onClick={onClose} />
      </div>
    </Basic>
  );
};

Date_BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Date_BottomSheet;
