import React from "react";
import styles from "./Login.module.css";
import kakaoLoginImage from "../../assets/images/kakao_login_large_wide.png";
import MoaramLogo from "../../assets/svg/MOARAM_logo.svg";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const handleKakaoLogin = () => {
    console.log("카카오 로그인 버튼 클릭됨");
    window.Kakao.Auth.authorize({
      redirectUri: "YOUR_REDIRECT_URI", // 여기에 실제 리디렉트 URI 입력
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={MoaramLogo} alt="MOARAM Logo" className={styles.logo} />
        <p className={styles.subtitle}>간편하게 로그인하고</p>
        <p className={styles.subtitle}>다양한 서비스를 경험해보세요</p>
        <button className={styles.kakaoButton} onClick={handleKakaoLogin}>
          <img src={kakaoLoginImage} alt="카카오 로그인" className={styles.kakaoImage} />
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
