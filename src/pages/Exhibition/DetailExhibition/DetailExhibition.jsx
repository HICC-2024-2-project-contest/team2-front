import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailExhibition.module.css";
import TradeContent from "../../../components/TradeContent/TradeContent";
import ExhibitionHeader from "../../../components/ExhibitionBox/ExhibitionHeader/ExhibitionHeader";
import Footer from "../../../components/Footer/Footer";

const exhibitions = {
  1: {
    id: "1",
    title: "홍익대학교 동양학과 졸업전시",
    location: "서울특별시 마포구",
    date: "2024.11.04 ~ 2024.11.09",
    description:
      "2023 홍익대학교 산업디자인학과 졸업 전시, DESIGN•A에 초대합니다. 이번 전시에서는 산업디자인학과 117명의 학생이 제품, 공간, 운송, 그리고 인터랙션 4가지의 분야에서 다양한 졸업 작품을 선보입니다.",

    poster: "/images/ex1.png",
    artwork: "/images/artwork1.png",
    price: "500,000원",
    school: "홍익대학교",
    trades: [],
  },
};

const DetailExhibition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [exhibition, setExhibition] = useState(null);

  useEffect(() => {
    console.log("현재 URL에서 가져온 ID:", id);

    if (id) {
      setExhibition(exhibitions[id.toString()] || null);
    }
  }, [id]);

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
        <h2> 전시 정보를 불러올 수 없습니다.</h2>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          🔙 돌아가기
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ←
      </button>

      <div className={`${styles.fixedHeader} ${scrolled ? styles.active : ""}`}>
        <h3>{exhibition.title || "제목 없음"}</h3>
      </div>

      <ExhibitionHeader exhibition={exhibition} />

      <div className={styles.section}>
        <h3>전시 소개</h3>
        <p>{exhibition.description?.trim() || "설명이 없습니다."}</p>
      </div>

      <div className={styles.section}>
        <h3>구매 가능한 작품</h3>
        <div className={styles.tradeScrollContainer}>
          {" "}
          {/* ✅ 가로 스크롤 가능하게 변경 */}
          <TradeContent trades={exhibition.trades || []} />
        </div>
        <div className={styles.artworkContainer}>
          <img
            src={exhibition.artwork}
            alt="작품 이미지"
            className={styles.artworkImage}
          />
          <p>{exhibition.price}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>위치</h3>
        <p>{exhibition.location?.trim() || "위치 정보 없음"}</p>
      </div>

      <Footer />
    </div>
  );
};

export default DetailExhibition;
