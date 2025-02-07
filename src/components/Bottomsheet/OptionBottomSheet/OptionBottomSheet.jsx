import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./OptionBottomSheet.module.css";

const OptionBottomSheet = ({ isOpen, onClose, onEdit, onDelete }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300); // 애니메이션 지속 시간
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.fadeIn : styles.fadeOut}`} onClick={onClose}>
      <div className={`${styles.container} ${isOpen ? styles.slideUp : styles.slideDown}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.optionButton} onClick={onEdit}>
          수정하기
        </button>
        <button className={styles.optionButton} onClick={onDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
};

OptionBottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OptionBottomSheet;