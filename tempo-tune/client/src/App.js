import "./App.css";
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { accessToken } from './services/auth';
import { Login, Home, Input, Results } from './pages';

function App() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState(null)

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login/>} />
        <Route path="/input/:id" element={<Input tracks={tracks} setTracks={setTracks}/>} />
        <Route path="/results/:id/:bpm" element={<Results opTracks={tracks}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
