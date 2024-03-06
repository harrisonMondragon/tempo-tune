import "./App.css";
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { accessToken } from './services/auth';
import { Login, Home, Input } from './pages';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Login/>} />
        <Route path="/input/:id" element={<Input/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
