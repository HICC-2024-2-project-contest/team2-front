import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Array_BottomSheet.module.css";
import Basic from "../Basic";
import XIconURL from '../../../assets/svg/X_icon.svg?url'; 

const sortOptions = ["최신순", "정확도순", "높은 가격순", "낮은 가격순"];

const ArrayBottomSheet = ({ isOpen, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]); // 기본값: 최신순

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
          <div className={styles.header}>
            <h2 className={styles.title}>작품</h2>
            <img src={XIconURL} alt="닫기" className={styles.closeIcon} onClick={onClose} />
          </div>

      <div className={styles.content}>
        {sortOptions.map((option) => (
          <button
            key={option}
            className={`${styles.optionButton} ${
              selectedOption === option ? styles.selected : ""
            }`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </Basic>
  );
};

ArrayBottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ArrayBottomSheet;
