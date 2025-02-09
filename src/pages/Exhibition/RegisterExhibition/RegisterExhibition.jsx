import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterExhibition.module.css";
import CameraIcon from "../../../assets/svg/Camera.svg";

const RegisterExhibition = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    university: "",
    department: "",
    date: "",
    description: "",
    location: "",
    poster: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, poster: URL.createObjectURL(file) });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTextareaInput = (e) => {
    e.target.style.height = "117px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("등록된 데이터:", formData);
    navigate("/exhibition");
  };

  return (
    <div className={styles.container}>
      {/*  헤더: 화면 상단에 고정 */}
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={() => navigate(-1)}>
          ✕
        </button>
        <h2>전시 등록</h2>
        <span className={styles.saveDraft}>임시저장</span>
      </div>

      {/*  폼: 내부에서만 스크롤 가능 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={styles.posterUpload}
          onClick={() => document.getElementById("posterInput").click()}
        >
          {formData.poster ? (
            <img
              src={formData.poster}
              alt="선택한 포스터"
              className={styles.posterPreview}
            />
          ) : (
            <img
              src={CameraIcon}
              alt="카메라 아이콘"
              className={styles.cameraIcon}
            />
          )}
        </div>

        <input
          id="posterInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />

        <div className={styles.inputGroup}>
          <label>제목 *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="입력하기"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>대학교 *</label>
          <select
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          >
            <option value="">선택하기</option>
            <option value="홍익대학교">홍익대학교</option>
            <option value="서울대학교">서울대학교</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>학과 *</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="입력하기"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>기간 *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>전시 소개글 *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            onInput={handleTextareaInput}
            placeholder="입력하기"
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>전시 위치 (선택)</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="입력하기"
          />
        </div>
      </form>

      {/*  푸터: 화면 하단에 고정 */}
      <div className={styles.footer}>
        <button type="submit" className={styles.submitButton}>
          완료
        </button>
      </div>
    </div>
  );
};

export default RegisterExhibition;
