import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterExhibition.module.css";
import CameraIcon from "../../../assets/svg/Camera.svg";
import UniversitySearch_BottomSheet from "../../../components/Bottomsheet/UniversitySearch/UniversitySearch_BottomSheet";
import Date_BottomSheet from "../../../components/Bottomsheet/Date/Date_BottomSheet"; // ✅ 날짜 바텀시트 추가

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

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isDateBottomSheetOpen, setIsDateBottomSheetOpen] = useState(false); // ✅ 날짜 바텀시트 상태 추가

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

  const openUniversitySearch = () => {
    setIsBottomSheetOpen(true);
  };

  const handleUniversitySelect = (selectedUniversity) => {
    setFormData({ ...formData, university: selectedUniversity });
    setIsBottomSheetOpen(false);
  };

  // ✅ 기간 클릭 시 날짜 선택 바텀시트 열기
  const openDateSearch = () => {
    setIsDateBottomSheetOpen(true);
  };

  // ✅ 날짜 바텀시트에서 선택한 날짜 반영
  const handleDateSelect = (selectedDate) => {
    setFormData({ ...formData, date: selectedDate });
    setIsDateBottomSheetOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.closeButton} onClick={() => navigate(-1)}>
          ✕
        </button>
        <h2 className={styles.title}>전시 등록</h2>
        <span className={styles.saveDraft}>임시저장</span>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={styles.posterUpload}
          onClick={() => document.getElementById("posterInput").click()}
        >
          {formData.poster ? (
            <img src={formData.poster} alt="선택한 포스터" className={styles.posterPreview} />
          ) : (
            <img src={CameraIcon} alt="카메라 아이콘" className={styles.cameraIcon} />
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
          <input
            type="text"
            name="university"
            value={formData.university}
            placeholder="대학교를 검색하세요"
            readOnly
            className={styles.searchInput}
            onClick={openUniversitySearch}
          />
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

        {/* ✅ 기간 선택 시 바텀시트 열기 */}
        <div className={styles.inputGroup}>
          <label>기간 *</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            placeholder="날짜를 선택하세요"
            readOnly
            className={styles.searchInput}
            onClick={openDateSearch}
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

      <div className={styles.footer}>
        <button type="submit" className={styles.submitButton}>
          완료
        </button>
      </div>

      {/* ✅ UniversitySearch_BottomSheet 추가 */}
      {isBottomSheetOpen && (
        <UniversitySearch_BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          onSelect={handleUniversitySelect}
        />
      )}

      {/* ✅ Date_BottomSheet 추가 */}
      {isDateBottomSheetOpen && (
        <Date_BottomSheet
          isOpen={isDateBottomSheetOpen}
          onClose={() => setIsDateBottomSheetOpen(false)}
          onSelect={handleDateSelect}
        />
      )}
    </div>
  );
};

export default RegisterExhibition;
