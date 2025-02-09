import React, { useState } from "react";
import styles from "./ExhibitionContent.module.css";
import ex1 from "../../assets/images/ex1.png";
import ex2 from "../../assets/images/ex2.png";

const exhibitions = [
  {
    id: 1,
    image: ex1,
    name: "홍익대학교 전시",
    start: "2025.01.01",
    end: "2025.02.02",
  },
  {
    id: 2,
    image: ex2,
    name: "홍익대학교 전시2",
    start: "2025.02.03",
    end: "2025.03.04",
  },
];

function Exhibition() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % exhibitions.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? exhibitions.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>현재 인기있는 전시</h1>
      <div className={styles.slider}>
        <button className={styles.navButton} onClick={handlePrev}>
          {"<"}
        </button>
        <div className={styles.imageContainer}>
          <img
            src={exhibitions[currentIndex].image}
            alt={exhibitions[currentIndex].name}
            className={styles.image}
          />
        </div>
        <button className={styles.navButton} onClick={handleNext}>
          {">"}
        </button>
      </div>
      <div className={styles.info}>
        <h3>{exhibitions[currentIndex].name}</h3>
        <p>
          {exhibitions[currentIndex].start} ~ {exhibitions[currentIndex].end}{" "}
          <span className={styles.chip}>
            {currentIndex + 1} / {exhibitions.length}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Exhibition;
