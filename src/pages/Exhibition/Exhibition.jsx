import { useState } from "react";
import styles from "./Exhibition.module.css";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/Header/SearchBar";
import FilterHeader from "../../components/Header/FilterHeader";
import Footer from "../../components/Footer/Footer";
import ExhibitionBox from "../../components/ExhibitionBox/ExhibitionBox";

function Exhibition() {
  const [filters, setFilters] = useState([
    { label: "지역/대학", type: "v" },
    { label: "날짜", type: "v" },
    { label: "분야", type: "v" },
  ]);

  return (
    <div className={styles.container}>
      <Header />
      <SearchBar />
      <FilterHeader filters={filters} />

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>추천 전시</h2>
          <ExhibitionBox />
          <ExhibitionBox />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Exhibition;
