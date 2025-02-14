import React from "react";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";
import SearchIcon from "../../assets/svg/Search_button.svg";

function SearchBar({ placeholder, value, onChange, onSearch, onKeyPress }) {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
        />
        <button className={styles.searchButton} onClick={onSearch}>
          <img src={SearchIcon} alt="Search Icon" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired, // 🔹 추가
  onKeyPress: PropTypes.func.isRequired, // 🔹 추가
};

export default SearchBar;
