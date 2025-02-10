import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tool_BottomSheet.module.css';
import Basic from '../Basic';
import FilterHeader from '../../Header/FilterHeader';
import SelectButton from '../../Button/SelectButton/SelectButton';
import PriceFilter from '../PriceFilter';
import XIconURL from '../../../assets/svg/X_icon.svg?url'; 

const ToolDetail = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [priceRange, setPriceRange] = useState({ minPrice: '', maxPrice: '' });

  const typeFilters = ["전체", "물감", "드로잉 도구", "브러쉬", "이젤", "캔버스/종이", "팔레트", "테이프프"];
  const conditionFilters = ["새 제품", "중고 제품"];

  const handleTypeClick = (filterLabel) => setSelectedType(filterLabel);
  const handleConditionClick = (filterLabel) => setSelectedCondition(filterLabel);
  const handlePriceApply = (range) => setPriceRange(range);

  return (
    <Basic isOpen={isOpen} onClose={onClose}>
      <div className={styles.header}>
        <h2 className={styles.title}>도구</h2>
        <img src={XIconURL} alt="닫기" className={styles.closeIcon} onClick={onClose} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.subtitle}>도구 종류</h3>
        <FilterHeader 
          filters={typeFilters.map(label => ({ 
            label, 
            type: label === selectedType ? "selected" : "default" 
          }))} 
          onFilterClick={handleTypeClick}
          className={styles.bottomSheetFilterHeader}
        />

        <h3 className={styles.subtitle}>상태</h3>
        <FilterHeader 
          filters={conditionFilters.map(label => ({ 
            label, 
            type: label === selectedCondition ? "selected" : "default" 
          }))} 
          onFilterClick={handleConditionClick}
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

ToolDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToolDetail;
