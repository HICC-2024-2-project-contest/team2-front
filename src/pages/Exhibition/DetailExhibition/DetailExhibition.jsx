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
    location: "서울특별시 마포구 홍대입구역 2번 출구",
    date: "2024.11.04 ~ 2024.11.09",
    description:
      "2023 홍익대학교 산업디자인학과 졸업 전시, DESIGN•A에 초대합니다. 이번 전시에서는 산업디자인학과 117명의 학생이 제품, 공간, 운송, 그리고 인터랙션 4가지의 분야에서 다양한 졸업 작품을 선보입니다.",
    poster: "/images/ex1.png",
    artwork: "/images/artwork1.png",

    school: "홍익대학교",
    trades: [
      {
        id: "1",
        image: "/images/art1.png",
        title: "작품 A",
        price: "50,000원",
        daysAgo: "4일 전",
        user: "김작가",
      },
      {
        id: "2",
        image: "/images/art2.png",
        title: "작품 B",
        price: "70,000원",
        daysAgo: "5일 전",
        user: "이화백",
      },
      {
        id: "3",
        image: "/images/art3.png",
        title: "작품 C",
        price: "90,000원",
        daysAgo: "1일 전",
        user: "박예술",
      },
    ],
  },
};

const DetailExhibition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState(null);
  const [trades, setTrades] = useState([]); // ✅ useState 위치 수정

  useEffect(() => {
    if (id) {
      const selectedExhibition = exhibitions[id.toString()] || null;
      setExhibition(selectedExhibition);

      if (selectedExhibition) {
        setTrades(selectedExhibition.trades || []); // ✅ trades 상태 업데이트
      }
    }
  }, [id]);

  if (!exhibition) {
    return (
      <div className={styles.container}>
        <h2>전시 정보를 불러올 수 없습니다.</h2>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          🔙 돌아가기
        </button>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ExhibitionHeader exhibition={exhibition} />

      <div className={styles.section}>
        <h3>전시 소개</h3>
        <p>{exhibition.description?.trim() || "설명이 없습니다."}</p>
      </div>

      <div className={styles.section}>
        <h3>유사 상품</h3>
        <div className={styles.tradeScrollContainer}>
          {" "}
          {/* ✅ 가로 스크롤 컨테이너 추가 */}
          <TradeContent trades={trades} />
        </div>
        <div className={styles.artworkContainer}>
          <p>{exhibition.price}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>위치</h3>
        <p>{exhibition.location?.trim() || "위치 정보 없음"}</p>
      </div>

      <Footer className={styles.footer} />
    </div>
  );
};

export default DetailExhibition;
