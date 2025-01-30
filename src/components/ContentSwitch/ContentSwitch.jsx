import React from "react";
import PropTypes from "prop-types";
import styles from "./ContentSwitch.module.css";

function ContentSwitch({ activeTab, onTabSwitch }) {
  return (
    <div className={styles.switchContainer}>
      <button
        className={`${styles.tabButton} ${
          activeTab === "exhibition" ? styles.active : ""
        }`}
        onClick={() => onTabSwitch("exhibition")}
      >
        전시
      </button>
      <button
        className={`${styles.tabButton} ${
          activeTab === "trade" ? styles.active : ""
        }`}
        onClick={() => onTabSwitch("trade")}
      >
        거래
      </button>
      <div
        className={styles.activeIndicator}
        style={{
          transform: activeTab === "exhibition" ? "translateX(-50%)" : "translateX(50%)",
        }}
      />
    </div>
  );
}

// PropTypes 정의
ContentSwitch.propTypes = {
    activeTab: PropTypes.string.isRequired, // 필수 문자열
    onTabSwitch: PropTypes.func.isRequired, // 필수 함수
  };

export default ContentSwitch;
