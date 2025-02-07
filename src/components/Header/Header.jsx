import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/svg/MOARAM_logo.svg";
import chatButton from "../../assets/svg/Chat_button.svg";

function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="MOARAM Logo" className={styles.logo} />
      </div>
      <div className={styles.chatButtonContainer} onClick={() => navigate("/chat")}>
        <img src={chatButton} alt="Chat Button" className={styles.chatButton} />
      </div>
    </header>
  );
}

export default Header;
