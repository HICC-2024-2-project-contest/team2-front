import React from 'react';
import styles from './Trade.module.css';
import Header from "../../components/Header/Header";
import SearchBar from '../../components/Header/Searchbar';
import Footer from "../../components/Footer/Footer";

function Trade() {
  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to the Trade Page</h1>
        <p>This is the main page of the application.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Trade;