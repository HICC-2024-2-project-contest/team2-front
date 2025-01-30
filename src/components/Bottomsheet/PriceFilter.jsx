import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PriceFilter.module.css';
import DashIcon from '../../assets/svg/Dash.svg?url';

const PriceFilter = ({ onPriceChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 입력 가능
    setMinPrice(value);
    onPriceChange({ minPrice: value, maxPrice });
  };

  const handleMaxChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // 숫자만 입력 가능
    setMaxPrice(value);
    onPriceChange({ minPrice, maxPrice: value });
  };

  return (
    <div className={styles.priceFilter}>
      <h3 className={styles.title}>가격 범위</h3>
      <div className={styles.inputContainer}>
        <input 
          type="text" 
          placeholder="최소 금액" 
          value={minPrice} 
          onChange={handleMinChange} 
          className={styles.input}
        />
        <img src={DashIcon} alt="구분선" className={styles.separator} />
        <input 
          type="text" 
          placeholder="최대 금액" 
          value={maxPrice} 
          onChange={handleMaxChange} 
          className={styles.input}
        />
      </div>
    </div>
  );
};

PriceFilter.propTypes = {
  onPriceChange: PropTypes.func.isRequired,
};

export default PriceFilter;
