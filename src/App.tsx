import { Routes, Route, Link } from "react-router-dom";
import LifeSkillCalculator from "@/components/LifeSkillCalculator";
import FocusEfficiency from "@/pages/FocusEfficiency";

export default function App() {
  return (
    <div>
      <nav className="flex justify-center gap-4 p-3 bg-[#0b0f14] text-sm text-slate-300 border-b border-[#1b2530]">
        <Link to="/">🐣 Calculator</Link>
        <Link to="/focus">🙀 Focus Efficiency</Link>
        <a href="https://i.imgur.com/G5ZQYER.mp44" target="_blank" rel="noopener noreferrer">
          😺
        </a>
      </nav>

      <Routes>
        <Route path="/" element={<LifeSkillCalculator />} />
        <Route path="/focus" element={<FocusEfficiency />} />
      </Routes>
    </div>
  );
}
