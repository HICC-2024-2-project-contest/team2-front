import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import Exhibition from "./pages/Exhibition/Exhibition";
import MyPage from "./pages/MyPage/MyPage";
import RegisterExhibition from "./pages/Exhibition/RegisterExhibition/RegisterExhibition";
import DetailExhibition from "./pages/Exhibition/DetailExhibition/DetailExhibition";

import MyPage_Setting from "./pages/MyPage/MyPage_Setting/MyPage_Setting";
import MyPage_Trade_my from "./pages/MyPage/MyPage_Trade/MyPage_Trade_my";
import MyPage_Trade_scrap from "./pages/MyPage/MyPage_Trade/MyPage_Trade_scrap";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/register" element={<RegisterExhibition />} />
          <Route path="/exhibition/:id" element={<DetailExhibition />} />
          {/* ✅ 수정된 부분 */}
          <Route path="/mypage/setting" element={<MyPage_Setting />} />
          <Route path="/mypage/trade/my" element={<MyPage_Trade_my />} />
          <Route path="/mypage/trade/scrap" element={<MyPage_Trade_scrap />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
