import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyPage_Setting.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import SearchBar from "../../../components/Header/SearchBar";
import SearchBarNonicon from "../../../components/Header/SearchBar_nonicon";
import ProfileInitial from "../../../assets/images/Profile_initial.png";
import CameraIcon from "../../../assets/svg/Camera.svg";
import BackIcon from "../../../assets/svg/Back_icon.svg";

function MyPage_Setting() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(ProfileInitial);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        {/* 뒤로가기 버튼 */}
        <img 
          src={BackIcon} 
          alt="뒤로 가기" 
          className={styles.backIcon} 
          onClick={() => navigate(-1)}
        />

        {/* 프로필 이미지 */}
        <div className={styles.profileContainer}>
          <img src={profileImage} alt="Profile" className={styles.profileImage} />
          
          {/* 파일 업로드 버튼 */}
          <label className={styles.cameraIcon}>
            <input 
              type="file" 
              accept="image/*" 
              className={styles.fileInput} 
              onChange={handleImageChange} 
            />
            <img src={CameraIcon} alt="카메라" />
          </label>
        </div>

        {/* 닉네임 입력 */}
        <label className={styles.label}>닉네임*</label>
        <SearchBarNonicon placeholder="닉네임 입력" />

        {/* 대학교 입력 */}
        <label className={styles.label}>대학교</label>
        <SearchBar placeholder="검색하기" />

        {/* 거래 위치 입력 */}
        <label className={styles.label}>거래 위치</label>
        <SearchBarNonicon placeholder="입력하기" />
      </div>

      <Footer />
    </div>
  );
}

export default MyPage_Setting;
