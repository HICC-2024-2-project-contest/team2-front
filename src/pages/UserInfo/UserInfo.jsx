import React, { useState } from "react";
import { fetchUserInfo } from "../../api/userService";
import styles from "./UserInfo.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchUser = async () => {
    try {
      const response = await fetchUserInfo();
      setUserData(response);
      setError(null);
    } catch (err) {
      setError("사용자 정보를 불러오지 못했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <h2>사용자 정보 조회</h2>
      <button onClick={handleFetchUser}>내 정보 가져오기</button>

      {userData && (
        <div className={styles.result}>
          <h3>내 정보</h3>
          <p>ID: {userData.id}</p>
          <p>이름: {userData.name}</p>
          <p>이메일: {userData.email}</p>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
      <Footer />
    </div>
  );
};

export default UserInfo;
