import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Field_BottomSheet.module.css";
import Basic from "../Basic";
import SelectButton from "../../Button/SelectButton/SelectButton";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

const Field_BottomSheet = ({ isOpen, onClose }) => {
  // ✅ 선택된 필드 상태
  const [selectedField, setSelectedField] = useState("전체");
  const [selectedSubFields, setSelectedSubFields] = useState({});
  const [isGlobalAllSelected, setIsGlobalAllSelected] = useState(true); // ✅ "전체" 선택 여부

  const fields = {
    회화: ["전체", "동양화", "서양화", "서예"],
    디자인: ["전체", "시각디자인", "산업디자인", "패션디자인", "실내디자인"],
    조형: ["전체", "판화", "도예", "금속", "가구", "조소", "목조"],
  };

  // ✅ "전체" 버튼 클릭 시 모든 선택 초기화
  const handleGlobalAllClick = () => {
    setSelectedField("전체");
    setSelectedSubFields({});
    setIsGlobalAllSelected(true); // ✅ 전체 선택 활성화
  };

  // ✅ 필드 버튼 클릭 핸들러 (회화, 디자인, 조형 선택)
  const handleFieldClick = (field) => {
    if (selectedField === "전체") {
      setSelectedField(field);
      setIsGlobalAllSelected(false); // ✅ "전체" 해제
    } else {
      setSelectedField(field);
    }
    setSelectedSubFields((prev) => ({
      ...prev,
      [field]: prev[field] || ["전체"], // ✅ 초기값 "전체" 설정
    }));
  };

  // ✅ 서브 필드 클릭 핸들러 (복수 선택 가능)
  const handleSubFieldClick = (field, subField) => {
    setSelectedSubFields((prev) => {
      const currentSelected = prev[field] || [];

      if (subField === "전체") {
        return { ...prev, [field]: ["전체"] }; // ✅ "전체" 선택 시 기존 선택 초기화
      } else {
        const isSelected = currentSelected.includes(subField);
        const newSelection = isSelected
          ? currentSelected.filter((item) => item !== subField) // ✅ 선택 해제
          : [...currentSelected.filter((item) => item !== "전체"), subField]; // ✅ "전체" 해제 후 추가

        // ✅ 회화, 디자인, 조형 중 하나라도 개별 선택되면 "분야"의 "전체" 해제
        setIsGlobalAllSelected(false);

        return { ...prev, [field]: newSelection };
      }
    });
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

        {/* 필터 선택 영역 */}
        <div className={styles.content}>
          {/* 전체 선택 버튼 */}
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterButton} ${
                isGlobalAllSelected ? styles.selected : ""
              }`}
              onClick={handleGlobalAllClick}
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
                      selectedSubFields[field]?.includes(subField)
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
