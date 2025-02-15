import React from "react";
import styles from "./Login.module.css";
import KakaoLogin from "react-kakao-login";
import MoaramLogo from "../../assets/svg/MOARAM_logo.svg";
import Footer from "../../components/Footer/Footer";

const kakaoClientId = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY; // 실제 JavaScript 키로 변경

const kakaoOnSuccess = (data) => {
  console.log("카카오 로그인 성공:", data);
  const idToken = data.response.access_token; // 액세스 토큰 가져오기

  // 로컬 스토리지에 토큰 저장
  localStorage.setItem("kakao_token", idToken);

  alert("로그인 성공! 이제 서비스를 이용할 수 있습니다.");
};

const kakaoOnFailure = (error) => {
  console.error("카카오 로그인 실패:", error);
  alert("카카오 로그인에 실패하였습니다. 다시 시도해주세요.");
};

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={MoaramLogo} alt="MOARAM Logo" className={styles.logo} />
        <p className={styles.subtitle}>간편하게 로그인하고</p>
        <p className={styles.subtitle}>다양한 서비스를 경험해보세요</p>
        <div className={styles.kakaoButtonWrapper}>
          <KakaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFailure}
            buttonText="카카오 로그인"
            className={styles.kakaoButton} // 기존 스타일 유지
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
