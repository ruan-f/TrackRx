// src/app/page.js
"use client"; // Ensure this file is treated as a client-side component

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PersonalInfo from "./pages/personal-info";
import Tracking from "./pages/tracking";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
