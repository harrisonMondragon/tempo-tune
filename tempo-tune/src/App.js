import { BrowserRouter, Routes, Route } from "react-router-dom";

import InputPage from "./components/InputPage/InputPage";
import LandingPage from "./components/LandingPage/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/input-page" element={<InputPage />} />
      </Routes>
    </BrowserRouter>
  );
}
