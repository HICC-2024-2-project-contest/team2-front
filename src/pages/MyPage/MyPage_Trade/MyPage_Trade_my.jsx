import React from 'react';
import styles from './MyPage_Trade.module.css';
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import TradeContent from "../../../components/TradeContent/TradeContent";

function MyPage_Trade_my() {
  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>내가 작성한 거래</h1>
        <TradeContent />
      </div>

      <Footer />
    </div>
  );
}

export default MyPage_Trade_my;
