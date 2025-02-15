import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Field_BottomSheet.module.css";
import Basic from "../Basic";
import FilterHeader from "../../Header/FilterHeader";
import SelectButton from "../../Button/SelectButton/SelectButton";
import XIconURL from "../../../assets/svg/X_icon.svg?url";

// ✅ 카테고리별 필드 데이터
const categories = [
  {
    category: "회화",
    fields: [
      { id: 1, name: "동양화" },
      { id: 2, name: "서양화" },
      { id: 3, name: "서예" },
    ],
  },
  {
    category: "디자인",
    fields: [
      { id: 4, name: "시각디자인" },
      { id: 5, name: "산업디자인" },
      { id: 6, name: "패션디자인" },
      { id: 7, name: "실내디자인" },
    ],
  },
  {
    category: "조형",
    fields: [
      { id: 8, name: "판화" },
      { id: 9, name: "도예" },
      { id: 10, name: "금속" },
      { id: 11, name: "가구" },
      { id: 12, name: "조소" },
      { id: 13, name: "목조" },
    ],
  },
];

const FieldBottomSheet = ({ isOpen, onClose, onFieldSelect }) => {
  // ✅ 처음에 각 카테고리에서 "전체"가 선택된 상태 유지
  const [selectedFields, setSelectedFields] = useState({
    회화: ["전체"],
    디자인: ["전체"],
    조형: ["전체"],
  });

  // ✅ 필드 선택 핸들러 (OR 조건)
  const handleFieldClick = (category, fieldName, fieldId) => {
    setSelectedFields((prev) => {
      const currentSelection = prev[category];

      if (fieldName === "전체") {
        // "전체"를 선택하면 해당 카테고리의 모든 선택 해제 또는 전체 선택
        return {
          ...prev,
          [category]: currentSelection.includes("전체") ? [] : ["전체"],
        };
      } else {
        // 개별 항목 선택 시 "전체"가 선택되었으면 해제 후 추가
        const updatedSelection = currentSelection.includes(fieldName)
          ? currentSelection.filter((name) => name !== fieldName)
          : [...currentSelection.filter((name) => name !== "전체"), fieldName];

        // 모든 필드가 선택되었으면 "전체"를 다시 추가
        const allFields = categories.find((c) => c.category === category).fields.map((f) => f.name);
        if (updatedSelection.length === allFields.length) {
          updatedSelection.push("전체");
        }

        return { ...prev, [category]: updatedSelection };
      }
    });
  };

  // ✅ 선택 완료 버튼 핸들러
  const handleConfirm = () => {
    // 선택된 항목에서 "전체"를 제외하고 해당하는 ID만 추출
    const selectedFieldIds = categories.flatMap((category) =>
      category.fields
        .filter((field) => selectedFields[category.category].includes(field.name))
        .map((field) => field.id)
    );

    onFieldSelect(selectedFieldIds); // ✅ 선택한 필드 ID 배열 전달
    onClose();
  };

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>분야</h2>
        <img src={XIconURL} alt="닫기" className={styles.closeIcon} onClick={onClose} />
      </div>

      <div className={styles.content}>
        {categories.map((category) => (
          <div key={category.category}>
            {/* ✅ OR 조건으로 카테고리 선택 */}
            <h3 className={styles.subtitle}>{category.category}</h3>
            <FilterHeader
              filters={[
                {
                  label: "전체",
                  type: selectedFields[category.category].includes("전체") ? "selected" : "default",
                },
                ...category.fields.map((field) => ({
                  label: field.name,
                  type: selectedFields[category.category].includes(field.name)
                    ? "selected"
                    : "default",
                })),
              ]}
              onFilterClick={(label) => {
                const selected = category.fields.find((field) => field.name === label);
                handleFieldClick(category.category, label, selected?.id);
              }}
            />
          </div>
        ))}
      </div>

      <div className={styles.buttonContainer}>
        <SelectButton label="선택 완료" onClick={handleConfirm} />
      </div>
    </Basic>
  );
};

FieldBottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFieldSelect: PropTypes.func.isRequired, // ✅ 선택한 필드 ID 배열 전달
};

export default FieldBottomSheet;
