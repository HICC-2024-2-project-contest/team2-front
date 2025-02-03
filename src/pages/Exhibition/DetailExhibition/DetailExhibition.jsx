import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./DetailExhibition.module.css";
import TradeContent from "../../../components/TradeContent/TradeContent";
import ExhibitionHeader from "../../../components/ExhibitionBox/ExhibitionHeader/ExhibitionHeader";

const DetailExhibition = ({ exhibition, onClose }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!exhibition) {
    return (
      <div className={styles.container}>
        <h2>⚠️ 전시 정보를 불러올 수 없습니다.</h2>
        <button className={styles.closeButton} onClick={onClose}>
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.closeButton}
        onClick={() => {
          console.log("🔙 상세 페이지 닫기");
          onClose();
        }}
      >
        ✕
      </button>

      {/* 상단 고정 헤더 (스크롤 시 변환) */}
      <div className={`${styles.fixedHeader} ${scrolled ? styles.active : ""}`}>
        <h3>{exhibition.title}</h3>
      </div>

      {/* 전시 포스터 및 기본 정보 컴포넌트 */}
      <ExhibitionHeader exhibition={exhibition} />

      {/* 전시 소개 */}
      <div className={styles.section}>
        <h3>전시 소개</h3>
        <p>{exhibition.description || "설명이 없습니다."}</p>
      </div>

      {/* 구매 가능한 작품 */}
      <div className={styles.section}>
        <h3>구매 가능한 작품</h3>
        <TradeContent count={exhibition.count || 0} />
      </div>

      {/* 전시 위치 */}
      <div className={styles.section}>
        <h3>위치</h3>
        <p>{exhibition.location || "위치 정보 없음"}</p>
      </div>
    </div>
  );
};

DetailExhibition.propTypes = {
  exhibition: PropTypes.exact({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    schoolLogo: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    dday: PropTypes.number.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
    count: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
};

export default DetailExhibition;
