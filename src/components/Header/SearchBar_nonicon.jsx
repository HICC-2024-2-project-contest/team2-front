import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.css';

function SearchBarNonicon({ placeholder }) {
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

// PropTypes 설정
SearchBarNonicon.propTypes = {
  placeholder: PropTypes.string
};

// 기본값 설정
SearchBarNonicon.defaultProps = {
  placeholder: "입력하기"
};

export default SearchBarNonicon;
