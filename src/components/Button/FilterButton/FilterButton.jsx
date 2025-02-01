import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilterButton.module.css';
import VIcon from '../../../assets/svg/V_icon.svg';
import XIcon from '../../../assets/svg/X_icon.svg';

const FilterButton = ({ label, type = "default", onClick }) => {
  return (
    <button className={`${styles.button} ${styles[type]}`} onClick={onClick}>
      {label}
      {type === "v" && <img src={VIcon} alt="V icon" className={styles.icon} />}
      {type === "x" && <img src={XIcon} alt="X icon" className={styles.icon} />}
    </button>
  );
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["default", "v", "x"]),
  onClick: PropTypes.func,
};

FilterButton.defaultProps = {
  type: "default",
  onClick: () => {},
};

export default FilterButton;
