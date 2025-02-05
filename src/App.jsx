import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Trade from './pages/Trade/Trade';
import Exhibition from "./pages/Exhibition/Exhibition";
import MyPage from "./pages/MyPage/MyPage";
import MyPage_Setting from "./pages/MyPage/MyPage_Setting/MyPage_Setting";
import Login from "./pages/Login/Login";
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
          <Route path="/mypage/setting" element={<MyPage_Setting />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;