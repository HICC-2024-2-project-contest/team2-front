import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Trade from './pages/Trade/Trade';
import Exhibition from "./pages/Exhibition/Exhibition";
import MyPage from "./pages/MyPage/MyPage";
import './App.css';

function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;