import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./DetailExhibition.module.css";
import TradeContent from "../../../components/TradeContent/TradeContent";
import ExhibitionHeader from "../../../components/ExhibitionBox/ExhibitionHeader/ExhibitionHeader";

const exhibitions = {
  1: {
    id: "1",
    title: "홍익대학교 동양학과 졸업전시",
    location: "서울특별시 마포구",
    date: "2024.11.04 ~ 2024.11.09",
    description: "2023 홍익대학교 산업디자인학과 졸업 전시입니다.",
    poster: "/images/ex1.png",
    artwork: "/images/artwork1.png",
    price: "500,000원",
  },
};

const DetailExhibition = () => {
  const { id } = useParams(); //  URL에서 전시 ID 가져오기
  const navigate = useNavigate(); //  뒤로 가기 기능을 위한 navigate
  const [scrolled, setScrolled] = useState(false);
  const exhibition = exhibitions[String(id)]; //  ID에 해당하는 전시 정보 가져오기

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
    console.warn("⚠️ DetailExhibition: 해당 전시 데이터를 찾을 수 없습니다.");
    return (
      <div className={styles.container}>
        <h2>⚠️ 전시 정보를 불러올 수 없습니다.</h2>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          🔙 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ←
      </button>

      {/* 상단 고정 헤더 (스크롤 시 변환) */}
      <div className={`${styles.fixedHeader} ${scrolled ? styles.active : ""}`}>
        <h3>{exhibition.title || "제목 없음"}</h3>
      </div>

      {/* 전시 포스터 및 기본 정보 */}
      <ExhibitionHeader exhibition={exhibition} />

      {/* 전시 소개 */}
      <div className={styles.section}>
        <h3>전시 소개</h3>
        <p>{exhibition.description?.trim() || "설명이 없습니다."}</p>
      </div>

      {/* 구매 가능한 작품 */}
      <div className={styles.section}>
        <h3>구매 가능한 작품</h3>
        <TradeContent count={1} />
        <div className={styles.artworkContainer}>
          <img
            src={exhibition.artwork}
            alt="작품 이미지"
            className={styles.artworkImage}
          />
          <p>{exhibition.price}</p>
        </div>
      </div>

      {/* 전시 위치 */}
      <div className={styles.section}>
        <h3>위치</h3>
        <p>{exhibition.location?.trim() || "위치 정보 없음"}</p>
      </div>
    </div>
  );
};

DetailExhibition.propTypes = {
  exhibition: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster: PropTypes.string,
    schoolLogo: PropTypes.string,
    school: PropTypes.string,
    date: PropTypes.string.isRequired,
    dday: PropTypes.number,
    description: PropTypes.string,
    location: PropTypes.string,
    count: PropTypes.number,
  }),
};

export default DetailExhibition;
