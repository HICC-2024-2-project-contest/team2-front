import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Basic.module.css';

const Basic = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    } else if (visible) {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      setIsClosing(false);
      setVisible(false);
      onClose();
    }, 300); // 애니메이션 지속 시간
  };

  if (!visible) return null;

  return (
    // 페이드 인 아웃은 없음
    <div className={`${styles.overlay} ${isClosing ? styles.fadeOut : styles.fadeIn}`} onClick={handleClose}> 
      <div
        className={`${styles.bottomSheet} ${isClosing ? styles.slideDown : styles.slideUp}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handle}></div>
        {children}
      </div>
    </div>
  );
};

Basic.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Basic;
