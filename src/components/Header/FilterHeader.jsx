import React from "react";
import PropTypes from "prop-types"; // ✅ PropTypes 임포트
import styles from "./FilterHeader.module.css";
import FilterButton from "../Button/FilterButton/FilterButton";

const FilterHeader = ({
  filters = [],
  onFilterClick = () => {},
  className = "",
}) => {
  return (
    <div className={`${styles.header} ${className}`}>
      {/* ✅ className 적용 */}
      {filters.map((filter, index) => (
        <FilterButton
          key={index}
          label={filter.label}
          type={filter.type}
          onClick={() => onFilterClick(filter.label)}
        />
      ))}
    </div>
  );
};

// ✅ PropTypes 추가
FilterHeader.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["default", "v", "x"]),
    })
  ).isRequired,
  onFilterClick: PropTypes.func,
  className: PropTypes.string, // ✅ className Prop 추가
};

export default FilterHeader;
