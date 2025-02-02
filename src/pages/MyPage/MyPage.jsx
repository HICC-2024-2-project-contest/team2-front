import React from "react";
import styles from "./MyPage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import SettingIcon from "../../assets/svg/Setting_button.svg";
import ProfileImage from "../../assets/images/Profile_initial.png";

function MyPage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        {/* 마이 페이지 제목 */}
        <h1 className={styles.pageTitle}>마이 페이지</h1>

        {/* 프로필 박스 */}
        <div className={styles.profileBox}>
          <img
            src={ProfileImage}
            alt="Profile"
            className={styles.profileImage}
          />
          <div className={styles.profileText}>
            <h2 className={styles.userName}>사용자 이름</h2>
            <p className={styles.userInfo}>내 정보를 추가하세요</p>
          </div>
          <img src={SettingIcon} alt="설정" className={styles.settingButton} />
        </div>

        {/* 전시 섹션 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>전시</h3>
          <p className={styles.menuItem}>작성한 글 보기</p>
          <p className={styles.menuItem}>스크랩한 글 보기</p>
        </div>

        {/* 거래 섹션 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>거래</h3>
          <p className={styles.menuItem}>작성한 글 보기</p>
          <p className={styles.menuItem}>찜한 상품</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
