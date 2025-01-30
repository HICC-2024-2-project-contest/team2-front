import React from "react";
import styles from "./MyPage.module.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import Footer from "../../components/Footer/Footer";

function MyPage() {
  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to the Exhibition Page</h1>
        <p>This is the main page of the application.</p>
      </div>
      <Footer />
    </div>
  );
}

export default MyPage;
