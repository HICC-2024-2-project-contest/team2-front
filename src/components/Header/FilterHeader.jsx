import React from 'react';
import styles from './FilterHeader.module.css';
import FilterButton from '../Button/FilterButton/FilterButton';

const FilterHeader = () => {
  return (
    <div className={styles.header}>
      <FilterButton label="작품" type="v" />
      <FilterButton label="필터 2" type="v" />
      <FilterButton label="필터 3" type="v" />
    </div>
  );
};

export default FilterHeader;
