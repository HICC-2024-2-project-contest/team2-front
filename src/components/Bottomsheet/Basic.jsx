import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Basic.module.css';

const Basic = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // ✅ 모달 열릴 때 스크롤 방지
    } else {
      document.body.style.overflow = 'auto'; // ✅ 닫히면 스크롤 가능
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.bottomSheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle}></div>
        {children} {/* ✅ 바텀시트 안에 들어갈 내용 */}
      </div>
    </div>
  );
};

// ✅ PropTypes 추가 (ESLint 오류 방지)
Basic.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Basic;
