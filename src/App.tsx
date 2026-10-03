import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import JobMatch from "@/pages/JobMatch";
import ResumeAnalysis from "@/pages/ResumeAnalysis";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<JobMatch />} />
        <Route path="/analysis" element={<ResumeAnalysis />} />
      </Routes>
    </Router>
  );
}
