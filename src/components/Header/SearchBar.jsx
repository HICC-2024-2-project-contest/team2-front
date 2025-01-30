import React from 'react';
import styles from './SearchBar.module.css';
import SearchIcon from '../../assets/svg/Search_button.svg';

function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Search here..."
        />
        <button className={styles.searchButton}>
          <img src={SearchIcon} alt="Search Icon" className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;