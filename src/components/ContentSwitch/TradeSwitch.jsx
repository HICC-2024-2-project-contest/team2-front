import React from "react";
import PropTypes from "prop-types";
import styles from "./ContentSwitch.module.css";

function TradeSwitch({ activeTab, onTabSwitch }) {
  return (
    <div className={styles.switchContainer}>
      <button
        className={`${styles.tabButton} ${activeTab === "sell" ? styles.active : ""}`}
        onClick={() => onTabSwitch("sell")}
      >
        판매
      </button>
      <button
        className={`${styles.tabButton} ${activeTab === "buy" ? styles.active : ""}`}
        onClick={() => onTabSwitch("buy")}
      >
        구매
      </button>
      <div
        className={styles.activeIndicator}
        style={{
          transform: activeTab === "sell" ? "translateX(-50%)" : "translateX(50%)",
        }}
      />
    </div>
  );
}

// PropTypes 설정
TradeSwitch.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabSwitch: PropTypes.func.isRequired,
};

export default TradeSwitch;
