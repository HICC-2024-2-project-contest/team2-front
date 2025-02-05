import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SettingIcon from "../../assets/svg/Setting_button.svg";
import ProfileImage from "../../assets/images/Profile_initial.png";

function MyPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>마이 페이지</h1>

        {/* 프로필 박스 */}
        <div className={styles.profileBox}>
          <div className={styles.profileImageContainer}>
            <img src={ProfileImage} alt="Profile" className={styles.profileImage} />
          </div>
          <div className={styles.profileText}>
            <h2 className={styles.userName}>사용자 이름</h2>
            <p className={styles.userInfo}>내 정보를 추가하세요</p>
          </div>
          <img 
            src={SettingIcon} 
            alt="설정" 
            className={styles.settingButton} 
            onClick={() => navigate("/mypage/setting")} 
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>전시</h3>
          <p className={styles.menuItem}>작성한 글 보기</p>
          <p className={styles.menuItem}>스크랩한 글 보기</p>
        </div>

        {/* 거래 섹션 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>거래</h3>
          <p className={styles.menuItem} onClick={() => navigate("/mypage/trade/my")}>작성한 글 보기</p> {/* 🔹 작성한 글 보기 클릭 시 이동 */}
          <p className={styles.menuItem} onClick={() => navigate("/mypage/trade/scrap")}>찜한 상품</p> {/* 🔹 찜한 상품 클릭 시 이동 */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
