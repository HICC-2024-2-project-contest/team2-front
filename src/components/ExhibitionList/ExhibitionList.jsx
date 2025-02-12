import React from "react";
import PropTypes from "prop-types";
import styles from "./ExhibitionList.module.css";
import ExhibitionBox from "../ExhibitionBox/ExhibitionBox";

function ExhibitionList({ exhibitions }) {
  return (
    <div className={styles.container}>
      {exhibitions.map((exhibition) => (
        <div key={exhibition.id} className={styles.listItem}>
          <ExhibitionBox exhibition={exhibition} />
        </div>
      ))}
    </div>
  );
}

ExhibitionList.propTypes = {
  exhibitions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      poster: PropTypes.string,
    })
  ).isRequired,
};

export default ExhibitionList;
