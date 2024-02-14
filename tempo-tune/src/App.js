import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { authenticateUser } from "./scripts/auth";

import InputPage from "./components/InputPage/InputPage";
import LandingPage from "./components/LandingPage/LandingPage";

export default function App() {

    // Usestate hook for access token to use in other components
    const [accessToken, setAccessToken] = useState(null);

    // Perform authentication and retrieve access token
    const handleAuth = async () => {
        const sessionAccessToken = await authenticateUser();
        setAccessToken(sessionAccessToken);
    };


    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage handleAuth={handleAuth}/>} />
            <Route path="/input-page" element={<InputPage accessToken={accessToken}/>} />
          </Routes>
        </BrowserRouter>
    );
}
