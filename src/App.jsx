import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import Exhibition from "./pages/Exhibition/Exhibition";
import DetailExhibition from "./pages/Exhibition/DetailExhibition/DetailExhibition";
import RegisterExhibition from "./pages/Exhibition/RegisterExhibition/RegisterExhibition";
import MyPage from "./pages/MyPage/MyPage";
import MyPage_Setting from "./pages/MyPage/MyPage_Setting/MyPage_Setting";
import MyPage_Trade_my from "./pages/MyPage/MyPage_Trade/MyPage_Trade_my";
import MyPage_Trade_scrap from "./pages/MyPage/MyPage_Trade/MyPage_Trade_scrap";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import TestAPI from "./pages/TestAPI";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/exhibition/:id" element={<DetailExhibition />} />
          <Route path="/exhibition/registex" element={<RegisterExhibition />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/setting" element={<MyPage_Setting />} />
          <Route path="/mypage/trade/my" element={<MyPage_Trade_my />} />
          <Route path="/mypage/trade/scrap" element={<MyPage_Trade_scrap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/test-api" element={<TestAPI />} /> {/* API 테스트 페이지 추가 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
