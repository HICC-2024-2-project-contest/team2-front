import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import HomeGray from "../../assets/svg/Home_gray.svg";
import HomeBlack from "../../assets/svg/Home_black.svg";
import TradeGray from "../../assets/svg/Trade_gray.svg";
import TradeBlack from "../../assets/svg/Trade_black.svg";
import ExhibitionGray from "../../assets/svg/Exhibition_gray.svg";
import ExhibitionBlack from "../../assets/svg/Exhibition_black.svg";
import MyPageGray from "../../assets/svg/MyPage_gray.svg";
import MyPageBlack from "../../assets/svg/MyPage_black.svg";

function Footer() {
  return (
    <div className={styles.footer}>
      <NavLink to="/" className={styles.link} end>
        {({ isActive }) => (
          <>
            <img
              src={isActive ? HomeBlack : HomeGray}
              alt="홈 아이콘"
              className={styles.icon}
            />
            <span className={isActive ? styles.activeText : styles.inactiveText}>
              홈
            </span>
          </>
        )}
      </NavLink>
      <NavLink to="/exhibition" className={styles.link}>
        {({ isActive }) => (
          <>
            <img
              src={isActive ? ExhibitionBlack : ExhibitionGray}
              alt="전시 아이콘"
              className={styles.icon}
            />
            <span className={isActive ? styles.activeText : styles.inactiveText}>
              전시
            </span>
          </>
        )}
      </NavLink>
      <NavLink to="/trade" className={styles.link}>
        {({ isActive }) => (
          <>
            <img
              src={isActive ? TradeBlack : TradeGray}
              alt="거래 아이콘"
              className={styles.icon}
            />
            <span className={isActive ? styles.activeText : styles.inactiveText}>
              거래
            </span>
          </>
        )}
      </NavLink>
      
      <NavLink to="/mypage" className={styles.link}>
        {({ isActive }) => (
          <>
            <img
              src={isActive ? MyPageBlack : MyPageGray}
              alt="내 정보 아이콘"
              className={styles.icon}
            />
            <span className={isActive ? styles.activeText : styles.inactiveText}>
              내 정보
            </span>
          </>
        )}
      </NavLink>
    </div>
  );
}

export default Footer;
