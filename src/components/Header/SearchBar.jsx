import React from 'react';
import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';
import SearchIcon from '../../assets/svg/Search_button.svg';

function SearchBar({ placeholder }) {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
        />
        <button className={styles.searchButton}>
          <img src={SearchIcon} alt="Search Icon" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

// PropTypes 설정
SearchBar.propTypes = {
  placeholder: PropTypes.string
};

// 기본값 설정
SearchBar.defaultProps = {
  placeholder: "Search here..."
};

export default SearchBar;