import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Trade from "./pages/Trade/Trade";
import Exhibition from "./pages/Exhibition/Exhibition";
import MyPage from "./pages/MyPage/MyPage";
import RegisterExhibition from "./pages/Exhibition/RegisterExhibition/RegisterExhibition";
import DetailExhibition from "./pages/Exhibition/DetailExhibition/DetailExhibition";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
