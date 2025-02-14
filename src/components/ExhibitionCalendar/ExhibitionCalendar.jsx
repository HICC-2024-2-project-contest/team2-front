import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ExhibitionCalendar.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ExhibitionCalendar = ({ exhibitions }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // 날짜별 전시 데이터를 그룹화
  const exhibitionMap = exhibitions.reduce((acc, exhibition) => {
    const date = exhibition.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(exhibition);
    return acc;
  }, {});

  // 날짜 선택 핸들러 (UTC 문제 해결)
  const handleDateClick = (date) => {
    const formattedDate = date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/. /g, "-")
      .replace(".", ""); // YYYY-MM-DD 형식 변환
    setSelectedDate(formattedDate);
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onClickDay={handleDateClick}
        tileContent={({ date }) => {
          const formattedDate = date
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/. /g, "-")
            .replace(".", ""); // YYYY-MM-DD 형식 변환
          const exhibitionsOnDate = exhibitionMap[formattedDate];

          if (
            !Array.isArray(exhibitionsOnDate) ||
            exhibitionsOnDate.length === 0
          )
            return null;

          return (
            <div className={styles.dotContainer}>
              {exhibitionsOnDate.slice(0, 2).map((_, index) => (
                <span key={index} className={styles.dot} />
              ))}
            </div>
          );
        }}
        maxDetail="month"
        minDetail="month"
        className={
          isExpanded ? styles.expandedCalendar : styles.collapsedCalendar
        }
      />
      <button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "접기" : "펼치기"}
      </button>

      {/* 모달 */}
      {selectedDate && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setSelectedDate(null)}
            >
              ✕
            </button>
            <h3>{selectedDate}</h3>
            {exhibitionMap[selectedDate] ? (
              exhibitionMap[selectedDate].map((exhibition, index) => (
                <div key={index} className={styles.exhibitionItem}>
                  <p>{exhibition.title}</p>
                  <span>{exhibition.location}</span>
                  <span>{exhibition.dateRange}</span>
                </div>
              ))
            ) : (
              <p className={styles.noExhibition}>
                해당 날짜에 전시가 없습니다.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

ExhibitionCalendar.propTypes = {
  exhibitions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      dateRange: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExhibitionCalendar;
