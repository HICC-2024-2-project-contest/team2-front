import React from 'react';
import styles from './MyPage.module.css';

function MyPage() {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the MyPage Page</h1>
        <p>This is the main page of the application.</p>
    </div>
  );
}

export default MyPage;