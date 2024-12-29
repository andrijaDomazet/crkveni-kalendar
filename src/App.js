import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./containter/Home/Home";
import Bars from "./components/Bars/Bars";
export default function App() {
  return (
    <Router>
      <Bars />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
