import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TypingPage from "./pages/TypingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/typing" element={<TypingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
