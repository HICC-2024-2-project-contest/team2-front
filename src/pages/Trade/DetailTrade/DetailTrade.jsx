import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailTrade.module.css";
import TradeContent from "../../../components/TradeContent/TradeContent";
import TradeHeader from "../../../components/TradeContent/TradeHeader/TradeHeader"; // ✅ 기존 경로 유지
import Footer from "../../../components/Footer/Footer";

const tradesData = {
  1: {
    id: "1",
    title: "몽마르아트 아크릴 물감 24색",
    seller: "홍길동",
    sellerLogo: "/images/default_logo.png",
    location: "서울특별시 마포구 홍대입구역 2번 출구",
    date: "2024.11.04 ~ 2024.11.09",
    price: "94,900원",
    dday: 2,
    description:
      "2023 홍익대학교 산업디자인학과 졸업 전시, DESIGN•A에 초대합니다. 이번 전시에서는 산업디자인학과 117명의 학생이 제품, 공간, 운송, 그리고 인터랙션 4가지의 분야에서 다양한 졸업 작품을 선보입니다.",
    poster: "/images/ex1.png",
    trades: [
      //  거래 가능한 작품 추가
      {
        id: "101",
        image: "/images/art1.png",
        title: "작품 A",
        price: "50,000원",
        daysAgo: "4일 전",
        user: "김작가",
      },
      {
        id: "102",
        image: "/images/art2.png",
        title: "작품 B",
        price: "70,000원",
        daysAgo: "5일 전",
        user: "이화백",
      },
      {
        id: "103",
        image: "/images/art3.png",
        title: "작품 C",
        price: "90,000원",
        daysAgo: "1일 전",
        user: "박예술",
      },
    ],
  },
};

const DetailTrade = () => {
  const { id } = useParams();
  console.log("현재 받은 id 값:", id);
  const navigate = useNavigate();
  const [trade, setTrade] = useState(null);

  useEffect(() => {
    if (id) {
      const selectedTrade = tradesData[id.toString()] || null;
      setTrade(selectedTrade);
    }
  }, [id]);

  if (!trade) {
    return (
      <div className={styles.container}>
        <h2>거래 정보를 불러올 수 없습니다.</h2>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          돌아가기
        </button>
        <Footer />
      </div>
    );
  }

  // ✅ 작품 클릭 시 상세 페이지 이동 함수 추가
  const handleItemClick = (selectedTrade) => {
    console.log("✅ 선택한 작품:", selectedTrade);
    navigate(`/trade/detail/${selectedTrade.id}`);
  };

  return (
    <div className={styles.container}>
      {/*  상단 거래 헤더 (이미지, 제목, 날짜, 가격 등) */}
      <TradeHeader trade={trade} />

      {/*  상품 소개 및 거래 위치 */}
      <div className={styles.tradeDetails}>
        <div className={styles.section}>
          <h3>상품 소개</h3>
          <p>{trade.description?.trim() || "설명이 없습니다."}</p>
        </div>

        <div className={styles.section}>
          <h3>거래 위치</h3>
          <p>{trade.location?.trim() || "위치 정보 없음"}</p>
        </div>
      </div>

      {/* ✅ 구매 가능한 작품 리스트 추가 */}
      <div className={styles.section}>
        <h3>구매 가능한 작품</h3>
        <TradeContent trades={trade.trades} onItemClick={handleItemClick} />
      </div>

      {/*  쪽지 보내기 버튼 (하단 고정) */}
      <button className={styles.messageButton}>쪽지 보내기</button>

      <Footer />
    </div>
  );
};

export default DetailTrade;
