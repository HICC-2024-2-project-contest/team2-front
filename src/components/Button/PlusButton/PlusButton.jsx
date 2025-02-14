import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./PlusButton.module.css";
import PlusWhite from "../../../assets/svg/Plus_white.svg";
import PlusBlack from "../../../assets/svg/Plus_black.svg";
import TagIcon from "../../../assets/svg/Tag_icon.svg";
import PieceIcon from "../../../assets/svg/Piece_icon.svg";
import ExhibitionIcon from "../../../assets/svg/Exhibition.svg";

function PlusButton({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onToggle) onToggle(!isOpen);
  };

  const handleRegisterClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* 배경 어두워지는 오버레이 */}
      {isOpen && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.active : ""}`}
          onClick={handleClick}
        ></div>
      )}

      {/* 플로팅 버튼 */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.open : ""}`}
        onClick={handleClick}
      >
        <img src={isOpen ? PlusBlack : PlusWhite} alt="Toggle Button" className={styles.icon} />
      </button>

      {/* 버튼 클릭 시 나타나는 옵션 메뉴 */}
      {isOpen && (
        <div className={styles.menu}>
          {location.pathname.startsWith("/trade") ? (
            <>
              <button
                className={styles.menuItem}
                onClick={() => handleRegisterClick("/trade/register-product")}
              >
                <img src={TagIcon} alt="Tag Icon" className={styles.menuIcon} />
                상품 등록
              </button>
              <button
                className={styles.menuItem}
                onClick={() => handleRegisterClick("/trade/register-piece")}
              >
                <img src={PieceIcon} alt="Piece Icon" className={styles.menuIcon} />
                작품 등록
              </button>
            </>
          ) : location.pathname.startsWith("/exhibition") ? (
            <button
              className={styles.menuItem}
              onClick={() => handleRegisterClick("/exhibition/registex")}
            >
              <img src={ExhibitionIcon} alt="Exhibition Icon" className={styles.menuIcon} />
              전시 등록
            </button>
          ) : null}
        </div>
      )}
    </>
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
