import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import FocusEfficiency from "./pages/FocusEfficiency";
import "./index.css";

function Navbar() {
  return (
    <nav className="bg-[#0a111a] border-b border-[#1f2937] p-4 flex items-center justify-center gap-6 text-slate-300">
      <Link to="/" className="hover:text-slate-100 transition">🧪 Calculator</Link>
      <Link to="/efficiency" className="hover:text-slate-100 transition">⚡ Focus Efficiency</Link>
    </nav>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/efficiency" element={<FocusEfficiency />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
