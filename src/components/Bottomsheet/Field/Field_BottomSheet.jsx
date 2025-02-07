import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Field_BottomSheet.module.css";
import Basic from "../Basic";
import SelectButton from "../../Button/SelectButton/SelectButton";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const Field_BottomSheet = ({ isOpen, onClose }) => {
  //  선택된 필터 상태
  const [selectedField, setSelectedField] = useState("전체");
  const [selectedSubField, setSelectedSubField] = useState({});

  const fields = {
    회화: ["전체", "동양화", "서양화", "서예"],
    디자인: ["전체", "시각디자인", "산업디자인", "패션디자인", "실내디자인"],
    조형: ["전체", "판화", "도예", "금속", "가구", "조소", "목조"],
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
    setSelectedSubField((prev) => ({
      ...prev,
      [field]: prev[field] || "전체",
    }));
  };

  const handleSubFieldClick = (field, subField) => {
    setSelectedSubField((prev) => ({
      ...prev,
      [field]: subField,
    }));
  };

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>분야</h2>
          <img
            src={XIconURL}
            alt="닫기"
            className={styles.closeIcon}
            onClick={onClose}
          />
        </div>

        {/*  필터 선택 영역 */}
        <div className={styles.content}>
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterButton} ${
                selectedField === "전체" ? styles.selected : ""
              }`}
              onClick={() => setSelectedField("전체")}
            >
              전체
            </button>
          </div>

          {Object.entries(fields).map(([field, subFields]) => (
            <div key={field}>
              <h3 className={styles.subtitle}>{field}</h3>
              <div className={styles.filterContainer}>
                {subFields.map((subField) => (
                  <button
                    key={subField}
                    className={`${styles.filterButton} ${
                      selectedSubField[field] === subField
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleSubFieldClick(field, subField)}
                  >
                    {subField}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 버튼 컨테이너 */}
        <div className={styles.buttonContainer}>
          <SelectButton label="선택 완료" onClick={onClose} />
        </div>
      </div>
    </Basic>
  );
};

Field_BottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Field_BottomSheet;
