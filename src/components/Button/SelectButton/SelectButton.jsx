import React from 'react';
import PropTypes from 'prop-types';
import styles from './SelectButton.module.css';

const SelectButton = ({ label, onClick }) => {
  return (
    <button className={styles.selectButton} onClick={onClick}>
      {label}
    </button>
  );
};

SelectButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SelectButton;
