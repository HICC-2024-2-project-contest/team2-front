import React, { useState } from "react";
import styles from "./Chat.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import TradeSwitch from "../../components/ContentSwitch/TradeSwitch";
import BackIcon from "../../assets/svg/Back_icon.svg";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [activeTab, setActiveTab] = useState("sell"); // 기본 선택: 판매
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* 상단 바 */}
      <div className={styles.header}>
        <img src={BackIcon} alt="뒤로 가기" className={styles.backIcon} onClick={() => navigate(-1)} />
        <span className={styles.title}>쪽지함</span>
      </div>

      {/* 판매/구매 전환 스위치 */}
      <TradeSwitch activeTab={activeTab} onTabSwitch={setActiveTab} />

      {/* 채팅 목록 (현재는 빈 상태) */}
      <div className={styles.chatList}>
        {activeTab === "sell" ? (
          <p>판매 쪽지 목록이 여기에 표시됩니다.</p>
        ) : (
          <p>구매 쪽지 목록이 여기에 표시됩니다.</p>
        )}
      </div>

      {/* 하단 네비게이션 */}
      <Footer />
    </div>
  );
};

export default Chat;
