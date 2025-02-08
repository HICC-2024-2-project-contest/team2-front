import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ExhibitionPlus.module.css";
import PlusWhite from "../../../../assets/svg/Plus_white.svg";
import PlusBlack from "../../../../assets/svg/Plus_black.svg";

function PlusButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/RegisterExhibition"); // ✅ 버튼 클릭 시 페이지 이동
  };

  return (
    <button className={styles.floatingButton} onClick={handleClick}>
      <img src={PlusWhite} alt="Register Exhibition" className={styles.icon} />
    </button>
  );
}

// PropTypes 설정
PlusButton.propTypes = {
  onToggle: PropTypes.func,
};

// 기본값 설정
PlusButton.defaultProps = {
  onToggle: () => {},
};

export default PlusButton;
