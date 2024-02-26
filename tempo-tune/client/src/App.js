import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { accessToken } from './services/auth';
import { Login, Home } from './pages';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login/>} />
        <Route path="/top-artists" element={<h1>Top Artists</h1>} />
        <Route path="/top-tracks" element={<h1>Top Tracks</h1>} />
        <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
